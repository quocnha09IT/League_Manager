import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDataPlayer1691828461444 implements MigrationInterface {
    name = 'AddDataPlayer1691828461444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "goals"`);
        await queryRunner.query(`ALTER TABLE "player" ADD "position" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "player" ADD "height" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "player" ADD "weight" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "position"`);
        await queryRunner.query(`ALTER TABLE "player" ADD "goals" integer NOT NULL`);
    }

}
