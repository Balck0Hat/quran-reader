import { Router } from 'express';
import * as insightController from './insight.controller.js';

export const insightRoutes = Router();

insightRoutes.get('/tafsirs', insightController.listTafsirs);
insightRoutes.get(
  '/tafsir/:tafsirId/:chapter/:verse',
  insightController.getTafsir
);
insightRoutes.get(
  '/:kind/:chapter/:verse',
  insightController.getLinguistic
);
