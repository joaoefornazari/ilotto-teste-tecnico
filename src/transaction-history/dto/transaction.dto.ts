import { IsNumber, IsUUID } from "class-validator";

export class TransactionDto {
	/**
	 * Valor referente à transação.
	 * @example 20.00
	 */
	@IsNumber()
	value: number

	/**
	 * ID do usuário que está realizando a transação.
	 * @example uuid-random-value-string
	 */
	@IsUUID()
	userId: string
}
