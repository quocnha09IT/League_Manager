
import { BaseMigration } from "@hodfords/typeorm-helper";
import { QueryRunner } from "typeorm";

export class AddDataTableStandings1692631498586 extends BaseMigration {
    async run(queryRunner:QueryRunner){
        await this.update('team',(table)=> {
            table.integer('matchPlayed').nullable();

        })
    }

    async rollback(queryRunner:QueryRunner){
        await this.drop('Feul');
    }
}
