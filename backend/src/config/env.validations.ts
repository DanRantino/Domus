import * as z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  APP_PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  CORS_ALLOWED_ORIGINS: z.string().optional(),
  APP_NAME: z.string().default('Domus'),
  TYPEORM_SYNCHRONIZE: z.coerce.boolean().default(false),
  TYPEORM_MIGRATIONS: z.coerce.boolean().default(true),
  GLOBAL_PREFIX: z.string().default('api'),
});

export function validate(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    throw new Error(
      `Config validation error: ${result.error.issues
        .map((issue) => `${issue.path.join('.')} - ${issue.message}`)
        .join('\n')}`,
    );
  }
  return result.data;
}

export function getEnv() {
  return validate(process.env);
}
