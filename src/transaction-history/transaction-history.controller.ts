import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';
import { TransactionDto } from './dto/transaction.dto';
import { TransferDto } from './dto/transfer.dto';

@Controller('transactions')
export class TransactionHistoryController {
	constructor(private transactionService: TransactionHistoryService) {}

	@Post('deposit')
	async deposit(@Body() depositDto: TransactionDto) {
		return await this.transactionService.addMoney(depositDto)
	}

	@Get('withdraw')
	async withdraw(@Query() withdrawDto: TransactionDto) {
		return await this.transactionService.subtractMoney(withdrawDto)
	}

	@Post('transfer')
	async transfer(@Body() transferDto: TransferDto) {
		return await this.transactionService.transferMoney(transferDto)
	}
}
