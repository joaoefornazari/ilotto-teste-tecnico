import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseConfig from './config/database.config';

@Module({
  imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(DatabaseConfig.get())
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
