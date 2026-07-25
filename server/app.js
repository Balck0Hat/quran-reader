import express from 'express';
import {
  securityMiddleware,
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
app.use('/api', rateLimiter);

app.use('/api/v1/quran', quranRoutes);
app.use('/api/v1/insight', insightRoutes);
app.use('/api/v1/progress', progressRoutes);

app.get('/api/v1/health', (req, res) =>
  res.json({ success: true, data: { status: 'ok' } })
);

app.use(notFoundHandler);
app.use(errorHandler);
