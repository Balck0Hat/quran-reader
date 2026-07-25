import { asyncHandler } from '../../shared/utils/asyncHandler.js';
import { AppError } from '../../shared/utils/appError.js';
import * as insightService from './insight.service.js';
import {
  tafsirParamsSchema,
  linguisticParamsSchema,
} from './insight.validation.js';

export const listTafsirs = asyncHandler(async (req, res) => {
  res.json({ success: true, data: insightService.listTafsirs() });
});

export const getTafsir = asyncHandler(async (req, res) => {
  const parsed = tafsirParamsSchema.safeParse(req.params);
  if (!parsed.success) {
    throw new AppError('مدخلات غير صالحة', 400, 'VALIDATION_ERROR');
  }
  const result = await insightService.getTafsir(parsed.data);
  res.json({ success: true, data: result });
});

export const getLinguistic = asyncHandler(async (req, res) => {
  const parsed = linguisticParamsSchema.safeParse(req.params);
  if (!parsed.success) {
    throw new AppError('مدخلات غير صالحة', 400, 'VALIDATION_ERROR');
  }
  const result = await insightService.getLinguistic(parsed.data);
  res.json({ success: true, data: result });
});
