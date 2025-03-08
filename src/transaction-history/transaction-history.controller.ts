import { Controller, Get, Post } from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';

@Controller('transaction-history')
export class TransactionHistoryController {
	constructor(private transactionService: TransactionHistoryService) {}

	@Get()
	withdraw() {
		return this.transactionService.subtractMoney()
	}

	@Post()
	deposit() {
		return this.transactionService.addMoney()
	}

	@Post()
	transfer() {
		return this.transactionService.transferMoney()
	}
}
