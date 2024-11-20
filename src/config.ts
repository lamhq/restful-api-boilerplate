import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnv } from './common/utils';

export interface Configuration {
  webUrl: string;
  typeorm: TypeOrmModuleOptions;
}

export const configFactory = (): Configuration => ({
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
