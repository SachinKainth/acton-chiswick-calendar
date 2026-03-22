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
    if (typeof document === "undefined") return

    const title = document.getElementById("title")
    if (title) {
        title.textContent = `Acton & Chiswick Markets Calendar ${constants.YEAR}`
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