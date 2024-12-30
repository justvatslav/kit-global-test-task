import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { RegisterUserDto } from '../src/auth/dto/register-user.dto';
import { LoginUserDto } from '../src/auth/dto/login-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should call login with correct parameters', async () => {
    const loginDto: LoginUserDto = { email: 'test@example.com', password: 'password' };
    jest.spyOn(service, 'login').mockResolvedValue({ access_token: 'token' });
    expect(await controller.login(loginDto)).toEqual({ access_token: 'token' });
  });

  it('should call register with correct parameters', async () => {
    const registerDto: RegisterUserDto = { email: 'test@example.com', password: 'password' };
    jest.spyOn(service, 'register').mockResolvedValue({ userId: '123' });
    expect(await controller.register(registerDto)).toEqual({ userId: '123' });
  });

  it('should return user profile', async () => {
    const mockRequest = { user: { userId: '123', email: 'test@example.com' } };
    expect(controller.getProfile(mockRequest)).toEqual(mockRequest.user);
  });
});
