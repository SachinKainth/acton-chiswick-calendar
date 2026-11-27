import * as dateUtils from "../js/core/dateUtils.js";

describe("formatDate", () => {
  test("formats date as YYYY-MM-DD", () => {
    expect(dateUtils.formatDate(new Date(2026, 10, 15))).toBe("2026-11-15");
  });

  test("pads single digit month and day", () => {
    expect(dateUtils.formatDate(new Date(2026, 8, 3))).toBe("2026-09-03");
  });
});

describe("isSunday", () => {
  test("returns true for Sunday", () => {
    expect(dateUtils.isSunday(new Date(2026, 0, 4))).toBe(true);
  });

  test("returns false for non-Sunday", () => {
    expect(dateUtils.isSunday(new Date(2026, 0, 5))).toBe(false);
  });
});

describe("sundayOfMonth", () => {
  test("identifies the first Sunday", () => {
    expect(dateUtils.sundayOfMonth(new Date(2026, 0, 4))).toBe(1);
  });

  test("identifies the third Sunday", () => {
    expect(dateUtils.sundayOfMonth(new Date(2026, 0, 18))).toBe(3);
  });

  test("retains existing behaviour for a non-Sunday date", () => {
    expect(dateUtils.sundayOfMonth(new Date(2026, 0, 7))).toBe(1);
  });
});
