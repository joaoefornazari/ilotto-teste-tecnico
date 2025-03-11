import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TransactionHistoryModule } from './transaction-history/transaction-history.module';
import { TokenMiddleware } from './middleware/token.middleware';
import { TransactionHistoryController } from './transaction-history/transaction-history.controller';
import TypeORMConfig from './database/typeorm.config';

@Module({
  imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(TypeORMConfig),
		UsersModule,
		TransactionHistoryModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(TokenMiddleware)
			.forRoutes(TransactionHistoryController)
	}
}
