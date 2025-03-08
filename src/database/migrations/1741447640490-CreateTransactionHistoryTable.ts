import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTransactionHistoryTable1741447640490 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(
				new Table({
					name: 'transaction_history',
					columns: [
						{
							name: 'id',
							type: 'uuid',
							isPrimary: true,
							generationStrategy: 'uuid',
							default: 'uuid_generate_v4()'
						},
						{
							name: 'userInitiatorId',
							type: 'uuid',
							isNullable: false,
						},
						{
							name: 'userRecipientId',
							type: 'uuid',
							isNullable: false,
						},
						{
							name: 'value',
							type: 'decimal',
							precision: 10,
							scale: 2,
							isNullable: false,
						},
						{
							name: 'type',
							type: 'enum',
							enum: ['W', 'T', 'D'],
							isNullable: false,
						},
						{
							name: 'created_at',
							type: 'timestamp',
							default: `NOW()`,
						},
						{
							name: 'updated_at',
							type: 'timestamp',
							default: `NOW()`,
						},
					],
				}),
				true,
			)

			await queryRunner.createForeignKeys('transaction_history', [
				new TableForeignKey({
					columnNames: ['userInitiatorId'],
					referencedColumnNames: ['id'],
					referencedTableName: 'users',
					onDelete: 'CASCADE'
				}),
				new TableForeignKey({
					columnNames: ['userRecipientId'],
					referencedColumnNames: ['id'],
					referencedTableName: 'users',
					onDelete: 'CASCADE'
				})
			])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			const table = await queryRunner.getTable('transaction_history')
			const foreignKeys = table?.foreignKeys.filter(
				(fk) => 
					fk.columnNames.indexOf('userInitiatorId') !== -1 ||
					fk.columnNames.indexOf('userRecipientId') !== -1
			)
			foreignKeys?.forEach(async (fk) => {
				await queryRunner.dropForeignKey('transaction_history', fk)
			})

			await queryRunner.dropTable('transaction_history', true)
    }

}
