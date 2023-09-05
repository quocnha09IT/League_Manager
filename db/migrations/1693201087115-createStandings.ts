import { BaseMigration } from "@hodfords/typeorm-helper";
import { table } from "console";
import { QueryRunner } from "typeorm";

export class CreateStandings1693201087115 extends BaseMigration{
    async run(queryRunner: QueryRunner) {
        this.create(('standing'),(table)=>{
            table.primaryUuid('id')
            table.integer('leagueId').foreign('shedule_match')
            table.integer('teamId').foreign('shedule_match')
            table.integer('score')
            table.integer('numberGoal')
            table.integer('concededGoal')
            table.integer('matchPlayer')
        })
    }
    async rollback(queryRunner: QueryRunner) {
        this.drop('standing')
    }
}
