import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5002,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quran_reader',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(','),
  quranApiBase: process.env.QURAN_API_BASE || 'https://api.quran.com/api/v4',
  tafsirCdnBase:
    process.env.TAFSIR_CDN_BASE ||
    'https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir',
  audioCdnBase: process.env.AUDIO_CDN_BASE || 'https://verses.quran.com',
};
