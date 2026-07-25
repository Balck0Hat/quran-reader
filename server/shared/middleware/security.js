import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

export const securityMiddleware = [
  // CSP معطّل لأن الواجهة تحمّل خطوط Google وسكربت الثيم المضمّن
  helmet({ contentSecurityPolicy: false }),
  cors({ origin: env.allowedOrigins, credentials: true }),
];

// يجب أن يُسجَّل بعد express.json حتى يجد req.body ويعقّمه
export const sanitizeMiddleware = mongoSanitize();

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 600,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { message: 'طلبات كثيرة، حاول لاحقاً', code: 'RATE_LIMITED' },
  },
});
