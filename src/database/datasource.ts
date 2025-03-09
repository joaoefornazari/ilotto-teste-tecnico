import { DataSource } from "typeorm"
import TypeORMConfig from "./typeorm.config"

class DataSourceSingleton {
	private static instance: DataSourceSingleton
	private dataSource: DataSource

	private constructor() {
		this.dataSource = new DataSource(TypeORMConfig)
	}

	static getInstance(): DataSourceSingleton {
		if (!DataSourceSingleton.instance) {
			DataSourceSingleton.instance = new DataSourceSingleton()
		}
		return DataSourceSingleton.instance
	}

	get (): DataSource {
		return this.dataSource
	}
}

export default DataSourceSingleton.getInstance()
