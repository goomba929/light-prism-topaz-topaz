export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function addDays(key: string, n: number): string {
  const d = parseKey(key);
  d.setDate(d.getDate() + n);
  return todayKey(d);
}

export function weekday(key: string): number {
  return parseKey(key).getDay();
}

export function startOfIsoWeek(key: string): string {
  const d = parseKey(key);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return todayKey(d);
}

export function keysBetween(from: string, to: string): string[] {
  const out: string[] = [];
  let k = from;
  while (k <= to) {
    out.push(k);
    k = addDays(k, 1);
  }
  return out;
}

export function keysBefore(end: string, count: number): string[] {
  const out: string[] = [];
  for (let i = count - 1; i >= 0; i--) out.push(addDays(end, -i));
  return out;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function formatLong(key: string): string {
  const d = parseKey(key);
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

export function formatMedium(key: string): string {
  const d = parseKey(key);
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`;
}

export function formatWeekday(key: string): string {
  return DAYS[parseKey(key).getDay()] ?? "";
}

export function formatWeekdayShort(key: string): string {
  return DAYS_SHORT[parseKey(key).getDay()] ?? "";
}

export function isMonday(key: string): boolean {
  return weekday(key) === 1;
}

export function isSunday(key: string): boolean {
  return weekday(key) === 0;
}
