import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TransactionHistoryController } from './transaction-history/transaction-history.controller';
import { TransactionHistoryService } from './transaction-history/transaction-history.service';
import TypeORMConfig from './database/typeorm.config';

@Module({
  imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(TypeORMConfig)
	],
  controllers: [UsersController, TransactionHistoryController],
  providers: [UsersService, TransactionHistoryService],
})
export class AppModule {}
