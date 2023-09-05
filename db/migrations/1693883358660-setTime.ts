import { BaseMigration } from "@hodfords/typeorm-helper";
import { table } from "console";
import { QueryRunner } from "typeorm";

export class SetTime1693883358660 extends BaseMigration{
    async run(queryRunner: QueryRunner) {
        await this.update('InfoMatch',(table)=>{
            table.string('timeMatch').nullable()
        })
    }
    async rollback(queryRunner: QueryRunner) {
        await this.drop('time')
    }
}