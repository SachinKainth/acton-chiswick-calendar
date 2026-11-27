import { buildCalendar } from "../js/core/calendar.js";

describe("calendar year length", () => {
  test("renders 366 days for a leap-year dataset", () => {
    document.body.innerHTML = '<div id="calendar"></div>';

    buildCalendar({
      year: 2028,
      individualEvents: [],
      monthlyEvents: [],
      weeklyEvents: []
    });

    expect(document.querySelectorAll("#calendar .month")).toHaveLength(12);
    expect(document.querySelectorAll("#calendar .day")).toHaveLength(366);
  });
});
