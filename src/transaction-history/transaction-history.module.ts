import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionHistoryController } from "./transaction-history.controller";
import { TransactionHistory } from "src/transaction-history/transaction-history.entity";
import { TransactionHistoryService } from "./transaction-history.service";
import { BullModule } from "@nestjs/bullmq";
import { TransactionConsumer } from "./queue/transaction.consumer";
import { TransactionReportConsumer } from "src/transaction-report/queue/transaction-report.consume";
import { TransactionHistoryConsumer } from "./queue/transaction-history.consumer";

@Module({
	imports: [
		TypeOrmModule.forFeature([TransactionHistory]),
		BullModule.registerQueue({
			name: 'transaction-queue'
		}),
		BullModule.registerQueue({
			name: 'transaction-history-queue'
		}),
		BullModule.registerQueue({
			name: 'transaction-report-queue'
		})
	],
	providers: [TransactionHistoryService, TransactionConsumer, TransactionReportConsumer, TransactionHistoryConsumer],
	controllers: [TransactionHistoryController],
	exports: [TransactionHistoryService],
})
export class TransactionHistoryModule {
	constructor() {}
}
