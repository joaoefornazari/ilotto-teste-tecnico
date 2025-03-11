import { DataSource } from "typeorm"
import TypeORMConfig from "./typeorm.config"

const DS =  new DataSource(TypeORMConfig)

export default DS