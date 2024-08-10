import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

@Injectable()
export class AppConfigService extends ConfigService {
  getString(key: string): string {
    return this.get<string>(key);
  }

  getNumber(key: string): number {
    return parseInt(this.getString(key), 10);
  }

  private get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get mongoConfig(): MongooseModuleFactoryOptions {
    return {
      uri: this.getString('DATABASE_URI'),
      auth: {
        username: this.getString('DATABASE_USER'),
        password: this.getString('DATABASE_PASS'),
      },
      dbName: this.getString('DATABASE_NAME'),
    };
  }

  get jwtConfig(): JwtModuleOptions {
    return {
      secret: this.getString('JWT_SECRET'),
      signOptions: { expiresIn: this.getString('JWT_EXPIRES_IN') },
    };
  }
}
