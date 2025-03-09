import { IsEmail, IsNumber, IsStrongPassword, IsUUID } from "class-validator"
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { hash } from "bcrypt"

const SALT_ROUNDS = 10

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	@IsUUID()
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
	@IsNumber()
	balance: number
}