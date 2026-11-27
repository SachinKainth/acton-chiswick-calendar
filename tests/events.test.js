import * as eventEngine from "../js/core/eventEngine.js";
import { getCalendarData } from "../js/data/index.js";

describe("getRecurringEvents", () => {
  let calendar2026;
  let calendar2027;

  beforeAll(async () => {
    [calendar2026, calendar2027] = await Promise.all([
      getCalendarData(2026),
      getCalendarData(2027)
    ]);
  });

  test("returns monthly and weekly events on the appropriate Sunday", () => {
    const result = eventEngine.getRecurringEvents(new Date(2026, 1, 1), calendar2026);
    expect(result.map(event => event.name)).toEqual([
      "Flowers", "Duck Pond", "Car Boot Sale", "The Food Market"
    ]);
    expect(result[0].link).toBe(
      "https://chiswickflowermarket.com/calendar/"
    );
    expect(result[0].time).toBe("09:30–15:30");
    expect(result[0]).not.toHaveProperty("appendDateToLink");
  });

  test("uses seasonal Flower Market hours", () => {
    const winter = eventEngine.getRecurringEvents(new Date(2026, 0, 4), {
      ...calendar2026,
      monthlyEvents: calendar2026.monthlyEvents.map(event =>
        event.eventId === "flowers" ? { ...event, exclude: { months: [] } } : event
      )
    });
    const summer = eventEngine.getRecurringEvents(new Date(2026, 5, 7), calendar2026);
    expect(winter.find(event => event.name === "Flowers").time).toBe("09:30–15:30");
    expect(summer.find(event => event.name === "Flowers").time).toBe("09:00–16:00");
  });

  test("uses stable event links instead of expired date-specific listings", () => {
    const firstSunday = eventEngine.getRecurringEvents(new Date(2026, 1, 1), calendar2026);
    expect(firstSunday.find(event => event.name === "Flowers").link)
      .toBe("https://chiswickflowermarket.com/calendar/");
    expect(firstSunday.find(event => event.name === "Duck Pond").link)
      .toBe("https://duckpondmarket.com/chiswick");

    const antiques = eventEngine.getRecurringEvents(new Date(2026, 0, 11), calendar2026);
    expect(antiques.find(event => event.name === "Antiques").link)
      .toBe("https://chiswickcalendar.co.uk/this-is-chiswick/places/chiswick-antiques-vintage-market/");

    const cheese = eventEngine.getRecurringEvents(new Date(2026, 0, 18), calendar2026);
    expect(cheese.find(event => event.name === "Cheese").link)
      .toBe("https://www.chiswickcheesemarket.uk/");

    const foodSt = eventEngine.getRecurringEvents(new Date(2026, 0, 25), calendar2026);
    expect(foodSt.find(event => event.name === "FoodSt").link)
      .toBe("https://www.foodst.co.uk/");
  });

  test("uses the official Car Boot organiser website without appending a date", () => {
    const result = eventEngine.getRecurringEvents(new Date(2026, 1, 1), calendar2026);
    const carBoot = result.find(event => event.name === "Car Boot Sale");

    expect(carBoot.link).toBe("https://chiswickcarbootsale.com/");
  });

  test("skips the Flower Market and Car Boot Sale in January", () => {
    const result = eventEngine.getRecurringEvents(new Date(2026, 0, 4), calendar2026);
    expect(result.map(event => event.name)).toEqual([
      "Duck Pond", "The Food Market"
    ]);
  });

  test("skips the Food Market on the 2026 Easter exception", () => {
    const result = eventEngine.getRecurringEvents(new Date(2026, 3, 5), calendar2026);
    expect(result.map(event => event.name)).toEqual([
      "Flowers", "Duck Pond", "Car Boot Sale"
    ]);
  });

  test("skips The Food Market on Easter Sunday 2027 under the organiser policy", () => {
    const result = eventEngine.getRecurringEvents(new Date(2027, 2, 28), calendar2027);
    expect(result.some(event => event.name === "The Food Market")).toBe(false);
  });

  test("skips The Food Market on the Sunday after Christmas in both years", () => {
    const closures = [
      [new Date(2026, 11, 27), calendar2026],
      [new Date(2027, 11, 26), calendar2027]
    ];

    closures.forEach(([date, calendar]) => {
      const result = eventEngine.getRecurringEvents(date, calendar);
      expect(result.some(event => event.name === "The Food Market")).toBe(false);
    });

    const previousSundays = [
      [new Date(2026, 11, 20), calendar2026],
      [new Date(2027, 11, 19), calendar2027]
    ];
    previousSundays.forEach(([date, calendar]) => {
      const result = eventEngine.getRecurringEvents(date, calendar);
      expect(result.some(event => event.name === "The Food Market")).toBe(true);
    });
  });

  test("supports month-specific URL, time and date-suffix overrides", () => {
    const annualVariant = {
      year: 2026,
      monthlyEvents: [{
        sunday: 1,
        eventId: "flowers",
        overrides: {
          location: "Annual default location"
        },
        overridesByMonth: {
          "2": {
            time: "09:30–15:30",
            link: "https://example.com/winter/",
            appendDateToLink: false
          },
          "6": {
            time: "09:00–16:00"
          }
        }
      }],
      weeklyEvents: [],
      individualEvents: []
    };

    const february = eventEngine.getRecurringEvents(
      new Date(2026, 1, 1),
      annualVariant
    )[0];
    const june = eventEngine.getRecurringEvents(
      new Date(2026, 5, 7),
      annualVariant
    )[0];
    const july = eventEngine.getRecurringEvents(
      new Date(2026, 6, 5),
      annualVariant
    )[0];

    expect(february.time).toBe("09:30–15:30");
    expect(february.link).toBe("https://example.com/winter/");
    expect(february.location).toBe("Annual default location");

    expect(june.time).toBe("09:00–16:00");
    expect(june.link).toBe(
      "https://chiswickflowermarket.com/calendar/"
    );

    expect(july.time).toBe("09:00–16:00");
    expect(july.location).toBe("Annual default location");
    expect(july.link).toBe(
      "https://chiswickflowermarket.com/calendar/"
    );
  });

  test("can skip one monthly occurrence when a special event replaces it", () => {
    const annualVariant = {
      year: 2026,
      monthlyEvents: [{
        sunday: 1,
        eventId: "flowers",
        exclude: { dates: ["2026-02-01"] }
      }],
      weeklyEvents: [],
      individualEvents: []
    };

    expect(
      eventEngine.getRecurringEvents(new Date(2026, 1, 1), annualVariant)
    ).toEqual([]);
  });

  test("uses 1-based month exclusions for both monthly and weekly events", () => {
    const annualVariant = {
      year: 2026,
      monthlyEvents: [{
        sunday: 1,
        eventId: "flowers",
        exclude: { months: [1] }
      }],
      weeklyEvents: [{
        eventId: "foodMarket",
        exclude: { months: [1] }
      }],
      individualEvents: []
    };

    expect(eventEngine.getRecurringEvents(new Date(2026, 0, 4), annualVariant))
      .toEqual([]);
    expect(eventEngine.getRecurringEvents(new Date(2026, 1, 1), annualVariant)
      .map(event => event.name)).toEqual(["Flowers", "The Food Market"]);
  });

  test("rejects invalid recurring-event exclusion months and dates", () => {
    const invalidMonth = {
      year: 2026,
      monthlyEvents: [{
        sunday: 1,
        eventId: "flowers",
        exclude: { months: [0] }
      }],
      weeklyEvents: [],
      individualEvents: []
    };
    const invalidDate = {
      year: 2026,
      monthlyEvents: [],
      weeklyEvents: [{
        eventId: "foodMarket",
        exclude: { dates: ["2026-02-30"] }
      }],
      individualEvents: []
    };

    expect(() => eventEngine.getRecurringEvents(
      new Date(2026, 1, 1), invalidMonth
    )).toThrow("Event exclusion months must be integers from 1 to 12");
    expect(() => eventEngine.getRecurringEvents(
      new Date(2026, 1, 1), invalidDate
    )).toThrow("Event exclusion dates must be valid YYYY-MM-DD dates");
  });

  test("rejects legacy exclusion fields rather than silently ignoring them", () => {
    const legacyCalendar = {
      year: 2026,
      monthlyEvents: [{
        sunday: 1,
        eventId: "flowers",
        skipMonths: [0]
      }],
      weeklyEvents: [],
      individualEvents: []
    };

    expect(() => eventEngine.getRecurringEvents(
      new Date(2026, 1, 1), legacyCalendar
    )).toThrow("Use event.exclude.months and event.exclude.dates");
  });

  test("returns no recurring events on a non-Sunday", () => {
    expect(eventEngine.getRecurringEvents(new Date(2026, 1, 2), calendar2026)).toEqual([]);
  });

  test("applies year-specific URL and timing overrides without changing shared defaults", () => {
    const annualVariant = {
      year: 2026,
      monthlyEvents: [{
        sunday: 1,
        eventId: "flowers",
        overrides: {
          time: "10:00–14:00",
          link: "https://example.com/2026-flower-market/",
          appendDateToLink: false
        }
      }],
      weeklyEvents: [],
      individualEvents: []
    };

    const result = eventEngine.getRecurringEvents(
      new Date(2026, 1, 1),
      annualVariant
    );

    expect(result[0].time).toBe("10:00–14:00");
    expect(result[0].link).toBe("https://example.com/2026-flower-market/");
    expect(result[0]).not.toHaveProperty("appendDateToLink");

    const sharedResult = eventEngine.getRecurringEvents(
      new Date(2026, 1, 1),
      calendar2026
    );
    expect(sharedResult[0].time).toBe("09:30–15:30");
  });
});

describe("getEventsForDate", () => {
  let calendar2026;
  let calendar2027;

  beforeAll(async () => {
    [calendar2026, calendar2027] = await Promise.all([
      getCalendarData(2026),
      getCalendarData(2027)
    ]);
  });

  test("includes organiser-announced 2026 Open Art Spaces Chiswick dates", () => {
    const artDates = [
      "2026-03-29",
      "2026-05-31",
      "2026-08-02",
      "2026-11-01",
      "2026-11-29"
    ];

    artDates.forEach(date => {
      const [year, month, day] = date.split("-").map(Number);
      const result = eventEngine.getEventsForDate(
        new Date(year, month - 1, day),
        calendar2026
      );
      const artEvent = result.find(event => event.name === "Art");

      expect(artEvent).toBeDefined();
      expect(artEvent.link).toBe("https://www.openartspaces.co.uk/market");
    });
  });

  test("uses the homepage's 09:00 opening for the 6 December Flower Market only", () => {
    const december = eventEngine.getEventsForDate(new Date(2026, 11, 6), calendar2026);
    expect(december.find(event => event.name === "Flowers").time).toBe("09:00–15:30");
    const november = eventEngine.getEventsForDate(new Date(2026, 10, 1), calendar2026);
    expect(november.find(event => event.name === "Flowers").time).toBe("09:30–15:30");
  });

  test("adds Duck Pond festive dates using the organiser's 10:00–15:00 listings", () => {
    const festiveDates = [
      "2026-12-05", "2026-12-06", "2026-12-19", "2026-12-20",
      "2026-12-21", "2026-12-22", "2026-12-23", "2026-12-24"
    ];
    festiveDates.forEach(date => {
      const [year, month, day] = date.split("-").map(Number);
      const events = eventEngine.getEventsForDate(new Date(year, month - 1, day), calendar2026);
      const duckPondChristmasMarket = events.find(
        event => event.name === "Duck Pond Christmas Market"
      );
      expect(duckPondChristmasMarket).toBeDefined();
      expect(duckPondChristmasMarket.time).toBe("10:00–15:00");
      expect(duckPondChristmasMarket.class).toBe("duckchristmas");
      expect(duckPondChristmasMarket.link).toBe("https://duckpondmarket.com/chiswick");
    });
    const decemberSixth = eventEngine.getEventsForDate(new Date(2026, 11, 6), calendar2026);
    expect(decemberSixth.filter(event => event.name === "Duck Pond Christmas Market")).toHaveLength(1);
    expect(decemberSixth.some(event => event.name === "Duck Pond")).toBe(false);
  });

  test("keeps the regular Duck Pond recurrence separate from its Christmas Market", () => {
    const regular = eventEngine.getEventsForDate(new Date(2026, 10, 1), calendar2026);
    expect(regular.some(event => event.name === "Duck Pond" && event.class === "duck")).toBe(true);
    expect(regular.some(event => event.name === "Duck Pond Christmas Market")).toBe(false);

    const festive = eventEngine.getEventsForDate(new Date(2026, 11, 5), calendar2026);
    expect(festive.some(event => event.name === "Duck Pond Christmas Market" &&
      event.class === "duckchristmas")).toBe(true);
    expect(festive.some(event => event.name === "Duck Pond")).toBe(false);
  });

  test("includes the W4 Art & Design Winter Fair on its two confirmed dates", () => {
    const friday = eventEngine.getEventsForDate(new Date(2026, 10, 20), calendar2026);
    const saturday = eventEngine.getEventsForDate(new Date(2026, 10, 21), calendar2026);

    const fridayFair = friday.find(event => event.name === "W4 Art & Design Winter Fair");
    const saturdayFair = saturday.find(event => event.name === "W4 Art & Design Winter Fair");

    expect(fridayFair).toMatchObject({
      location: "Christchurch Acton Green",
      time: "18:00–21:00",
      class: "winterfair",
      link: "https://www.w4artanddesign.co.uk/"
    });
    expect(saturdayFair).toMatchObject({
      location: "Christchurch Acton Green",
      time: "10:30–18:00",
      class: "winterfair",
      link: "https://www.w4artanddesign.co.uk/"
    });
  });

  test("includes individual events on their exact dates", async () => {
    const result = eventEngine.getEventsForDate(new Date(2026, 3, 18), calendar2026);
    expect(result.some(event => event.name === "Makers Market")).toBe(true);
  });

  test("does not return an annual package's events for another year", () => {
    expect(eventEngine.getEventsForDate(new Date(2027, 3, 18), calendar2026)).toEqual([]);
  });

  test("returns the expected total number of events for the corrected 2026 calendar", () => {
    let count = 0;
    for (let month = 0; month < 12; month++) {
      const days = new Date(2026, month + 1, 0).getDate();
      for (let day = 1; day <= days; day++) {
        count += eventEngine.getEventsForDate(
          new Date(2026, month, day),
          calendar2026
        ).length;
      }
    }
    expect(count).toBe(138);
  });

  test("includes the organiser-announced Open Art Show on all six published dates", () => {
    const dates = ["2027-02-04", "2027-02-05", "2027-02-06", "2027-02-07", "2027-02-08", "2027-02-09"];
    dates.forEach(date => {
      const [year, month, day] = date.split("-").map(Number);
      const event = eventEngine.getEventsForDate(new Date(year, month - 1, day), calendar2027).find(item => item.name === "Open Art Show");
      expect(event).toMatchObject({category:"exhibitions",class:"exhibition",location:"JM Gallery, 230 Portobello Road, London W11 1LJ",link:"https://www.openartspaces.co.uk/show"});
      expect(event).not.toHaveProperty("time");
    });
  });
});
