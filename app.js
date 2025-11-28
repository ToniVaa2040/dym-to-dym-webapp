// app.js

let currentCityId = null;
let currentHookahId = null;
let currentScreen = null;
let currentParams = {};
let screenStack = [];

const appContainer = document.getElementById("app");
const backToCitiesBtn = document.getElementById("backToCitiesBtn");
const backToHookahsBtn = document.getElementById("backToHookahsBtn");
const goHomeBtn = document.getElementById("backToWelcomeBtn");
const suggestionsBtn = document.getElementById("suggestionsBtn");

/* ==========
   ДАННЫЕ
   ========== */

function getCities() {
  return window.appData?.cities ?? [];
}

function getCityById(id) {
  return getCities().find((c) => c.id === id) || null;
}

function getHookahsByCityId(id) {
  const city = getCityById(id);
  return city?.hookahs ?? [];
}

function getHookahById(cityId, hookahId) {
  return getHookahsByCityId(cityId).find((h) => h.id === hookahId) || null;
}

/* ==========
   УТИЛИТЫ
   ========== */

function normalizePhones(h) {
  if (!h) return [];
  if (Array.isArray(h.phones)) return h.phones;
  if (Array.isArray(h.phone)) return h.phone;
  if (typeof h.phone === "string") return [h.phone];
  return [];
}

function normalizeWorkingHours(h) {
  if (!h) return null;
  if (h.working_hours) return h.working_hours;

  const w = {};
  const days = ["mon","tue","wed","thu","fri","sat","sun"];
  let has = false;

  days.forEach(d => {
    if (h[d]) {
      w[d] = h[d];
      has = true;
    }
  });

  return has ? w : null;
}

const DAY_KEYS = ["sun","mon","tue","wed","thu","fri","sat"];
const DAY_NAMES_RU = {
  mon: "понедельник",
  tue: "вторник",
  wed: "среда",
  thu: "четверг",
  fri: "пятница",
  sat: "суббота",
  sun: "воскресенье",
};

function parseHoursRange(h) {
  if (!h || typeof h !== "string") return null;
  const t = h.trim().toLowerCase();

  if (t === "круглосуточно" || t === "24/7" || t === "00:00–24:00") {
    return {start: 0, end: 24*60, is24: true};
  }

  const parts = t.split("–");
  if (parts.length !== 2) return null;

  function toMin(s) {
    const [hh, mm] = s.split(":").map(Number);
    if (isNaN(hh) || isNaN(mm)) return null;
    return hh * 60 + mm;
  }

  const start = toMin(parts[0]);
  const end = toMin(parts[1]);
  if (start == null || end == null) return null;

  return {start, end, is24:false};
}

function isOpenNow(h) {
  const r = parseHoursRange(h);
  if (!r) return null;
  if (r.is24) return true;

  const now = new Date();
  const cur = now.getHours()*60 + now.getMinutes();
  let {start, end} = r;

  let crosses = false;
  if (end <= start) {
    end += 24*60;
    crosses = true;
  }

  let curMin = cur;
  if (crosses && cur < start) curMin += 24*60;

  return curMin >= start && curMin <= end;
}

function getTodayWorkingInfo(w) {
  if (!w) return {dayName:"", hours:"нужно уточнить", isOpen:null};

  const d = new Date();
  const key = DAY_KEYS[d.getDay()];
  const dayName = DAY_NAMES_RU[key] ?? "";
  const hours = w[key] ?? "нужно уточнить";
  const open = isOpenNow(hours);

  return {dayName, hours, isOpen: open};
}

/* ==========
   ПОИСК
   ========== */

function normalizeSearchString(v) {
  return String(v ?? "").trim().toLowerCase();
}

function isMatch(value, query) {
  const q = normalizeSearchString(query);
  const v = normalizeSearchString(value);
  return v.includes(q);
}

/* ==========
   НАВИГАЦИЯ
   ========== */

function navigateTo(screen, params = {}, opts = {}) {
  const {replace = false} = opts;

  if (!replace && currentScreen) {
    screenStack.push({screen: currentScreen, params: currentParams});
  }

  currentScreen = screen;
  currentParams = params;

  if (screen === "welcome") renderWelcomeScreen();
  else if (screen === "cities") renderCitiesScreen();
  else if (screen === "hookahs") renderHookahsScreen(params.cityId);
  else if (screen === "hookahDetails") renderHookahDetailsScreen(params.cityId, params.hookahId);
  else renderWelcomeScreen();
}

function navigateBack() {
  if (!screenStack.length) return;

  const prev = screenStack.pop();
  currentScreen = prev.screen;
  currentParams = prev.params;

  if (currentScreen === "welcome") renderWelcomeScreen();
  else if (currentScreen === "cities") renderCitiesScreen();
  else if (currentScreen === "hookahs") renderHookahsScreen(currentParams.cityId);
  else if (currentScreen === "hookahDetails") renderHookahDetailsScreen(currentParams.cityId, currentParams.hookahId);
}

function setFooterState({showBackToCities, showBackToHookahs, showHome, showSuggestions}) {
  backToCitiesBtn.classList.toggle("hidden", !showBackToCities);
  backToHookahsBtn.classList.toggle("hidden", !showBackToHookahs);
  goHomeBtn.classList.toggle("hidden", !showHome);
  suggestionsBtn.classList.toggle("hidden", !showSuggestions);
}

/* ==========
   СВАЙП-НАЗАД
   ========== */

function setupSwipeNavigation() {
  let startX = null;
  let startY = null;
  let startT = 0;

  appContainer.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    startT = Date.now();
  });

  appContainer.addEventListener("touchend", (e) => {
    if (startX == null) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    const dt = Date.now() - startT;

    const edge = 40;
    const minD = 50;
    const maxDy = 80;
    const maxTime = 600;

    if (startX < edge && dx > minD && Math.abs(dy) < maxDy && dt < maxTime) {
      navigateBack();
    }

    startX = null;
  });
}

/* ==========
   ЭКРАНЫ
   ========== */

function renderWelcomeScreen() {
  setFooterState({
    showBackToCities: false,
    showBackToHookahs: false,
    showHome: false,
    showSuggestions: true,
  });

  appContainer.innerHTML = `
    <section class="screen welcome-screen fade-in">
      <div class="welcome-image-wrapper">
        <img src="assets/welcome_image.PNG" class="welcome-image" />
      </div>
      <h1 class="welcome-title">Dым to Dым</h1>
      <p class="welcome-subtitle">Выбери город — дальше я помогу</p>

      <button id="goToCitiesBtn" class="primary-btn">Перейти к выбору города</button>

      <div class="neshop-block">
        <p class="neshop-text">За продукцией, табаком и кальянами ↓</p>
        <a href="https://t.me/Ne_ShopBot?startapp" target="_blank" class="primary-btn">
          НЕШОП
        </a>
      </div>
    </section>
  `;

  document.getElementById("goToCitiesBtn").onclick = () => {
    navigateTo("cities");
  };
}

function renderCitiesScreen() {
  setFooterState({
    showBackToCities: false,
    showBackToHookahs: false,
    showHome: true,
    showSuggestions: false,
  });

  const cities = getCities();

  appContainer.innerHTML = `
    <section class="screen fade-in">
      <h2 class="screen-title">ВЫБОР ГОРОДА</h2>

      <div class="search-bar">
        <label class="search-label">Поиск по городам и заведениям</label>
        <input id="citiesSearch" class="search-input" placeholder="Начни вводить..." />
      </div>

      <div id="citiesList" class="cards-list"></div>
    </section>
  `;

  const list = document.getElementById("citiesList");
  const input = document.getElementById("citiesSearch");

  function drawCities(arr) {
    list.innerHTML = arr
      .map(
        (c) => `
        <article class="card city-card" data-id="${c.id}">
          <div class="city-card-image-wrapper">
            <img src="assets/${c.image}" class="city-card-image" />
          </div>
          <h3 class="city-card-title">${c.name}</h3>
        </article>
      `
      )
      .join("");

    list.querySelectorAll(".city-card").forEach((el) => {
      el.onclick = () => {
        navigateTo("hookahs", {cityId: el.dataset.id});
      };
    });
  }

  function drawHookahs(arr) {
    list.innerHTML = arr
      .map(
        ({city, hookah}) => `
      <article class="card hookah-card" data-city="${city.id}" data-id="${hookah.id}">
        <div class="hookah-card-main">
          <div class="hookah-card-info">
            <h3 class="hookah-card-title">${hookah.name}</h3>
            <p class="hookah-card-rating">Рейтинг: <span>${hookah.rating ?? "—"}</span></p>
            <p class="hookah-card-city">Город: ${city.name}</p>
            <p class="hookah-card-address">${hookah.address ?? ""}</p>
          </div>
          <div class="hookah-card-image-wrapper">
            <img src="assets/${hookah.image}" class="hookah-card-image" />
          </div>
        </div>
      </article>
    `
      )
      .join("");

    list.querySelectorAll(".hookah-card").forEach((el) => {
      const city = el.dataset.city;
      const hid = el.dataset.id;
      el.onclick = () => navigateTo("hookahDetails", {cityId: city, hookahId: hid});
    });
  }

  function search() {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      drawCities(cities);
      return;
    }

    let cityMatches = [];
    let hookahMatches = [];

    cities.forEach((c) => {
      if (isMatch(c.name, q) || isMatch(c.id, q)) cityMatches.push(c);

      c.hookahs.forEach((h) => {
        if (isMatch(h.name, q) || isMatch(h.id, q)) {
          hookahMatches.push({city: c, hookah: h});
        }
      });
    });

    if (hookahMatches.length) drawHookahs(hookahMatches);
    else if (cityMatches.length) drawCities(cityMatches);
    else list.innerHTML = `<p class="empty-message">Ничего не найдено</p>`;
  }

  input.oninput = search;

  drawCities(cities);
}

function renderHookahsScreen(cityId) {
  setFooterState({
    showBackToCities: true,
    showBackToHookahs: false,
    showHome: true,
    showSuggestions: false,
  });

  const city = getCityById(cityId);
  const hookahs = getHookahsByCityId(cityId);

  appContainer.innerHTML = `
    <section class="screen fade-in">
      <h2 class="screen-title">ВЫБОР КАЛЬЯННОЙ</h2>
      <p class="screen-subtitle">${city.name}</p>

      <div class="search-bar">
        <label class="search-label">Поиск по заведениям города</label>
        <input id="hookahsSearch" class="search-input" placeholder="Начни вводить..." />
      </div>

      <div id="hookahsList" class="cards-list"></div>
    </section>
  `;

  const list = document.getElementById("hookahsList");
  const input = document.getElementById("hookahsSearch");

  function draw(arr) {
    list.innerHTML = arr
      .map(
        (h) => `
      <article class="card hookah-card" data-id="${h.id}">
        <div class="hookah-card-main">
          <div class="hookah-card-info">
            <h3 class="hookah-card-title">${h.name}</h3>
            <p class="hookah-card-rating">Рейтинг: <span>${h.rating ?? "—"}</span></p>
            <p class="hookah-card-address">${h.address ?? ""}</p>
          </div>
          <div class="hookah-card-image-wrapper">
            <img src="assets/${h.image}" class="hookah-card-image"/>
          </div>
        </div>
      </article>
    `
      )
      .join("");

    list.querySelectorAll(".hookah-card").forEach((el) => {
      el.onclick = () => {
        navigateTo("hookahDetails", {cityId, hookahId: el.dataset.id});
      };
    });
  }

  function search() {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      draw(hookahs);
      return;
    }

    const filtered = hookahs.filter((h) => isMatch(h.name, q) || isMatch(h.id, q));

    if (filtered.length) draw(filtered);
    else list.innerHTML = `<p class="empty-message">Ничего не найдено</p>`;
  }

  input.oninput = search;

  draw(hookahs);
}

function renderHookahDetailsScreen(cityId, hookahId) {
  setFooterState({
    showBackToCities: false,
    showBackToHookahs: true,
    showHome: true,
    showSuggestions: false,
  });

  const city = getCityById(cityId);
  const h = getHookahById(cityId, hookahId);

  const gallery = h.gallery ?? [];
  const phones = normalizePhones(h);
  const w = normalizeWorkingHours(h);
  const today = getTodayWorkingInfo(w);

  const galleryHtml = gallery
    .map(
      (g) => `
    <div class="gallery-slide">
      <img src="assets/${g}" class="gallery-image" />
    </div>`
    )
    .join("");

  const phonesHtml =
    phones.length > 0
      ? `<ul class="hookah-phones">
      ${phones.map((p) => `<li><a href="tel:${p.replace(/\s+/g,"")}">${p}</a></li>`).join("")}
    </ul>`
      : `<p class="hookah-phones-empty">Телефоны: нужно уточнить</p>`;

  let hoursHtml = "";
  if (w) {
    hoursHtml = `
      <table class="working-hours-table">
        ${["mon","tue","wed","thu","fri","sat","sun"]
          .map(
            (d) => `
          <tr>
            <td class="wh-day">${DAY_NAMES_RU[d]}</td>
            <td class="wh-hours">${w[d] ?? "нужно уточнить"}</td>
          </tr>`
          )
          .join("")}
      </table>
    `;
  }

  let statusText = "";
  let statusClass = "";
  if (today.hours === "нужно уточнить") {
    statusText = "Сегодня график работы нужно уточнить";
    statusClass = "status-unknown";
  } else if (today.isOpen === true) {
    statusText = `Сейчас открыто — работает сегодня: ${today.hours}`;
    statusClass = "status-open";
  } else if (today.isOpen === false) {
    statusText = `Сейчас закрыто — работает сегодня: ${today.hours}`;
    statusClass = "status-closed";
  } else {
    statusText = `Сегодня ${today.dayName}, работает ${today.hours}`;
    statusClass = "status-unknown";
  }

  const yandexBtn =
    h.yandex_map?.url
      ? `<a href="${h.yandex_map.url}" target="_blank" class="primary-btn">Открыть на Яндекс.Картах</a>`
      : "";

  const tags = `
    <div class="hookah-tags">
      <span class="hookah-tag">Еда: ${h.food ?? "нужно уточнить"}</span>
      <span class="hookah-tag">Алкоголь: ${h.alcohol ?? "нужно уточнить"}</span>
      <span class="hookah-tag">Напитки: ${h.drinks ?? "нужно уточнить"}</span>
    </div>
  `;

  const notes =
    h.notes
      ? `<div class="hookah-notes"><h3>Комментарий</h3><p>${h.notes}</p></div>`
      : "";

  const video =
    h.video_review
      ? `<div class="hookah-video"><h3>Видеообзор</h3><p>${h.video_review}</p></div>`
      : "";

  appContainer.innerHTML = `
    <section class="screen hookah-details-screen fade-in">
      <h2 class="hookah-name">${h.name}</h2>
      <p class="hookah-city">${city.name}</p>

      <div class="gallery-container">${galleryHtml}</div>

      <div class="hookah-main-info">
        <p class="hookah-rating">Рейтинг: <span>${h.rating ?? "—"}</span></p>
        <p class="hookah-address">${h.address ?? ""}</p>

        ${phonesHtml}
        ${tags}
      </div>

      <div class="hookah-working-block">
        <h3>Часы работы</h3>
        ${hoursHtml}
        <div class="hookah-today-status ${statusClass}">
          ${statusText}
        </div>
      </div>

      ${notes}
      ${video}

      <div class="hookah-actions">${yandexBtn}</div>
    </section>
  `;
}

/* ==========
   КНОПКИ НИЗУ
   ========== */

goHomeBtn.onclick = () => {
  screenStack = [];
  navigateTo("welcome", {}, {replace:true});
};

backToCitiesBtn.onclick = () => navigateBack();
backToHookahsBtn.onclick = () => navigateBack();

/* ==========
   СТАРТ
   ========== */

document.addEventListener("DOMContentLoaded", () => {
  navigateTo("welcome", {}, {replace:true});
  setupSwipeNavigation();
});
