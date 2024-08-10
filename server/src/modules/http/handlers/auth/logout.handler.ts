import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/common/handler.interface';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class LogoutHandler implements IHandler {
  constructor(private readonly authService: AuthService) {}

  handle(...args: unknown[]): void {
    this.authService.logout();
  }
}
