import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

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
			const check = await compare(args.password, user.password)
			if (!check) throw new Error()
		} catch (error) {
			throw new UnauthorizedException('Invalid login payload.')
		}

		const secret = <string>process.env.SECRET_TOKEN
		if (!secret) throw new InternalServerErrorException()
		
		const token = sign({ id: user.id }, secret)
		return { token }
	}

	async createUser(args: CreateUserDto): Promise<User> {
		if (
			args.email.length < 1 ||
			args.password.length < 12
		) {
			throw new BadRequestException('Invalid user data payload.')
		}

		try {
			const user = this.userRepository.create(args)
			await this.userRepository.save(user)
			return user
		} catch (error) {
			throw new Error(`Error while creating user: ${error?.message ?? error}`)
		}
	}
}
