import ejs from 'ejs';
import puppeteer from 'puppeteer';
import { templateError, defaultError } from '../utils/errors_config';
import {
  getPdfUrl,
  getPdfData,
  getPdfTemplate,
} from '../services/pdf_services';

async function create(request, response) {
  const { template, user_id } = request.body;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const templateExists = getPdfTemplate(template);
  if (!templateExists) {
    return response.status(templateError.status).json(templateError.message);
  }

  const pdfContent = getPdfData(user_id, template);
  if (!pdfContent) {
    return response.status(defaultError.status).json(defaultError.message);
  }

  const pdfUrl = getPdfUrl({ ...pdfContent, template });
  await page.goto(pdfUrl, { waitUntil: 'networkidle0' });

  const pdf = await page.pdf({ printBackground: true, format: 'Letter' });
  await browser.close();

  response.contentType('application/pdf');
  return response.send(pdf);
}

async function get(request, response) {
  const { data } = request.params;
  const pdfData = JSON.parse(data);

  try {
    ejs.renderFile(getPdfTemplate(pdfData.template), pdfData, (error, html) => {
      if (error) throw new Error();
      return response.send(html);
    });
  } catch (catchError) {
    ejs.renderFile(getPdfTemplate('error-template'), pdfData, (error, html) => {
      if (error) response.send(catchError);
      return response.send(html);
    });
  }
}

export { get, create };
