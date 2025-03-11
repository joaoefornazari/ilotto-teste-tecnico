import { IsDecimal, IsUUID } from "class-validator";
import { User } from "src/users/users.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('transaction_history')
export class TransactionHistory {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	@IsUUID()
	@ManyToMany(type => User, user => user.id)
	userInitiatorId: string

	@Column()	
	@IsUUID()
	@ManyToMany(type => User, user => user.id)
	userRecipientId: string 

	@Column()
	@IsDecimal()
	value: number

	@Column()
	type: 'W' | 'T' | 'D'
}