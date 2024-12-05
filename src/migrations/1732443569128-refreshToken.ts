import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefreshToken1732443569128 implements MigrationInterface {
  name = 'RefreshToken1732443569128';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refreshToken" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }
}
