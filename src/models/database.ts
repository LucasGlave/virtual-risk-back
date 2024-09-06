import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connection = process.env.NODE_ENV === "prod" ? process.env.DB_CONNECTION_INT : process.env.DB_CONNECTION_EXT 

const db = new Sequelize(connection as string, {
  dialect: 'postgres',
});

export default db;