import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
	/**
	 * Nome do usuário.
	 * @example Clóvis
	 */
	@IsString()
	name: string

	/**
	 * Email do usuário.
	 * @example email@email.com
	 */
	@IsEmail()
	email: string

	/**
	 * Senha válida.
	 * @example joaoeduardo1234
	 */
	@IsNotEmpty()
	password: string
}