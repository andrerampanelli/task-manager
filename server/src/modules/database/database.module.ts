import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '../app-config/app-config.service';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (configService: AppConfigService) =>
        configService.mongoConfig,
    }),
  ],
})
export class DatabaseModule {}
