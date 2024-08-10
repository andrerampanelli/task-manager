import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/common/handler.interface';
import { AuthService } from 'src/modules/auth/auth.service';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';

@Injectable()
export class SignupHandler implements IHandler {
  constructor(private readonly authService: AuthService) {}

  handle(
    dto: SignupDto,
  ): Promise<{ name: string; email: string; token: string }> {
    return this.authService.signup(dto);
  }
}
