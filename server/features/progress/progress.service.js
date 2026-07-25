import Progress from './progress.model.js';

export const getProgress = async (deviceId) => {
  const doc = await Progress.findOneAndUpdate(
    { deviceId },
    { $setOnInsert: { deviceId } },
    { new: true, upsert: true, runValidators: true }
  ).lean();
  return doc;
};

export const updateProgress = async (deviceId, { lastPosition, toggleBookmark }) => {
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

  if (toggleBookmark) {
    const exists = doc.bookmarks.includes(toggleBookmark);
    doc.bookmarks = exists
      ? doc.bookmarks.filter((key) => key !== toggleBookmark)
      : [...doc.bookmarks, toggleBookmark];
  }

  await doc.save();
  return doc.toObject({ flattenMaps: true });
};
