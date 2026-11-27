import { ACTIVE_YEAR } from "../config/calendar.config.js";
import * as dom from "./core/dom.js";
import { buildCalendar } from "./core/calendar.js";
import * as navigation from "./core/navigation.js";
import { getCalendarData } from "./data/index.js";

function renderBuildInfo() {
  const buildInfo = globalThis.CALENDAR_BUILD_INFO;
  const footer = globalThis.document.getElementById("buildInfo");

  if (!footer || !buildInfo?.sha) return;

  const link = globalThis.document.createElement("a");
  link.href = `https://github.com/SachinKainth/acton-chiswick-calendar/commit/${buildInfo.sha}`;
  link.textContent = buildInfo.sha === "development" ? "development" : buildInfo.sha.slice(0, 7);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.title = `View commit ${buildInfo.sha}`;

  footer.append("Build: ", link);
  if (buildInfo.deployedAt) footer.append(` · deployed ${buildInfo.deployedAt}`);
}

renderBuildInfo();

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
