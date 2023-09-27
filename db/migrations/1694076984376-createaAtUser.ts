import { BaseMigration } from "@hodfords/typeorm-helper";
import { table } from "console";
import { QueryRunner } from "typeorm";

export class CreateaAtUser1694076984376 extends BaseMigration{
    async run(queryRunner: QueryRunner) {
        await this.update('user',(table)=>{
            table.createdAt().index();
            table.updatedAt();
            table.deletedAt();

        })
    }

    async rollback(queryRunner: QueryRunner) {
        await this.drop('Fred')
    }
}