import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1741445838742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(
				new Table({
					name: 'users',
					columns: [
						{
							name: 'id',
							type: 'binary',
							isPrimary: true,
							isGenerated: true,
							generationStrategy: 'uuid',
							default: `uuid_generate_v4()`
						},
						{
							name: 'email',
							type: 'string',
							isNullable: false,
							isUnique: true,
						},
						{
							name: 'password',
							type: 'string',
							length: '600',
							isNullable: false,
						},
						{
							name: 'balance',
							type: 'decimal',
							precision: 10,
							scale: 2,
							default: 0,
							isNullable: false,
						},
						{
							name: 'created_at',
							type: 'timestamp',
							default: `NOW()`,
							isNullable: false,
						},
						{
							name: 'updated_at',
							type: 'timestamp',
							default: `NOW()`
						},
					]
				})
			)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropTable('users', true)
    }

}
