import { Router } from 'express';
import {
  get as getPdf,
  create as createPdf,
} from './app/controllers/PdfController';
import { create as createEmail } from './app/controllers/EmailController';

const routes = Router();

routes.get('/pdf/:data', getPdf);
routes.post('/pdf/create', createPdf);
routes.post('/send/email', createEmail);

export default routes;
