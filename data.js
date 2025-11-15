// data.js
// Описание городов и кальянных для фронта

const appData = {
  cities: [
    {
      id: "moscow",
      name: "Москва",
      image: "assets/cities/moscow/moscow_card.png",
      hookahs: [
        {
          id: "taiga_fam_reutov", // id совпадает по стилю с папкой
          name: "Тайга Family Реутов",
          rating: 4.8,
          address: "Московская область, Реутов, пример улицы, дом 1",
          yandexUrl: "https://yandex.ru/maps/org/tayga_family/199515614415?si=a46bh1q6kbvfu53zz0aa59qeum",
          // ВАЖНО: путь ровно как в структуре папок
          image: "assets/cities/moscow/taiga_fam_reutov/taiga_reutov_1.jpg",
          workHours: [
            "Пн–Чт: 12:00–02:00",
            "Пт–Сб: 12:00–04:00",
            "Вс: 12:00–02:00"
          ],
          notes: ""
        }

        // сюда потом спокойно добавим taiga_fam_lubertsi, Borodachi, и т.д.
      ]
    },
    {
      id: "spb",
      name: "Санкт-Петербург",
      image: "assets/cities/spb/spb.png",
      hookahs: []
    },
    {
      id: "ekat",
      name: "Екатеринбург",
      image: "assets/cities/ekat/ekat.png",
      hookahs: []
    },
    {
      id: "izhevsk",
      name: "Ижевск",
      image: "assets/cities/izhevsk/izhevsk.png",
      hookahs: []
    },
    {
      id: "nino",
      name: "Нижний Новгород",
      image: "assets/cities/nino/nino.png",
      hookahs: []
    },
  ]
};
