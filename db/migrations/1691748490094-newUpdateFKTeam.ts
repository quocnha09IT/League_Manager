import { MigrationInterface, QueryRunner } from "typeorm";

export class NewUpdateFKTeam1691748490094 implements MigrationInterface {
    name = 'NewUpdateFKTeam1691748490094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" ADD "leagueId" integer`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_36d02c93049412c8e95bd478de9" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_36d02c93049412c8e95bd478de9"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "leagueId"`);
    }

}
