import { IsDate, IsNumber } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('daily_transaction_report')
export class TransactionReport {
	@PrimaryGeneratedColumn()
	@IsNumber()
	id: number;

	@Column({ type: 'varchar' })
	date: string;

	@Column({ default: 0 })
	@IsNumber()
	withdraws: number;

	@Column({ default: 0 })
	@IsNumber()
	deposits: number;

	@Column({ default: 0 })
	@IsNumber()
	transferences: number;
}