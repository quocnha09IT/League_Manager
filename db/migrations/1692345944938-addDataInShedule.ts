import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDataInShedule1692345944938 implements MigrationInterface {
    name = 'AddDataInShedule1692345944938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedule_match" ADD "isProcessed" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedule_match" DROP COLUMN "isProcessed"`);
    }

}
