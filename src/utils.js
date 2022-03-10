import add from "date-fns/add";
import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";
import { isAddress } from "web3-utils";

const env = process.env.REACT_APP_ENV;

export const isDevelopmentMode = env === 'development';
export const isProductionMode = env === 'production';

export function getNowTs() {
  return Math.floor(Date.now() / 1_000);
}

export function inRange(value, min, max) {
  return min < value && value < max;
}

const FORMAT_DURATION_FORMATS = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
const FORMAT_DURATION_SHORTS = ['y', 'mo', 'd', 'h', 'm', 's'];

export function formatDurationNew(value) {
  if (value === undefined) {
    return undefined;
  }

  const start = new Date().getTime();
  const duration = intervalToDuration({
    start,
    end: start + value,
  });

  return FORMAT_DURATION_FORMATS.map((key, index) => {
    const val = duration[key];
    return val > 0 ? `${val}${FORMAT_DURATION_SHORTS[index]}` : undefined;
  })
    .filter(Boolean)
    .join(' ');
}

export function getFormattedDuration(
  value,
  endValue,
  { format = ['months', 'days', 'hours', 'minutes', 'seconds'] } = {},
) {
  if (value === undefined) {
    return undefined;
  }

  const start = new Date().getTime();
  const end = endValue !== undefined ? endValue : add(start, { seconds: value }).valueOf();

  const duration = intervalToDuration({
    start,
    end: start > end ? start : end,
  });

  return formatDuration(duration, {
    format,
    delimiter: ' ',
    zero: true,
    locale: {
      formatDistance(token, val) {
        let v

        switch (token) {
          case 'xMonths':
            return val > 0 ? `${val}mo` : '';
          case 'xDays':
            v = duration.months ?? 0;
            return val > 0 || v > 0 ? `${val}d` : '';
          case 'xHours':
            v = (duration.months ?? 0) + (duration.days ?? 0);
            return val > 0 || v > 0 ? `${val}h` : '';
          case 'xMinutes':
            v = (duration.months ?? 0) + (duration.days ?? 0) + (duration.hours ?? 0);
            return val > 0 || v > 0 ? `${val}m` : '';
          case 'xSeconds':
            v = (duration.months ?? 0) + (duration.days ?? 0) + (duration.hours ?? 0) + (duration.minutes ?? 0);
            return val > 0 || v > 0 ? `${val}s` : '';
          default:
        }

        return undefined;
      },
    },
  });
}

export function getRelativeTime(seconds) {
  return formatDuration(intervalToDuration({ start: 0, end: seconds * 1000 }));
}