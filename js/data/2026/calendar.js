// 2026 schedule with organiser-published one-off market dates.
export const calendarData = {
  year: 2026,
  status: "established",
  individualEvents: [
    { date: "2026-04-18", eventId: "makersMarket" },
    { date: "2026-06-20", eventId: "makersMarket" },
    { date: "2026-09-19", eventId: "makersMarket" },
    { date: "2026-12-12", eventId: "makersMarket" },
    { date: "2026-03-29", eventId: "openArtMarket" },
    { date: "2026-05-31", eventId: "openArtMarket" },
    { date: "2026-08-02", eventId: "openArtMarket" },
    { date: "2026-11-01", eventId: "openArtMarket" },
    { date: "2026-11-29", eventId: "openArtMarket" },
    ...[
      "2026-12-05",
      "2026-12-06",
      "2026-12-19",
      "2026-12-20",
      "2026-12-21",
      "2026-12-22",
      "2026-12-23",
      "2026-12-24"
    ].map(date => ({
      date,
      eventId: "duckPond",
      overrides: {
        time: "10:00–15:00",
        link: "https://duckpondmarket.com/chiswick",
        appendDateToLink: false
      }
    })),
    {
      date: "2026-11-20",
      eventId: "winterFair",
      overrides: {
        time: "18:00–21:00",
        link: "https://chiswickcalendar.co.uk/event/w4-art-design-winter-fair-2026-christchurch-acton-green/2026-11-20/",
        appendDateToLink: false
      }
    },
    {
      date: "2026-11-21",
      eventId: "winterFair",
      overrides: {
        time: "10:30–18:00",
        link: "https://chiswickcalendar.co.uk/event/w4-art-design-winter-fair-2026-christchurch-acton-green/2026-11-21/",
        appendDateToLink: false
      }
    }
  ],
  monthlyEvents: [
    {
      sunday: 1,
      eventId: "flowers",
      skipMonths: [0],
      overridesByDate: {
        "2026-12-06": {
          time: "09:00–15:30"
        }
      }
    },
    { sunday: 1, eventId: "duckPond", skipDates: ["2026-12-06"] },
    { sunday: 1, eventId: "carBoot", skipMonths: [0] },
    { sunday: 2, eventId: "antiques" },
    { sunday: 3, eventId: "cheese" },
    { sunday: 4, eventId: "foodSt" }
  ],
  weeklyEvents: [
    { eventId: "foodMarket", skipDates: ["2026-04-05"] }
  ],
  reviewNotes: [
    "Flower Market is not held in January. Normal winter hours are 09:30–15:30; the official homepage specifically advertises the 6 December 2026 Christmas Market as 09:00–15:30, so that date has an explicit exception.",
    "Duck Pond festive dates (5, 6, 19–24 December 2026) use Duck Pond's own 10:00–15:00 listings in preference to the venue's blanket 10:00–16:00 listing. The regular 6 December occurrence is suppressed to avoid duplication.",
    "Open Art Spaces organiser updates support Chiswick collaborations on 2 August and 1 November; the previously listed 30 August date was not supported by the organiser evidence reviewed."
  ]
};
