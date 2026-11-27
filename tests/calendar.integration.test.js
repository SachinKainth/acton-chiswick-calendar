/**
 * @jest-environment node
 */

import { JSDOM } from "jsdom";
import { buildCalendar } from "../js/core/calendar.js";
import { getEventsForDate } from "../js/core/eventEngine.js";
import { getCalendarData } from "../js/data/index.js";

describe("Calendar integration", () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM('<div id="calendar"></div>');
    global.window = dom.window;
    global.document = dom.window.document;
  });

  afterEach(() => {
    dom.window.close();
    delete global.window;
    delete global.document;
  });

  test("renders all 139 events in the corrected 2026 calendar", async () => {
    buildCalendar(await getCalendarData(2026));
    expect(document.querySelectorAll(".event")).toHaveLength(139);

    const links = Array.from(document.querySelectorAll(".day a"));
    expect(links.length).toBeGreaterThan(0);
    expect(links.every(link => /^https?:\/\//.test(link.href))).toBe(true);
  });

  test("renders 2027 without carrying over the 2026 one-off events", async () => {
    buildCalendar(await getCalendarData(2027));

    expect(document.querySelectorAll(".month")).toHaveLength(12);
    expect(document.querySelectorAll(".day")).toHaveLength(365);
    expect(document.querySelectorAll(".event")).toHaveLength(121);

    const eventLabels = Array.from(document.querySelectorAll(".event"))
      .map(event => event.textContent);

    expect(eventLabels.some(label => label.includes("Makers Market"))).toBe(false);
    expect(eventLabels.some(label => label.includes("Art | Chiswick High Road"))).toBe(false);
    expect(eventLabels.some(label => label.includes("W4 Art & Design Winter Fair"))).toBe(false);
  });

  test("excludes The Food Market on Easter Sunday 2027 under the organiser's policy", async () => {
    const calendarData = await getCalendarData(2027);
    const easterSunday = new Date(2027, 2, 28);
    const previousSunday = new Date(2027, 2, 21);

    expect(getEventsForDate(easterSunday, calendarData)
      .some(event => event.name === "The Food Market")).toBe(false);
    expect(getEventsForDate(previousSunday, calendarData)
      .some(event => event.name === "The Food Market")).toBe(true);
  });
});
