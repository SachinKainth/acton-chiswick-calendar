import * as constants from "./constants.js"

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
    const title = document.getElementById("title")
    if (title) {
        title.textContent = `Acton & Chiswick Markets Calendar ${constants.YEAR}`
    }
}

export function getCalendarElement() {
    return document.getElementById("calendar")
}

export function getMonthNavElement() {
    return document.getElementById("monthNav")
}

export function getTodayNavElement() {
	return document.getElementById("todayNav")
}