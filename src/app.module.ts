import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TransactionHistoryController } from './transaction-history/transaction-history.controller';
import { TransactionHistoryService } from './transaction-history/transaction-history.service';

@Module({
  imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [],
			migrations: [],
			synchronize: true,
		})
	],
  controllers: [UsersController, TransactionHistoryController],
  providers: [UsersService, TransactionHistoryService],
})
export class AppModule {}
