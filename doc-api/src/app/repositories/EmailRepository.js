import path from 'path';
import User from '../models/User';

class EmailRepository {
  joinTemplatePath(fileName) {
    return path.join(__dirname, '..', 'views', 'emails', fileName);
  }

  getEmailTemplate(template) {
    switch (template) {
      case 'welcome':
        return this.joinTemplatePath('welcome.ejs');
      default:
        return undefined;
    }
  }

  async getEmailData(userId, template) {
    switch (template) {
      case 'welcome':
        const response = await User.findByPk(userId, {
          attributes: ['name', 'email'],
        });
        if (!response) return undefined;

        const { name, email } = response.dataValues;
        return { name, to: email };

      default:
        return undefined;
    }
  }

  getEmailConfig(template) {
    if (template === 'welcome') {
      return {
        from: 'services-boilerplate@github.com',
        subject: '<no-reply> Hello, welcome!',
      };
    }

    return undefined;
  }
}

export default new EmailRepository();
