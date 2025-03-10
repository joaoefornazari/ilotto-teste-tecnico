import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1741445838742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(
				new Table({
					name: 'users',
					columns: [
						{
							name: 'id',
							type: 'uuid',
							isPrimary: true,
							isGenerated: true,
							generationStrategy: 'uuid',
							default: 'uuid_generate_v4()',
						},
						{
							name: 'email',
							type: 'varchar',
							length: '300',
							isUnique: true,
						},
						{
							name: 'password',
							type: 'varchar',
							length: '600',
						},
						{
							name: 'balance',
							type: 'decimal',
							precision: 10,
							scale: 2,
							default: 0.00,
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
							default: `NOW()`,
							isNullable: true,
						},
					]
				})
			)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropTable('users', true);
    }

}
