// cities_and_hookahs/yaroslavl.js
// Город Ярославль и его кальянные

window.registerCity({
  id: "yaroslavl",
  name: "Ярославль",

  // Картинки города в структуре нет, поэтому image не указываем,
  // чтобы не было битой ссылки.

  hookahs: [
    // 1. Антресоль
    {
      id: "antresol",
      name: "Антресоль",
      rating: "5.0",
      address: "Ярославль, улица Свободы, 12Б",
      phones: [
        "+7 (4852) 99-09-90"
      ],
      food: "есть",
      alcohol: "есть",
      drinks: "есть",
      working_hours: {
        mon: "12:00–01:00",
        tue: "12:00–01:00",
        wed: "12:00–01:00",
        thu: "12:00–01:00",
        fri: "12:00–03:00",
        sat: "12:00–03:00",
        sun: "12:00–01:00"
      },
      notes: "",
      video_review: "",
      // главная картинка (без 'assets/')
      image: "cities/yaroslavl/antresol/antresol_1.JPG",
      // галерея для свайпа
      gallery: [
        "cities/yaroslavl/antresol/antresol_1.JPG",
        "cities/yaroslavl/antresol/antresol_2.JPG",
        "cities/yaroslavl/antresol/antresol_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/antresol/245593190546?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 2. Gravity Lounge
    {
      id: "gravity",
      name: "Gravity Lounge",
      rating: "5.0",
      address: "Ярославль, улица Пушкина, 5, корп. 2, • заезд с ул. Республиканская, этаж 1",
      phones: [
        "+7 (967) 980-00-76"
      ],
      food: "есть",
      alcohol: "нет",
      drinks: "есть",
      working_hours: {
        mon: "12:00–01:00",
        tue: "12:00–01:00",
        wed: "12:00–01:00",
        thu: "12:00–01:00",
        fri: "12:00–03:00",
        sat: "13:00–03:00",
        sun: "13:00–01:00"
      },
      notes: "",
      video_review: "",
      image: "cities/yaroslavl/gravity/gravity_1.JPG",
      gallery: [
        "cities/yaroslavl/gravity/gravity_1.JPG",
        "cities/yaroslavl/gravity/gravity_2.JPG",
        "cities/yaroslavl/gravity/gravity_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/gravity_lounge/176872588910?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 3. 999
    {
      id: "999",
      name: "999",
      rating: "5.0",
      address: "Ярославль, Депутатский переулок, 3, • этаж цокольный",
      phones: [
        "+7 (910) 973-79-99"
      ],
      food: "есть",
      alcohol: "есть",
      drinks: "есть",
      working_hours: {
        mon: "12:00–01:00",
        tue: "12:00–01:00",
        wed: "12:00–01:00",
        thu: "12:00–01:00",
        fri: "12:00–03:00",
        sat: "12:00–03:00",
        sun: "12:00–01:00"
      },
      notes: "",
      video_review: "",
      image: "cities/yaroslavl/999/999_1.JPG",
      gallery: [
        "cities/yaroslavl/999/999_1.JPG",
        "cities/yaroslavl/999/999_2.JPG",
        "cities/yaroslavl/999/999_3.JPG",
        "cities/yaroslavl/999/999_4.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/kalyan_bar_999/152485529410?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 4. Canada Bar
    {
      id: "kanada",
      name: "Canada Bar",
      rating: "5.0",
      address: "Ярославский район, Туношенское сельское поселение, село Туношна, Костромская улица, 3А",
      phones: [
        "+7 (4852) 60-90-02 (доб.2)"
      ],
      food: "есть",
      alcohol: "есть",
      drinks: "есть",
      working_hours: {
        mon: "15:00–22:00",
        tue: "15:00–22:00",
        wed: "15:00–22:00",
        thu: "15:00–22:00",
        fri: "15:00–22:00",
        sat: "12:00–23:00",
        sun: "12:00–23:00"
      },
      notes: "",
      video_review: "",
      image: "cities/yaroslavl/kanada/kanada_1.JPG",
      gallery: [
        "cities/yaroslavl/kanada/kanada_1.JPG",
        "cities/yaroslavl/kanada/kanada_2.JPG",
        "cities/yaroslavl/kanada/kanada_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/canada_bar/51761469104?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    }
  ]
});
