import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatenameDateMatchVeune1692071824419 implements MigrationInterface {
    name = 'UpdatenameDateMatchVeune1692071824419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedule_match" RENAME COLUMN "mactchVenue" TO "matchVenue"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedule_match" RENAME COLUMN "matchVenue" TO "mactchVenue"`);
    }

}
