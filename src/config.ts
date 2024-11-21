import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnv } from './common/utils';

export interface AppConfig {
  webUrl: string;
  typeorm: TypeOrmModuleOptions;
}

export const configFactory = (): AppConfig => ({
  webUrl: getEnv('WEB_URL'),
  typeorm: {
    type: 'mongodb',
    url: getEnv('DB_URI'),
    useUnifiedTopology: true,
    autoLoadEntities: true,
    authSource: 'admin',
  },
});

export default configFactory;
