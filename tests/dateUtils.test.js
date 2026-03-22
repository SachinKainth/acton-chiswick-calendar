import * as dateUtils from "../js/dateUtils.js"

describe("formatDate", () => {

  test("formats date as YYYY-MM-DD", () => {
    const date = new Date(2026, 10, 15)
    expect(dateUtils.formatDate(date)).toBe("2026-11-15")
  })

  test("pads single digit month and day", () => {
    const date = new Date(2026, 8, 3)
    expect(dateUtils.formatDate(date)).toBe("2026-09-03")
  })

})

describe("isSunday", () => {

  test("returns true for Sunday", () => {
    const date = new Date(2026, 0, 4)
    expect(dateUtils.isSunday(date)).toBe(true)
  })

  test("returns false for non Sunday", () => {
    const date = new Date(2026, 0, 5)
    expect(dateUtils.isSunday(date)).toBe(false)
  })

})

describe("sundayOfMonth", () => {

  test("first Sunday of month", () => {
    const date = new Date(2026, 0, 4)
    expect(dateUtils.sundayOfMonth(date)).toBe(1)
  })

  test("third Sunday of month", () => {
    const date = new Date(2026, 0, 18)
    expect(dateUtils.sundayOfMonth(date)).toBe(3)
  })

  test("not a Sunday", () => {
    const date = new Date(2026, 0, 7)
    expect(dateUtils.sundayOfMonth(date)).toBe(1)
  })

})