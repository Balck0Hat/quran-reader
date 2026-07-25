import { env } from '../config/env.js';

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: { message: 'المسار غير موجود', code: 'NOT_FOUND' },
  });
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  if (env.nodeEnv === 'development' && !err.isOperational) console.error(err);
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.isOperational ? err.message : 'حدث خطأ في الخادم',
      code: err.code || 'INTERNAL_ERROR',
    },
  });
};
