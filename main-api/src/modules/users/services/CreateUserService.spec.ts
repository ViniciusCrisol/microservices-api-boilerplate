import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeMailProvider: FakeMailProvider;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeMailProvider,
    );
  });

  it('Should be able to create a new user.', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      password: 'password',
      email: 'john@example.com',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with same e-mail from another.', async () => {
    await createUser.execute({
      name: 'John Doe',
      password: 'password',
      email: 'john@example.com',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        password: 'password',
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
