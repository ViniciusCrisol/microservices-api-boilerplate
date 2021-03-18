import { container } from 'tsyringe';

import IMailProvider from './MailProvider/models/IMailProvider';
import MailProvider from './MailProvider/implementations/MailProvider';

container.registerSingleton<IMailProvider>('MailProvider', MailProvider);
