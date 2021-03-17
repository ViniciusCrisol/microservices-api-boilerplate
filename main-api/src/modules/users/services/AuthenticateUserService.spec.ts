import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import User from '../infra/typeorm/entities/User';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let user: User;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    user = await createUser.execute({
      name: 'John Doe',
      password: 'password',
      email: 'john@example.com',
    });
  });

  it('Should be able to authenticate.', async () => {
    const response = await authenticateUser.execute({
      email: 'john@example.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with a wrong email.', async () => {
    await expect(
      authenticateUser.execute({
        password: 'password',
        email: 'wrongJohn@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with a wrong password.', async () => {
    await expect(
      authenticateUser.execute({
        password: 'wrongPassword',
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
