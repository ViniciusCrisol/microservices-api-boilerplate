import { Router } from 'express';
import {
  get as getPdf,
  create as createPdf,
} from './controllers/pdf_controller';
import { create as createEmail } from './controllers/email_controller';

const routes = Router();

routes.get('/pdf/:data', getPdf);
routes.post('/pdf/create', createPdf);
routes.post('/send/email', createEmail);

export default routes;
