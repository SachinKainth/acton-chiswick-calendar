import * as events from "../js/events.js"

describe("eventsForSunday", () => {

  test("returns events for matching Sunday", () => {

    const sunday = 1
    const date = new Date(2026, 1, 1)
    const ymd = "2026-02-01"

    const result = events.eventsForSunday(sunday, date, ymd)

    const expected = events.regularEvents
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

    const result = events.eventsForSunday(sunday, date, ymd)

    const expected = events.regularEvents
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

    const event = events.individualEvents[0]
    const date = new Date(event.date)

    const result = events.getEventsForDate(date)

    expect(result.some(e => e.name === event.name)).toBe(true)

  })

})
