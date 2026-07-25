import { asyncHandler } from '../../shared/utils/asyncHandler.js';
import { AppError } from '../../shared/utils/appError.js';
import * as quranService from './quran.service.js';
import { versesParamsSchema, versesQuerySchema } from './quran.validation.js';

export const getChapters = asyncHandler(async (req, res) => {
  const chapters = await quranService.getChapters();
  res.json({ success: true, data: chapters });
});

export const getVerses = asyncHandler(async (req, res) => {
  const params = versesParamsSchema.safeParse(req.params);
  const query = versesQuerySchema.safeParse(req.query);
  if (!params.success || !query.success) {
    throw new AppError('مدخلات غير صالحة', 400, 'VALIDATION_ERROR');
  }
  const { verses, pagination } = await quranService.getVerses({
    chapterId: params.data.chapterId,
    page: query.data.page,
    perPage: query.data.perPage,
    reciterId: query.data.reciter,
  });
  res.json({ success: true, data: verses, meta: pagination });
});

export const getReciters = asyncHandler(async (req, res) => {
  const reciters = await quranService.getReciters();
  res.json({ success: true, data: reciters });
});
