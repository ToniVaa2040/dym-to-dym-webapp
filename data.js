// data.js
// Общий реестр данных для приложения

// Глобальный объект с данными приложения
window.appData = window.appData || {
  cities: []
};

// Функция для регистрации города из отдельных файлов
window.registerCity = function registerCity(cityConfig) {
  if (!cityConfig || !cityConfig.id) {
    console.error("registerCity: не передан id города", cityConfig);
    return;
  }

  // Проверяем, не добавлен ли уже город с таким id
  const exists = window.appData.cities.some(
    (city) => city.id === cityConfig.id
  );

  if (exists) {
    console.warn("registerCity: город с таким id уже существует:", cityConfig.id);
    return;
  }

  window.appData.cities.push(cityConfig);
};
