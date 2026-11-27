// 2026 schedule extracted from the original events.js, preserving its
// existing dates and recurrence rules. Additional published 2026 Open Art
// Spaces dates and W4 Art & Design Winter Fair dates are included.
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
    { date: "2026-08-30", eventId: "openArtMarket" },
    { date: "2026-11-29", eventId: "openArtMarket" },
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
    { sunday: 1, eventId: "flowers", skipMonths: [0] },
    { sunday: 1, eventId: "duckPond" },
    { sunday: 1, eventId: "carBoot", skipMonths: [0] },
    { sunday: 2, eventId: "antiques" },
    { sunday: 3, eventId: "cheese" },
    { sunday: 4, eventId: "foodSt" }
  ],
  weeklyEvents: [
    { eventId: "foodMarket", skipDates: ["2026-04-05"] }
  ],
  reviewNotes: [
    "Flower Market is not held in January. Seasonal hours are modelled as 09:00–16:00 May–September and 09:30–15:30 October–April; the organiser's FAQ and December home-page listing conflict with the calendar/dated listings on the winter opening time.",
    "Duck Pond has additional festive dates in December beyond its normal first-Sunday schedule. Published sources disagree on weekend closing times; model each confirmed date as an individual event after organiser verification."
  ]
};
