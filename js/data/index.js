// Annual data is loaded directly from its year folder. Adding a new year does
// not require updating a central registry: add ./YEAR/calendar.js and select it
// in config/calendar.config.js when it is ready to be displayed.
export async function getCalendarData(year) {
  if (!Number.isSafeInteger(year) || year < 1900 || year > 9999) {
    throw new RangeError("Calendar year must be a four-digit integer");
  }

  const modulePath = "./" + year + "/calendar.js";
  let annualModule;

  try {
    annualModule = await import(modulePath);
  } catch (cause) {
    const error = new Error(
      "Unable to load annual calendar data for " + year + " from " + modulePath
    );
    error.cause = cause;
    throw error;
  }

  const calendarData = annualModule.calendarData;
  if (!calendarData || calendarData.year !== year) {
    throw new Error("Annual calendar data does not declare the expected year " + year);
  }

  return calendarData;
}
