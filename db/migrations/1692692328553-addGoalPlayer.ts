import { BaseMigration } from "@hodfords/typeorm-helper";
import { QueryRunner } from "typeorm";

export class AddGoalPlayer1692692328553 extends BaseMigration{
    async run(queryRunner: QueryRunner){
       await this.update('player', (table) =>{
            table.integer('numberGoal').nullable();
        })  
    }

    async rollback(queryRunner: QueryRunner) {
        await this.drop('numberGoal');
    }
}