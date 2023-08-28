import { BaseMigration } from "@hodfords/typeorm-helper";
import { QueryRunner } from "typeorm";

export class FKleagueId1692878384619 extends BaseMigration {
    async run(queryRunner: QueryRunner){
       await this.update('shedule_match',(table)=>{
            table.integer('leagueId').nullable().foreign('league')
        })
    }
    async rollback(queryRunner: QueryRunner) {
       await this.drop('leagueId')
    }   
}