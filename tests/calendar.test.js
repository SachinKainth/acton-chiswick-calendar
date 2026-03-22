import * as calendar from "../js/calendar.js"
import * as dom from "../js/dom.js"
import * as events from "../js/events.js"

describe("buildCalendar", () => {
  beforeEach(() => {
    // Reset the DOM for each test
    document.body.innerHTML = `<div id="calendar"></div>`
    jest.spyOn(dom, "highlightToday")
    jest.spyOn(events, "getEventsForDate").mockReturnValue([])
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test("creates a calendar container with 12 months", () => {
    calendar.buildCalendar()
    const calendarEl = document.getElementById("calendar")
    expect(calendarEl).not.toBeNull()

    // Assuming each month gets a .month container
    const months = calendarEl.querySelectorAll(".month")
    expect(months.length).toBe(12)
  })

  test("each month contains day divs", () => {
    calendar.buildCalendar()
    const calendarEl = document.getElementById("calendar")
    const dayDivs = calendarEl.querySelectorAll(".day")
    expect(dayDivs.length).toBeGreaterThan(0) // there should be some day divs
  })

  test("calls highlightToday for each day", () => {
    calendar.buildCalendar()
    expect(dom.highlightToday).toHaveBeenCalled()
  })

  test("attaches events to day divs if present", () => {
    // Mock one day to have an event
    const mockEvent = [{ name: "Test Event" }]
    events.getEventsForDate.mockImplementation((date) => {
      return date.getDate() === 1 ? mockEvent : []
    })

    calendar.buildCalendar()

    const calendarEl = document.getElementById("calendar")
    const firstDay = calendarEl.querySelector(".day")
    expect(firstDay.innerHTML).toContain("Test Event")
  })

  test("creates link to website if link exists", () => {
    // Mock one day to have an event with a link
    const mockEvent = [{ name: "Test Event", link: "http://event.com/" }]
    events.getEventsForDate.mockImplementation((date) => {
      return date.getDate() === 1 ? mockEvent : []
    })

    calendar.buildCalendar()

    const calendarEl = document.getElementById("calendar")
    const firstDay = calendarEl.querySelector(".day")
    const link = firstDay.querySelector("a")

    expect(link).not.toBeNull()
    expect(link.href).toBe("http://event.com/")
  })

  test("calendar element is empty before building", () => {
    const calendarEl = document.getElementById("calendar")
    calendarEl.innerHTML = "<p>Old content</p>"
    calendar.buildCalendar()
    expect(calendarEl.innerHTML).not.toContain("Old content")
  })
})