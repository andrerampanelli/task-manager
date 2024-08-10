import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { User } from 'src/modules/auth/schema/user.schema';

export const UserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IUserContext>();

    if (!request.user) {
      throw new ForbiddenException(`No user in context`);
    }

    return request.user;
  },
);

interface IUserContext {
  user: User;
}
