import * as navigation from "../js/navigation.js"
  
describe("setTodayLink", () => {

    test("does nothing if #todayNav element does not exist", () => {
        document.body.innerHTML = `<div id="notTodayNav"></div>` // no #todayNav
        expect(() => navigation.setTodayLink()).not.toThrow()
        expect(document.getElementById("todayNav")).toBeNull()
    })

    test("appends a single link if #todayNav exists", () => {
        document.body.innerHTML = `<nav id="todayNav"></nav>`

        const todayNav = document.getElementById("todayNav")
        
        navigation.setTodayLink()

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

        expect(() => navigation.setMonthLinks()).not.toThrow()
        expect(document.getElementById("monthNav")).toBeNull()
    })

    test("creates 12 month links if #monthNav exists", () => {
        document.body.innerHTML = `<nav id="monthNav"></nav>`

        const monthNav = document.getElementById("monthNav")

        navigation.setMonthLinks()

        const links = monthNav.querySelectorAll("a")
        expect(links.length).toBe(12)

        const expectedText = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

        links.forEach((link, i) => {
        expect(link.textContent).toBe(expectedText[i])
        expect(link.getAttribute("href")).toBe(`#month${i}`)
        })
    })

})