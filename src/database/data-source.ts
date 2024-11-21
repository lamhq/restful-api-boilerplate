import { DataSource, DataSourceOptions } from 'typeorm';
import configFactory from '../config';

export const AppDataSource = new DataSource(configFactory().typeorm as DataSourceOptions);
