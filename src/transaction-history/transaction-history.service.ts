import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransferDto } from './dto/transfer.dto';
import { validateValue } from './transaction-history.utils';
import { TransactionHistoryDto } from './dto/transaction-history.dto';

@Injectable()
export class TransactionHistoryService {
	constructor() {}

	// ENVOLVA TUDO EM SQL TRANSACTIONS PRA PODER DAR ROLLBACK!

	addMoney(args: TransactionDto) {
		if (!validateValue(args.value)) {
			throw new BadRequestException('Invalid deposit payload.')
		}

		this.registerTransaction({
			userInitiatorId: '', // will come from jwt
			userRecipientId: '', // same as initiator
			value: args.value
		})

		// Model will be here

		return 'Success'
	}

	// ENVOLVA TUDO EM SQL TRANSACTIONS PRA PODER DAR ROLLBACK!

	subtractMoney(args: TransactionDto) {
		if (!validateValue(args.value)) {
			throw new BadRequestException('Invalid deposit payload.')
		}

		// Model will be here

		this.registerTransaction({
			userInitiatorId: '', // will come from jwt
			userRecipientId: '', // same as initiator
			value: args.value
		})

		return ''
	}

	// ENVOLVA TUDO EM SQL TRANSACTIONS PRA PODER DAR ROLLBACK!

	transferMoney(args: TransferDto) {
		if (!validateValue(args.value)) {
			throw new BadRequestException('Invalid deposit payload.')
		}

		// Model will be here

		this.registerTransaction({
			userInitiatorId: '', // will come from jwt
			userRecipientId: args.userReceiverId,
			value: args.value
		})

		return ''
	}

	registerTransaction(payload: TransactionHistoryDto) {
		// Model will be here

		return ''
	}
}
