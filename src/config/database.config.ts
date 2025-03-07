import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

type TypeOrmModuleConfigOptions = TypeOrmModuleOptions & {
	password: string
}


class DatabaseConfig implements TypeOrmOptionsFactory {

	private config: TypeOrmModuleConfigOptions

	constructor(private configService: ConfigService) {
		this.config = this.createTypeOrmOptions() as TypeOrmModuleConfigOptions
	}

	createTypeOrmOptions(): TypeOrmModuleConfigOptions {
		return {
			type: this.configService.get('DB_TYPE', 'postgres'),
			host: this.configService.get('DB_HOST',  'localhost'),
			port: this.configService.get('DB_PORT', 3000),
			username: this.configService.get('DB_USER', 'root'),
			password: this.configService.get('DB_PASSWORD', '1234'),
			entities: [],
			synchronize: true,
		}
	}

	get(): TypeOrmModuleConfigOptions {
		return this.config
	}
}

export default new DatabaseConfig(new ConfigService())
