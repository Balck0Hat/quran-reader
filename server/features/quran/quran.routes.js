import { Router } from 'express';
import * as quranController from './quran.controller.js';

export const quranRoutes = Router();

quranRoutes.get('/chapters', quranController.getChapters);
quranRoutes.get('/chapters/:chapterId/verses', quranController.getVerses);
quranRoutes.get('/verse/:chapter/:verse', quranController.getVerse);
quranRoutes.get('/reciters', quranController.getReciters);
