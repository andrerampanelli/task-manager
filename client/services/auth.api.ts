import { BaseApi } from './base.api';
import { Auth, Login, SignUp } from '@/types/auth.type';

export class AuthApi extends BaseApi {
  async login(body: Login): Promise<Auth> {
    return this.post<Login, Auth>('/auth/login', body);
  }

  async signUp(body: SignUp): Promise<Auth> {
    return this.post<SignUp, Auth>('/auth/signup', body);
  }
}
