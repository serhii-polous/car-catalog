import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1579604770658 implements MigrationInterface {
  name = 'Init1579604770658';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE "manufacturers" (\
             "id" uuid NOT NULL DEFAULT uuid_generate_v4(),\
             "created_at" TIMESTAMP NOT NULL DEFAULT now(),\
             "updated_at" TIMESTAMP NOT NULL DEFAULT now(),\
             "name" character varying NOT NULL,\
             "phone" character varying NOT NULL,\
             "siret" bigint NOT NULL,\
             CONSTRAINT "PK_138520de32c379a48e703441975"\
             PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "owners" (\
             "id" uuid NOT NULL DEFAULT uuid_generate_v4(),\
             "created_at" TIMESTAMP NOT NULL DEFAULT now(),\
             "updated_at" TIMESTAMP NOT NULL DEFAULT now(),\
             "name" character varying NOT NULL,\
             "purchase_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\
             "car_id" uuid,\
             CONSTRAINT "PK_42838282f2e6b216301a70b02d6"\
             PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "cars" (\
             "id" uuid NOT NULL DEFAULT uuid_generate_v4(),\
             "created_at" TIMESTAMP NOT NULL DEFAULT now(),\
             "updated_at" TIMESTAMP NOT NULL DEFAULT now(),\
             "price" integer NOT NULL,\
             "first_registration_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\
             "manufacturer_id" uuid,\
             CONSTRAINT "PK_fc218aa84e79b477d55322271b6"\
             PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "owners" ADD CONSTRAINT "FK_7f0741d561628444c4c004da78d"\
              FOREIGN KEY ("car_id") REFERENCES "cars"("id")\
              ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "cars" ADD CONSTRAINT "FK_b28d371b5d5cedb823bccd695eb"\
              FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturers"("id")\
              ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE "cars" DROP CONSTRAINT "FK_b28d371b5d5cedb823bccd695eb"',
    );
    await queryRunner.query(
      'ALTER TABLE "owners" DROP CONSTRAINT "FK_7f0741d561628444c4c004da78d"',
    );
    await queryRunner.query('DROP TABLE "cars"', undefined);
    await queryRunner.query('DROP TABLE "owners"', undefined);
    await queryRunner.query('DROP TABLE "manufacturers"', undefined);
  }
}
