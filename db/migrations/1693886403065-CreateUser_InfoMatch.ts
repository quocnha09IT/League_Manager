import { BaseMigration } from "@hodfords/typeorm-helper";
import { QueryRunner } from "typeorm";

export class CreateUserInfoMatch1693886403065 extends BaseMigration{
    async run(queryRunner: QueryRunner) {
        await this.create('User_InfoMatch',(table)=>{
            table.primaryUuid('id')
            table.uuid('IdInfoMatch').foreign('InfoMatch')
            table.integer('UserId').foreign('user')
            table.string('action')
        })
    }
    async rollback(queryRunner: QueryRunner) {
        await this.drop('User_InfoMatch')
    }
}