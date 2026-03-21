const YEAR = 2026

const calendar = document.getElementById("calendar")
const monthNav = document.getElementById("monthNav")
const todayNav = document.getElementById("todayNav")

const months = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
]

setPageTitle()
setMonthLinks()
setTodayLink()
buildCalendar()

function setTodayLink() {
	let link = document.createElement("a")
	link.href = `#today`
	link.textContent = 'Today'
	todayNav.appendChild(link)
}

function setMonthLinks() {
	months.forEach((m, i) => {
		let link = document.createElement("a")
		link.href = `#month${i}`
		link.textContent = m.slice(0, 3)
		monthNav.appendChild(link)
	})
}

function setPageTitle() {
	document.getElementById("title").textContent =
		`Acton & Chiswick Markets Calendar ${YEAR}`
}

function recurringEvents(date) {
  
	let list = []

	if (date.getDay() !== 0) return list

	let sunday = Math.ceil(date.getDate() / 7)
    const ymd = formatDate(date)

	if (sunday === 1) {
		list.push({
			name: "Flowers",
			location: "Old Market Place",
			time: "09:00–15:30",
			area: "chiswick",
			class: "flowers",
			link: "https://chiswickcalendar.co.uk/event/chiswick-flower-market-old-market-place/" + ymd
		})

		list.push({
			name: "Duck Pond",
			location: "Chiswick House & Gardens",
			time: "10:00–16:00",
			area: "chiswick",
			class: "duck",
			link: "https://chiswickcalendar.co.uk/event/duck-pond-market-chiswick-house-gardens/" + ymd
		})

		if (date.getMonth() !== 0) {
			list.push({
				name: "Car Boot Sale",
				location: "Chiswick School",
				time: "06:30–12:30",
				area: "chiswick",
				class: "car",
				link: "https://chiswickcalendar.co.uk/event/chiswick-car-boot-sale-chiswick-school/" + ymd
			})
		}
	}

	if (sunday === 2) {
		list.push({
			name: "Antiques",
			location: "Old Market Place",
			time: "09:00–15:00",
			area: "chiswick",
			class: "antiques",
			link: "https://chiswickcalendar.co.uk/event/chiswick-antiques-vintage-market-old-market-place/" + ymd
		})
	}

	if (sunday === 3) {
		list.push({
			name: "Cheese",
			location: "Old Market Place",
			time: "09:30–15:00",
			area: "chiswick",
			class: "cheese",
			link: "https://chiswickcalendar.co.uk/event/chiswick-cheese-market-the-old-market-place/" + ymd
		})
	}

	if (sunday === 4) {
		list.push({
			name: "FoodSt",
			location: "Old Market Place",
			time: "11:00–16:00",
			area: "chiswick",
			class: "streetfood",
			link: "https://chiswickcalendar.co.uk/event/foodst-old-market-place/" + ymd
		})
	}

	return list
}

function highlightToday(date, today, dayDiv) {
	if (date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()) {
      dayDiv.classList.add("today")
	  dayDiv.id = 'today'
    }
}

function formatDate(date) {
	return date.getFullYear() + "-" +
    	String(date.getMonth() + 1).padStart(2, "0") + "-" +
    	String(date.getDate()).padStart(2, "0")
}

function buildCalendar() {

	calendar.innerHTML = ""

	let today = new Date()
	let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

	for (let m = 0; m < 12; m++) {

		let monthDiv = document.createElement("div")
		monthDiv.className = "month"
		monthDiv.id = `month${m}`

		let header = document.createElement("h2")
		header.textContent = months[m]

		monthDiv.appendChild(header)

		let days = new Date(YEAR, m + 1, 0).getDate()

		for (let d = 1; d <= days; d++) {

			let date = new Date(YEAR, m, d)

			let dayDiv = document.createElement("div")

			let weekday = date.getDay()

			if (weekday === 6) dayDiv.className = "day saturday"
			else if (weekday === 0) dayDiv.className = "day sunday"
			else dayDiv.className = "day"

            highlightToday(date, today, dayDiv)
			
			let dateDiv = document.createElement("div")
			dateDiv.className = "date"
			dateDiv.innerHTML = `${d} <span class="weekday">(${weekdays[weekday]})</span>`

			let eventsDiv = document.createElement("div")
			eventsDiv.className = "events"

			let key = formatDate(date)

			let dayEvents = []
			dayEvents = dayEvents.concat(recurringEvents(date))

			events.forEach(e => {
				if (e.date === key) dayEvents.push(e)
			})

			dayEvents.forEach(e => {

				let event = document.createElement("div")

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

			dayDiv.appendChild(dateDiv)
			dayDiv.appendChild(eventsDiv)

			monthDiv.appendChild(dayDiv)

		}

		calendar.appendChild(monthDiv)

	}

}

