import { IsUUID } from "class-validator";
import { TransactionDto } from "./transaction.dto";

export class TransferDto extends TransactionDto {
	/**
	 * ID do usuário que receberá a transferência.
	 * @example uuid-random-string-value
	 */
	@IsUUID()
	userReceiverId: string
}
