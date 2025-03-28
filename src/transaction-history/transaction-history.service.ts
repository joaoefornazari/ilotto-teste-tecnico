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
			await this.transactionQueue.add(
				'withdraw',
				{
					userId: args.userId,
					value: args.value
				},
				{ jobId: randomUUID() }
			)
		} catch (error) {
			throw new Error(`Unable to queue transaction: ${error}`)
		}

		await this.registerTransaction({
			userInitiatorId: args.userId,
			userRecipientId: args.userId,
			value: Number(args.value),
			type: 'W'
		})

		// aumenta saques realizados no dia atual

		await this.transactionReportQueue.add(
			'update',
			{
				date: getCurrentYearMonthDateString(new Date()),
				type: 'W'
			},
			{ jobId: randomUUID() }
		)

		return 'Success'
	}

	async transferMoney(args: TransferDto) {
		if (!validateValue(args.value)) {
			throw new BadRequestException('Invalid transfer payload.')
		}

		try {
			await this.transactionQueue.add(
				'withdraw',
				{
					userId: args.userId,
					value: args.value
				},
				{ jobId: randomUUID() }
			)
		} catch (error) {
			throw new Error(`Unable to queue transaction: ${error}`)
		}

		try {
			await this.transactionQueue.add(
				'deposit',
				{
					userId: args.userReceiverId,
					value: args.value
				},
				{ jobId: randomUUID() }
			)
		} catch (error) {
			throw new Error(`Unable to queue transaction: ${error}`)
		}

		await this.registerTransaction({
			userInitiatorId: args.userId,
			userRecipientId: args.userReceiverId,
			value: args.value,
			type: 'T'
		})

		// aumenta transferências realizadas no dia atual

		await this.transactionReportQueue.add(
			'update',
			{
				date: getCurrentYearMonthDateString(new Date()),
				type: 'T'
			},
			{ jobId: randomUUID() }
		)

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
