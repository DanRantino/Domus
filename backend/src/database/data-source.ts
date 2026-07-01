import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { getEnv } from '../config/env.validations';

config({ path: ['backend/.env', '.env', '../.env'], quiet: true });

const env = getEnv();

const isDevelopment = env.NODE_ENV === 'development';

export default new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  synchronize: false,
  migrationsRun: false,
  logging: isDevelopment,
  entities: [isDevelopment ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js'],
  migrations: [
    isDevelopment
      ? 'src/database/migrations/*.ts'
      : 'dist/database/migrations/*.js',
  ],
});
