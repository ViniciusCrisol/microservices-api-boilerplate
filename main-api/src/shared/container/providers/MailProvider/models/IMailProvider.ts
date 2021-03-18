export default interface IMailProvider {
  sendWelcomeMail(userId: string): Promise<void>;
}
