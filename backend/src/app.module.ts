import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import corsConfig from './config/cors.config';
import dbConfig from './config/database.config';
import { validate } from './config/env.validations';
import { CategoryModule } from './modules/categories/category.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['backend/.env', '.env'],
      validate,
      load: [corsConfig, appConfig, dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        url: config.get<string>('db.url'),
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: false,
        logging: config.get('app.env') === 'development',
      }),
    }),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
