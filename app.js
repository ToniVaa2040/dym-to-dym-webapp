// app.js
// Логика мини-приложения Dым to Dым

// ---------- Глобальное состояние ----------
let currentCityId = null;
let currentHookahId = null;
let currentScreen = null;
let currentParams = {};
let screenStack = [];

// ---------- DOM ----------
const appContainer = document.getElementById("app");
const backToCitiesBtn = document.getElementById("backToCitiesBtn");
const backToHookahsBtn = document.getElementById("backToHookahsBtn");
const goHomeBtn = document.getElementById("backToWelcomeBtn");
const suggestionsBtn = document.getElementById("suggestionsBtn");

// ---------- Данные ----------
function getCities() {
  if (window.appData && Array.isArray(window.appData.cities)) {
    return window.appData.cities;
  }
  return [];
}

function getCityById(cityId) {
  return getCities().find((c) => c.id === cityId) || null;
}

function getHookahsByCityId(cityId) {
  const city = getCityById(cityId);
  if (!city || !Array.isArray(city.hookahs)) return [];
  return city.hookahs;
}

function getHookahById(cityId, hookahId) {
  return getHookahsByCityId(cityId).find((h) => h.id === hookahId) || null;
}

// ---------- Утилиты телефонов / часов ----------
function normalizePhones(hookah) {
  if (!hookah) return [];
  if (Array.isArray(hookah.phones)) return hookah.phones;
  if (Array.isArray(hookah.phone)) return hookah.phone;
  if (typeof hookah.phone === "string" && hookah.phone.trim() !== "") {
    return [hookah.phone.trim()];
  }
  return [];
}

function normalizeWorkingHours(hookah) {
  if (!hookah) return null;
  if (hookah.working_hours && typeof hookah.working_hours === "object") {
    return hookah.working_hours;
  }

  const keys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const result = {};
  let hasAny = false;

  keys.forEach((k) => {
    if (hookah[k]) {
      result[k] = hookah[k];
      hasAny = true;
    }
  });

  return hasAny ? result : null;
}

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const DAY_NAMES_RU = {
  mon: "понедельник",
  tue: "вторник",
  wed: "среда",
  thu: "четверг",
  fri: "пятница",
  sat: "суббота",
  sun: "воскресенье",
};

function parseHoursRange(hoursStr) {
  if (!hoursStr || typeof hoursStr !== "string") return null;
  const trimmed = hoursStr.trim().toLowerCase();

  if (
    trimmed === "круглосуточно" ||
    trimmed === "24/7" ||
    trimmed === "00:00–24:00"
  ) {
    return { start: 0, end: 24 * 60, is24: true };
  }

  const parts = trimmed.split("–");
  if (parts.length !== 2) return null;

  const toMinutes = (str) => {
    const [hh, mm] = str.split(":").map((v) => parseInt(v, 10));
    if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
    return hh * 60 + mm;
  };

  const start = toMinutes(parts[0]);
  const end = toMinutes(parts[1]);
  if (start == null || end == null) return null;

  return { start, end, is24: false };
}

function isOpenNow(hoursStr) {
  const range = parseHoursRange(hoursStr);
  if (!range) return null;
  if (range.is24) return true;

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  let { start, end } = range;
  let crossesMidnight = false;

  if (end <= start) {
    end += 24 * 60;
    crossesMidnight = true;
  }

  let current = nowMinutes;
  if (crossesMidnight && nowMinutes < start) {
    current += 24 * 60;
  }

  return current >= start && current <= end;
}

function getTodayWorkingInfo(workingHours) {
  if (!workingHours) {
    return { dayName: "", hours: "нужно уточнить", isOpen: null };
  }

  const now = new Date();
  const jsDay = now.getDay();
  const dayKey = DAY_KEYS[jsDay];
  const dayName = DAY_NAMES_RU[dayKey] || "";
  const hours = workingHours[dayKey] || "нужно уточнить";
  const isOpen = isOpenNow(hours);

  return { dayName, hours, isOpen };
}

// ---------- Поиск ----------
function normalizeSearchString(value) {
  if (!value) return "";
  return String(value).trim().toLowerCase();
}

function isMatch(value, query) {
  const q = normalizeSearchString(query);
  if (!q) return true;
  const v = normalizeSearchString(value);
  return v.includes(q);
}

// ---------- Навигация и анимация ----------
function renderCurrentScreen() {
  switch (currentScreen) {
    case "welcome":
      renderWelcomeScreen();
      break;
    case "cities":
      renderCitiesScreen();
      break;
    case "hookahs":
      renderHookahsScreen(currentParams.cityId);
      break;
    case "hookahDetails":
      renderHookahDetailsScreen(currentParams.cityId, currentParams.hookahId);
      break;
    default:
      renderWelcomeScreen();
      break;
  }
}

function applyScreenTransition(direction) {
  const screenEl = appContainer.querySelector(".screen");
  if (!screenEl) return;

  screenEl.classList.remove("screen--animate-in-forward", "screen--animate-in-back");
  void screenEl.offsetWidth; // перезапуск анимации

  if (direction === "back") {
    screenEl.classList.add("screen--animate-in-back");
  } else {
    screenEl.classList.add("screen--animate-in-forward");
  }
}

function navigateTo(screen, params = {}, options = {}) {
  const { replace = false, direction = "forward" } = options;

  if (!replace && currentScreen) {
    screenStack.push({ screen: currentScreen, params: currentParams });
  }

  currentScreen = screen;
  currentParams = params || {};

  renderCurrentScreen();
  applyScreenTransition(direction);
}

function navigateBack() {
  if (!screenStack.length) return;

  const prev = screenStack.pop();
  currentScreen = prev.screen;
  currentParams = prev.params || {};

  renderCurrentScreen();
  applyScreenTransition("back");
}

// ---------- Telegram WebApp: свайпы и fullscreen ----------
function initTelegramWebApp() {
  const tg = window.Telegram && window.Telegram.WebApp;
  if (!tg) return;

  // Разворачиваем на максимум
  if (typeof tg.expand === "function") {
    tg.expand();
  }

  // Старый метод (может не работать, но пробуем)
  if (typeof tg.disableVerticalSwipes === "function") {
    tg.disableVerticalSwipes();
  }

  // Новый низкоуровневый event web_app_setup_swipe_behavior
  try {
    const payload = JSON.stringify({ allow_vertical_swipe: false });

    // Мобильные клиенты
    if (
      window.TelegramWebviewProxy &&
      typeof window.TelegramWebviewProxy.postEvent === "function"
    ) {
      window.TelegramWebviewProxy.postEvent(
        "web_app_setup_swipe_behavior",
        payload
      );
    }

    // Web-версия Telegram
    if (window.parent && window.parent !== window) {
      const msg = JSON.stringify({
        eventType: "web_app_setup_swipe_behavior",
        eventData: { allow_vertical_swipe: false },
      });
      window.parent.postMessage(msg, "https://web.telegram.org");
    }
  } catch (e) {
    console.warn("Не удалось настроить поведение свайпа", e);
  }
}

// ---------- Свайп-назад (слева направо) ----------
function setupSwipeNavigation() {
  if (!appContainer) return;

  let touchStartX = null;
  let touchStartY = null;
  let touchStartTime = 0;

  appContainer.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartTime = Date.now();
  });

  appContainer.addEventListener("touchend", (event) => {
    if (touchStartX === null || touchStartY === null) return;
    const touch = event.changedTouches[0];
    if (!touch) return;

    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    const dt = Date.now() - touchStartTime;

    const minDistance = 50;
    const maxVerticalOffset = 80;
    const maxDuration = 600;
    const edgeZone = 40;

    if (
      dt <= maxDuration &&
      dx > minDistance &&
      Math.abs(dy) < maxVerticalOffset &&
      touchStartX < edgeZone
    ) {
      navigateBack();
    }

    touchStartX = null;
    touchStartY = null;
  });
}

// ---------- Футер ----------
function setFooterState({
  showBackToCities,
  showBackToHookahs,
  showHome,
  showSuggestions,
}) {
  if (backToCitiesBtn) {
    backToCitiesBtn.classList.toggle("hidden", !showBackToCities);
  }
  if (backToHookahsBtn) {
    backToHookahsBtn.classList.toggle("hidden", !showBackToHookahs);
  }
  if (goHomeBtn) {
    goHomeBtn.classList.toggle("hidden", !showHome);
  }
  if (suggestionsBtn) {
    suggestionsBtn.classList.toggle("hidden", !showSuggestions);
  }
}

// ---------- Экраны ----------

// Welcome
function renderWelcomeScreen() {
  currentCityId = null;
  currentHookahId = null;

  setFooterState({
    showBackToCities: false,
    showBackToHookahs: false,
    showHome: false,
    showSuggestions: true,
  });

  appContainer.innerHTML = `
    <section class="screen welcome-screen">
      <div class="welcome-image-wrapper">
        <img src="assets/welcome_image.PNG" alt="Добро пожаловать" class="welcome-image" />
      </div>
      <div class="welcome-content">
        <h1 class="welcome-title">Dым to Dым</h1>
        <p class="welcome-subtitle">Выбери город — дальше я помогу с кальянной</p>
        <button id="goToCitiesBtn" class="primary-btn">Перейти к выбору города</button>
        <div class="neshop-block">
          <p class="neshop-text">За продукцией, табаком и кальянами ↓</p>
          <a
            href="https://t.me/Ne_ShopBot?startapp"
            target="_blank"
            rel="noopener noreferrer"
            class="primary-btn neshop-btn"
          >
            НЕШОП
          </a>
        </div>
      </div>
    </section>
  `;

  const goToCitiesBtn = document.getElementById("goToCitiesBtn");
  if (goToCitiesBtn) {
    goToCitiesBtn.addEventListener("click", () => {
      navigateTo("cities", {}, { direction: "forward" });
    });
  }
}

// Выбор города + глобальный поиск
function renderCitiesScreen() {
  currentCityId = null;
  currentHookahId = null;

  setFooterState({
    showBackToCities: false,
    showBackToHookahs: false,
    showHome: true,
    showSuggestions: false,
  });

  const cities = getCities();

  if (!cities.length) {
    appContainer.innerHTML = `
      <section class="screen cities-screen">
        <h2 class="screen-title">ВЫБОР ГОРОДА</h2>
        <p class="empty-message">Города пока не добавлены.</p>
      </section>
    `;
    return;
  }

  appContainer.innerHTML = `
    <section class="screen cities-screen">
      <h2 class="screen-title">ВЫБОР ГОРОДА</h2>
      <div class="search-bar">
        <label class="search-label" for="citiesSearchInput">Поиск по городам и заведениям</label>
        <input
          id="citiesSearchInput"
          class="search-input"
          type="text"
          placeholder="Начни вводить название города или заведения"
        />
      </div>
      <div id="citiesOrHookahsContainer" class="cards-list"></div>
    </section>
  `;

  const listContainer = document.getElementById("citiesOrHookahsContainer");
  const searchInput = document.getElementById("citiesSearchInput");

  if (!listContainer || !searchInput) return;

  function renderCitiesList(list) {
    const html = list
      .map((city) => {
        const imgSrc = city.image ? `assets/${city.image}` : "";
        return `
          <article class="card city-card" data-city-id="${city.id}">
            <div class="city-card-image-wrapper">
              ${
                imgSrc
                  ? `<img src="${imgSrc}" alt="${city.name}" class="city-card-image" loading="lazy" />`
                  : ""
              }
            </div>
            <div class="city-card-content">
              <h2 class="city-card-title">${city.name}</h2>
            </div>
          </article>
        `;
      })
      .join("");

    listContainer.innerHTML = html;

    const cityCards = listContainer.querySelectorAll(".city-card");
    cityCards.forEach((card) => {
      card.addEventListener("click", () => {
        const cityId = card.dataset.cityId;
        currentCityId = cityId;
        navigateTo("hookahs", { cityId }, { direction: "forward" });
      });
    });
  }

  function renderGlobalHookahsList(hookahMatches) {
    const html = hookahMatches
      .map(({ city, hookah }) => {
        const imgSrc = hookah.image ? `assets/${hookah.image}` : "";
        const rating = hookah.rating ? String(hookah.rating) : "—";
        return `
          <article class="card hookah-card" data-city-id="${city.id}" data-hookah-id="${hookah.id}">
            <div class="hookah-card-main">
              <div class="hookah-card-info">
                <h3 class="hookah-card-title">${hookah.name}</h3>
                <p class="hookah-card-rating">Рейтинг: <span>${rating}</span></p>
                <p class="hookah-card-city">Город: ${city.name}</p>
                ${
                  hookah.address
                    ? `<p class="hookah-card-address">${hookah.address}</p>`
                    : ""
                }
              </div>
              ${
                imgSrc
                  ? `<div class="hookah-card-image-wrapper">
                      <img src="${imgSrc}" alt="${hookah.name}" class="hookah-card-image" loading="lazy" />
                    </div>`
                  : ""
              }
            </div>
          </article>
        `;
      })
      .join("");

    listContainer.innerHTML = html;

    const hookahCards = listContainer.querySelectorAll(".hookah-card");
    hookahCards.forEach((card) => {
      card.addEventListener("click", () => {
        const cityId = card.dataset.cityId;
        const hookahId = card.dataset.hookahId;
        currentCityId = cityId;
        currentHookahId = hookahId;
        navigateTo("hookahDetails", { cityId, hookahId }, { direction: "forward" });
      });
    });
  }

  function applySearch() {
    const query = searchInput.value || "";

    if (!query) {
      renderCitiesList(cities);
      return;
    }

    const allCities = getCities();
    const hookahMatches = [];
    const cityMatches = [];

    allCities.forEach((city) => {
      if (isMatch(city.name, query) || isMatch(city.id, query)) {
        cityMatches.push(city);
      }
      const hookahs = getHookahsByCityId(city.id);
      hookahs.forEach((hookah) => {
        if (isMatch(hookah.name, query) || isMatch(hookah.id, query)) {
          hookahMatches.push({ city, hookah });
        }
      });
    });

    if (hookahMatches.length) {
      renderGlobalHookahsList(hookahMatches);
    } else if (cityMatches.length) {
      renderCitiesList(cityMatches);
    } else {
      listContainer.innerHTML = `
        <p class="empty-message">Ничего не найдено. Попробуй изменить запрос.</p>
      `;
    }
  }

  searchInput.addEventListener("input", applySearch);

  renderCitiesList(cities);
}

// Выбор заведений в городе
function renderHookahsScreen(cityId) {
  const city = getCityById(cityId);

  if (!city) {
    navigateTo("cities", {}, { replace: true, direction: "back" });
    return;
  }

  currentCityId = cityId;
  currentHookahId = null;

  setFooterState({
    showBackToCities: true,
    showBackToHookahs: false,
    showHome: true,
    showSuggestions: false,
  });

  const hookahs = getHookahsByCityId(cityId);

  if (!hookahs.length) {
    appContainer.innerHTML = `
      <section class="screen hookahs-screen">
        <h2 class="screen-title">ВЫБОР КАЛЬЯННОЙ</h2>
        <p class="screen-subtitle">${city.name}</p>
        <p class="empty-message">В этом городе пока нет заведений.</p>
      </section>
    `;
    return;
  }

  appContainer.innerHTML = `
    <section class="screen hookahs-screen">
      <h2 class="screen-title">ВЫБОР КАЛЬЯННОЙ</h2>
      <p class="screen-subtitle">${city.name}</p>
      <div class="search-bar">
        <label class="search-label" for="hookahsSearchInput">Поиск по заведениям в этом городе</label>
        <input
          id="hookahsSearchInput"
          class="search-input"
          type="text"
          placeholder="Начни вводить название заведения"
        />
      </div>
      <div id="hookahsContainer" class="cards-list"></div>
    </section>
  `;

  const listContainer = document.getElementById("hookahsContainer");
  const searchInput = document.getElementById("hookahsSearchInput");

  if (!listContainer || !searchInput) return;

  function renderHookahsList(list) {
    const html = list
      .map((h) => {
        const imgSrc = h.image ? `assets/${h.image}` : "";
        const rating = h.rating ? String(h.rating) : "—";
        return `
          <article class="card hookah-card" data-hookah-id="${h.id}">
            <div class="hookah-card-main">
              <div class="hookah-card-info">
                <h3 class="hookah-card-title">${h.name}</h3>
                <p class="hookah-card-rating">Рейтинг: <span>${rating}</span></p>
                ${
                  h.address
                    ? `<p class="hookah-card-address">${h.address}</p>`
                    : ""
                }
              </div>
              ${
                imgSrc
                  ? `<div class="hookah-card-image-wrapper">
                      <img src="${imgSrc}" alt="${h.name}" class="hookah-card-image" loading="lazy" />
                    </div>`
                  : ""
              }
            </div>
          </article>
        `;
      })
      .join("");

    listContainer.innerHTML = html;

    const hookahCards = listContainer.querySelectorAll(".hookah-card");
    hookahCards.forEach((card) => {
      card.addEventListener("click", () => {
        const hookahId = card.dataset.hookahId;
        currentHookahId = hookahId;
        navigateTo(
          "hookahDetails",
          { cityId, hookahId },
          { direction: "forward" }
        );
      });
    });
  }

  function applySearch() {
    const query = searchInput.value || "";

    if (!query) {
      renderHookahsList(hookahs);
      return;
    }

    const filtered = hookahs.filter(
      (h) => isMatch(h.name, query) || isMatch(h.id, query)
    );

    if (filtered.length) {
      renderHookahsList(filtered);
    } else {
      listContainer.innerHTML = `
        <p class="empty-message">В этом городе ничего не нашлось по такому запросу.</p>
      `;
    }
  }

  searchInput.addEventListener("input", applySearch);

  renderHookahsList(hookahs);
}

// Карточка заведения
function renderHookahDetailsScreen(cityId, hookahId) {
  const city = getCityById(cityId);
  const hookah = getHookahById(cityId, hookahId);

  if (!city || !hookah) {
    navigateTo("hookahs", { cityId }, { replace: true, direction: "back" });
    return;
  }

  currentCityId = cityId;
  currentHookahId = hookahId;

  setFooterState({
    showBackToCities: false,
    showBackToHookahs: true,
    showHome: true,
    showSuggestions: false,
  });

  const gallery = Array.isArray(hookah.gallery) ? hookah.gallery : [];
  const phones = normalizePhones(hookah);
  const workingHours = normalizeWorkingHours(hookah);
  const todayInfo = getTodayWorkingInfo(workingHours);

  const galleryHtml = gallery
    .map(
      (img) => `
        <div class="gallery-slide">
          <img src="assets/${img}" alt="${hookah.name}" class="gallery-image" loading="lazy" />
        </div>
      `
    )
    .join("");

  // --- телефоны: клик -> popup с номером и кнопкой "Скопировать" ---
  let phonesHtml = "";
  if (phones.length > 0) {
    phonesHtml = `
      <ul class="hookah-phones">
        ${phones
          .map((p) => {
            const clean = String(p).replace(/\s+/g, "");
            return `
              <li>
                <button
                  type="button"
                  class="phone-btn"
                  data-phone="${clean}"
                >${p}</button>
              </li>
            `;
          })
          .join("")}
      </ul>
    `;
  } else {
    phonesHtml = `<p class="hookah-phones-empty">Телефоны: нужно уточнить</p>`;
  }

  let workingHoursHtml = "";
  if (workingHours) {
    const rows = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
      .map((key) => {
        const label = DAY_NAMES_RU[key] || key;
        const value = workingHours[key] || "нужно уточнить";
        return `
          <tr>
            <td class="wh-day">${label}</td>
            <td class="wh-hours">${value}</td>
          </tr>
        `;
      })
      .join("");

    workingHoursHtml = `
      <table class="working-hours-table">
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  } else {
    workingHoursHtml = `<p class="hookah-working-empty">Часы работы: нужно уточнить</p>`;
  }

  let todayStatusText = "";
  let todayStatusClass = "";

  if (todayInfo.hours === "нужно уточнить" || todayInfo.dayName === "") {
    todayStatusText = "Сегодня график работы нужно уточнить";
    todayStatusClass = "status-unknown";
  } else if (todayInfo.isOpen === null) {
    todayStatusText = `Сегодня ${todayInfo.dayName}, работает: ${todayInfo.hours}`;
    todayStatusClass = "status-unknown";
  } else if (todayInfo.isOpen) {
    todayStatusText = `Сейчас открыто — работает сегодня: ${todayInfo.hours}`;
    todayStatusClass = "status-open";
  } else {
    todayStatusText = `Сейчас закрыто — работает сегодня: ${todayInfo.hours}`;
    todayStatusClass = "status-closed";
  }

  const yandexButtonHtml =
    hookah.yandex_map && hookah.yandex_map.url
      ? `
        <a href="${hookah.yandex_map.url}" target="_blank" class="primary-btn yandex-btn">
          Открыть на Яндекс.Картах
        </a>
      `
      : "";

  const tagsHtml = `
    <div class="hookah-tags">
      <span class="hookah-tag">Еда: ${hookah.food || "нужно уточнить"}</span>
      <span class="hookah-tag">Алкоголь: ${hookah.alcohol || "нужно уточнить"}</span>
      <span class="hookah-tag">Напитки: ${hookah.drinks || "нужно уточнить"}</span>
    </div>
  `;

  const notesHtml =
    hookah.notes && hookah.notes.trim() !== ""
      ? `
        <div class="hookah-notes">
          <h3>Комментарий от Dым to Dым</h3>
          <p>${hookah.notes}</p>
        </div>
      `
      : "";

  const videoHtml =
    hookah.video_review && hookah.video_review.trim() !== ""
      ? `
        <div class="hookah-video">
          <h3>Видеообзор</h3>
          <p>${hookah.video_review}</p>
        </div>
      `
      : "";

  appContainer.innerHTML = `
    <section class="screen hookah-details-screen">
      <header class="hookah-header">
        <h2 class="hookah-name">${hookah.name}</h2>
        <p class="hookah-city">${city.name}</p>
      </header>

      ${
        galleryHtml
          ? `<div class="gallery-container">${galleryHtml}</div>`
          : ""
      }

      <div class="hookah-main-info">
        <p class="hookah-rating">Рейтинг: <span>${hookah.rating || "—"}</span></p>
        ${
          hookah.address
            ? `<p class="hookah-address">${hookah.address}</p>`
            : ""
        }
        ${phonesHtml}
        ${tagsHtml}
      </div>

      <div class="hookah-working-block">
        <h3>Часы работы</h3>
        ${workingHoursHtml}
        <div class="hookah-today-status ${todayStatusClass}">
          ${todayStatusText}
        </div>
      </div>

      ${notesHtml}
      ${videoHtml}

      <div class="hookah-actions">
        ${yandexButtonHtml}
      </div>
    </section>
  `;

  // обработчик: показать popup с номером и кнопкой "Скопировать"
  const phoneButtons = appContainer.querySelectorAll(".phone-btn");
  phoneButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const raw = btn.dataset.phone;
      if (!raw) return;

      const display = btn.textContent.trim();
      const tg = window.Telegram && window.Telegram.WebApp;

      // если есть showPopup — используем нативный попап Телеги
      if (tg && typeof tg.showPopup === "function") {
        tg.showPopup(
          {
            title: "Позвонить в заведение",
            message: display,
            buttons: [
              { id: "copy", type: "default", text: "Скопировать номер" },
              { id: "close", type: "cancel", text: "Закрыть" },
            ],
          },
          async (buttonId) => {
            if (buttonId === "copy") {
              try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  await navigator.clipboard.writeText(display);
                  tg.showAlert("Номер скопирован");
                } else {
                  tg.showAlert(`Скопируй номер вручную: ${display}`);
                }
              } catch (e) {
                tg.showAlert(`Скопируй номер вручную: ${display}`);
              }
            }
          }
        );
      } else {
        // fallback: просто alert
        alert(`Телефон заведения: ${display}`);
      }
    });
  });
}

// ---------- Кнопки внизу ----------
if (backToCitiesBtn) {
  backToCitiesBtn.addEventListener("click", () => {
    navigateBack();
  });
}

if (backToHookahsBtn) {
  backToHookahsBtn.addEventListener("click", () => {
    navigateBack();
  });
}

if (goHomeBtn) {
  goHomeBtn.addEventListener("click", () => {
    screenStack = [];
    navigateTo("welcome", {}, { replace: true, direction: "back" });
  });
}

// ---------- Старт ----------
document.addEventListener("DOMContentLoaded", () => {
  initTelegramWebApp();
  navigateTo("welcome", {}, { replace: true, direction: "forward" });
  setupSwipeNavigation();
});
