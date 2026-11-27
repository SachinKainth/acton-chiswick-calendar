export function highlightToday(date, today, dayDiv) {
  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) {
    dayDiv.classList.add("today");
    dayDiv.id = "today";
  }
}

export function setPageTitle(year) {
  const elements = document.getElementsByClassName("title");
  for (let i = 0; i < elements.length; i++) {
    elements[i].textContent = "Acton & Chiswick Markets Calendar " + year;
  }
}

export function getCalendarElement() {
  return document.getElementById("calendar");
}

export function getMonthNavElement() {
  return document.getElementById("monthNav");
}

export function getTodayNavElement() {
  return document.getElementById("todayNav");
}
