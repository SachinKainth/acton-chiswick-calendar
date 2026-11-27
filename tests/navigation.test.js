import * as navigation from "../js/core/navigation.js";

describe("setTodayLink", () => {
  test("does nothing if the today navigation element doesn't exist", () => {
    document.body.innerHTML = '<div id="notTodayNav"></div>';
    expect(() => navigation.setTodayLink()).not.toThrow();
    expect(document.getElementById("todayNav")).toBeNull();
  });

  test("appends a Today link when the element exists", () => {
    document.body.innerHTML = '<nav id="todayNav"></nav>';
    navigation.setTodayLink();
    const link = document.querySelector("#todayNav a");
    expect(link.textContent).toBe("Today");
    expect(link.getAttribute("href")).toBe("#today");
  });
});

describe("setMonthLinks", () => {
  test("does nothing if the month navigation element doesn't exist", () => {
    document.body.innerHTML = '<div id="notMonthNav"></div>';
    expect(() => navigation.setMonthLinks()).not.toThrow();
    expect(document.getElementById("monthNav")).toBeNull();
  });

  test("creates the twelve month links", () => {
    document.body.innerHTML = '<nav id="monthNav"></nav>';
    navigation.setMonthLinks();

    const links = document.querySelectorAll("#monthNav a");
    const expected = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    expect(links).toHaveLength(12);
    links.forEach((link, index) => {
      expect(link.textContent).toBe(expected[index]);
      expect(link.getAttribute("href")).toBe("#month" + index);
    });
  });
});
