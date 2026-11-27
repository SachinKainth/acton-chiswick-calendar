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
    category: "markets",
    class: "flowers",
    link: "https://chiswickflowermarket.com/calendar/"
  },
  duckPond: {
    name: "Duck Pond",
    location: "Chiswick House & Gardens",
    time: "10:00–16:00",
    area: "chiswick",
    category: "makers-artisan",
    class: "duck",
    link: "https://duckpondmarket.com/chiswick"
  },
  duckPondChristmas: {
    name: "Duck Pond Christmas Market",
    location: "Chiswick House & Gardens",
    time: "10:00–15:00",
    area: "chiswick",
    category: "fairs",
    class: "duckchristmas",
    link: "https://duckpondmarket.com/chiswick"
  },
  carBoot: {
    name: "Car Boot Sale",
    location: "Chiswick School",
    time: "06:30–12:30",
    area: "chiswick",
    category: "markets",
    class: "car",
    link: "https://chiswickcarbootsale.com/",
    appendDateToLink: false
  },
  antiques: {
    name: "Antiques",
    location: "Old Market Place",
    time: "09:00–15:00",
    area: "chiswick",
    category: "markets",
    class: "antiques",
    link: "https://chiswickcalendar.co.uk/this-is-chiswick/places/chiswick-antiques-vintage-market/"
  },
  cheese: {
    name: "Cheese",
    location: "Old Market Place",
    time: "09:30–15:00",
    area: "chiswick",
    category: "markets",
    class: "cheese",
    link: "https://www.chiswickcheesemarket.uk/"
  },
  foodSt: {
    name: "FoodSt",
    location: "Old Market Place",
    time: "11:00–16:00",
    area: "chiswick",
    category: "markets",
    class: "streetfood",
    link: "https://www.foodst.co.uk/"
  },
  foodMarket: {
    name: "The Food Market",
    location: "Pavilion, Market Drive",
    time: "10:00–14:00",
    area: "chiswick",
    category: "markets",
    class: "foodmarket",
    link: "https://thefoodmarketchiswick.com/"
  },
  makersMarket: {
    name: "Makers Market",
    location: "Churchfield Road",
    time: "10:00–16:30",
    area: "acton",
    category: "makers-artisan",
    class: "makers",
    link: "https://www.youractonbid.co.uk/your-acton-makers-market/"
  },
  openArtMarket: {
    name: "Art",
    location: "Chiswick High Road",
    time: "11:00–16:00",
    area: "chiswick",
    category: "art-markets",
    class: "art",
    link: "https://www.openartspaces.co.uk/market",
    appendDateToLink: false
  },
  winterFair: {
    name: "W4 Art & Design Winter Fair",
    location: "Christchurch Acton Green",
    area: "chiswick",
    category: "fairs",
    class: "winterfair",
    link: "https://www.w4artanddesign.co.uk/"
  },
  openArtShow: {
    name: "Open Art Show",
    location: "JM Gallery, 230 Portobello Road, London W11 1LJ",
    area: "london",
    category: "exhibitions",
    class: "exhibition",
    link: "https://www.openartspaces.co.uk/show"
  },
  londonArtFair: { name:"London Art Fair", location:"Business Design Centre, 52 Upper Street, London N1 0QH", area:"london", category:"art-markets", class:"art", link:"https://www.londonartfair.co.uk/" },
  decorativeFair: { name:"The Decorative Fair", location:"Evolution London, Battersea Park, London SW11 4NJ", area:"london", category:"fairs", class:"fair", link:"https://decorativefair.com/" },
  adamsAntiques: { name:"Adams Antiques Fair", location:"Royal Horticultural Halls, Elverton Street, London SW1 2PB", time:"10:00–16:30", area:"london", category:"markets", class:"antiques", link:"https://www.adamsantiquesfairs.com/fair-dates" },
  localMakers: { name:"Local Makers Market", area:"london", category:"makers-artisan", class:"makers", link:"https://localmakers.uk/markets" },
  kensingtonAntiques: { name:"Kensington Antiques Fair", location:"Kensington Town Hall, Hornton Street, London W8 7NX", time:"10:30–15:30", area:"london", category:"markets", class:"antiques", link:"https://kensingtonantiquesfair.co.uk/" },
  affordableArtFair: { name:"Affordable Art Fair", area:"london", category:"art-markets", class:"art", link:"https://affordableartfair.com/london/" },
  cadaFair: { name:"CADA Art & Antiques Fair", location:"Chelsea Old Town Hall, King's Road, London SW3 5EE", area:"london", category:"fairs", class:"fair", link:"https://www.cotswolds-antiques-art.com/cada-fairs" },
  foodiesFestival: { name:"Foodies Festival", location:"Syon Park, Brentford, London TW8 8JF", area:"london", category:"fairs", class:"fair", link:"https://foodiesfestival.com/" },
  londonCoffeeFestival: { name:"London Coffee Festival", location:"The Truman Brewery, 15 Hanbury Street, London E1 6QR", area:"london", category:"fairs", class:"fair", link:"https://www.londoncoffeefestival.com/" },
  treasureHouseFair: { name:"The Treasure House Fair", location:"Royal Hospital Chelsea, South Grounds, London SW3 4SR", area:"london", category:"fairs", class:"fair", link:"https://www.treasurehousefair.com/visitors" },
  britishArtFair: { name:"British Art Fair", location:"Saatchi Gallery, King's Road, London SW3 4RY", area:"london", category:"art-markets", class:"art", link:"https://www.britishartfair.co.uk/fair-information" },
  spiritOfChristmas: { name:"Spirit of Christmas Fair", location:"Olympia, Hammersmith Road, London W14 8UX", area:"london", category:"fairs", class:"fair", link:"https://www.spiritofchristmasfair.co.uk/" }
};