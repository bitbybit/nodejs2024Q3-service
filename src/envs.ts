import { config as setEnvVariables } from 'dotenv';

setEnvVariables();

export const PORT = Number(process.env.PORT || 4000);

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = Number(process.env.DB_PORT || 5432);
export const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password';
export const POSTGRES_DB = process.env.POSTGRES_DB || 'database';
