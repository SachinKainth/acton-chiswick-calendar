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
  ],
  reviewNotes: [
    "Recurring schedules are carried forward from 2026 and have not been independently confirmed for 2027.",
    "No Easter Sunday closure is assumed for the Food Market in 2027; confirm directly with the organiser before publishing that date.",
    "Add confirmed one-off Makers Market and Art Market dates when they are announced.",
    "Verify all date-specific Chiswick Calendar event URLs for 2027 when the corresponding event pages are published; use an annual overrides.link value if a URL differs from the shared default.",
    "Review event timings and locations against 2027 organiser information; use annual overrides only for details that differ from the shared defaults."
  ]
};
