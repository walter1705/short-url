import { Router } from 'express';
import UrlController from '../controller/url.controller.js';

const urlRouter = async ({
  urlController,
}: {
  urlController: UrlController;
}) => {
  const router = Router();

  router.get('/', urlController.getAllUrls);
  router.post('/', urlController.createUrl);
  router.get('/:code', urlController.getUrl);
  router.delete('/:code', urlController.deleteUrl);

  return router;
};

export default urlRouter;
