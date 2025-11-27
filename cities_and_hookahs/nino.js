// cities_and_hookahs/nino.js
// Описание города Нижний Новгород и всех его кальянных

window.registerCity({
  // Уникальный id города
  id: "nino",

  // Название города для отображения
  name: "Нижний Новгород",

  // Картинка города (app.js сам добавляет "assets/")
  image: "cities/nino/nino.png",

  // Список кальянных
  hookahs: [
    {
      // 1) PL Lounge Набережная
      id: "pl_lounge_naberezhnaya",
      name: "Pl lounge (Набережная)",
      rating: "5.0", // строкой, чтобы отображалось "5.0"
      address: "Нижний Новгород, Торговая улица, 14",

      phones: ["+7 (952) 451-80-60"],

      food: "есть",
      alcohol: "нет, есть пробковый сбор",
      drinks: "есть",

      working_hours: {
        mon: "12:00–02:00",
        tue: "12:00–02:00",
        wed: "12:00–02:00",
        thu: "12:00–02:00",
        fri: "12:00–02:00",
        sat: "12:00–02:00",
        sun: "12:00–02:00"
      },

      notes: "",
      video_review: "",

      // ВАЖНО: без "assets/", app.js сам добавит "assets/"
      image: "cities/nino/pl_lounge_naberezhnaya/pl_lounge_naberezhnaya_1.JPG",

      // Галерея: тоже без "assets/"
      gallery: [
        "cities/nino/pl_lounge_naberezhnaya/pl_lounge_naberezhnaya_1.JPG",
        "cities/nino/pl_lounge_naberezhnaya/pl_lounge_naberezhnaya_2.JPG",
        "cities/nino/pl_lounge_naberezhnaya/pl_lounge_naberezhnaya_3.JPG"
      ],

      yandex_map: {
        url: "https://yandex.ru/maps/org/pl_lounge/210758879766?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    {
      // 2) PL Lounge Ленина
      id: "pl_lounge_lenina",
      name: "Pl lounge (проспект Ленина)",
      rating: "5.0",
      address: "Нижний Новгород, проспект Ленина, 19",

      phones: ["+7 (969) 603-12-02"],

      food: "есть",
      alcohol: "нет, есть пробковый сбор",
      drinks: "есть",

      working_hours: {
        mon: "12:00–02:00",
        tue: "12:00–02:00",
        wed: "12:00–02:00",
        thu: "12:00–02:00",
        fri: "12:00–02:00",
        sat: "12:00–02:00",
        sun: "12:00–02:00"
      },

      notes: "",
      video_review: "",

      image: "cities/nino/pl_lounge_lenina/pl_lounge_lenina_1.JPG",
      gallery: [
        "cities/nino/pl_lounge_lenina/pl_lounge_lenina_1.JPG",
        "cities/nino/pl_lounge_lenina/pl_lounge_lenina_2.JPG",
        "cities/nino/pl_lounge_lenina/pl_lounge_lenina_3.JPG"
      ],

      yandex_map: {
        url: "https://yandex.ru/maps/org/pl_lounge/218543867266?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    {
      // 3) Teplo Lounge
      id: "teplo",
      name: "Teplo Lounge",
      rating: "5.0",
      address: "Нижний Новгород, улица Пискунова, 11, • этаж цокольный",

      phones: ["+7 (930) 819-21-01"],

      food: "есть",
      alcohol: "нет",
      drinks: "есть",

      working_hours: {
        mon: "13:00–01:00",
        tue: "13:00–01:00",
        wed: "13:00–01:00",
        thu: "13:00–01:00",
        fri: "13:00–03:00",
        sat: "14:00–03:00",
        sun: "14:00–01:00"
      },

      notes: "",
      video_review: "",

      image: "cities/nino/teplo/teplo_1.JPG",
      gallery: [
        "cities/nino/teplo/teplo_1.JPG",
        "cities/nino/teplo/teplo_2.JPG",
        "cities/nino/teplo/teplo_3.JPG"
      ],

      yandex_map: {
        url: "https://yandex.ru/maps/org/teplo_lounge/56439163458?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    }
  ]
});
