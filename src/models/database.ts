import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const db = new Sequelize({
  database: process.env.DB_NAME_PROD, 
  username: process.env.DB_USER_PROD,
  password: process.env.DB_PASS_PROD,
  host: process.env.DB_HOST_PROD,
  dialect: 'postgres',
  logging: false,
});

export default db;