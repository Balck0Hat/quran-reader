import { Router } from 'express';
import * as progressController from './progress.controller.js';

export const progressRoutes = Router();

progressRoutes.get('/:deviceId', progressController.getProgress);
progressRoutes.patch('/:deviceId', progressController.updateProgress);
