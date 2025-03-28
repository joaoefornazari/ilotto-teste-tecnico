import { IsEmail, IsDecimal, IsStrongPassword, IsUUID } from "class-validator"
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { hash } from "bcrypt"

const SALT_ROUNDS = 10

@Entity('users')
export class User {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	@IsEmail()
	email: string

	@Column()
	@IsStrongPassword()
	password: string

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password, SALT_ROUNDS)
	}

	@Column()
	@IsDecimal()
	balance: number = 0.00
}