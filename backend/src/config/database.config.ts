import { registerAs } from '@nestjs/config';
import { getEnv } from './env.validations';

export default registerAs('db', () => {
  const env = getEnv();

  return {
    url: env.DATABASE_URL,
    // TypeORM configuration
    synchronize: env.TYPEORM_SYNCHRONIZE,
    migrations: env.TYPEORM_MIGRATIONS,
  };
});
