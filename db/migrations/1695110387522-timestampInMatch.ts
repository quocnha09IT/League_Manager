import { BaseMigration } from "@hodfords/typeorm-helper";
import { table } from "console";
import { QueryRunner } from "typeorm";

export class TimestampInMatch1695110387522 extends BaseMigration{
    async  run(queryRunner: QueryRunner) {
      await  this.update('shedule_match', (table)=>{
            table.timestamp('timeMatch').nullable()
        })
    }
    async  rollback(queryRunner: QueryRunner) {
        
    }
}