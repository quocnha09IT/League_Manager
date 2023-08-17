import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteFKTeamOne1691932173856 implements MigrationInterface {
    name = 'DeleteFKTeamOne1691932173856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_e85150e7e8a80bee7f2be3adab0"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "teamId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" ADD "teamId" integer`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_e85150e7e8a80bee7f2be3adab0" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
