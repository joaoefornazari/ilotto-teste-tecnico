import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TransactionHistoryModule } from './transaction-history/transaction-history.module';
import { TokenMiddleware } from './middleware/token.middleware';
import { TransactionHistoryController } from './transaction-history/transaction-history.controller';
import { BullModule } from '@nestjs/bullmq'
import TypeORMConfig from './database/typeorm.config';

@Module({
  imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(TypeORMConfig),
		UsersModule,
		TransactionHistoryModule,
		BullModule.forRoot({
			connection: {
				host: process.env.REDIS_HOST ?? 'localhost',
				port: Number(process.env.REDIS_PORT) ?? 6379,
			}
		}),
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(TokenMiddleware)
			.forRoutes(TransactionHistoryController)
	}

	constructor() {
	}
}
