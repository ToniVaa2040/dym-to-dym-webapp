// app.js
// Весь рендеринг мини-приложения и логика экранов здесь

// ---------- Глобальное состояние ----------
let currentCityId = null;
let currentHookahId = null;

// ---------- Базовые ссылки на DOM-элементы ----------
const appContainer = document.getElementById("app");
const backToCitiesBtn = document.getElementById("backToCitiesBtn");
const backToHookahsBtn = document.getElementById("backToHookahsBtn");
const goHomeBtn = document.getElementById("backToWelcomeBtn");

// Кнопка "Предложения" просто ссылка в index.html, её здесь не трогаем

// ---------- Утилиты для работы с данными ----------

function getCities() {
  if (window.appData && Array.isArray(window.appData.cities)) {
    return window.appData.cities;
  }
  return [];
}

function getCityById(cityId) {
  return getCities().find((city) => city.id === cityId) || null;
}

function getHookahsByCityId(cityId) {
  const city = getCityById(cityId);
  if (!city || !Array.isArray(city.hookahs)) {
    return [];
  }
  return city.hookahs;
}

function getHookahById(cityId, hookahId) {
  return getHookahsByCityId(cityId).find((h) => h.id === hookahId) || null;
}

// Приводим телефоны к массиву строк
function normalizePhones(hookah) {
  if (!hookah) return [];
  if (Array.isArray(hookah.phones)) {
    return hookah.phones;
  }
  if (Array.isArray(hookah.phone)) {
    return hookah.phone;
  }
  if (typeof hookah.phone === "string" && hookah.phone.trim() !== "") {
    return [hookah.phone.trim()];
  }
  return [];
}

// Приводим working_hours к объекту вида {mon, tue, ...}
function normalizeWorkingHours(hookah) {
  if (!hookah) return null;

  if (hookah.working_hours && typeof hookah.working_hours === "object") {
    return hookah.working_hours;
  }

  const keys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  let hasAny = false;
  const result = {};

  keys.forEach((key) => {
    if (hookah[key]) {
      result[key] = hookah[key];
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

// Разбираем строку "HH:MM–HH:MM" в минуты от начала суток
function parseHoursRange(hoursStr) {
  if (!hoursStr || typeof hoursStr !== "string") return null;

  const trimmed = hoursStr.trim().toLowerCase();

  // Обработка круглосуточного режима
  if (
    trimmed === "круглосуточно" ||
    trimmed === "24/7" ||
    trimmed === "00:00–24:00"
  ) {
    return { start: 0, end: 24 * 60, is24: true };
  }

  const parts = trimmed.split("–");
  if (parts.length !== 2) return null;

  const [startStr, endStr] = parts;

  function toMinutes(timeStr) {
    const [hh, mm] = timeStr.split(":").map((v) => parseInt(v, 10));
    if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
    return hh * 60 + mm;
  }

  const start = toMinutes(startStr);
  const end = toMinutes(endStr);

  if (start == null || end == null) return null;

  return {
    start,
    end,
    is24: false,
  };
}

// Проверяем, открыто ли заведение сейчас по строке часов работы
function isOpenNow(hoursStr) {
  const range = parseHoursRange(hoursStr);
  if (!range) return null;

  if (range.is24) {
    return true;
  }

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  let { start, end } = range;

  // Если заведение закрывается после полуночи (например, 14:00–01:00),
  // то делаем end больше старта на 24 часа.
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

// Получаем инфу по сегодняшнему дню: название, часы, открыт/закрыт
function getTodayWorkingInfo(workingHours) {
  if (!workingHours) {
    return {
      dayName: "",
      hours: "нужно уточнить",
      isOpen: null,
    };
  }

  const now = new Date();
  const jsDay = now.getDay(); // 0 = Sunday
  const dayKey = DAY_KEYS[jsDay];
  const dayName = DAY_NAMES_RU[dayKey] || "";
  const hours = workingHours[dayKey] || "нужно уточнить";
  const isOpen = isOpenNow(hours);

  return { dayName, hours, isOpen };
}

// ---------- Рендер экранов ----------

function setFooterState({ showBackToCities, showBackToHookahs, showHome }) {
  if (backToCitiesBtn) {
    backToCitiesBtn.classList.toggle("hidden", !showBackToCities);
  }
  if (backToHookahsBtn) {
    backToHookahsBtn.classList.toggle("hidden", !showBackToHookahs);
  }
  if (goHomeBtn) {
    goHomeBtn.classList.toggle("hidden", !showHome);
  }
}

// Экран приветствия
function renderWelcomeScreen() {
  currentCityId = null;
  currentHookahId = null;

  setFooterState({
    showBackToCities: false,
    showBackToHookahs: false,
    showHome: false,
  });

  appContainer.innerHTML = `
    <section class="screen welcome-screen fade-in">
      <div class="welcome-image-wrapper">
        <img src="assets/welcome_image.PNG" alt="Добро пожаловать" class="welcome-image" />
      </div>
      <div class="welcome-content">
        <h1 class="welcome-title">Dым to Dым</h1>
        <p class="welcome-subtitle">Выбери город — дальше я помогу с кальянной</p>
        <button id="goToCitiesBtn" class="primary-btn">Перейти к выбору города</button>
      </div>
    </section>
  `;

  const goToCitiesBtn = document.getElementById("goToCitiesBtn");
  if (goToCitiesBtn) {
    goToCitiesBtn.addEventListener("click", () => {
      renderCitiesScreen();
    });
  }
}

// Экран выбора города
function renderCitiesScreen() {
  currentCityId = null;
  currentHookahId = null;

  setFooterState({
    showBackToCities: false,
    showBackToHookahs: false,
    showHome: true,
  });

  const cities = getCities();

  if (!cities.length) {
    appContainer.innerHTML = `
      <section class="screen cities-screen fade-in">
        <h2 class="screen-title">ВЫБОР ГОРОДА</h2>
        <p class="empty-message">Города пока не добавлены. Напиши мне в "Предложения".</p>
      </section>
    `;
    return;
  }

  const citiesHtml = cities
    .map((city) => {
      const imgSrc = city.image ? `assets/${city.image}` : "";
      return `
        <article class="card city-card" data-city-id="${city.id}">
          <div class="city-card-image-wrapper">
            ${
              imgSrc
                ? `<img src="${imgSrc}" alt="${city.name}" class="city-card-image" />`
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

  appContainer.innerHTML = `
    <section class="screen cities-screen fade-in">
      <h2 class="screen-title">ВЫБОР ГОРОДА</h2>
      <div class="cards-list">
        ${citiesHtml}
      </div>
    </section>
  `;

  const cityCards = appContainer.querySelectorAll(".city-card");
  cityCards.forEach((card) => {
    card.addEventListener("click", () => {
      const cityId = card.dataset.cityId;
      currentCityId = cityId;
      renderHookahsScreen(cityId);
    });
  });
}

// Экран выбора кальянной в городе
function renderHookahsScreen(cityId) {
  const city = getCityById(cityId);

  if (!city) {
    renderCitiesScreen();
    return;
  }

  currentCityId = cityId;
  currentHookahId = null;

  setFooterState({
    showBackToCities: true,
    showBackToHookahs: false,
    showHome: true,
  });

  const hookahs = getHookahsByCityId(cityId);

  if (!hookahs.length) {
    appContainer.innerHTML = `
      <section class="screen hookahs-screen fade-in">
        <h2 class="screen-title">ВЫБОР КАЛЬЯННОЙ</h2>
        <p class="screen-subtitle">${city.name}</p>
        <p class="empty-message">В этом городе пока нет заведений.</p>
      </section>
    `;
    return;
  }

  const hookahsHtml = hookahs
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
                    <img src="${imgSrc}" alt="${h.name}" class="hookah-card-image" />
                  </div>`
                : ""
            }
          </div>
        </article>
      `;
    })
    .join("");

  appContainer.innerHTML = `
    <section class="screen hookahs-screen fade-in">
      <h2 class="screen-title">ВЫБОР КАЛЬЯННОЙ</h2>
      <p class="screen-subtitle">${city.name}</p>
      <div class="cards-list">
        ${hookahsHtml}
      </div>
    </section>
  `;

  const hookahCards = appContainer.querySelectorAll(".hookah-card");
  hookahCards.forEach((card) => {
    card.addEventListener("click", () => {
      const hookahId = card.dataset.hookahId;
      currentHookahId = hookahId;
      renderHookahDetailsScreen(cityId, hookahId);
    });
  });
}

// Экран карточки конкретного заведения
function renderHookahDetailsScreen(cityId, hookahId) {
  const city = getCityById(cityId);
  const hookah = getHookahById(cityId, hookahId);

  if (!city || !hookah) {
    renderHookahsScreen(cityId);
    return;
  }

  currentCityId = cityId;
  currentHookahId = hookahId;

  setFooterState({
    showBackToCities: false,
    showBackToHookahs: true,
    showHome: true,
  });

  const gallery = Array.isArray(hookah.gallery) ? hookah.gallery : [];
  const phones = normalizePhones(hookah);
  const workingHours = normalizeWorkingHours(hookah);
  const todayInfo = getTodayWorkingInfo(workingHours);

  const galleryHtml = gallery
    .map(
      (img) => `
        <div class="gallery-slide">
          <img src="assets/${img}" alt="${hookah.name}" class="gallery-image" />
        </div>
      `
    )
    .join("");

  const phonesHtml =
    phones.length > 0
      ? `
      <ul class="hookah-phones">
        ${phones.map((p) => `<li><a href="tel:${p}">${p}</a></li>`).join("")}
      </ul>
    `
      : `<p class="hookah-phones-empty">Телефоны: нужно уточнить</p>`;

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
    <section class="screen hookah-details-screen fade-in">
      <header class="hookah-header">
        <h2 class="hookah-name">${hookah.name}</h2>
        <p class="hookah-city">${city.name}</p>
      </header>

      ${
        galleryHtml
          ? `
        <div class="gallery-container">
          ${galleryHtml}
        </div>
      `
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
}

// ---------- Навигация нижними кнопками ----------

if (backToCitiesBtn) {
  backToCitiesBtn.addEventListener("click", () => {
    renderCitiesScreen();
  });
}

if (backToHookahsBtn) {
  backToHookahsBtn.addEventListener("click", () => {
    if (currentCityId) {
      renderHookahsScreen(currentCityId);
    } else {
      renderCitiesScreen();
    }
  });
}

if (goHomeBtn) {
  goHomeBtn.addEventListener("click", () => {
    renderWelcomeScreen();
  });
}

// ---------- Стартовый рендер ----------
document.addEventListener("DOMContentLoaded", () => {
  renderWelcomeScreen();
});
