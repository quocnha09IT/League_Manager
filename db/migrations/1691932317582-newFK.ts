import { MigrationInterface, QueryRunner } from "typeorm";

export class NewFK1691932317582 implements MigrationInterface {
    name = 'NewFK1691932317582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_8ae45d0afee8acebafc59991e6d"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "REL_8ae45d0afee8acebafc59991e6"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "playerId"`);
        await queryRunner.query(`ALTER TABLE "player" ADD "teamId" integer`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_e85150e7e8a80bee7f2be3adab0" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_e85150e7e8a80bee7f2be3adab0"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "teamId"`);
        await queryRunner.query(`ALTER TABLE "team" ADD "playerId" integer`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "REL_8ae45d0afee8acebafc59991e6" UNIQUE ("playerId")`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_8ae45d0afee8acebafc59991e6d" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
