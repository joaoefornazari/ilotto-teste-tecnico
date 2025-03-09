import { DataSource } from "typeorm";
import TransactionOperationStrategy from "./transaction-operation.strategy.interface";
import { InternalServerErrorException } from "@nestjs/common";

class TransactionWithdraw implements TransactionOperationStrategy {
	
	private userId: string

	constructor(
		private dataSource: DataSource,
		userId: string
	) {
		this.userId = userId
	}

	async execute(value: number) {
		const queryRunner = this.dataSource.createQueryRunner()
		try {	
			await queryRunner.connect()
		} catch (error) {
			queryRunner.release()
			throw new InternalServerErrorException('Database error.')
		}

		await queryRunner.startTransaction()

		try {
			await queryRunner.query('UPDATE users SET balance = balance - ? WHERE id = ?', [value, this.userId])
			await queryRunner.commitTransaction()
		} catch (error) {
			await queryRunner.rollbackTransaction()
			throw new InternalServerErrorException('Database error.')
		} finally {
			queryRunner.release()
		}
	}
}

export default TransactionWithdraw