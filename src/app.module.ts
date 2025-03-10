import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TransactionHistoryModule } from './transaction-history/transaction-history.module';
import TypeORMConfig from './database/typeorm.config';

@Module({
  imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(TypeORMConfig),
		UsersModule,
		TransactionHistoryModule,
	],
})
export class AppModule {}
