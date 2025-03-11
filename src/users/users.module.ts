import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "src/users/users.controller";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
