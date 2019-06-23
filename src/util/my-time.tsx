import parseISO from 'date-fns/parseISO/index';

const pad2 = (s: (number | string)): string => ("0" + s).slice(-2);

// iso time example '2014-12-30T23:45:44.777Z'
export const isoTime = (s: string): Date => parseISO(s);
export const time2Str = (d: Date): string => d.toISOString();

// utc time to local clock one
export const isoTime2Clock = (s: string): string => {
  const d = isoTime(s);
  const H = d.getHours();
  return pad2(H % 12 || 12)
       + ':'
       + pad2(d.getMinutes())
       + ((H < 12 || H == 24) ? " AM" : " PM");
}

export const h12ToH24 = (s: string): string => {
  const h = +s.slice(0, 2);
  if (s.slice(-2) == 'PM') {
    return pad2(h + ((h < 12) ? 12 : 0)) + s.slice(2, 5);
  } else {
    return pad2(h + ((h < 12) ? 0 : -12)) + s.slice(2, 5);
  }
}

export const replaceClock = (dateTime: string, clock: string): string => {
  const d = isoTime(dateTime);
  const localTime = d.getFullYear() + '-' + pad2(d.getMonth() + 1) + pad2(d.getDate())
             + 'T' + h12ToH24(clock) + dateTime.slice(16, -1);
  return time2Str(isoTime(localTime));
}
