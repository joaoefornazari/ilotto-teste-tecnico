// filepath: src/transaction-report/transaction-report.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BullModule } from "@nestjs/bullmq";
import { TransactionReportConsumer } from "./queue/transaction-report.consumer";
import { TransactionReport } from "./transaction-report.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([TransactionReport]),
		BullModule.registerQueue({
			name: 'transaction-report-queue'
		})
	],
	providers: [TransactionReportConsumer],
	exports: [BullModule],
})
export class TransactionReportModule {}