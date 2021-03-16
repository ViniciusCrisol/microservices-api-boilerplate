import path from 'path';
import databse from '../utils/fake_database';

function joinTemplatePath(fileName) {
  return path.join(__dirname, '..', 'views', 'emails', fileName);
}

function getEmailTemplate(type) {
  switch (type) {
    case 'welcome':
      return joinTemplatePath('welcome.ejs');
    default:
      return undefined;
  }
}

function getEmailConfig(type) {
  switch (type) {
    case 'welcome':
      return {
        from: 'microservices-boilerplate@github.com',
        subject: '<no-reply> Hello, welcome!',
      };
    default:
      return undefined;
  }
}

function getEmailData(userId, type) {
  function getWelcomeData() {
    const userData = databse.find((user) => user.id === userId);
    if (!userData) return undefined;

    return { name: userData.name };
  }

  switch (type) {
    case 'welcome':
      return getWelcomeData();
    default:
      return undefined;
  }
}

export { getEmailTemplate, getEmailConfig, getEmailData };
