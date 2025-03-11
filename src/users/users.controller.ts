import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post('sign-in')
	signIn(@Body() userLoginDto: UserLoginDto) {
		return this.usersService.checkUserCredentials(userLoginDto)
	}

	@Post('sign-up')
	@HttpCode(HttpStatus.CREATED)
	signUp(@Body() createUserDto: CreateUserDto) {
		return this.usersService.createUser(createUserDto)
	}

}
