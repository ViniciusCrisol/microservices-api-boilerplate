import ejs from 'ejs';
import nodemailer from 'nodemailer';
import transporterConfig from '../../config/email';
import emailRepository from '../repositories/EmailRepository';
import { templateError, defaultError } from '../../errors/messages';

class EmailController {
  async create(request, response) {
    const { id } = request.params;
    const { template } = request.body;

    const emailConfig = emailRepository.getEmailConfig(template);
    if (!emailConfig) {
      return response.status(templateError.status).json(templateError.message);
    }

    const emailTemplate = emailRepository.getEmailTemplate(template);
    const transporter = nodemailer.createTransport(transporterConfig);

    const emailData = await emailRepository.getEmailData(id, template);
    if (!emailData) {
      return response.status(defaultError.status).json(defaultError.message);
    }

    ejs.renderFile(emailTemplate, emailData, async (error, html) => {
      if (error) {
        return response.status(defaultError.status).json(defaultError.message);
      }

      await transporter.sendMail({ ...emailConfig, to: emailData.to, html });
      return response.status(204).json();
    });
  }
}

export default new EmailController();
