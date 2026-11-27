import * as dateUtils from "./dateUtils.js";
import { eventCatalog } from "../data/eventCatalog.js";

function isValidDateKey(value) {
  if (typeof value !== "string") return false;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1) return false;

  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    31, leapYear ? 29 : 28, 31, 30, 31, 30,
    31, 31, 30, 31, 30, 31
  ];
  return day <= daysInMonth[month - 1];
}

function validateExclusions(event) {
  if ("skipMonths" in event || "skipDates" in event) {
    throw new TypeError("Use event.exclude.months and event.exclude.dates");
  }

  const exclude = event.exclude;
  if (exclude === undefined) return;

  if (!exclude || typeof exclude !== "object" || Array.isArray(exclude)) {
    throw new TypeError("Event exclude must be an object");
  }

  const unknownKeys = Object.keys(exclude).filter(
    key => key !== "months" && key !== "dates"
  );
  if (unknownKeys.length > 0) {
    throw new TypeError("Unknown event exclusion key: " + unknownKeys[0]);
  }

  const months = exclude.months === undefined ? [] : exclude.months;
  const dates = exclude.dates === undefined ? [] : exclude.dates;
  if (!Array.isArray(months)) {
    throw new TypeError("Event exclude.months must be an array");
  }
  if (!Array.isArray(dates)) {
    throw new TypeError("Event exclude.dates must be an array");
  }
  if (months.some(month => !Number.isInteger(month) || month < 1 || month > 12)) {
    throw new RangeError("Event exclusion months must be integers from 1 to 12");
  }
  if (dates.some(date => !isValidDateKey(date))) {
    throw new TypeError("Event exclusion dates must be valid YYYY-MM-DD dates");
  }
}

function isExcluded(event, month, dateKey) {
  const exclude = event.exclude || {};
  return (exclude.months || []).includes(month) ||
    (exclude.dates || []).includes(dateKey);
}

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
  calendarData.monthlyEvents.forEach(validateExclusions);
  calendarData.weeklyEvents.forEach(validateExclusions);
  if (!dateUtils.isSunday(date)) return [];

  const sunday = dateUtils.sundayOfMonth(date);
  const month = date.getMonth() + 1;
  const dateKey = dateUtils.formatDate(date);

  const monthlyEvents = calendarData.monthlyEvents
    .filter(event => event.sunday === sunday && !isExcluded(event, month, dateKey))
    .map(event => resolveEvent(event, date));

  const weeklyEvents = calendarData.weeklyEvents
    .filter(event => !isExcluded(event, month, dateKey))
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
