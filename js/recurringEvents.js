import * as dateUtils from "./dateUtils.js"
import * as events from "./events.js"

export function recurringEvents(date) {
    if (!dateUtils.isSunday(date)) return []

    const sunday = dateUtils.sundayOfMonth(date)
    const ymd = dateUtils.formatDate(date)

    return events.eventsForSunday(sunday, date, ymd)
}
