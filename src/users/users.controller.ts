import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { ApiResponse } from '@nestjs/swagger';
import generateDocs from 'src/docs';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	/**
	 * Faz login do usuário.
	 *  
	 * @remarks Permite que o usuário faça login com email e senha.
	 */
	@ApiResponse(generateDocs('sign-in', HttpStatus.CREATED))
	@ApiResponse(generateDocs('sign-in', HttpStatus.NOT_FOUND))
	@ApiResponse(generateDocs('sign-in', HttpStatus.UNAUTHORIZED))
	@ApiResponse(generateDocs('sign-in', HttpStatus.INTERNAL_SERVER_ERROR))
	@Post('sign-in')
	signIn(@Body() userLoginDto: UserLoginDto): Promise<{token: string}> {
		console.log(generateDocs('sign-in', HttpStatus.CREATED))
		return this.usersService.checkUserCredentials(userLoginDto)
	}

	/**
	 * Faz login do usuário.
	 *  
	 * @remarks Permite que o usuário faça login com email e senha.
	 */
	@ApiResponse(generateDocs('sign-up', HttpStatus.CREATED))
	@ApiResponse(generateDocs('sign-up', HttpStatus.BAD_REQUEST))
	@ApiResponse(generateDocs('sign-up', HttpStatus.INTERNAL_SERVER_ERROR))
	@Post('sign-up')
	@HttpCode(HttpStatus.CREATED)
	signUp(@Body() createUserDto: CreateUserDto) {
		return this.usersService.createUser(createUserDto)
	}

}
