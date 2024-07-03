export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export function relativeTime(previous) {
  const current = Date.now();
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (elapsed < msPerMinute) {
    return rtf.format(-Math.round(elapsed / 1000), "second");
  } else if (elapsed < msPerHour) {
    return rtf.format(-Math.round(elapsed / msPerMinute), "minute");
  } else if (elapsed < msPerDay) {
    return rtf.format(-Math.round(elapsed / msPerHour), "hour");
  } else if (elapsed < msPerMonth) {
    return rtf.format(-Math.round(elapsed / msPerDay), "day");
  } else if (elapsed < msPerYear) {
    return rtf.format(-Math.round(elapsed / msPerMonth), "month");
  } else {
    return rtf.format(-Math.round(elapsed / msPerYear), "year");
  }
}
