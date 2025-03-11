import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransferDto } from './dto/transfer.dto';
import { validateValue } from './transaction-history.utils';
import { TransactionHistoryDto } from './dto/transaction-history.dto';
import { DataSource, Repository } from 'typeorm';
import { TransactionHistory } from './transaction-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import TransactionOperationContext from './context/transaction-operation.context';
import TransactionDeposit from './context/transaction-deposit.strategy';
import TransactionWithdraw from './context/transaction-withdraw.strategy';

@Injectable()
export class TransactionHistoryService {
	constructor(
		@InjectRepository(TransactionHistory)
		private transactionRepository: Repository<TransactionHistory>,

		@Inject(DataSource)
		private dataSource: DataSource
	) {
	}

	async addMoney(args: TransactionDto) {
		if (!validateValue(args.value)) {
			throw new BadRequestException('Invalid deposit payload.')
		}
		
		try {
			TransactionOperationContext.setStrategy(new TransactionDeposit(this.dataSource, args.userId))
			await TransactionOperationContext.executeStrategy(args.value)
		} catch (error) {
			throw new Error(`Unable to finish transaction: ${error}`)
		}

		this.registerTransaction({
			userInitiatorId: args.userId,
			userRecipientId: args.userId,
			value: args.value,
			type: 'D'
		})

		return 'Success'
	}

	async subtractMoney(args: TransactionDto) {
		if (!validateValue(args.value)) {
			throw new BadRequestException('Invalid withdrawal payload.')
		}

		try {
			TransactionOperationContext.setStrategy(new TransactionWithdraw(this.dataSource, args.userId))
			await TransactionOperationContext.executeStrategy(args.value)
		} catch (error) {
			throw new Error(`Unable to finish transaction: ${error}`)
		}

		this.registerTransaction({
			userInitiatorId: args.userId, // will come from jwt
			userRecipientId: args.userId, // same as initiator
			value: Number(args.value),
			type: 'W'
		})

		return 'Success'
	}

	async transferMoney(args: TransferDto) {
		if (!validateValue(args.value)) {
			throw new BadRequestException('Invalid transfer payload.')
		}

		try {
			TransactionOperationContext.setStrategy(new TransactionWithdraw(this.dataSource, args.userId))
			await TransactionOperationContext.executeStrategy(args.value)
		} catch (error) {
			throw new Error(`Unable to finish transaction: ${error}`)
		}

		try {
			TransactionOperationContext.setStrategy(new TransactionDeposit(this.dataSource, args.userReceiverId))
			await TransactionOperationContext.executeStrategy(args.value)
		} catch (error) {
			throw new Error(`Unable to finish transaction: OOPS ${error}`)
		}

		this.registerTransaction({
			userInitiatorId: args.userId, // will come from jwt
			userRecipientId: args.userReceiverId,
			value: args.value,
			type: 'T'
		})

		return 'Success'
	}

	registerTransaction(payload: TransactionHistoryDto) {
		try {
			const transaction = new TransactionHistory()
			transaction.type = payload.type
			transaction.userInitiatorId = payload.userInitiatorId
			transaction.userRecipientId = payload.userRecipientId
			transaction.value = payload.value

			this.transactionRepository.save(transaction)
		} catch (error) {
			throw new InternalServerErrorException('Error on transaction.')
		}

		return ''
	}
}
