import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionHistoryController } from "./transaction-history.controller";
import { TransactionHistory } from "src/transaction-history/transaction-history.entity";
import { TransactionHistoryService } from "./transaction-history.service";

@Module({
	imports: [TypeOrmModule.forFeature([TransactionHistory])],
	providers: [TransactionHistoryService],
	controllers: [TransactionHistoryController],
	exports: [TransactionHistoryService],
})
export class TransactionHistoryModule {}
