import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteResultMatch1692091189694 implements MigrationInterface {
    name = 'DeleteResultMatch1692091189694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedule_match" DROP COLUMN "goalOfHome"`);
        await queryRunner.query(`ALTER TABLE "shedule_match" DROP COLUMN "goalOfaway"`);
        await queryRunner.query(`ALTER TABLE "shedule_match" ADD "homeGoal" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shedule_match" ADD "awayGoal" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedule_match" DROP COLUMN "awayGoal"`);
        await queryRunner.query(`ALTER TABLE "shedule_match" DROP COLUMN "homeGoal"`);
        await queryRunner.query(`ALTER TABLE "shedule_match" ADD "goalOfaway" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shedule_match" ADD "goalOfHome" integer NOT NULL`);
    }

}
