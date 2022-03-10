import { addDays, addMonths, addWeeks } from "date-fns";

export const DAY_IN_SECONDS = 24 * 60 * 60;

export const DURATION_1_DAY = '1 day';
export const DURATION_30_DAYS = '30 days';
export const DURATION_1_WEEK = '1 week';
export const DURATION_2_WEEKS = '2 weeks';
export const DURATION_3_WEEKS = '3 weeks';
export const DURATION_4_WEEKS = '4 weeks';
export const DURATION_1_MONTH = '1 month';
export const DURATION_3_MONTHS = '3 months';
export const DURATION_6_MONTHS = '6 months';
export const DURATION_1_YEAR = '1 year';

export function getDurationDate(startDate, duration) {
  switch (duration) {
    case DURATION_1_DAY:
      return addDays(startDate, 1);
    case DURATION_30_DAYS:
      return addDays(startDate, 30);
    case DURATION_1_WEEK:
      return addWeeks(startDate, 1);
    case DURATION_2_WEEKS:
      return addWeeks(startDate, 2);
    case DURATION_3_WEEKS:
      return addWeeks(startDate, 3);
    case DURATION_4_WEEKS:
      return addWeeks(startDate, 4);
    case DURATION_1_MONTH:
      return addMonths(startDate, 1);
    case DURATION_3_MONTHS:
      return addMonths(startDate, 3);
    case DURATION_6_MONTHS:
      return addMonths(startDate, 6);
    case DURATION_1_YEAR:
      return addDays(startDate, 365);
    default:
      return undefined;
  }
}

export function formatDateTime(
  date,
  options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  },
) {
  if (!date) return '';
  if (typeof date === 'number' || typeof date === 'string') {
    date = new Date(date);
  }

  return date.toLocaleString(navigator.language ?? navigator.languages, options);
}

export function formatDate(date, options) {
  if (!date) return '';
  if (typeof date === 'number' || typeof date === 'string') {
    date = new Date(date);
  }

  return date.toLocaleDateString(navigator.language ?? navigator.languages, options);
}

export function formatTime(
  date,
  options = { hour: '2-digit', minute: '2-digit' },
) {
  if (!date) return '';
  if (typeof date === 'number' || typeof date === 'string') {
    date = new Date(date);
  }

  return date.toLocaleTimeString(navigator.language ?? navigator.languages, options);
}