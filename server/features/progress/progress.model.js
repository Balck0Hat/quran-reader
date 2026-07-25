import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, unique: true, trim: true },
    lastPosition: {
      chapter: { type: Number, min: 1, max: 114, default: 1 },
      verse: { type: Number, min: 1, default: 1 },
    },
    // Highest verse read per chapter: { "2": 45 } means reached ayah 45 of al-Baqarah.
    chaptersRead: { type: Map, of: Number, default: {} },
    bookmarks: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
