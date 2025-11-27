// cities_and_hookahs/dzerzhinsk.js
// Город Дзержинск и все его кальянные

window.registerCity({
  id: "dzerzhinsk",
  name: "Дзержинск",

  // Картинки города у тебя нет — не указываю image,
  // чтобы не было битой ссылки. Карточка города будет просто без фото.

  hookahs: [
    // 1. Sova
    {
      id: "sova",
      name: "Sova",
      rating: "4.9",
      address: "Нижегородская область, Дзержинск, Октябрьская улица, 15",
      phones: [
        "+7 (967) 980-00-76"
      ],
      food: "есть",
      alcohol: "нет",
      drinks: "есть",
      working_hours: {
        mon: "12:00–02:00",
        tue: "12:00–02:00",
        wed: "12:00–02:00",
        thu: "12:00–02:00",
        fri: "12:00–02:00",
        sat: "13:00–02:00",
        sun: "13:00–02:00"
      },
      notes: "",
      video_review: "",
      // Главная картинка для списка
      image: "cities/dzerzhinsk/sova/sova_1.jpg",
      // Галерея (свайп)
      gallery: [
        "cities/dzerzhinsk/sova/sova_1.jpg",
        "cities/dzerzhinsk/sova/sova_2.JPG",
        "cities/dzerzhinsk/sova/sova_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/sova/7231999168?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 2. Воздух Fresh Bar
    {
      id: "vozdukh",
      name: "Воздух Fresh Bar",
      rating: "4.9",
      address: "Нижегородская область, Дзержинск, улица Гайдара, 59В",
      phones: [
        "+7 (987) 758-75-49"
      ],
      food: "есть",
      alcohol: "есть",
      drinks: "есть",
      working_hours: {
        mon: "12:00–01:00",
        tue: "12:00–01:00",
        wed: "12:00–01:00",
        thu: "12:00–01:00",
        fri: "12:00–02:00",
        sat: "12:00–02:00",
        sun: "12:00–01:00"
      },
      notes: "",
      video_review: "",
      image: "cities/dzerzhinsk/vozdukh/vozdukh_1.JPG",
      gallery: [
        "cities/dzerzhinsk/vozdukh/vozdukh_1.JPG",
        "cities/dzerzhinsk/vozdukh/vozdukh__2.JPG",
        "cities/dzerzhinsk/vozdukh/vozdukh_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/vozdukh_fresh_bar/98429406768?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    }
  ]
});
