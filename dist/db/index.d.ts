import { IDatabase } from 'pg-promise';
import { IExtensions } from './functions';
declare const db: IDatabase<IExtensions> & IExtensions;
export = db;
