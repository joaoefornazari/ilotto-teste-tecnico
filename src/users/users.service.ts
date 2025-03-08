import { BadRequestException, Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor() {}

	checkUserCredentials(args: UserLoginDto) {
		if (
			args.email.length < 1 ||
			args.password.length < 1
		) {
			throw new BadRequestException('Invalid login payload.')
		}

		// Here I will use the model to match the
		// given password with the actual password
		// and go to the success flow - or throw an error, if any.

		return "Success"
	}

	createUser(args: CreateUserDto) {
		if (
			args.email.length > 1 ||
			args.password.length < 12
		) {
			throw new BadRequestException('Invalid user data payload.')
		}

		// Here is where the model will be.

		return "Success"
	}
}
