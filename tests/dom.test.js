import * as dom from "../js/dom.js"
import * as constants from "../js/constants.js"

describe("highlightToday", () => {
  test("adds today class when dates match", () => {
    const today = new Date(2026, 5, 10)
    const date = new Date(2026, 5, 10)
    const div = document.createElement("div")
    dom.highlightToday(date, today, div)
    expect(div.classList.contains("today")).toBe(true)
    expect(div.id).toBe("today")
  })

  test("doesn't add today class when dates don't match", () => {
    const today = new Date(2026, 5, 10)
    const date = new Date(2026, 6, 10)
    const div = document.createElement("div")
    dom.highlightToday(date, today, div)
    expect(div.classList.contains("today")).toBe(false)
    expect(div.id).not.toBe("today")
  })
})

describe("setPageTitle", () => {
  test("does nothing if #title element does not exist", () => {
    document.body.innerHTML = `<div id="not-title"></div>`  // no #title
    expect(() => dom.setPageTitle()).not.toThrow()
    expect(document.getElementById("title")).toBeNull()
  })

  test("sets #title textContent if element exists", () => {
    document.body.innerHTML = `<h1 id="title"></h1>`
    dom.setPageTitle()
    const title = document.getElementById("title")
    expect(title.textContent).toBe(`Acton & Chiswick Markets Calendar ${constants.YEAR}`)
  })
})

describe("getCalendarElement", () => {
  test("returns the #calendar element if it exists", () => {
    document.body.innerHTML = `<div id="calendar"></div>`
    const el = dom.getCalendarElement()
    expect(el).not.toBeNull()
    expect(el.id).toBe("calendar")
  })

  test("returns null if #calendar does not exist", () => {
    document.body.innerHTML = ``
    expect(dom.getCalendarElement()).toBeNull()
  })
})

describe("getMonthNavElement", () => {
  test("returns the #monthNav element if it exists", () => {
    document.body.innerHTML = `<nav id="monthNav"></nav>`
    const el = dom.getMonthNavElement()
    expect(el).not.toBeNull()
    expect(el.id).toBe("monthNav")
  })

  test("returns null if #monthNav does not exist", () => {
    document.body.innerHTML = ``
    expect(dom.getMonthNavElement()).toBeNull()
  })
})

describe("getTodayNavElement", () => {
  test("returns the #todayNav element if it exists", () => {
    document.body.innerHTML = `<nav id="todayNav"></nav>`
    const el = dom.getTodayNavElement()
    expect(el).not.toBeNull()
    expect(el.id).toBe("todayNav")
  })

  test("returns null if #todayNav does not exist", () => {
    document.body.innerHTML = ``
    expect(dom.getTodayNavElement()).toBeNull()
  })
})
