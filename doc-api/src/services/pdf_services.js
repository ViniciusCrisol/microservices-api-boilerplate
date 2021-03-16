import path from 'path';
import databse from '../utils/fake_database';

function joinTemplatePath(fileName) {
  return path.join(__dirname, '..', 'views', 'documents', fileName);
}

function getPdfUrl(data) {
  return `${process.env.BASE_URL}/pdf/${JSON.stringify(data)}`;
}

function getPdfTemplate(type) {
  switch (type) {
    case 'users-report':
      return joinTemplatePath('users_report.ejs');
    default:
      return undefined;
  }
}

function getPdfData(userId, type) {
  function getUserReportData() {
    const userData = databse.find((user) => user.id === userId);
    if (!userData) return undefined;

    return { name: userData.name };
  }

  switch (type) {
    case 'users-report':
      return getUserReportData();
    default:
      return undefined;
  }
}

export { getPdfUrl, getPdfTemplate, getPdfData };
