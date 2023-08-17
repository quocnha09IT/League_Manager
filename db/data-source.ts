import { from } from "rxjs";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceoptions: DataSourceOptions ={
     type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123456",
      database: "league",
      
      synchronize: false,
      logging: false,
      
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
      // migrations: [],
      // migrationsTableName: "custom_migration_table",
      
};

const dataSource = new DataSource(dataSourceoptions);
export default dataSource; 