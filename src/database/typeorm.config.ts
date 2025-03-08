import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { CreateUsersTable1741445838742 } from "./migrations/1741445838742-CreateUsersTable"

const TypeORMConfig = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER ?? 'postgres',
	password: process.env.DB_PASSWORD ?? 'root',
	database: process.env.DB_NAME,
	entities: [],
	migrations: ["src/database/migrations/**{.ts,.js}"],
	synchronize: true,
} satisfies TypeOrmModuleOptions

export default TypeORMConfig