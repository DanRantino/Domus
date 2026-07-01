import { createZodValidationPipe, type ZodValidationPipe } from 'nestjs-zod';

const BaseZodValidationPipe: typeof ZodValidationPipe = createZodValidationPipe(
  {
    strictSchemaDeclaration: true,
  },
);

export class AppZodValidationPipe extends BaseZodValidationPipe {}
