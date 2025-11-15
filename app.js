// app.js

const appRoot = document.getElementById("app");
const backToWelcomeBtn = document.getElementById("backToWelcomeBtn");
const backToCitiesBtn = document.getElementById("backToCitiesBtn");
const backToHookahsBtn = document.getElementById("backToHookahsBtn");

let currentCityId = null;
let citySearchTerm = "";

// ЗАМЕНИ на свой реальный username
const SUGGESTIONS_URL = "https://t.me/ВАШ_ЮЗЕРНЕЙМ";

// ---------- Главный экран ----------

function renderWelcome() {
  currentCityId = null;
  citySearchTerm = "";

  backToWelcomeBtn.classList.add("hidden");
  backToCitiesBtn.classList.add("hidden");
  backToHookahsBtn.classList.add("hidden");

  const html = `
    <section class="welcome-screen">
      <img
        src="assets/welcome_image.PNG"
        alt="Dым to Dым"
        class="welcome-image"
      />
      <p class="welcome-text">
        Выбирай город, смотри кальянные с фотками, рейтингами и ссылками на Яндекс.Карты.
      </p>

      <div class="welcome-buttons">
        <button class="btn btn-primary" onclick="openCities()">
          Выбрать город
        </button>

        <button class="btn btn-secondary" onclick="openSuggestions()">
          Предложения
        </button>
      </div>
    </section>
  `;

  appRoot.innerHTML = html;
}

// ---------- Список городов + поиск ----------

function renderCities() {
  currentCityId = null;

  backToWelcomeBtn.classList.remove("hidden");
  backToCitiesBtn.classList.add("hidden");
  backToHookahsBtn.classList.add("hidden");

  const html = `
    <section>
      <h2 class="section-title">ВЫБОР ГОРОДА</h2>

      <div class="search-bar">
        <input
          id="citySearchInput"
          class="search-input"
          type="text"
          placeholder="Поиск города"
        />
      </div>

      <div id="cityList" class="card-list"></div>
    </section>
  `;

  appRoot.innerHTML = html;

  const searchInput = document.getElementById("citySearchInput");
  const listEl = document.getElementById("cityList");

  function renderCityList() {
    const term = (searchInput.value || "").toLowerCase();
    const cities = appData.cities.filter((city) => {
      if (!term) return true;
      return (
        city.name.toLowerCase().includes(term) ||
        city.id.toLowerCase().includes(term)
      );
    });

    const citiesHtml = cities
      .map(
        (city) => `
        <div class="card" onclick="openCity('${city.id}')">
          <div class="card-content-left-right">
            <div>
              <div class="card-title">${city.name}</div>
              <div class="card-meta">Заведений: ${city.hookahs.length}</div>
            </div>
            <img
              src="${city.image}"
              alt="${city.name}"
              class="card-image"
            />
          </div>
        </div>
      `
      )
      .join("");

    listEl.innerHTML =
      citiesHtml || "<div class='card-meta'>Ничего не найдено</div>";
  }

  // восстановление предыдущего поиска
  searchInput.value = citySearchTerm;

  searchInput.addEventListener("input", (e) => {
    citySearchTerm = e.target.value;
    renderCityList();
  });

  renderCityList();
}

// ---------- Список кальянных в городе ----------

function renderHookahs(cityId) {
  currentCityId = cityId;

  const city = appData.cities.find((c) => c.id === cityId);
  if (!city) return;

  backToWelcomeBtn.classList.add("hidden");
  backToCitiesBtn.classList.remove("hidden");
  backToHookahsBtn.classList.add("hidden");

  const hookahsHtml = city.hookahs
    .map(
      (h) => `
      <div class="card" onclick="openHookah('${city.id}', '${h.id}')">
        <div class="card-content-left-right">
          <div>
            <div class="card-title">${h.name}</div>
            <div class="card-meta">
              Рейтинг: <span class="rating">${h.rating.toFixed(1)}</span>
            </div>
            <div class="card-meta">${h.address}</div>
          </div>
          <img
            src="${h.image}"
            alt="${h.name}"
            class="card-image"
          />
        </div>
      </div>
    `
    )
    .join("");

  const html = `
    <section>
      <h2 class="section-title">ВЫБОР КАЛЬЯННОЙ</h2>
      <div class="card-list">
        ${hookahsHtml || "<div class='card-meta'>Пока нет заведений</div>"}
      </div>
    </section>
  `;

  appRoot.innerHTML = html;
}

// ---------- Детальная карточка кальянной ----------

function renderHookahDetail(cityId, hookahId) {
  const city = appData.cities.find((c) => c.id === cityId);
  if (!city) return;

  const hookah = city.hookahs.find((h) => h.id === hookahId);
  if (!hookah) return;

  backToWelcomeBtn.classList.add("hidden");
  backToCitiesBtn.classList.remove("hidden");
  backToHookahsBtn.classList.remove("hidden");

  const hoursHtml = hookah.workHours
    .map((line) => `<li>${line}</li>`)
    .join("");

  const html = `
    <section>
      <!-- Заголовок наверху между кнопками Telegram -->
      <h2 class="section-title">${hookah.name}</h2>

      <img
        src="${hookah.image}"
        alt="${hookah.name}"
        class="detail-image"
      />
      <h3 class="detail-title">${hookah.name}</h3>
      <div class="detail-rating">
        Рейтинг: <span class="rating">${hookah.rating.toFixed(1)}</span>
      </div>

      <div class="detail-address">
        <strong>Адрес:</strong> ${hookah.address}
      </div>

      <div class="detail-hours-title"><strong>Часы работы:</strong></div>
      <ul class="detail-hours-list">
        ${hoursHtml}
      </ul>

      ${
        hookah.notes
          ? `<div class="detail-notes"><strong>Заметки:</strong> ${hookah.notes}</div>`
          : ""
      }

      <div class="actions">
        <button class="btn btn-primary" onclick="openYandex('${hookah.yandexUrl}')">
          Открыть в Яндекс.Картах
        </button>
      </div>
    </section>
  `;

  appRoot.innerHTML = html;
}

// ---------- Глобальные функции для onClick ----------

window.openCities = function () {
  renderCities();
};

window.openCity = function (cityId) {
  renderHookahs(cityId);
};

window.openHookah = function (cityId, hookahId) {
  renderHookahDetail(cityId, hookahId);
};

window.openYandex = function (url) {
  window.open(url, "_blank");
};

window.openSuggestions = function () {
  window.open(SUGGESTIONS_URL, "_blank");
};

// ---------- Кнопки "Назад" ----------

backToWelcomeBtn.addEventListener("click", () => {
  renderWelcome();
});

backToCitiesBtn.addEventListener("click", () => {
  if (currentCityId) {
    renderCities();
  } else {
    renderWelcome();
  }
});

backToHookahsBtn.addEventListener("click", () => {
  if (currentCityId) {
    renderHookahs(currentCityId);
  } else {
    renderCities();
  }
});

// ---------- Старт приложения ----------

document.addEventListener("DOMContentLoaded", () => {
  if (window.Telegram && window.Telegram.WebApp) {
    try {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    } catch (e) {
      console.log("Telegram WebApp API недоступен:", e);
    }
  }

  renderWelcome();
});
