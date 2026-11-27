import { months } from "../constants.js";
import * as dom from "./dom.js";

export function setMonthLinks(monthNames = months) {
  const monthNav = dom.getMonthNavElement();
  if (!monthNav) return;

  monthNames.forEach((month, index) => {
    const link = document.createElement("a");
    link.href = "#month" + index;
    link.textContent = month.slice(0, 3);
    monthNav.appendChild(link);
  });
}

export function setTodayLink() {
  const todayNav = dom.getTodayNavElement();
  if (!todayNav) return;

  const link = document.createElement("a");
  link.href = "#today";
  link.textContent = "Today";
  todayNav.appendChild(link);
}
