import { TypeOrmModuleOptions } from "@nestjs/typeorm"

const TypeORMConfig = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER ?? 'postgres',
	password: process.env.DB_PASSWORD ?? 'root',
	database: process.env.DB_NAME,
	entities: ["src/**/**.entity.ts"],
	migrations: ["src/database/migrations/**{.ts,.js}"],
	synchronize: true,
} satisfies TypeOrmModuleOptions

export default TypeORMConfig