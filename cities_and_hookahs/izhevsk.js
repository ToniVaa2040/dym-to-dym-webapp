// cities_and_hookahs/izhevsk.js
// Город Ижевск и его кальянные

window.registerCity({
  id: "izhevsk",
  name: "Ижевск",
  image: "cities/izhevsk/izhevsk.png",

  hookahs: [
    {
      id: "tornado",
      name: "Tornado Lounge",
      rating: "4.9",
      address: "Удмуртская Республика, Ижевск, Удмуртская улица, 268",
      phones: [
        "+7 (3412) 23-22-53 (доб. 1)",
        "+7 (950) 823-22-53 (доб. 1)"
      ],
      food: "есть",
      alcohol: "есть",
      drinks: "есть",
      working_hours: {
        mon: "10:00–02:00",
        tue: "10:00–02:00",
        wed: "10:00–02:00",
        thu: "10:00–02:00",
        fri: "10:00–04:00",
        sat: "10:00–04:00",
        sun: "10:00–02:00"
      },
      notes: "",
      video_review: "",
      image: "cities/izhevsk/tornado/tornado_1.JPG",
      gallery: [
        "cities/izhevsk/tornado/tornado_1.JPG",
        "cities/izhevsk/tornado/tornado_2.JPG",
        "cities/izhevsk/tornado/tornado_3.JPG"
      ],
      yandex_map: {
        url: "https://yandex.ru/maps/org/tornado_lounge/105104928711?si=a46bh1q6kbvfu53zz0aa59qeum"
      }
    }
  ]
});
