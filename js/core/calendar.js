import * as dom from "./dom.js";
import * as eventEngine from "./eventEngine.js";
import { months } from "../constants.js";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function buildCalendar(calendarData, today = new Date()) {
  const calendar = dom.getCalendarElement();
  if (!calendar) return;

  calendar.innerHTML = "";

  for (let month = 0; month < 12; month++) {
    const monthDiv = createMonth(month);

    const daysInMonth = new Date(calendarData.year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(calendarData.year, month, day);
      const weekday = date.getDay();
      const dayDiv = createDay(date, weekday, today);
      const eventsDiv = renderEvents(date, calendarData);

      dayDiv.appendChild(eventsDiv);
      monthDiv.appendChild(dayDiv);
    }

    calendar.appendChild(monthDiv);
  }
}

function createMonth(month) {
  const monthDiv = document.createElement("div");
  monthDiv.className = "month";
  monthDiv.id = "month" + month;

  const header = document.createElement("h2");
  header.textContent = months[month];
  monthDiv.appendChild(header);

  return monthDiv;
}

function createDay(date, weekday, today) {
  const dayDiv = document.createElement("div");

  if (weekday === 6) dayDiv.className = "day saturday";
  else if (weekday === 0) dayDiv.className = "day sunday";
  else dayDiv.className = "day";

  dom.highlightToday(date, today, dayDiv);

  const dateDiv = document.createElement("div");
  dateDiv.className = "date";
  dateDiv.innerHTML = date.getDate() +
    ' <span class="weekday">(' + weekdays[weekday] + ")</span>";

  dayDiv.appendChild(dateDiv);
  return dayDiv;
}

function renderEvents(date, calendarData) {
  const eventsDiv = document.createElement("div");
  eventsDiv.className = "events";

  const dayEvents = eventEngine.getEventsForDate(date, calendarData);

  dayEvents.forEach(eventData => {
    const event = document.createElement("div");
    event.className = "event " + eventData.class;

    if (eventData.link) {
      event.innerHTML =
        '<a href="' + eventData.link + '" target="_blank"><strong>' +
        eventData.name + "</strong> | " + eventData.location + " | " +
        eventData.time + "</a>";
    } else {
      event.innerHTML =
        "<strong>" + eventData.name + "</strong> | " +
        eventData.location + " | " + eventData.time;
    }

    eventsDiv.appendChild(event);
  });

  return eventsDiv;
}
