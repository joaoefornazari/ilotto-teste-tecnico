import { IsUUID } from "class-validator";
import { User } from "src/users/users.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('transaction_history')
export class TransactionHistory {
	@PrimaryGeneratedColumn()
	@IsUUID()
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
	value: number

	@Column()
	type: 'W' | 'T' | 'D'
}