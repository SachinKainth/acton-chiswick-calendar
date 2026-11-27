import * as dom from "../js/core/dom.js";

describe("highlightToday", () => {
  test("adds today class when dates match", () => {
    const today = new Date(2026, 5, 10);
    const day = document.createElement("div");
    dom.highlightToday(new Date(2026, 5, 10), today, day);
    expect(day.classList.contains("today")).toBe(true);
    expect(day.id).toBe("today");
  });

  test("doesn't add today class when dates don't match", () => {
    const today = new Date(2026, 5, 10);
    const day = document.createElement("div");
    dom.highlightToday(new Date(2026, 6, 10), today, day);
    expect(day.classList.contains("today")).toBe(false);
    expect(day.id).not.toBe("today");
  });
});

describe("setPageTitle", () => {
  test("does nothing if no title element exists", () => {
    document.body.innerHTML = '<div class="not-title"></div>';
    expect(() => dom.setPageTitle(2026)).not.toThrow();
    expect(document.getElementsByClassName("title")).toHaveLength(0);
  });

  test("sets every title element using the supplied year", () => {
    document.body.innerHTML =
      '<title class="title"></title><h1 class="title"></h1>';
    dom.setPageTitle(2027);
    const elements = document.getElementsByClassName("title");
    expect(elements[0].textContent).toBe("Greater London Markets & Events Calendar 2027");
    expect(elements[1].textContent).toBe("Greater London Markets & Events Calendar 2027");
  });
});

describe("calendar and navigation element lookups", () => {
  test("returns the calendar element or null", () => {
    document.body.innerHTML = '<div id="calendar"></div>';
    expect(dom.getCalendarElement().id).toBe("calendar");
    document.body.innerHTML = "";
    expect(dom.getCalendarElement()).toBeNull();
  });

  test("returns the month navigation element or null", () => {
    document.body.innerHTML = '<nav id="monthNav"></nav>';
    expect(dom.getMonthNavElement().id).toBe("monthNav");
    document.body.innerHTML = "";
    expect(dom.getMonthNavElement()).toBeNull();
  });

  test("returns the today navigation element or null", () => {
    document.body.innerHTML = '<nav id="todayNav"></nav>';
    expect(dom.getTodayNavElement().id).toBe("todayNav");
    document.body.innerHTML = "";
    expect(dom.getTodayNavElement()).toBeNull();
  });
});
