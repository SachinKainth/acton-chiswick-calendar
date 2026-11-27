import * as dateUtils from "./dateUtils.js";
import { eventCatalog } from "../data/eventCatalog.js";

function resolveEvent(scheduledEvent, date) {
  const definition = eventCatalog[scheduledEvent.eventId];
  if (!definition) {
    throw new Error("Unknown event ID: " + scheduledEvent.eventId);
  }

  const month = date.getMonth() + 1;
  const dateKey = dateUtils.formatDate(date);

  const {
    appendDateToLink: catalogAppendsDate,
    overridesByMonth: catalogOverridesByMonth = {},
    ...catalogDefaults
  } = definition;

  const {
    appendDateToLink: annualAppendsDate,
    ...annualOverrides
  } = scheduledEvent.overrides || {};
  const annualOverridesByDate = scheduledEvent.overridesByDate || {};

  const {
    appendDateToLink: catalogMonthAppendsDate,
    ...catalogMonthOverrides
  } = catalogOverridesByMonth[month] || {};

  const {
    appendDateToLink: annualMonthAppendsDate,
    ...annualMonthOverrides
  } = scheduledEvent.overridesByMonth?.[month] || {};

  const {
    appendDateToLink: annualDateAppendsDate,
    ...annualDateOverrides
  } = annualOverridesByDate[dateKey] || {};

  const event = {
    ...catalogDefaults,
    ...catalogMonthOverrides,
    ...annualOverrides,
    ...annualMonthOverrides,
    ...annualDateOverrides
  };

  const shouldAppendDate =
    annualDateAppendsDate ??
    annualMonthAppendsDate ??
    annualAppendsDate ??
    catalogMonthAppendsDate ??
    catalogAppendsDate;

  if (shouldAppendDate && event.link) {
    event.link += dateKey;
  }

  return event;
}

export function getRecurringEvents(date, calendarData) {
  if (!dateUtils.isSunday(date)) return [];

  const sunday = dateUtils.sundayOfMonth(date);
  const dateKey = dateUtils.formatDate(date);

  const monthlyEvents = calendarData.monthlyEvents
    .filter(event => {
      if (event.sunday !== sunday) return false;
      if ((event.skipMonths || []).includes(date.getMonth())) return false;
      if ((event.skipDates || []).includes(dateKey)) return false;
      return true;
    })
    .map(event => resolveEvent(event, date));

  const weeklyEvents = calendarData.weeklyEvents
    .filter(event => !(event.skipDates || []).includes(dateKey))
    .map(event => resolveEvent(event, date));

  return monthlyEvents.concat(weeklyEvents);
}

export function getEventsForDate(date, calendarData) {
  if (date.getFullYear() !== calendarData.year) return [];

  const recurringEvents = getRecurringEvents(date, calendarData);
  const individualEvents = calendarData.individualEvents
    .filter(event => event.date === dateUtils.formatDate(date))
    .map(event => resolveEvent(event, date));

  return recurringEvents.concat(individualEvents);
}
