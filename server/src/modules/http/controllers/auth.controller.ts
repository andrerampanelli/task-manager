import { Body, Controller, Post } from '@nestjs/common';
import { SignupHandler } from '../handlers/auth/signup.handler';
import { LoginHandler } from '../handlers/auth/login.handler';
import { LogoutHandler } from '../handlers/auth/logout.handler';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupHandler: SignupHandler,
    private readonly loginHandler: LoginHandler,
    private readonly logoutHandler: LogoutHandler,
  ) {}

  @Post('login')
  login(
    @Body() dto: LoginDto,
  ): Promise<{ name: string; email: string; token: string }> {
    return this.loginHandler.handle(dto);
  }

  @Post('logout')
  logout() {
    return 'logout';
  }

  @Post('signup')
  signup(
    @Body() dto: SignupDto,
  ): Promise<{ name: string; email: string; token: string }> {
    return this.signupHandler.handle(dto);
  }
}
