// 2026 schedule with organiser-published one-off market dates.
// Recurring exclusions use 1-based months and ISO YYYY-MM-DD dates.
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
      }
    })),
    {
      date: "2026-11-20",
      eventId: "winterFair",
      overrides: {
        time: "18:00–21:00",
      }
    },
    {
      date: "2026-11-21",
      eventId: "winterFair",
      overrides: {
        time: "10:30–18:00",
      }
    }
  ],
  monthlyEvents: [
    {
      sunday: 1,
      eventId: "flowers",
      exclude: { months: [1] },
      overridesByDate: {
        "2026-12-06": {
          time: "09:00–15:30"
        }
      }
    },
    { sunday: 1, eventId: "duckPond", exclude: { dates: ["2026-12-06"] } },
    { sunday: 1, eventId: "carBoot", exclude: { months: [1] } },
    { sunday: 2, eventId: "antiques" },
    { sunday: 3, eventId: "cheese" },
    { sunday: 4, eventId: "foodSt" }
  ],
  weeklyEvents: [
    { eventId: "foodMarket", exclude: { dates: ["2026-04-05", "2026-12-27"] } }
  ]
};
