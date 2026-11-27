import { ACTIVE_YEAR } from "../config/calendar.config.js";
import * as dom from "./core/dom.js";
import { buildCalendar } from "./core/calendar.js";
import * as navigation from "./core/navigation.js";
import { getCalendarData } from "./data/index.js";

export async function initCalendar(year = ACTIVE_YEAR) {
  const calendarData = await getCalendarData(year);

  dom.setPageTitle(calendarData.year);
  navigation.setMonthLinks();
  navigation.setTodayLink();
  buildCalendar(calendarData);
}

// Initialise the public calendar using the single active-year setting.
initCalendar().catch(error => {
  console.error(error);
});
