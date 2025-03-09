import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
import DataSourceObject from 'src/database/datasource';
import DataSourceSingleton from 'src/database/datasource';

@Injectable()
export class TransactionHistoryService {
	private dataSource: DataSource

	constructor(
		@InjectRepository(TransactionHistory)
		private transactionRepository: Repository<TransactionHistory>
	) {
		this.dataSource = DataSourceSingleton.get()
	}

	// ENVOLVA TUDO EM SQL TRANSACTIONS PRA PODER DAR ROLLBACK!

	async addMoney(args: TransactionDto) {
		if (!validateValue(args.value)) {
			throw new BadRequestException('Invalid deposit payload.')
		}

		// mock
		const userId = "b3e12c76-f3d5-4286-80c0-31f232f29a4b"
		
		TransactionOperationContext.setStrategy(new TransactionDeposit(this.dataSource, userId))
		TransactionOperationContext.executeStrategy(args.value)

		this.registerTransaction({
			userInitiatorId: userId, // will come from jwt
			userRecipientId: userId, // same as initiator
			value: args.value,
			type: 'D'
		})

		return 'Success'
	}

	// ENVOLVA TUDO EM SQL TRANSACTIONS PRA PODER DAR ROLLBACK!

	async subtractMoney(args: TransactionDto) {
		if (!validateValue(args.value)) {
			throw new BadRequestException('Invalid withdrawal payload.')
		}

		// mock
		const userId = "b3e12c76-f3d5-4286-80c0-31f232f29a4b"

		TransactionOperationContext.setStrategy(new TransactionWithdraw(this.dataSource, userId))
		await TransactionOperationContext.executeStrategy(args.value)

		this.registerTransaction({
			userInitiatorId: userId, // will come from jwt
			userRecipientId: userId, // same as initiator
			value: args.value,
			type: 'W'
		})

		return 'Success'
	}

	// ENVOLVA TUDO EM SQL TRANSACTIONS PRA PODER DAR ROLLBACK!

	async transferMoney(args: TransferDto) {
		if (!validateValue(args.value)) {
			throw new BadRequestException('Invalid transfer payload.')
		}

		// mock
		const userId = "b3e12c76-f3d5-4286-80c0-31f232f29a4b"

		TransactionOperationContext.setStrategy(new TransactionWithdraw(this.dataSource, userId))
		await TransactionOperationContext.executeStrategy(args.value)

		TransactionOperationContext.setStrategy(new TransactionDeposit(this.dataSource, args.userReceiverId))
		await TransactionOperationContext.executeStrategy(args.value)

		this.registerTransaction({
			userInitiatorId: userId, // will come from jwt
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
			transaction.userInitiatorId = payload.userRecipientId
			transaction.value = payload.value

			this.transactionRepository.save(transaction)
		} catch (error) {
			throw new InternalServerErrorException('Error on transaction.')
		}

		return ''
	}
}
