import { IsEnum, IsNumber } from "class-validator"

export class TransactionHistoryDto {
	/**
	 * ID de quem está enviando o dinheiro.
	 * @example uuid-random-value-string
	 */
	userInitiatorId: string

	/**
	 * ID de quem está recebendo o dinheiro.
	 * @example uuid-random-value-string
	 */
	userRecipientId: string

	/**
	 * O valor a ser transferido.
	 * @example 20.00
	 */
	@IsNumber()
	value: number

	/**
	 * Tipo de transferência. D = Depósito, W = Saque, T = Transferência.
	 * @example 'D'
	 */
	@IsEnum({
		D: 'D',
		W: 'W',
		T: 'T',
	})
	type: 'D' | 'W' | 'T'
}