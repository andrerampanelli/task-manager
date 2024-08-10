import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    dto: LoginDto,
  ): Promise<{ name: string; email: string; token: string }> {
    const { email, password } = dto;

    const user = await this.model.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: user._id });

    const name = user.name;

    return { name, email, token };
  }

  logout() {
    return {};
  }

  async signup(
    dto: SignupDto,
  ): Promise<{ name: string; email: string; token: string }> {
    const { name, email, password } = dto;

    const existingUser = await this.model.findOne({
      email,
    });

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.model.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { name, email, token };
  }

  async validateUser(id: string) {
    const user = await this.model.findById(id);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
