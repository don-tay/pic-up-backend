import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({ path: `envs/${process.env.NODE_ENV}.env` });

const configService = new ConfigService();

// for migrations
export default new DataSource({
  type: 'postgres',
  host: configService.get('PG_HOST'),
  port: configService.get('PG_PORT'),
  username: configService.get('PG_USERNAME'),
  password: configService.get('PG_PASSWORD'),
  database: configService.get('PG_DATABASE'),
  migrations: ['./src/core/database/migrations/*.ts'],
});
