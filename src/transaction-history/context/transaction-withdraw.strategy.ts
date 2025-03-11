import { DataSource } from "typeorm";
import TransactionOperationStrategy from "./transaction-operation.strategy.interface";
import { InternalServerErrorException } from "@nestjs/common";

class TransactionWithdraw implements TransactionOperationStrategy {
	
	private userId!: string

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
			throw new InternalServerErrorException(`Database error: ${error}`)
		}

		await queryRunner.startTransaction()

		try {
			const result = await queryRunner.query(`
				UPDATE users 
				SET balance = CASE 
					WHEN balance >= ${value} THEN balance - ${value} 
					ELSE balance 
				END
				WHERE id = '${this.userId}' AND balance >= ${value}
			`)
			
			if (!result[1]) {
				throw new InternalServerErrorException(`Invalid payload.`)
			}
			await queryRunner.commitTransaction()
		} catch (error) {
			await queryRunner.rollbackTransaction()
			throw new InternalServerErrorException(`Database error: ${error}`)
		} finally {
			queryRunner.release()
		}
	}
}

export default TransactionWithdraw