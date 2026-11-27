// Provisional 2027 schedule. The recurring pattern is carried forward from
// 2026; individual 2027 event dates have deliberately not been invented.
// Recurring exclusions use 1-based months and ISO YYYY-MM-DD dates.
export const calendarData = {
  year: 2027,
  status: "provisional",
  individualEvents: [],
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
