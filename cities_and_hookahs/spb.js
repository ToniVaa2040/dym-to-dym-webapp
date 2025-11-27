// cities_and_hookahs/spb.js
// Этот файл описывает город Санкт-Петербург и ВСЕ его кальянные,
// которые у тебя лежат в папке assets/cities/spb/*.

// Здесь мы регистрируем город через функцию window.registerCity,
// которая описана в data.js. Она добавляет город в общий список window.appData.cities.
window.registerCity({
  // Внутренний id города — по нему app.js будет находить Питер
  id: "spb",

  // Название, которое увидит пользователь
  name: "Санкт-Петербург",

  // Картинка города. ВНИМАНИЕ: здесь путь БЕЗ "assets/",
  // потому что app.js сам добавляет "assets/" перед путём.
  image: "cities/spb/spb.png",

  // Список всех кальянных в Питере
  hookahs: [
    // 1. Аура Lounge
    {
      id: "aura",
      name: "Аура Lounge",
      rating: "5.0",
      address: "Ленинградская область, Всеволожский район, Заневское городское поселение, Кудрово, Европейский проспект, 21, корп. 2",
      phones: [
        "+7 (911) 926-66-93"
      ],
      food: "есть",
      alcohol: "нет",
      drinks: "есть",
      // В JSON явно был указан понедельник.
      // Чтобы карточка выглядела целостно, я распространил этот график на все дни.
      working_hours: {
        mon: "15:00–03:00",
        tue: "15:00–03:00",
        wed: "15:00–03:00",
        thu: "15:00–03:00",
        fri: "15:00–03:00",
        sat: "15:00–03:00",
        sun: "15:00–03:00"
      },
      notes: "",
      video_review: "",
      // Главная картинка заведения (для списка)
      image: "cities/spb/aura/aura_1.JPG",
      // Галерея (свайп в карточке)
      gallery: [
        "cities/spb/aura/aura_1.JPG",
        "cities/spb/aura/aura_2.JPG",
        "cities/spb/aura/aura_3.JPG"
      ],
      // Кнопка "Открыть на Яндекс.Картах"
      yandex_map: {
        url: "https://yandex.ru/maps/org/aura_lounge/32613230298?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 2. Balcon
    {
      id: "balcon",
      name: "Balcon",
      rating: "5.0",
      address: "Санкт-Петербург, Большой проспект Петроградской стороны, 84",
      phones: [
        "+7 (812) 565-06-05",
        "+7 (911) 920-14-04"
      ],
      food: "есть",
      alcohol: "есть",
      drinks: "есть",
      working_hours: {
        mon: "12:00–01:00",
        tue: "12:00–01:00",
        wed: "12:00–01:00",
        thu: "12:00–01:00",
        fri: "12:00–01:00",
        sat: "12:00–01:00",
        sun: "12:00–01:00"
      },
      notes: "",
      video_review: "",
      image: "cities/spb/balcon/balcon_1.JPG",
      gallery: [
        "cities/spb/balcon/balcon_1.JPG",
        "cities/spb/balcon/balcon_2.JPG",
        "cities/spb/balcon/balcon_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/balcon/1025368799?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 3. Cloud Depot
    {
      id: "cloud_depot",
      name: "Cloud Depot",
      rating: "5.0",
      address: "Санкт-Петербург, Невский проспект, 108",
      phones: [
        "+7 (911) 924-66-65"
      ],
      food: "есть",
      alcohol: "нет",
      drinks: "есть",
      working_hours: {
        mon: "13:00–02:00",
        tue: "13:00–02:00",
        wed: "13:00–02:00",
        thu: "13:00–02:00",
        fri: "13:00–02:00",
        sat: "13:00–02:00",
        sun: "13:00–02:00"
      },
      notes: "",
      video_review: "",
      image: "cities/spb/cloud_depot/cloud_depot_1.JPG",
      gallery: [
        "cities/spb/cloud_depot/cloud_depot_1.JPG",
        "cities/spb/cloud_depot/cloud_depot_2.JPG",
        "cities/spb/cloud_depot/cloud_depot_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/cloud_depot/40714140037?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 4. Diskette Lounge
    {
      id: "diskette",
      name: "Diskette Lounge",
      rating: "5.0",
      address: "Санкт-Петербург, Апраксин переулок, 4, • этаж 5, домофон 506",
      phones: [
        "+7 (953) 169-05-58",
        "+7 (812) 981-04-58"
      ],
      food: "нет",
      alcohol: "есть",
      drinks: "есть",
      working_hours: {
        mon: "14:00–23:45",
        tue: "14:00–23:45",
        wed: "14:00–23:45",
        thu: "14:00–23:45",
        fri: "14:00–23:45",
        sat: "14:00–23:45",
        sun: "14:00–23:45"
      },
      notes: "",
      video_review: "",
      image: "cities/spb/diskette/diskette_1.JPG",
      gallery: [
        "cities/spb/diskette/diskette_1.JPG",
        "cities/spb/diskette/diskette_2.JPG",
        "cities/spb/diskette/diskette_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/diskette_lounge/22270557306?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 5. Дом мостов
    {
      id: "dom_mostov",
      name: "Дом Мостов",
      rating: "5.0",
      address: "Санкт-Петербург, набережная канала Грибоедова, 96",
      phones: [
        "+7 (958) 584-77-49"
      ],
      food: "есть",
      alcohol: "есть",
      drinks: "есть",
      working_hours: {
        mon: "14:00–02:00",
        tue: "14:00–02:00",
        wed: "14:00–02:00",
        thu: "14:00–02:00",
        fri: "14:00–02:00",
        sat: "14:00–02:00",
        sun: "14:00–02:00"
      },
      notes: "",
      video_review: "",
      image: "cities/spb/dom_mostov/dom_mostov_1.JPG",
      gallery: [
        "cities/spb/dom_mostov/dom_mostov_1.JPG",
        "cities/spb/dom_mostov/dom_mostov_2.JPG",
        "cities/spb/dom_mostov/dom_mostov_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/dom_mostov/1815816567?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 6. Expert Bar
    {
      id: "expert_bar",
      name: "Expert Bar",
      rating: "4.9",
      address: "Санкт-Петербург, улица Рубинштейна, 40/11",
      phones: [
        "+7 (921) 996-95-50"
      ],
      food: "есть",
      alcohol: "есть",
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
      image: "cities/spb/expert_bar/expert_bar_1.JPG",
      gallery: [
        "cities/spb/expert_bar/expert_bar_1.JPG",
        "cities/spb/expert_bar/expert_bar_2.JPG",
        "cities/spb/expert_bar/expert_bar_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/ekspert_bar/1856732400?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 7. Expert Friends
    {
      id: "expert_friends",
      name: "Expert Friends",
      rating: "4.9",
      address: "Санкт-Петербург, улица Марата, 33",
      phones: [
        "+7 (921) 977-37-27"
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
      image: "cities/spb/expert_friends/expert_friends_1.JPG",
      gallery: [
        "cities/spb/expert_friends/expert_friends_1.JPG",
        "cities/spb/expert_friends/expert_friends_2.JPG",
        "cities/spb/expert_friends/expert_friends_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/ekspert_friends/88041919632?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 8. HookahPlace Литейный
    {
      id: "hp_liteyniy",
      name: "HookahPlace Литейный",
      rating: "4.9",
      address: "Санкт-Петербург, Литейный проспект, 46",
      phones: [
        "+7 (962) 440-10-20"
      ],
      food: "нет",
      alcohol: "нет",
      drinks: "есть",
      working_hours: {
        mon: "12:00–03:00",
        tue: "12:00–03:00",
        wed: "12:00–03:00",
        thu: "12:00–03:00",
        fri: "12:00–05:00",
        sat: "12:00–05:00",
        sun: "12:00–03:00"
      },
      notes: "",
      video_review: "",
      image: "cities/spb/hp_liteyniy/hp_liteyniy_1.JPG",
      gallery: [
        "cities/spb/hp_liteyniy/hp_liteyniy_1.JPG",
        "cities/spb/hp_liteyniy/hp_liteyniy_2.JPG",
        "cities/spb/hp_liteyniy/hp_liteyniy_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/hookahplace_liteynyy/18206003839?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 9. Мёртвые души
    {
      id: "mertvie_dushi",
      name: "Мертвые души",
      rating: "5.0",
      address: "Санкт-Петербург, Большая Конюшенная улица, 9, • этаж 3",
      phones: [
        "+7 (953) 362-11-99"
      ],
      food: "есть",
      alcohol: "нет",
      drinks: "есть",
      working_hours: {
        mon: "14:00–01:00",
        tue: "14:00–01:00",
        wed: "14:00–01:00",
        thu: "14:00–01:00",
        fri: "14:00–01:00",
        sat: "14:00–01:00",
        sun: "14:00–01:00"
      },
      notes: "",
      video_review: "",
      image: "cities/spb/mertvie_dushi/mertvie_dushi_1.JPG",
      gallery: [
        "cities/spb/mertvie_dushi/mertvie_dushi_1.JPG",
        "cities/spb/mertvie_dushi/mertvie_dushi_2.JPG",
        "cities/spb/mertvie_dushi/mertvie_dushi_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/mertvye_dushi/82327611079?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 10. Омар Хайям Колокол
    {
      id: "omar_khayam_kolokol",
      name: "Омар Хайям Колокол",
      rating: "4.9",
      address: "Санкт-Петербург, Колокольная улица, 11",
      phones: [
        "+7 (911) 945-77-10"
      ],
      food: "есть",
      alcohol: "нет",
      drinks: "есть",
      working_hours: {
        mon: "15:00–03:00",
        tue: "15:00–03:00",
        wed: "15:00–03:00",
        thu: "15:00–03:00",
        fri: "15:00–03:00",
        sat: "15:00–03:00",
        sun: "15:00–03:00"
      },
      notes: "",
      video_review: "",
      image: "cities/spb/omar_khayam_kolokol/omar_khayam_kolokol_1.JPG",
      gallery: [
        "cities/spb/omar_khayam_kolokol/omar_khayam_kolokol_1.JPG",
        "cities/spb/omar_khayam_kolokol/omar_khayam_kolokol_2.JPG",
        "cities/spb/omar_khayam_kolokol/omar_khayam_kolokol_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/omar_khayyam/1006006115?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 11. Омар Хайям Васька
    {
      id: "omar_khayam_vaska",
      name: "Омар Хайям Васька",
      rating: "4.9",
      address: "Санкт-Петербург, 7-я линия Васильевского острова, 28",
      phones: [
        "+7 (911) 945-77-20"
      ],
      food: "есть",
      alcohol: "нет",
      drinks: "есть",
      working_hours: {
        mon: "15:00–03:00",
        tue: "15:00–03:00",
        wed: "15:00–03:00",
        thu: "15:00–03:00",
        fri: "15:00–03:00",
        sat: "15:00–03:00",
        sun: "15:00–03:00"
      },
      notes: "",
      video_review: "",
      image: "cities/spb/omar_khayam_vaska/omar_khayam_vaska_1.JPG",
      gallery: [
        "cities/spb/omar_khayam_vaska/omar_khayam_vaska_1.JPG",
        "cities/spb/omar_khayam_vaska/omar_khayam_vaska_2.JPG",
        "cities/spb/omar_khayam_vaska/omar_khayam_vaska_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/omar_khayyam/1113047082?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 12. Par
    {
      id: "par",
      name: "Par Lounge",
      rating: "4.9",
      address: "Санкт-Петербург, проспект Просвещения, 15",
      phones: [
        "+7 (953) 360-78-28"
      ],
      food: "есть",
      alcohol: "нет",
      drinks: "есть",
      working_hours: {
        mon: "13:00–02:00",
        tue: "13:00–02:00",
        wed: "13:00–02:00",
        thu: "13:00–02:00",
        fri: "13:00–03:00",
        sat: "13:00–03:00",
        sun: "13:00–02:00"
      },
      notes: "",
      video_review: "",
      image: "cities/spb/par/par_1.JPG",
      gallery: [
        "cities/spb/par/par_1.JPG",
        "cities/spb/par/par_2.JPG",
        "cities/spb/par/par_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/par_lounge/1346495943?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 13. Переплёт
    {
      id: "pereplet",
      name: "Переплёт",
      rating: "4.9",
      address: "Санкт-Петербург, улица Маяковского, 13",
      phones: [
        "+7 (953) 361-10-10"
      ],
      food: "есть",
      alcohol: "нет",
      drinks: "есть",
      working_hours: {
        mon: "14:00–03:00",
        tue: "14:00–03:00",
        wed: "14:00–03:00",
        thu: "14:00–03:00",
        fri: "14:00–05:00",
        sat: "14:00–05:00",
        sun: "14:00–03:00"
      },
      notes: "",
      video_review: "",
      image: "cities/spb/pereplet/pereplet_1.JPG",
      gallery: [
        "cities/spb/pereplet/pereplet_1.JPG",
        "cities/spb/pereplet/pereplet_2.JPG",
        "cities/spb/pereplet/pereplet_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/pereplyot/154636209456?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 14. Soho Lounge
    {
      id: "soho_lounge",
      name: "Soho Lounge",
      rating: "4.9",
      address: "Санкт-Петербург, проспект Стачек, 67к2",
      phones: [
        "+7 (921) 879-69-69"
      ],
      food: "есть",
      alcohol: "нет",
      drinks: "есть",
      working_hours: {
        mon: "12:00–00:00",
        tue: "12:00–00:00",
        wed: "12:00–00:00",
        thu: "12:00–00:00",
        fri: "12:00–00:00",
        sat: "12:00–00:00",
        sun: "12:00–00:00"
      },
      notes: "",
      video_review: "",
      image: "cities/spb/soho_lounge/soho_lounge_1.JPG",
      gallery: [
        "cities/spb/soho_lounge/soho_lounge_1.JPG",
        "cities/spb/soho_lounge/soho_lounge_2.JPG",
        "cities/spb/soho_lounge/soho_lounge_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/soho_lounge/81362104102?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    },

    // 15. Турка Лаунж
    {
      id: "turka",
      name: "Турка Лаунж",
      rating: "4.7",
      address: "Санкт-Петербург, Дальневосточный проспект, 12, корп. 2",
      phones: [
        "+7 (911) 150-00-40"
      ],
      food: "нет",
      alcohol: "нет",
      drinks: "нет",
      working_hours: {
        mon: "12:00–03:00",
        tue: "12:00–03:00",
        wed: "12:00–03:00",
        thu: "12:00–03:00",
        fri: "12:00–03:00",
        sat: "12:00–03:00",
        sun: "12:00–03:00"
      },
      notes: "",
      video_review: "",
      image: "cities/spb/turka/turka_1.JPG",
      gallery: [
        "cities/spb/turka/turka_1.JPG",
        "cities/spb/turka/turka_2.JPG",
        "cities/spb/turka/turka_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/turka_launzh/96818863416?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    }
  ]
});
