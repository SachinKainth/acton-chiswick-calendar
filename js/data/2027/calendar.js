// Provisional 2027 schedule. The recurring pattern is carried forward from
// 2026; add individual dates only when published by event organisers.
// Recurring exclusions use 1-based months and ISO YYYY-MM-DD dates.
const individualEvents = [
  {
    "date": "2027-01-19",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Winter",
      "time": "12:00–20:00"
    }
  },
  {
    "date": "2027-01-20",
    "eventId": "londonArtFair",
    "overrides": {
      "time": "11:00–21:00"
    }
  },
  {
    "date": "2027-01-20",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Winter",
      "time": "11:00–20:00"
    }
  },
  {
    "date": "2027-01-21",
    "eventId": "londonArtFair",
    "overrides": {
      "time": "11:00–19:00"
    }
  },
  {
    "date": "2027-01-21",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Winter",
      "time": "11:00–20:00"
    }
  },
  {
    "date": "2027-01-22",
    "eventId": "londonArtFair",
    "overrides": {
      "time": "11:00–19:00"
    }
  },
  {
    "date": "2027-01-22",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Winter",
      "time": "11:00–19:00"
    }
  },
  {
    "date": "2027-01-23",
    "eventId": "londonArtFair",
    "overrides": {
      "time": "11:00–19:00"
    }
  },
  {
    "date": "2027-01-23",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Winter",
      "time": "11:00–19:00"
    }
  },
  {
    "date": "2027-01-24",
    "eventId": "londonArtFair",
    "overrides": {
      "time": "11:00–17:00"
    }
  },
  {
    "date": "2027-01-24",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Winter",
      "time": "11:00–18:00"
    }
  },
  {
    "date": "2027-01-24",
    "eventId": "adamsAntiques"
  },
  {
    "date": "2027-02-04",
    "eventId": "openArtShow"
  },
  {
    "date": "2027-02-05",
    "eventId": "openArtShow"
  },
  {
    "date": "2027-02-06",
    "eventId": "openArtShow"
  },
  {
    "date": "2027-02-06",
    "eventId": "localMakers",
    "overrides": {
      "location": "Abney Public Hall, Stoke Newington, London",
      "time": "11:00–16:00"
    }
  },
  {
    "date": "2027-02-07",
    "eventId": "openArtShow"
  },
  {
    "date": "2027-02-07",
    "eventId": "localMakers",
    "overrides": {
      "location": "Abney Public Hall, Stoke Newington, London",
      "time": "11:00–16:00"
    }
  },
  {
    "date": "2027-02-08",
    "eventId": "openArtShow"
  },
  {
    "date": "2027-02-09",
    "eventId": "openArtShow"
  },
  {
    "date": "2027-02-28",
    "eventId": "adamsAntiques"
  },
  {
    "date": "2027-03-03",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Battersea Spring",
      "location": "Evolution London, Battersea Park, London"
    }
  },
  {
    "date": "2027-03-04",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Battersea Spring",
      "location": "Evolution London, Battersea Park, London"
    }
  },
  {
    "date": "2027-03-05",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Battersea Spring",
      "location": "Evolution London, Battersea Park, London"
    }
  },
  {
    "date": "2027-03-06",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Battersea Spring",
      "location": "Evolution London, Battersea Park, London"
    }
  },
  {
    "date": "2027-03-07",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Battersea Spring",
      "location": "Evolution London, Battersea Park, London"
    }
  },
  {
    "date": "2027-03-18",
    "eventId": "cadaFair",
    "overrides": {
      "time": "12:00–20:00"
    }
  },
  {
    "date": "2027-03-19",
    "eventId": "cadaFair",
    "overrides": {
      "time": "11:00–18:00"
    }
  },
  {
    "date": "2027-03-20",
    "eventId": "cadaFair",
    "overrides": {
      "time": "11:00–18:00"
    }
  },
  {
    "date": "2027-03-21",
    "eventId": "adamsAntiques"
  },
  {
    "date": "2027-03-21",
    "eventId": "cadaFair",
    "overrides": {
      "time": "11:00–17:00"
    }
  },
  {
    "date": "2027-04-03",
    "eventId": "localMakers",
    "overrides": {
      "location": "Corner Corner, Canada Water, London",
      "time": "11:00–16:00"
    }
  },
  {
    "date": "2027-04-18",
    "eventId": "adamsAntiques"
  },
  {
    "date": "2027-05-01",
    "eventId": "localMakers",
    "overrides": {
      "location": "Corner Corner, Canada Water, London",
      "time": "11:00–16:00"
    }
  },
  {
    "date": "2027-05-05",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Hampstead",
      "location": "Lower Fairground Site, Hampstead Heath, London NW3 1TH"
    }
  },
  {
    "date": "2027-05-06",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Hampstead",
      "location": "Lower Fairground Site, Hampstead Heath, London NW3 1TH"
    }
  },
  {
    "date": "2027-05-07",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Hampstead",
      "location": "Lower Fairground Site, Hampstead Heath, London NW3 1TH"
    }
  },
  {
    "date": "2027-05-08",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Hampstead",
      "location": "Lower Fairground Site, Hampstead Heath, London NW3 1TH"
    }
  },
  {
    "date": "2027-05-09",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Hampstead",
      "location": "Lower Fairground Site, Hampstead Heath, London NW3 1TH"
    }
  },
  {
    "date": "2027-05-11",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Spring"
    }
  },
  {
    "date": "2027-05-12",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Spring"
    }
  },
  {
    "date": "2027-05-13",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Spring"
    }
  },
  {
    "date": "2027-05-14",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Spring"
    }
  },
  {
    "date": "2027-05-15",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Spring"
    }
  },
  {
    "date": "2027-05-15",
    "eventId": "londonCoffeeFestival"
  },
  {
    "date": "2027-05-16",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Spring"
    }
  },
  {
    "date": "2027-05-16",
    "eventId": "adamsAntiques"
  },
  {
    "date": "2027-05-16",
    "eventId": "londonCoffeeFestival"
  },
  {
    "date": "2027-05-29",
    "eventId": "foodiesFestival"
  },
  {
    "date": "2027-05-30",
    "eventId": "kensingtonAntiques"
  },
  {
    "date": "2027-05-30",
    "eventId": "foodiesFestival"
  },
  {
    "date": "2027-05-31",
    "eventId": "foodiesFestival"
  },
  {
    "date": "2027-06-05",
    "eventId": "localMakers",
    "overrides": {
      "location": "Corner Corner, Canada Water, London",
      "time": "11:00–16:00"
    }
  },
  {
    "date": "2027-06-13",
    "eventId": "adamsAntiques"
  },
  {
    "date": "2027-06-23",
    "eventId": "treasureHouseFair",
    "overrides": {
      "time": "11:00–21:00"
    }
  },
  {
    "date": "2027-06-24",
    "eventId": "treasureHouseFair",
    "overrides": {
      "time": "11:00–20:00"
    }
  },
  {
    "date": "2027-06-25",
    "eventId": "treasureHouseFair",
    "overrides": {
      "time": "11:00–20:00"
    }
  },
  {
    "date": "2027-06-26",
    "eventId": "treasureHouseFair",
    "overrides": {
      "time": "11:00–19:00"
    }
  },
  {
    "date": "2027-06-27",
    "eventId": "treasureHouseFair",
    "overrides": {
      "time": "11:00–19:00"
    }
  },
  {
    "date": "2027-06-28",
    "eventId": "treasureHouseFair",
    "overrides": {
      "time": "11:00–20:00"
    }
  },
  {
    "date": "2027-06-29",
    "eventId": "treasureHouseFair",
    "overrides": {
      "time": "11:00–20:00"
    }
  },
  {
    "date": "2027-07-03",
    "eventId": "localMakers",
    "overrides": {
      "location": "Corner Corner, Canada Water, London",
      "time": "11:00–16:00"
    }
  },
  {
    "date": "2027-07-04",
    "eventId": "adamsAntiques"
  },
  {
    "date": "2027-08-07",
    "eventId": "localMakers",
    "overrides": {
      "location": "Corner Corner, Canada Water, London",
      "time": "11:00–16:00"
    }
  },
  {
    "date": "2027-09-04",
    "eventId": "localMakers",
    "overrides": {
      "location": "Corner Corner, Canada Water, London",
      "time": "11:00–16:00"
    }
  },
  {
    "date": "2027-09-12",
    "eventId": "adamsAntiques"
  },
  {
    "date": "2027-09-23",
    "eventId": "britishArtFair"
  },
  {
    "date": "2027-09-24",
    "eventId": "britishArtFair"
  },
  {
    "date": "2027-09-25",
    "eventId": "britishArtFair"
  },
  {
    "date": "2027-09-26",
    "eventId": "britishArtFair"
  },
  {
    "date": "2027-09-28",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Autumn"
    }
  },
  {
    "date": "2027-09-29",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Autumn"
    }
  },
  {
    "date": "2027-09-30",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Autumn"
    }
  },
  {
    "date": "2027-10-01",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Autumn"
    }
  },
  {
    "date": "2027-10-02",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Autumn"
    }
  },
  {
    "date": "2027-10-03",
    "eventId": "decorativeFair",
    "overrides": {
      "name": "The Decorative Fair – Autumn"
    }
  },
  {
    "date": "2027-10-03",
    "eventId": "adamsAntiques"
  },
  {
    "date": "2027-10-13",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Battersea Autumn",
      "location": "Evolution London, Battersea Park, London"
    }
  },
  {
    "date": "2027-10-14",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Battersea Autumn",
      "location": "Evolution London, Battersea Park, London"
    }
  },
  {
    "date": "2027-10-15",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Battersea Autumn",
      "location": "Evolution London, Battersea Park, London"
    }
  },
  {
    "date": "2027-10-16",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Battersea Autumn",
      "location": "Evolution London, Battersea Park, London"
    }
  },
  {
    "date": "2027-10-17",
    "eventId": "affordableArtFair",
    "overrides": {
      "name": "Affordable Art Fair – Battersea Autumn",
      "location": "Evolution London, Battersea Park, London"
    }
  },
  {
    "date": "2027-11-01",
    "eventId": "spiritOfChristmas"
  },
  {
    "date": "2027-11-02",
    "eventId": "spiritOfChristmas"
  },
  {
    "date": "2027-11-03",
    "eventId": "spiritOfChristmas"
  },
  {
    "date": "2027-11-04",
    "eventId": "spiritOfChristmas"
  },
  {
    "date": "2027-11-05",
    "eventId": "spiritOfChristmas"
  },
  {
    "date": "2027-11-06",
    "eventId": "spiritOfChristmas"
  },
  {
    "date": "2027-11-07",
    "eventId": "adamsAntiques"
  },
  {
    "date": "2027-11-07",
    "eventId": "spiritOfChristmas"
  },
  {
    "date": "2027-11-20",
    "eventId": "localMakers",
    "overrides": {
      "location": "Abney Public Hall, Stoke Newington, London",
      "time": "11:00–16:00"
    }
  },
  {
    "date": "2027-11-21",
    "eventId": "localMakers",
    "overrides": {
      "location": "Abney Public Hall, Stoke Newington, London",
      "time": "11:00–16:00"
    }
  },
  {
    "date": "2027-11-27",
    "eventId": "localMakers",
    "overrides": {
      "location": "Christchurch Hall, Wanstead, London"
    }
  },
  {
    "date": "2027-12-12",
    "eventId": "adamsAntiques"
  }
]
  .sort((a, b) => a.date.localeCompare(b.date));

export const calendarData = {
  year: 2027,
  status: "provisional",
  individualEvents,
  monthlyEvents: [
    { sunday: 1, eventId: "flowers", exclude: { months: [1] } },
    { sunday: 1, eventId: "duckPond" },
    { sunday: 1, eventId: "carBoot", exclude: { months: [1] } },
    { sunday: 2, eventId: "antiques" },
    { sunday: 3, eventId: "cheese" },
    { sunday: 4, eventId: "foodSt" }
  ],
  weeklyEvents: [
    { eventId: "foodMarket", exclude: { dates: ["2027-03-28", "2027-12-26"] } }
  ]
};
