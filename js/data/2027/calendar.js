// Provisional 2027 schedule. The recurring pattern is carried forward from
// 2026; individual 2027 event dates have deliberately not been invented.
export const calendarData = {
  year: 2027,
  status: "provisional",
  individualEvents: [],
  monthlyEvents: [
    { sunday: 1, eventId: "flowers", skipMonths: [0] },
    { sunday: 1, eventId: "duckPond" },
    { sunday: 1, eventId: "carBoot", skipMonths: [0] },
    { sunday: 2, eventId: "antiques" },
    { sunday: 3, eventId: "cheese" },
    { sunday: 4, eventId: "foodSt" }
  ],
  weeklyEvents: [
    { eventId: "foodMarket" }
  ]
};
