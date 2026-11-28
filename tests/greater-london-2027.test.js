import { getEventsForDate } from "../js/core/eventEngine.js";
import { calendarData } from "../js/data/2027/calendar.js";
import { eventCatalog } from "../js/data/eventCatalog.js";

const datesBetween = (first, last) => {
  const dates = [];
  const current = new Date(`${first}T00:00:00Z`);
  const end = new Date(`${last}T00:00:00Z`);

  while (current <= end) {
    dates.push(current.toISOString().slice(0, 10));
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return dates;
};

// This fixture is intentionally independent of the schedule data. It records
// every individually announced 2027 date, so an accidental omission or extra
// date in calendar.js fails the test rather than merely changing a total.
const expectedDatesByEventId = {
  londonArtFair: datesBetween("2027-01-20", "2027-01-24"),
  decorativeFair: [
    ...datesBetween("2027-01-19", "2027-01-24"),
    ...datesBetween("2027-05-11", "2027-05-16"),
    ...datesBetween("2027-09-28", "2027-10-03")
  ],
  adamsAntiques: [
    "2027-01-24", "2027-02-28", "2027-03-21", "2027-04-18",
    "2027-05-16", "2027-06-13", "2027-07-04", "2027-09-12",
    "2027-10-03", "2027-11-07", "2027-12-12"
  ],
  openArtShow: datesBetween("2027-02-04", "2027-02-09"),
  localMakers: [
    "2027-02-06", "2027-02-07", "2027-04-03", "2027-05-01",
    "2027-06-05", "2027-07-03", "2027-08-07", "2027-09-04",
    "2027-11-20", "2027-11-21", "2027-11-27"
  ],
  affordableArtFair: [
    ...datesBetween("2027-03-03", "2027-03-07"),
    ...datesBetween("2027-05-05", "2027-05-09"),
    ...datesBetween("2027-10-13", "2027-10-17")
  ],
  cadaFair: datesBetween("2027-03-18", "2027-03-21"),
  londonCoffeeFestival: datesBetween("2027-05-15", "2027-05-16"),
  foodiesFestival: datesBetween("2027-05-29", "2027-05-31"),
  kensingtonAntiques: ["2027-05-30"],
  treasureHouseFair: datesBetween("2027-06-23", "2027-06-29"),
  britishArtFair: datesBetween("2027-09-23", "2027-09-26"),
  spiritOfChristmas: datesBetween("2027-11-01", "2027-11-07")
};

const expectedPairs = Object.entries(expectedDatesByEventId)
  .flatMap(([eventId, dates]) => dates.map(date => `${date}|${eventId}`))
  .sort();

const asLocalDate = date => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

describe("Greater London 2027 individually announced events", () => {
  test("contains exactly the independently recorded dates for every event series", () => {
    const actualPairs = calendarData.individualEvents
      .map(event => `${event.date}|${event.eventId}`)
      .sort();

    expect(calendarData.individualEvents).toHaveLength(94);
    expect(actualPairs).toEqual(expectedPairs);
  });

  test("has valid 2027 dates, known catalogue IDs and no duplicate event/date pairs", () => {
    const pairs = calendarData.individualEvents.map(event => `${event.date}|${event.eventId}`);

    calendarData.individualEvents.forEach(event => {
      expect(event.date).toMatch(/^2027-\d{2}-\d{2}$/);
      expect(new Date(`${event.date}T00:00:00Z`).toISOString().slice(0, 10))
        .toBe(event.date);
      expect(eventCatalog[event.eventId]).toBeDefined();
    });

    expect(new Set(pairs).size).toBe(pairs.length);
  });

  test("defines complete Greater London catalogue metadata for every included series", () => {
    const allowedCategories = new Set([
      "markets",
      "makers-artisan",
      "art-markets",
      "fairs",
      "exhibitions",
      "pop-ups"
    ]);

    Object.keys(expectedDatesByEventId).forEach(eventId => {
      const entry = eventCatalog[eventId];

      expect(entry).toBeDefined();
      expect(entry.area).toBe("london");
      expect(entry.name).toEqual(expect.any(String));
      expect(entry.category).toBeDefined();
      expect(allowedCategories.has(entry.category)).toBe(true);
      expect(entry.class).toEqual(expect.any(String));
      expect(entry.link).toMatch(/^https?:\/\//);
    });
  });

  test("resolves every scheduled occurrence with its expected public-facing details", () => {
    calendarData.individualEvents.forEach(scheduledEvent => {
      const defaults = eventCatalog[scheduledEvent.eventId];
      const overrides = scheduledEvent.overrides || {};
      const expectedName = overrides.name || defaults.name;
      const expectedLocation = overrides.location || defaults.location;
      const expectedTime = overrides.time ?? defaults.time;
      const events = getEventsForDate(asLocalDate(scheduledEvent.date), calendarData);
      const matches = events.filter(event => event.name === expectedName);

      expect(matches).toHaveLength(1);
      expect(matches[0]).toMatchObject({
        name: expectedName,
        area: "london",
        category: defaults.category,
        class: defaults.class,
        location: expectedLocation,
        link: defaults.link
      });

      if (expectedTime === undefined) {
        expect(matches[0]).not.toHaveProperty("time");
      } else {
        expect(matches[0].time).toBe(expectedTime);
      }
    });
  });

  test("does not invent opening hours for entries whose organisers have not published them", () => {
    const noPublishedHours = [
      ["2027-03-03", "Affordable Art Fair – Battersea Spring"],
      ["2027-05-05", "Affordable Art Fair – Hampstead"],
      ["2027-05-11", "The Decorative Fair – Spring"],
      ["2027-09-23", "British Art Fair"],
      ["2027-11-01", "Spirit of Christmas Fair"],
      ["2027-11-27", "Local Makers Market"]
    ];

    noPublishedHours.forEach(([date, name]) => {
      const event = getEventsForDate(asLocalDate(date), calendarData)
        .find(item => item.name === name);
      expect(event).toBeDefined();
      expect(event).not.toHaveProperty("time");
    });
  });
});
