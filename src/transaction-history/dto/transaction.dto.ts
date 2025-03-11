import { IsString, IsNumber } from "class-validator";

export class TransactionDto {
	@IsNumber()
	value: number

	@IsString()
	userId: string
}
