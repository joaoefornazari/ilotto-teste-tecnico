import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post('sign-in')
	signIn() {
		return this.usersService.checkUserCredentials()
	}

	@Post()
	signUp() {
		return this.usersService.createUser()
	}

}
