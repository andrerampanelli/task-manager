import { Module } from '@nestjs/common';
import { HttpModule } from './modules/http/http.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
