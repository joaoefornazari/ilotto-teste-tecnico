import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionHistoryController } from "./transaction-history.controller";
import { TransactionHistory } from "src/transaction-history/transaction-history.entity";
import { TransactionHistoryService } from "./transaction-history.service";
import { BullModule } from "@nestjs/bullmq";
import { TransactionConsumer } from "./queue/transaction.consumer";
import { TransactionHistoryConsumer } from "./queue/transaction-history.consumer";
import { TransactionReportModule } from "src/transaction-report/transaction-report.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([TransactionHistory]),
		BullModule.registerQueue({
			name: 'transaction-queue'
		}),
		BullModule.registerQueue({
			name: 'transaction-history-queue'
		}),
		TransactionReportModule
	],
	providers: [TransactionHistoryService, TransactionConsumer, TransactionHistoryConsumer],
	controllers: [TransactionHistoryController],
	exports: [TransactionHistoryService],
})
export class TransactionHistoryModule {
	constructor() {}
}
