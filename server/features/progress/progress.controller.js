import { asyncHandler } from '../../shared/utils/asyncHandler.js';
import { AppError } from '../../shared/utils/appError.js';
import * as progressService from './progress.service.js';
import {
  deviceIdSchema,
  updateProgressSchema,
} from './progress.validation.js';

export const getProgress = asyncHandler(async (req, res) => {
  const params = deviceIdSchema.safeParse(req.params);
  if (!params.success) {
    throw new AppError('معرّف الجهاز غير صالح', 400, 'VALIDATION_ERROR');
  }
  const progress = await progressService.getProgress(params.data.deviceId);
  res.json({ success: true, data: progress });
});

export const updateProgress = asyncHandler(async (req, res) => {
  const params = deviceIdSchema.safeParse(req.params);
  const body = updateProgressSchema.safeParse(req.body);
  if (!params.success || !body.success) {
    throw new AppError('مدخلات غير صالحة', 400, 'VALIDATION_ERROR');
  }
  const progress = await progressService.updateProgress(
    params.data.deviceId,
    body.data
  );
  res.json({ success: true, data: progress });
});
