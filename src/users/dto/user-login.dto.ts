import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserLoginDto {
	/**
	 * Um email padrão.
	 * @example user@email.com
	 */
	@IsEmail()
	email: string


	/**
	 * Uma senha válida.
	 * @example abcdefghijkl1234
	 */
	@IsNotEmpty()
	password: string
}
