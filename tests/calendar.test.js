import { YEAR, setPageTitle } from "../src/calendar.js"

describe("setPageTitle", () => {
  test("sets page title element correctly", () => {

    document.body.innerHTML = `<h1 id="title"></h1>`

    setPageTitle()

    expect(document.getElementById("title").textContent)
      .toBe(`Acton & Chiswick Markets Calendar ${YEAR}`)
  })
})