import IMailProvider from '../models/IMailProvider';

class FakeMailProvider implements IMailProvider {
  public async sendWelcomeMail(userId: string): Promise<void> {
    const emailMessage = `Welcome ${userId}!`;
    return emailMessage ? undefined : undefined;
  }
}

export default FakeMailProvider;
