import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransferDto } from './dto/transfer.dto';
import { getCurrentYearMonthDateString, validateValue } from './transaction-history.utils';
import { TransactionHistoryDto } from './dto/transaction-history.dto';
import { DataSource, Repository } from 'typeorm';
import TransactionOperationContext from './context/transaction-operation.context';
import TransactionDeposit from './context/transaction-deposit.strategy';
import TransactionWithdraw from './context/transaction-withdraw.strategy';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { randomUUID } from 'crypto';

@Injectable()
export class TransactionHistoryService {
	constructor(
		@Inject(DataSource)
		private dataSource: DataSource,

		@InjectQueue('transaction-queue')
		private transactionQueue: Queue,

		@InjectQueue('transaction-history-queue')
		private transactionHistoryQueue: Queue,

		@InjectQueue('transaction-report-queue')
		private transactionReportQueue: Queue
	) {
	}

	async addMoney(args: TransactionDto) {
		if (!validateValue(args.value)) {
			throw new BadRequestException('Invalid deposit payload.')
		}
		
		try {			
			await this.transactionQueue.add(
				'deposit', 
				{
					userId: args.userId,
					value: args.value
				},
				{ jobId: randomUUID() }
			)
		} catch (error) {
			throw new Error(`Unable to queue transaction: ${error}`)
		}

		// registra transação no histórico

		await this.registerTransaction({
			userInitiatorId: args.userId,
			userRecipientId: args.userId,
			value: args.value,
			type: 'D'
		})

		// aumenta depósitos realizados no dia atual

		await this.transactionReportQueue.add(
			'update',
			{
				date: getCurrentYearMonthDateString(new Date()),
				type: 'D'
			},
			{ jobId: randomUUID() }
		)

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

		await this.registerTransaction({
			userInitiatorId: args.userId,
			userRecipientId: args.userId,
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

		await this.registerTransaction({
			userInitiatorId: args.userId, // will come from jwt
			userRecipientId: args.userReceiverId,
			value: args.value,
			type: 'T'
		})

		return 'Success'
	}

	async registerTransaction(payload: TransactionHistoryDto) {
		try {
			await this.transactionHistoryQueue.add(
				'register',
				payload,
				{ jobId: randomUUID() }
			)
		} catch (error) {
			throw new InternalServerErrorException(`Error on queueing transaction: ${error}`)
		}

		return ''
	}
}
