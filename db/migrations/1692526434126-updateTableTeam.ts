import { BaseMigration } from "@hodfords/typeorm-helper";
import { QueryRunner } from "typeorm";

export class CreateTableLeagueStandings1692525330289 extends BaseMigration {
    async run(queryRunner:QueryRunner){
        await this.update('team',(table)=> {
            table.integer('numberGoal').nullable();
            table.integer('concededGoal').nullable();
            table.integer('goalPerformance').nullable();
            

        })
    }

    async rollback(queryRunner:QueryRunner){
        await this.drop('Feul');
    }
}
