import axios, { AxiosInstance } from 'axios';
import { injectable } from 'tsyringe';

import IMailProvider from '../models/IMailProvider';

@injectable()
export default class MailProvider implements IMailProvider {
  private api: AxiosInstance;

  constructor() {
    // this.api = .create({
    //   baseURL: '',
    // });
  }

  public async sendWelcomeMail(userId: string): Promise<void> {
    axios.post('http://localhost:8081/send/email', {
      type: 'welcome',
      to: `${userId}@hotmail.com`,
      user_id: 2,
    });
  }
}
