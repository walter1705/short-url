import { Router } from 'express';
import UrlController from '../controller/url.controller.js';

const urlRouter = async ({
  urlController,
}: {
  urlController: UrlController;
}) => {
  const router = Router();

  router.get('/', urlController.getAllURLs);
  router.post('/', urlController.createURL);

  return router;
};

export default urlRouter;
