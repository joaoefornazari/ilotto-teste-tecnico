import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async checkUserCredentials(args: UserLoginDto) {
		if (
			args.email.length < 1 ||
			args.password.length < 1
		) {
			throw new BadRequestException('Invalid login payload.')
		}

		const user = await this.userRepository.findOne({ where: { email: args.email }})
		if (!user) {
			throw new NotFoundException('User not found.')
		}

		try {
			await compare(user.password, args.password)
		} catch (error) {
			throw new UnauthorizedException('Invalid login payload.')
		}

		return "Success" // retornarei a token aqui logo logo.
	}

	async createUser(args: CreateUserDto): Promise<User> {
		if (
			args.email.length > 1 ||
			args.password.length < 12
		) {
			throw new BadRequestException('Invalid user data payload.')
		}

		try {
			return this.userRepository.create(args)
		} catch (error) {
			throw new Error(`Error while creating user: ${error?.message ?? error}`)
		}
	}
}
