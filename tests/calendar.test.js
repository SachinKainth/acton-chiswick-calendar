import {
  YEAR,
  setPageTitle,
  formatDate,
  isSunday,
  sundayOfMonth,
  eventsForSunday,
  getEventsForDate,
  highlightToday,
  getCalendarElement,
  getMonthNavElement,
  getTodayNavElement
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
    const date = new Date(2026, 0, 7)
    expect(sundayOfMonth(date)).toBe(1)
  })

})

describe("eventsForSunday", () => {

  test("returns events for matching Sunday", () => {

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
    expect(result.length).toEqual(3)

  })

  test("skips those events that don't happen in January", () => {

    const sunday = 1
    const date = new Date(2026, 0, 4)
    const ymd = "2026-01-04"

    const result = eventsForSunday(sunday, date, ymd)

    const expected = regularEvents
      .filter(e => e.sunday === 1 && !e.skipJanuary)
      .map(e => ({
        ...e,
        link: e.link + ymd
      }))

    expect(result).toEqual(expected)
    expect(result.length).toEqual(2)

  })

})

describe("getEventsForDate", () => {

  test("includes events for matching date", () => {

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

  test("doesn't add today class when dates don't match", () => {

    const today = new Date(2026, 5, 10)
    const date = new Date(2026, 6, 10)

    const div = document.createElement("div")

    highlightToday(date, today, div)

    expect(div.classList.contains("today")).toBe(false)
    expect(div.id).not.toBe("today")

  })

})

describe("setPageTitle", () => {

  test("does nothing if document is undefined", () => {
    const originalDocument = global.document
    delete global.document  // simulate server environment

    expect(() => setPageTitle()).not.toThrow()

    global.document = originalDocument
  })

  test("does nothing if #title element does not exist", () => {
    document.body.innerHTML = `<div id="not-title"></div>`  // no #title

    expect(() => setPageTitle()).not.toThrow()
    // still no #title element
    expect(document.getElementById("title")).toBeNull()
  })

  test("sets #title textContent if element exists", () => {
    document.body.innerHTML = `<h1 id="title"></h1>`

    setPageTitle()

    const title = document.getElementById("title")
    expect(title.textContent).toBe(`Acton & Chiswick Markets Calendar ${YEAR}`)
  })

})

describe("DOM element getters", () => {

  describe("getCalendarElement", () => {
    test("returns null if document is undefined", () => {
      const originalDocument = global.document
      delete global.document
      expect(getCalendarElement()).toBeNull()
      global.document = originalDocument
    })

    test("returns the #calendar element if it exists", () => {
      document.body.innerHTML = `<div id="calendar"></div>`
      const el = getCalendarElement()
      expect(el).not.toBeNull()
      expect(el.id).toBe("calendar")
    })

    test("returns null if #calendar does not exist", () => {
      document.body.innerHTML = ``
      expect(getCalendarElement()).toBeNull()
    })
  })

  describe("getMonthNavElement", () => {
    test("returns null if document is undefined", () => {
      const originalDocument = global.document
      delete global.document
      expect(getMonthNavElement()).toBeNull()
      global.document = originalDocument
    })

    test("returns the #monthNav element if it exists", () => {
      document.body.innerHTML = `<nav id="monthNav"></nav>`
      const el = getMonthNavElement()
      expect(el).not.toBeNull()
      expect(el.id).toBe("monthNav")
    })

    test("returns null if #monthNav does not exist", () => {
      document.body.innerHTML = ``
      expect(getMonthNavElement()).toBeNull()
    })
  })

  describe("getTodayNavElement", () => {
    test("returns null if document is undefined", () => {
      const originalDocument = global.document
      delete global.document
      expect(getTodayNavElement()).toBeNull()
      global.document = originalDocument
    })

    test("returns the #todayNav element if it exists", () => {
      document.body.innerHTML = `<nav id="todayNav"></nav>`
      const el = getTodayNavElement()
      expect(el).not.toBeNull()
      expect(el.id).toBe("todayNav")
    })

    test("returns null if #todayNav does not exist", () => {
      document.body.innerHTML = ``
      expect(getTodayNavElement()).toBeNull()
    })
  })

})