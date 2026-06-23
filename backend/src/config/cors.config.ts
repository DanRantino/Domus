import { registerAs } from '@nestjs/config';
import { getEnv } from './env.validations';

export default registerAs('cors', () => {
  const env = getEnv();

  return {
    allowedOrigins: env.CORS_ALLOWED_ORIGINS,
  };
});
