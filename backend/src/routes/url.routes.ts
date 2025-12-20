import { Router } from 'express';
import UrlController from '../controller/url.controller.js';

const urlRouter = async ({
  urlController,
}: {
  urlController: UrlController;
}) => {
  const router = Router();
  console.log('aqui 2');
  router.get('/', urlController.getAllURLs);

  return router;
};

export default urlRouter;
