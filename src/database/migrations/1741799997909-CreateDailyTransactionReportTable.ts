import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDailyTransactionReportTable1741799997909 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'daily_transaction_report',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'date',
						type: 'DATE',
						isNullable: false,
					},
					{
						name: 'withdraws',
						type: 'integer',
						default: 0,
						isNullable: false,
					},
					{
						name: 'deposits',
						type: 'integer',
						default: 0,
						isNullable: false,
					},
					{
						name: 'transferences',
						type: 'integer',
						default: 0,
						isNullable: false,
					},
				]	
			}),
			true
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('daily_transaction_report', true)
	}

}
