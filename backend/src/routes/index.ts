import { Router } from 'express';
import urlRouter from './url.routes.js';
import UrlController from '../controller/url.controller.js';

const urlController = new UrlController();
const router = Router();

router.use('/shorten', await urlRouter({ urlController }));

export default router;
