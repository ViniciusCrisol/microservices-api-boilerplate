import ejs from 'ejs';
import nodemailer from 'nodemailer';
import { transporterConfig } from '../../config/EmailConfig';
import { templateError, defaultError } from '../../utils/ErrorsConfig';
import {
  getEmailData,
  getEmailConfig,
  getEmailTemplate,
} from '../repositories/EmailRepository';

async function create(request, response) {
  const { user_id, type, to } = request.body;

  const emailConfig = getEmailConfig(type);
  if (!emailConfig) {
    return response.status(templateError.status).json(templateError.message);
  }

  const emailTemplate = getEmailTemplate(type);
  const transporter = nodemailer.createTransport(transporterConfig);

  const emailData = getEmailData(user_id, type);
  if (!emailData) {
    return response.status(defaultError.status).json(defaultError.message);
  }

  ejs.renderFile(emailTemplate, emailData, async (error, html) => {
    if (error) {
      return response.status(defaultError.status).json(defaultError.message);
    }

    await transporter.sendMail({ ...emailConfig, to, html });
    return response.status(204).json();
  });
}

export { create };
