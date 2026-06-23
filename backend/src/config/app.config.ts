import { registerAs } from '@nestjs/config';
import { getEnv } from './env.validations';

export default registerAs('app', () => {
  const env = getEnv();

  return {
    name: env.APP_NAME,
    port: env.APP_PORT,
    env: env.NODE_ENV || 'development',
    globalPrefix: env.GLOBAL_PREFIX || 'api',
  };
});
