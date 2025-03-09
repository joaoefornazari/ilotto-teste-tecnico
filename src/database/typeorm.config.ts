import { TypeOrmModuleOptions } from "@nestjs/typeorm"

const TypeORMConfig = {
	type: 'postgres',
	host: process.env.DB_HOST ?? 'localhost',
	port: Number(process.env.DB_PORT) ?? 5432,
	username: process.env.DB_USER ?? 'postgres',
	password: process.env.DB_PASSWORD ?? 'root',
	database: process.env.DB_NAME ?? 'test',
	entities: ["dist/**/**.entity.js"],
	migrations: ["dist/database/migrations/**{.js}"],
	synchronize: true,
} satisfies TypeOrmModuleOptions

export default TypeORMConfig