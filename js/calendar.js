import * as events from "./events.js"
import * as dom from "./dom.js"
import * as navigation from "./navigation.js"
import * as constants from "./constants.js"

export function buildCalendar() {
	const calendar = dom.getCalendarElement()
	if (!calendar) return

	calendar.innerHTML = ""

	const today = new Date()
	const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

	for (let m = 0; m < 12; m++) {

		const monthDiv = createMonth(m)

		const days = new Date(constants.YEAR, m + 1, 0).getDate()

		for (let d = 1; d <= days; d++) {

			const date = new Date(constants.YEAR, m, d)
			const weekday = date.getDay()

			const dayDiv = createDay(date, weekday, today, weekdays)

			const eventsDiv = renderEvents(date)

			dayDiv.appendChild(eventsDiv)

			monthDiv.appendChild(dayDiv)
		}

		calendar.appendChild(monthDiv)
	}
}

function initCalendar() {
	dom.setPageTitle()
	navigation.setMonthLinks()
	navigation.setTodayLink()
	buildCalendar()
}

function createMonth(m) {

	const monthDiv = document.createElement("div")
	monthDiv.className = "month"
	monthDiv.id = `month${m}`

	const header = document.createElement("h2")
	header.textContent = constants.months[m]

	monthDiv.appendChild(header)

	return monthDiv
}

function createDay(date, weekday, today, weekdays) {

	const dayDiv = document.createElement("div")

	if (weekday === 6) dayDiv.className = "day saturday"
	else if (weekday === 0) dayDiv.className = "day sunday"
	else dayDiv.className = "day"

	dom.highlightToday(date, today, dayDiv)

	const dateDiv = document.createElement("div")
	dateDiv.className = "date"
	dateDiv.innerHTML = `${date.getDate()} <span class="weekday">(${weekdays[weekday]})</span>`

	dayDiv.appendChild(dateDiv)

	return dayDiv
}

function renderEvents(date) {

	const eventsDiv = document.createElement("div")
	eventsDiv.className = "events"

	const dayEvents = events.getEventsForDate(date)

	dayEvents.forEach(e => {

		const event = document.createElement("div")
		event.className = "event " + e.class

		if (e.link) {
			event.innerHTML =
				`<a href="${e.link}" target="_blank"><strong>${e.name}</strong> | ${e.location} | ${e.time}</a>`
		} else {
			event.innerHTML =
				`<strong>${e.name}</strong> | ${e.location} | ${e.time}`
		}

		eventsDiv.appendChild(event)

	})

	return eventsDiv
}

initCalendar()
