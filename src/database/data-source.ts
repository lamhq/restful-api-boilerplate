import 'reflect-metadata';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import configFactory from '../config';

const config = configFactory().typeorm as { url: string };

const options: DataSourceOptions & SeederOptions = {
  type: 'mongodb',
  url: config.url,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migration/*.ts'],
  migrationsTableName: 'migrations',
  seeds: ['src/database/seeds/**/*.ts'],
  factories: ['src/database/factories/**/*.ts'],
  seedTracking: false,
};

export const AppDataSource = new DataSource(options);
