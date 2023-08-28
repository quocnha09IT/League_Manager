import { BaseMigration } from "@hodfords/typeorm-helper";
import { QueryRunner } from "typeorm";

export class CreateTableComment1692946306968 extends BaseMigration{
    async run(queryRunnner: QueryRunner){
       await this.create('UserComment',(table)=>{
            table.primaryUuid('id');
            table.integer('userId').nullable().foreign('user');
            table.integer('sheduleMatchId').nullable().foreign('shedule_match');
            table.string('comment').length(250);
        })

    }

    async rollback(queryRunner : QueryRunner){
        await this.drop('Fuel');
    }
}