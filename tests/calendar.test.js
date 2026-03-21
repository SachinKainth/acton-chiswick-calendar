import {
  YEAR,
  setPageTitle,
  formatDate,
  isSunday,
  sundayOfMonth,
  eventsForSunday,
  getEventsForDate,
  highlightToday
} from "../js/calendar.js"

import { events, regularEvents } from "../js/events.js"

describe("formatDate", () => {

  test("formats date as YYYY-MM-DD", () => {
    const date = new Date(2026, 10, 15)
    expect(formatDate(date)).toBe("2026-11-15")
  })

  test("pads single digit month and day", () => {
    const date = new Date(2026, 8, 3)
    expect(formatDate(date)).toBe("2026-09-03")
  })

})

describe("isSunday", () => {

  test("returns true for Sunday", () => {
    const date = new Date(2026, 0, 4)
    expect(isSunday(date)).toBe(true)
  })

  test("returns false for non Sunday", () => {
    const date = new Date(2026, 0, 5)
    expect(isSunday(date)).toBe(false)
  })

})

describe("sundayOfMonth", () => {

  test("first Sunday of month", () => {
    const date = new Date(2026, 0, 4)
    expect(sundayOfMonth(date)).toBe(1)
  })

  test("third Sunday of month", () => {
    const date = new Date(2026, 0, 18)
    expect(sundayOfMonth(date)).toBe(3)
  })

  test("not a Sunday", () => {
    const date = new Date(2026, 0, 6)
    expect(sundayOfMonth(date)).toBe(1)
  })

})

describe("eventsForSunday", () => {

  test("returns events for matching sunday", () => {

    const sunday = 1
    const date = new Date(2026, 1, 1)
    const ymd = "2026-02-01"

    const result = eventsForSunday(sunday, date, ymd)

    const expected = regularEvents
      .filter(e => e.sunday === 1)
      .map(e => ({
        ...e,
        link: e.link + ymd
      })) 

    expect(result).toEqual(expected)

  })

})

describe("getEventsForDate", () => {

  test("includes fixed events for matching date", () => {

    const event = events[0]
    const date = new Date(event.date)

    const result = getEventsForDate(date)

    expect(result.some(e => e.name === event.name)).toBe(true)

  })

})

describe("highlightToday", () => {

  test("adds today class when dates match", () => {

    const today = new Date(2026, 5, 10)
    const date = new Date(2026, 5, 10)

    const div = document.createElement("div")

    highlightToday(date, today, div)

    expect(div.classList.contains("today")).toBe(true)
    expect(div.id).toBe("today")

  })

})

describe("setPageTitle", () => {

  test("sets page title text", () => {

    document.body.innerHTML =
      `<h1 id="title"></h1>`

    setPageTitle()

    const title = document.getElementById("title").textContent

    expect(title).toBe(`Acton & Chiswick Markets Calendar ${YEAR}`)

  })

})