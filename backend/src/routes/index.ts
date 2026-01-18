import { Router } from 'express';
import urlRouter from './url.routes.js';
import UrlController from '../controller/url.controller.js';

const urlController = new UrlController();
const router = Router();

router.get('/health', urlController.health);
router.use('/urls', await urlRouter({ urlController }));
router.get('/:code', urlController.redirect);

export default router;
