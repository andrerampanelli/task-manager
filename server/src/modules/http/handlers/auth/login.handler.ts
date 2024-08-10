import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/common/handler.interface';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

@Injectable()
export class LoginHandler implements IHandler {
  constructor(private readonly authService: AuthService) {}

  handle(
    dto: LoginDto,
  ): Promise<{ name: string; email: string; token: string }> {
    return this.authService.login(dto);
  }
}
