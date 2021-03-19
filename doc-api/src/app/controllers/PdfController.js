import ejs from 'ejs';
import puppeteer from 'puppeteer';
import pdfRepository from '../repositories/PdfRepository';
import { templateError, defaultError } from '../../errors/messages';

class PdfController {
  async create(request, response) {
    const { id } = request.params;
    const { template } = request.body;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const templateExists = pdfRepository.getPdfTemplate(template);
    if (!templateExists) {
      return response.status(templateError.status).json(templateError.message);
    }

    const pdfContent = await pdfRepository.getPdfData(id, template);
    if (!pdfContent) {
      return response.status(defaultError.status).json(defaultError.message);
    }

    const pdfUrl = pdfRepository.getPdfUrl({ ...pdfContent, template });
    await page.goto(pdfUrl, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({ printBackground: true, format: 'Letter' });
    await browser.close();

    response.contentType('application/pdf');
    return response.send(pdf);
  }

  async get(request, response) {
    const { data } = request.params;
    const pdfData = JSON.parse(data);

    ejs.renderFile(
      pdfRepository.getPdfTemplate(pdfData.template),
      pdfData,
      (error, html) => {
        if (error) return templateError.message;
        return response.send(html);
      }
    );
  }
}

export default new PdfController();
