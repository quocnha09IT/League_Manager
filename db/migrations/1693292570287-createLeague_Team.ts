import { BaseMigration } from "@hodfords/typeorm-helper";
import { table } from "console";
import { QueryRunner } from "typeorm";

export class CreateLeagueTeam1693292570287 extends BaseMigration{
    async run(queryRunner: QueryRunner) {
        this.create('league_team', (table)=>{
            table.primaryUuid('id')
            table.integer('leagueId').foreign('league')
            table.integer('teamId').foreign('team')
        })
    }

    async rollback(queryRunner: QueryRunner) {
        this.drop('league_team')
    }
}