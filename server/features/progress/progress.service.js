import Progress from './progress.model.js';

export const getProgress = async (deviceId) => {
  const doc = await Progress.findOneAndUpdate(
    { deviceId },
    { $setOnInsert: { deviceId } },
    { new: true, upsert: true, runValidators: true }
  ).lean();
  return doc;
};

const MAX_LOG_DAYS = 60;

export const updateProgress = async (
  deviceId,
  { lastPosition, toggleBookmark, dailyGoal, wird }
) => {
  const doc = await Progress.findOneAndUpdate(
    { deviceId },
    { $setOnInsert: { deviceId } },
    { new: true, upsert: true, runValidators: true }
  );

  if (lastPosition) {
    doc.lastPosition = lastPosition;
    const key = String(lastPosition.chapter);
    const current = doc.chaptersRead.get(key) || 0;
    if (lastPosition.verse > current) {
      doc.chaptersRead.set(key, lastPosition.verse);
    }
  }

  if (dailyGoal) doc.dailyGoal = dailyGoal;

  if (wird) {
    const current = doc.dailyLog.get(wird.date) || 0;
    doc.dailyLog.set(wird.date, Math.min(current + wird.delta, 6236));
    // لا نحتفظ إلا بآخر ٦٠ يوماً
    if (doc.dailyLog.size > MAX_LOG_DAYS) {
      [...doc.dailyLog.keys()]
        .sort()
        .slice(0, doc.dailyLog.size - MAX_LOG_DAYS)
        .forEach((key) => doc.dailyLog.delete(key));
    }
  }

  if (toggleBookmark) {
    const exists = doc.bookmarks.includes(toggleBookmark);
    doc.bookmarks = exists
      ? doc.bookmarks.filter((key) => key !== toggleBookmark)
      : [...doc.bookmarks, toggleBookmark];
  }

  await doc.save();
  return doc.toObject({ flattenMaps: true });
};
