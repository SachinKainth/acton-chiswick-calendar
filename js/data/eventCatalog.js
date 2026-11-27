// Shared descriptions and defaults for markets. Annual schedules reference
// these IDs rather than copying unchanged details.
//
// Names, locations, times and links are defaults, not immutable facts. A year
// whose information differs should specify only those changed fields in that
// year's schedule using an "overrides" object. The event engine also supports
// overriding appendDateToLink when that year's URL format differs.
export const eventCatalog = {
  flowers: {
    name: "Flowers",
    location: "Old Market Place",
    // The organiser's calendar and dated Chiswick Calendar listings agree on
    // 09:30–15:30 in winter; the FAQ/home page have conflicting 09:00 starts.
    time: "09:30–15:30",
    overridesByMonth: {
      1: { time: "09:30–15:30" },
      2: { time: "09:30–15:30" },
      3: { time: "09:30–15:30" },
      4: { time: "09:30–15:30" },
      5: { time: "09:00–16:00" },
      6: { time: "09:00–16:00" },
      7: { time: "09:00–16:00" },
      8: { time: "09:00–16:00" },
      9: { time: "09:00–16:00" },
      10: { time: "09:30–15:30" },
      11: { time: "09:30–15:30" },
      12: { time: "09:30–15:30" }
    },
    area: "chiswick",
    class: "flowers",
    link: "https://chiswickcalendar.co.uk/event/chiswick-flower-market-old-market-place/",
    appendDateToLink: true
  },
  duckPond: {
    name: "Duck Pond",
    location: "Chiswick House & Gardens",
    time: "10:00–16:00",
    area: "chiswick",
    class: "duck",
    link: "https://chiswickcalendar.co.uk/event/duck-pond-market-chiswick-house-gardens/",
    appendDateToLink: true
  },
  carBoot: {
    name: "Car Boot Sale",
    location: "Chiswick School",
    time: "06:30–12:30",
    area: "chiswick",
    class: "car",
    link: "https://chiswickcarbootsale.com/",
    appendDateToLink: false
  },
  antiques: {
    name: "Antiques",
    location: "Old Market Place",
    time: "09:00–15:00",
    area: "chiswick",
    class: "antiques",
    link: "https://chiswickcalendar.co.uk/event/chiswick-antiques-vintage-market-old-market-place/",
    appendDateToLink: true
  },
  cheese: {
    name: "Cheese",
    location: "Old Market Place",
    time: "09:30–15:00",
    area: "chiswick",
    class: "cheese",
    link: "https://chiswickcalendar.co.uk/event/chiswick-cheese-market-the-old-market-place/",
    appendDateToLink: true
  },
  foodSt: {
    name: "FoodSt",
    location: "Old Market Place",
    time: "11:00–16:00",
    area: "chiswick",
    class: "streetfood",
    link: "https://chiswickcalendar.co.uk/event/foodst-old-market-place/",
    appendDateToLink: true
  },
  foodMarket: {
    name: "The Food Market",
    location: "Pavilion, Market Drive",
    time: "10:00–14:00",
    area: "chiswick",
    class: "foodmarket",
    link: "https://thefoodmarketchiswick.com/"
  },
  makersMarket: {
    name: "Makers Market",
    location: "Churchfield Road",
    time: "10:00–16:30",
    area: "acton",
    class: "makers",
    link: "https://www.youractonbid.co.uk/your-acton-makers-market/"
  },
  openArtMarket: {
    name: "Art",
    location: "Chiswick High Road",
    time: "11:00–16:00",
    area: "chiswick",
    class: "art",
    link: "https://www.openartspaces.co.uk/market",
    appendDateToLink: false
  },
  winterFair: {
    name: "W4 Art & Design Winter Fair",
    location: "Christchurch Acton Green",
    area: "chiswick",
    class: "winterfair"
  }
};
