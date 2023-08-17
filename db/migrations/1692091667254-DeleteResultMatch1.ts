import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteResultMatch11692091667254 implements MigrationInterface {
    name = 'DeleteResultMatch11692091667254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedule_match" DROP COLUMN "homeGoal"`);
        await queryRunner.query(`ALTER TABLE "shedule_match" DROP COLUMN "awayGoal"`);
        await queryRunner.query(`ALTER TABLE "shedule_match" ADD "goalHome" integer`);
        await queryRunner.query(`ALTER TABLE "shedule_match" ADD "goalAway" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedule_match" DROP COLUMN "goalAway"`);
        await queryRunner.query(`ALTER TABLE "shedule_match" DROP COLUMN "goalHome"`);
        await queryRunner.query(`ALTER TABLE "shedule_match" ADD "awayGoal" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shedule_match" ADD "homeGoal" integer NOT NULL`);
    }

}
