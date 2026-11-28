import { buildCalendar } from "../js/core/calendar.js";

describe("calendar year length", () => {
  test("retains leap-day events in a sparse leap-year calendar", () => {
    document.body.innerHTML = '<div id="calendar"></div>';

    buildCalendar({
      year: 2028,
      individualEvents: [{ date: "2028-02-29", eventId: "flowers" }],
      monthlyEvents: [],
      weeklyEvents: []
    });

    expect(document.querySelectorAll("#calendar .month")).toHaveLength(12);
    expect(document.querySelectorAll("#calendar .day")).toHaveLength(1);
    expect(document.querySelector("#calendar .day .date").textContent).toContain("29");
  });
});
