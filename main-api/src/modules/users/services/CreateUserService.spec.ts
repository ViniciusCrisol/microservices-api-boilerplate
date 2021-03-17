import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
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
