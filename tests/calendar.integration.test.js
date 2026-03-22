/**
 * @jest-environment node
 */

import { JSDOM } from "jsdom"

describe("Calendar Integration Test", () => {

  test("all generated links return non-404 responses", async () => {

    const dom = new JSDOM(`<div id="calendar"></div><div id="title"></div>`)

    global.window = dom.window
    global.document = dom.window.document

    // Import AFTER DOM exists
    const calendar = await import("../js/calendar.js")

    calendar.buildCalendar()

    const links = Array.from(document.querySelectorAll(".day a"))
      .map(a => a.href)

    expect(links.length).toBeGreaterThan(0)

    const responses = await Promise.all(
      links.map(url => fetch(url))
    )

    responses.forEach((res, i) => {
      if (res.status >= 400) {
        throw new Error(`Broken link: ${links[i]} (${res.status})`)
      }
    })

  }, 60000)

})