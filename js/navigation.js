import * as dom from "./dom.js"
import * as constants from "./constants.js"

export function setMonthLinks() {
	const monthNav = dom.getMonthNavElement()
	if (!monthNav) return

	constants.months.forEach((m, i) => {
		let link = document.createElement("a")
		link.href = `#month${i}`
		link.textContent = m.slice(0, 3)
		monthNav.appendChild(link)
	})
}

export function setTodayLink() {
	const todayNav = dom.getTodayNavElement()
	if (!todayNav) return

	let link = document.createElement("a")
	link.href = `#today`
	link.textContent = "Today"
	todayNav.appendChild(link)
}
