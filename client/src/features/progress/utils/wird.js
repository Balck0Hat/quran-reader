const pad = (value) => String(value).padStart(2, '0');

export const dayKeyOffset = (offset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export const todayKey = () => dayKeyOffset(0);

// أيام متتالية حُقّق فيها الهدف — اليوم يُحسب إن اكتمل، وإلا نبدأ من أمس
export const computeStreak = (dailyLog, goal) => {
  const met = (key) => (dailyLog[key] || 0) >= goal;
  let offset = met(todayKey()) ? 0 : -1;
  let streak = 0;
  while (streak < 3650 && met(dayKeyOffset(offset))) {
    streak += 1;
    offset -= 1;
  }
  return streak;
};

export const weekdayName = (dayKey) =>
  new Intl.DateTimeFormat('ar', { weekday: 'short' }).format(
    new Date(`${dayKey}T12:00:00`)
  );
