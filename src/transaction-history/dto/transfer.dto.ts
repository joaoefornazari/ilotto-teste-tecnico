import { TransactionDto } from "./transaction.dto";

export class TransferDto extends TransactionDto{
	userReceiverId: string
}
