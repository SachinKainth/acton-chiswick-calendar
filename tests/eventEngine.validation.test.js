import { getRecurringEvents } from "../js/core/eventEngine.js";

function calendarWithExclusion(exclude) {
  return {
    year: 2026,
    monthlyEvents: [],
    weeklyEvents: [{ eventId: "foodMarket", exclude }],
    individualEvents: []
  };
}

function expectInvalidDate(date) {
  expect(() => getRecurringEvents(
    new Date(2026, 1, 1),
    calendarWithExclusion({ dates: [date] })
  )).toThrow("Event exclusion dates must be valid YYYY-MM-DD dates");
}

describe("event engine validation edge cases", () => {
  test.each([null, 123, {}, []])("rejects a non-string exclusion date: %p", date => {
    expectInvalidDate(date);
  });

  test.each([
    "2026-2-01",
    "not-a-date",
    "2026-13-01",
    "2026-00-01",
    "2026-01-00",
    "2026-02-30",
    "2025-02-29",
    "1900-02-29"
  ])("rejects an invalid calendar date: %s", date => {
    expectInvalidDate(date);
  });

  test.each(["2024-02-29", "2000-02-29", "2026-02-28"])(
    "accepts a valid calendar date: %s",
    date => {
      expect(() => getRecurringEvents(
        new Date(2026, 1, 1),
        calendarWithExclusion({ dates: [date] })
      )).not.toThrow();
    }
  );

  test.each([null, [], "months"])(
    "requires event.exclude to be a plain object: %p",
    exclude => {
      expect(() => getRecurringEvents(
        new Date(2026, 1, 1),
        calendarWithExclusion(exclude)
      )).toThrow("Event exclude must be an object");
    }
  );

  test("rejects unknown exclusion keys and legacy skipDates", () => {
    expect(() => getRecurringEvents(
      new Date(2026, 1, 1),
      calendarWithExclusion({ weeks: [1] })
    )).toThrow("Unknown event exclusion key: weeks");

    expect(() => getRecurringEvents(
      new Date(2026, 1, 1),
      {
        ...calendarWithExclusion(undefined),
        weeklyEvents: [{ eventId: "foodMarket", skipDates: [] }]
      }
    )).toThrow("Use event.exclude.months and event.exclude.dates");
  });

  test("requires exclusion months and dates to be arrays", () => {
    expect(() => getRecurringEvents(
      new Date(2026, 1, 1),
      calendarWithExclusion({ months: null })
    )).toThrow("Event exclude.months must be an array");

    expect(() => getRecurringEvents(
      new Date(2026, 1, 1),
      calendarWithExclusion({ dates: null })
    )).toThrow("Event exclude.dates must be an array");
  });

  test.each([0, 13, 1.5, "2"])(
    "rejects an invalid exclusion month: %p",
    month => {
      expect(() => getRecurringEvents(
        new Date(2026, 1, 1),
        calendarWithExclusion({ months: [month] })
      )).toThrow("Event exclusion months must be integers from 1 to 12");
    }
  );

  test("rejects an unknown event ID", () => {
    expect(() => getRecurringEvents(
      new Date(2026, 1, 1),
      {
        year: 2026,
        monthlyEvents: [{ sunday: 1, eventId: "notInTheCatalog" }],
        weeklyEvents: [],
        individualEvents: []
      }
    )).toThrow("Unknown event ID: notInTheCatalog");
  });

  test("appends the ISO date only when requested and a link exists", () => {
    const withLink = getRecurringEvents(
      new Date(2026, 1, 1),
      {
        year: 2026,
        monthlyEvents: [],
        weeklyEvents: [{
          eventId: "foodMarket",
          overrides: {
            link: "https://example.com/events/",
            appendDateToLink: true
          }
        }],
        individualEvents: []
      }
    );

    expect(withLink[0].link).toBe("https://example.com/events/2026-02-01");

    const withoutLink = getRecurringEvents(
      new Date(2026, 1, 1),
      {
        year: 2026,
        monthlyEvents: [],
        weeklyEvents: [{
          eventId: "foodMarket",
          overrides: { appendDateToLink: true, link: null }
        }],
        individualEvents: []
      }
    );

    expect(withoutLink[0].link).toBeNull();
  });
});
