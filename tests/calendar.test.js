import {
  YEAR,
  setPageTitle,
  highlightToday,
  getCalendarElement,
  getMonthNavElement,
  getTodayNavElement,
  setMonthLinks,
  setTodayLink,
} from "../js/calendar.js"

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

describe("DOM element getters", () => {

  describe("setTodayLink", () => {

    test("does nothing if #todayNav element does not exist", () => {
      document.body.innerHTML = `<div id="notTodayNav"></div>` // no #todayNav
      expect(() => setTodayLink()).not.toThrow()
      expect(document.getElementById("todayNav")).toBeNull()
    })

    test("appends a single link if #todayNav exists", () => {
      document.body.innerHTML = `<nav id="todayNav"></nav>`

      const todayNav = document.getElementById("todayNav")
      
      setTodayLink()

      const links = todayNav.querySelectorAll("a")
      expect(links.length).toBe(1)

      const link = links[0]
      expect(link.textContent).toBe("Today")
      expect(link.getAttribute("href")).toBe("#today")
    })

  })

  describe("setMonthLinks", () => {

    test("does nothing if #monthNav does not exist", () => {
      document.body.innerHTML = `<div id="notMonthNav"></div>` // no #monthNav

      expect(() => setMonthLinks()).not.toThrow()
      expect(document.getElementById("monthNav")).toBeNull()
    })

    test("creates 12 month links if #monthNav exists", () => {
      document.body.innerHTML = `<nav id="monthNav"></nav>`

      const monthNav = document.getElementById("monthNav")

      setMonthLinks()

      const links = monthNav.querySelectorAll("a")
      expect(links.length).toBe(12)

      const expectedText = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

      links.forEach((link, i) => {
        expect(link.textContent).toBe(expectedText[i])
        expect(link.getAttribute("href")).toBe(`#month${i}`)
      })
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