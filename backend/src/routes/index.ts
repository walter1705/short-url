import { Router } from 'express';
import urlRouter from './url.routes.js';
import UrlController from '../controller/url.controller.js';

const urlController = new UrlController();
const router = Router();
console.log('aqui 1');
router.use('/shortener', await urlRouter({ urlController }));

export default router;
