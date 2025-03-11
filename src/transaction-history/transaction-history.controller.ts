import { Body, Controller, Post } from '@nestjs/common';
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

	@Post('withdraw')
	async withdraw(@Body() withdrawDto: TransactionDto) {
		return await this.transactionService.subtractMoney(withdrawDto)
	}

	@Post('transfer')
	async transfer(@Body() transferDto: TransferDto) {
		return await this.transactionService.transferMoney(transferDto)
	}
}
