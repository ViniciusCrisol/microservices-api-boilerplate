import path from 'path';
import User from '../models/User';

class PdfRepository {
  joinTemplatePath(fileName) {
    return path.join(__dirname, '..', 'views', 'documents', fileName);
  }

  getPdfUrl(data) {
    return `${process.env.BASE_URL}/pdf/${JSON.stringify(data)}`;
  }

  getPdfTemplate(template) {
    switch (template) {
      case 'users-report':
        return this.joinTemplatePath('users_report.ejs');
      default:
        return undefined;
    }
  }

  async getPdfData(userId, template) {
    switch (template) {
      case 'users-report':
        const response = await User.findByPk(userId, {
          attributes: ['name'],
        });
        if (!response) return undefined;

        const { name } = response.dataValues;
        return { name };
      default:
        return undefined;
    }
  }
}

export default new PdfRepository();
