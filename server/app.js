import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import {
  securityMiddleware,
  sanitizeMiddleware,
  rateLimiter,
} from './shared/middleware/security.js';
import {
  errorHandler,
  notFoundHandler,
} from './shared/middleware/errorHandler.js';
import { quranRoutes } from './features/quran/quran.routes.js';
import { insightRoutes } from './features/insight/insight.routes.js';
import { progressRoutes } from './features/progress/progress.routes.js';

export const app = express();

app.use(securityMiddleware);
app.use(express.json({ limit: '10kb' }));
app.use(sanitizeMiddleware);
app.use('/api', rateLimiter);

app.use('/api/v1/quran', quranRoutes);
app.use('/api/v1/insight', insightRoutes);
app.use('/api/v1/progress', progressRoutes);

app.get('/api/v1/health', (req, res) =>
  res.json({ success: true, data: { status: 'ok' } })
);

// تقديم الواجهة المبنية (SPA) — أي مسار غير /api يرجع index.html
const clientDist = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../client/dist'
);
app.use(express.static(clientDist, { maxAge: '1d', index: false }));
app.get(/^(?!\/api).*/, (req, res) =>
  res.sendFile(path.join(clientDist, 'index.html'))
);

app.use(notFoundHandler);
app.use(errorHandler);
