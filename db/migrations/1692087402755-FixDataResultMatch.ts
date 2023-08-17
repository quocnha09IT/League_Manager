import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDataResultMatch1692087402755 implements MigrationInterface {
    name = 'FixDataResultMatch1692087402755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result_match" DROP COLUMN "resultMatch"`);
        await queryRunner.query(`ALTER TABLE "result_match" ADD "homeGoal" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "result_match" ADD "awaygoal" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result_match" DROP COLUMN "awaygoal"`);
        await queryRunner.query(`ALTER TABLE "result_match" DROP COLUMN "homeGoal"`);
        await queryRunner.query(`ALTER TABLE "result_match" ADD "resultMatch" character varying NOT NULL`);
    }

}
