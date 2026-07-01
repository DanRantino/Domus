import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get('app.globalPrefix') ?? 'api');
  app.enableCors({
    origin: configService.get('cors.allowedOrigins') ?? '*',
  });
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle(configService.get('app.name') ?? 'API')
    .setDescription(configService.get('app.description') ?? 'API Documentation')
    .setVersion(configService.get('app.version') ?? '1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor(),
  );

  console.log(configService.get('app.port'));
  await app.listen(configService.get('app.port') ?? 3001);
}
void bootstrap();
