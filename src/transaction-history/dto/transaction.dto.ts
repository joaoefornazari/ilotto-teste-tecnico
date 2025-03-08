import { IsNumber } from "class-validator";

export class TransactionDto {
	@IsNumber()
	value: number
}
