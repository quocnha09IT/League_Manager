import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1691747951976 implements MigrationInterface {
    name = 'NewMigrations1691747951976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "result_match" ("id" SERIAL NOT NULL, "resultMatch" character varying NOT NULL, "teamsId" integer, CONSTRAINT "PK_2b1b1cdd1ba80cfc039fcbb4bfd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "result_match" ADD CONSTRAINT "FK_48b3569518cab76bdd669229300" FOREIGN KEY ("teamsId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result_match" DROP CONSTRAINT "FK_48b3569518cab76bdd669229300"`);
        await queryRunner.query(`DROP TABLE "result_match"`);
    }

}
