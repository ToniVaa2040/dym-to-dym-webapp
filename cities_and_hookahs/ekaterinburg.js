// cities_and_hookahs/ekaterinburg.js
// Город Екатеринбург и все его кальянные

window.registerCity({
  id: "ekaterinburg",
  name: "Екатеринбург",
  image: "cities/ekaterinburg/ekat.png",

  hookahs: [
    // 1. Полки Lounge
    {
      id: "polki",
      name: "Полки Lounge",
      rating: "4.9",
      address: "Свердловская область, Екатеринбург, улица 8 Марта, 31, • этаж 2",
      phones: [
        "+7 (933) 019-24-15"
      ],
      food: "есть",
      alcohol: "нет, пробковый сбор",
      drinks: "есть",
      working_hours: {
        mon: "13:00–01:00",
        tue: "13:00–01:00",
        wed: "13:00–01:00",
        thu: "13:00–01:00",
        fri: "13:00–02:00",
        sat: "13:00–02:00",
        sun: "13:00–01:00"
      },
      notes: "",
      video_review: "",
      image: "cities/ekaterinburg/polki/polki_1.JPG",
      gallery: [
        "cities/ekaterinburg/polki/polki_1.JPG",
        "cities/ekaterinburg/polki/polki_2.JPG",
        "cities/ekaterinburg/polki/polki_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/polki_lounge/212343517257?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 2. Библиотека Лаунж
    {
      id: "biblioteka",
      name: "Библиотека Лаунж",
      rating: "4.9",
      address: "Свердловская область, Екатеринбург, улица Радищева, 24",
      phones: [
        "+7 (919) 360-99-93"
      ],
      food: "есть",
      alcohol: "нет",
      drinks: "есть",
      working_hours: {
        mon: "12:00–02:00",
        tue: "12:00–02:00",
        wed: "12:00–02:00",
        thu: "12:00–02:00",
        fri: "12:00–03:00",
        sat: "12:00–03:00",
        sun: "12:00–02:00"
      },
      notes: "",
      video_review: "",
      image: "cities/ekaterinburg/biblioteka/biblioteka_1.JPG",
      gallery: [
        "cities/ekaterinburg/biblioteka/biblioteka_1.JPG",
        "cities/ekaterinburg/biblioteka/biblioteka_2.JPG",
        "cities/ekaterinburg/biblioteka/biblioteka_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/biblioteka_launzh/201166927734?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 3. Resource Game Zone & Lounge Bar
    {
      id: "resource",
      name: "Resource Game Zone & Lounge Bar",
      rating: "4.7",
      address: "Свердловская область, Екатеринбург, улица Цвиллинга, 7А/3",
      phones: [
        "+7 (922) 030-88-00"
      ],
      food: "есть",
      alcohol: "нужно уточнить",
      drinks: "есть",
      working_hours: {
        mon: "00:00–24:00",
        tue: "00:00–24:00",
        wed: "00:00–24:00",
        thu: "00:00–24:00",
        fri: "00:00–24:00",
        sat: "00:00–24:00",
        sun: "00:00–24:00"
      },
      notes: "",
      video_review: "",
      image: "cities/ekaterinburg/resource/resource_1.JPG",
      gallery: [
        "cities/ekaterinburg/resource/resource_1.JPG",
        "cities/ekaterinburg/resource/resource_2.JPG",
        "cities/ekaterinburg/resource/resource_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/resource_game_zone_lounge_bar/36378503086?si=nztb0ey4n4rnpfvg1ey9pcft2g"
      }
    }
  ]
});
