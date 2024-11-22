import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { configFactory } from './config';
import { DiaryModule } from './diary/diary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // allow injecting ConfigService in module factory
      isGlobal: true,
      load: [configFactory],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const ormConfig = configService.get<TypeOrmModuleOptions>('typeorm');
        if (!ormConfig) {
          throw new Error('Invalid system configuration. TypeORM config is not set.');
        }
        return ormConfig;
      },
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    DiaryModule,
  ],
})
export class AppModule {}
