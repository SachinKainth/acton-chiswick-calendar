import * as calendar from "../js/core/calendar.js";
import * as dom from "../js/core/dom.js";
import * as eventEngine from "../js/core/eventEngine.js";
import { getCalendarData } from "../js/data/index.js";

describe("buildCalendar", () => {
  let calendarData;

  beforeAll(async () => {
    calendarData = await getCalendarData(2026);
  });

  beforeEach(() => {
    document.body.innerHTML = '<div id="calendar"></div>';
    jest.spyOn(dom, "highlightToday");
    jest.spyOn(eventEngine, "getEventsForDate").mockReturnValue([]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("creates a calendar container with 12 months", () => {
    calendar.buildCalendar(calendarData);
    const calendarEl = document.getElementById("calendar");
    expect(calendarEl).not.toBeNull();
    expect(calendarEl.querySelectorAll(".month")).toHaveLength(12);
  });

  test("creates one day element for every day in the selected year", () => {
    calendar.buildCalendar(calendarData);
    expect(document.querySelectorAll("#calendar .day")).toHaveLength(365);
  });

  test("calls highlightToday for each day", () => {
    calendar.buildCalendar(calendarData);
    expect(dom.highlightToday).toHaveBeenCalledTimes(365);
  });

  test("attaches events to the relevant day", () => {
    eventEngine.getEventsForDate.mockImplementation(date =>
      date.getDate() === 1 ? [{ name: "Test Event", class: "test" }] : []
    );

    calendar.buildCalendar(calendarData);

    const firstDay = document.querySelector("#month0 .day");
    expect(firstDay.innerHTML).toContain("Test Event");
  });

  test("creates a link when an event has a link", () => {
    eventEngine.getEventsForDate.mockImplementation(date =>
      date.getDate() === 1
        ? [{ name: "Test Event", class: "test", link: "https://example.com/" }]
        : []
    );

    calendar.buildCalendar(calendarData);

    const link = document.querySelector("#month0 .day a");
    expect(link).not.toBeNull();
    expect(link.href).toBe("https://example.com/");
  });

  test("clears old calendar content before rendering", () => {
    const calendarEl = document.getElementById("calendar");
    calendarEl.innerHTML = "<p>Old content</p>";
    calendar.buildCalendar(calendarData);
    expect(calendarEl.innerHTML).not.toContain("Old content");
  });

  test("does nothing when the calendar container is missing", () => {
    document.body.innerHTML = "";
    expect(() => calendar.buildCalendar(calendarData)).not.toThrow();
  });
});
