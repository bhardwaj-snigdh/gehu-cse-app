// Removes converts to UTC string and removes the seconds and timezone
export default function parseDateString(dateString: string) {
  return new Date(dateString).toUTCString().slice(0, -7);
}
