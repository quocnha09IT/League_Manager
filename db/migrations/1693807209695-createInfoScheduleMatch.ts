import { BaseMigration } from "@hodfords/typeorm-helper";
import { table } from "console";
import { QueryRunner } from "typeorm";

export class CreateInfoScheduleMatch1693807209695 extends BaseMigration{
    async run(queryRunner: QueryRunner) {
        this.create(('InfoMatch'),(table)=>{
            table.primaryUuid('id'),
            table.integer('matchId').foreign('shedule_match'),
            table.string('infoMatch').nullable()
        })
    }
    async rollback(queryRunner: QueryRunner) {
        this.drop('')
    }
}