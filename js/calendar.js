import { events, regularEvents } from "./events.js"
import * as dateUtils from "../js/dateUtils.js"

export const YEAR = 2026

const months = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
]

export function eventsForSunday(sunday, date, ymd) {
	return regularEvents
		.filter(event => {
			if (event.sunday !== sunday) return false
			if (event.skipJanuary && date.getMonth() === 0) return false
			return true
		})
		.map(event => ({
			...event,
			link: event.link + ymd
		}))
}

export function getEventsForDate(date) {

	const key = dateUtils.formatDate(date)
	let dayEvents = []

	dayEvents = dayEvents.concat(recurringEvents(date))

	events.forEach(e => {
		if (e.date === key) dayEvents.push(e)
	})

	return dayEvents
}

export function highlightToday(date, today, dayDiv) {
	if (
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate()
	) {
		dayDiv.classList.add("today")
		dayDiv.id = "today"
	}
}

export function setPageTitle() {
	if (typeof document === "undefined") return

	const title = document.getElementById("title")
	if (title) {
		title.textContent = `Acton & Chiswick Markets Calendar ${YEAR}`
	}
}

export function getCalendarElement() {
	return typeof document !== "undefined"
		? document.getElementById("calendar")
		: null
}

export function getMonthNavElement() {
	return typeof document !== "undefined"
		? document.getElementById("monthNav")
		: null
}

export function getTodayNavElement() {
	return typeof document !== "undefined"
		? document.getElementById("todayNav")
		: null
}

export function setMonthLinks() {
	const monthNav = getMonthNavElement()
	if (!monthNav) return

	months.forEach((m, i) => {
		let link = document.createElement("a")
		link.href = `#month${i}`
		link.textContent = m.slice(0, 3)
		monthNav.appendChild(link)
	})
}

export function setTodayLink() {
	const todayNav = getTodayNavElement()
	if (!todayNav) return

	let link = document.createElement("a")
	link.href = `#today`
	link.textContent = "Today"
	todayNav.appendChild(link)
}

export function recurringEvents(date) {
	if (!dateUtils.isSunday(date)) return []

	const sunday = dateUtils.sundayOfMonth(date)
	const ymd = dateUtils.formatDate(date)

	return eventsForSunday(sunday, date, ymd)
}

function initCalendar() {
	setPageTitle()
	setMonthLinks()
	setTodayLink()
	buildCalendar()
}

function buildCalendar() {

	const calendar = getCalendarElement()
	if (!calendar) return

	calendar.innerHTML = ""

	const today = new Date()
	const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

	for (let m = 0; m < 12; m++) {

		const monthDiv = createMonth(m)

		const days = new Date(YEAR, m + 1, 0).getDate()

		for (let d = 1; d <= days; d++) {

			const date = new Date(YEAR, m, d)
			const weekday = date.getDay()

			const dayDiv = createDay(date, weekday, today, weekdays)

			const eventsDiv = renderEvents(date)

			dayDiv.appendChild(eventsDiv)

			monthDiv.appendChild(dayDiv)
		}

		calendar.appendChild(monthDiv)
	}
}

function createMonth(m) {

	const monthDiv = document.createElement("div")
	monthDiv.className = "month"
	monthDiv.id = `month${m}`

	const header = document.createElement("h2")
	header.textContent = months[m]

	monthDiv.appendChild(header)

	return monthDiv
}

function createDay(date, weekday, today, weekdays) {

	const dayDiv = document.createElement("div")

	if (weekday === 6) dayDiv.className = "day saturday"
	else if (weekday === 0) dayDiv.className = "day sunday"
	else dayDiv.className = "day"

	highlightToday(date, today, dayDiv)

	const dateDiv = document.createElement("div")
	dateDiv.className = "date"
	dateDiv.innerHTML = `${date.getDate()} <span class="weekday">(${weekdays[weekday]})</span>`

	dayDiv.appendChild(dateDiv)

	return dayDiv
}

function renderEvents(date) {

	const eventsDiv = document.createElement("div")
	eventsDiv.className = "events"

	const dayEvents = getEventsForDate(date)

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

if (typeof document !== "undefined") {
	initCalendar()
}