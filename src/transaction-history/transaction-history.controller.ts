import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';
import { TransactionDto } from './dto/transaction.dto';
import { TransferDto } from './dto/transfer.dto';
import { ApiHeaders, ApiResponse, ApiBody } from '@nestjs/swagger';
import generateDocs from 'src/docs';

@Controller('transactions')
export class TransactionHistoryController {
	constructor(private transactionService: TransactionHistoryService) {}

	/**
	 * Deposita um valor.
	 * 
	 * @remarks Deposita um valor na conta do usuário logado.
	 */
	@ApiHeaders([{ name: 'authorization' }])
	@ApiResponse(generateDocs('deposit', HttpStatus.OK))
	@ApiResponse(generateDocs('deposit', HttpStatus.BAD_REQUEST))
	@ApiResponse(generateDocs('deposit', HttpStatus.INTERNAL_SERVER_ERROR))
	@Post('deposit')
	@HttpCode(HttpStatus.OK)
	async deposit(@Body() depositDto: TransactionDto) {
		return await this.transactionService.addMoney(depositDto)
	}

	/**
	 * Faz o saque de um valor.
	 * 
	 * @remarks Saca um valor da conta do usuário logado.
	 */
	@ApiHeaders([{ name: 'authorization' }])
	@ApiResponse(generateDocs('withdraw', HttpStatus.OK))
	@ApiResponse(generateDocs('withdraw', HttpStatus.BAD_REQUEST))
	@ApiResponse(generateDocs('withdraw', HttpStatus.INTERNAL_SERVER_ERROR))
	@Post('withdraw')
	@HttpCode(HttpStatus.OK)
	async withdraw(@Body() withdrawDto: TransactionDto) {
		return await this.transactionService.subtractMoney(withdrawDto)
	}

	/**
	 * Transfere um valor entre contas.
	 * 
	 * @remarks Transfere um valor da conta do usuário logado para o ID informado. 
	 */
	@ApiHeaders([{ name: 'authorization' }])
	@ApiResponse(generateDocs('transfer', HttpStatus.OK))
	@ApiResponse(generateDocs('transfer', HttpStatus.BAD_REQUEST))
	@ApiResponse(generateDocs('transfer', HttpStatus.INTERNAL_SERVER_ERROR))
	@Post('transfer')
	@HttpCode(HttpStatus.OK)
	async transfer(@Body() transferDto: TransferDto) {
		return await this.transactionService.transferMoney(transferDto)
	}
}
