import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';
import { TransactionDto } from './dto/transaction.dto';
import { TransferDto } from './dto/transfer.dto';

@Controller('transaction-history')
export class TransactionHistoryController {
	constructor(private transactionService: TransactionHistoryService) {}

	@Post('deposit')
	deposit(@Body() depositDto: TransactionDto) {
		return this.transactionService.subtractMoney(depositDto)
	}

	@Get('withdraw')
	withdraw(@Query() withdrawDto: TransactionDto) {
		return this.transactionService.subtractMoney(withdrawDto)
	}

	@Post('transfer')
	transfer(@Body() transferDto: TransferDto) {
		return this.transactionService.transferMoney(transferDto)
	}
}
