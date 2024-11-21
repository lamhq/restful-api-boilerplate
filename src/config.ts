import 'dotenv/config';
import { SeederOptions } from 'typeorm-extension';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnv } from './common/utils';

export interface AppConfig {
  webUrl: string;
  typeorm: TypeOrmModuleOptions & SeederOptions;
}

export const configFactory = (): AppConfig => ({
  webUrl: getEnv('WEB_URL'),
  typeorm: {
    type: 'mongodb',
    url: getEnv('DB_URI'),
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migration/*.ts'],
    migrationsTableName: 'migrations',
    seeds: ['src/database/seeds/**/*.ts'],
    factories: ['src/database/factories/**/*.ts'],
    seedTracking: false,
    useUnifiedTopology: true,
    autoLoadEntities: true,
  },
});

export default configFactory;
