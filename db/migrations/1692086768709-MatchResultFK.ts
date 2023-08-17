import { MigrationInterface, QueryRunner } from "typeorm";

export class MatchResultFK1692086768709 implements MigrationInterface {
    name = 'MatchResultFK1692086768709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result_match" ADD "sheduleMatchsId" integer`);
        await queryRunner.query(`ALTER TABLE "result_match" ADD CONSTRAINT "FK_f548f023215926499063ac7c01c" FOREIGN KEY ("sheduleMatchsId") REFERENCES "shedule_match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result_match" DROP CONSTRAINT "FK_f548f023215926499063ac7c01c"`);
        await queryRunner.query(`ALTER TABLE "result_match" DROP COLUMN "sheduleMatchsId"`);
    }

}
