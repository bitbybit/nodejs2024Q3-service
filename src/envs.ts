import { config as setEnvVariables } from 'dotenv';

setEnvVariables();

export const HTTP_PORT = Number(process.env.PORT || 4000);

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = Number(process.env.DB_PORT || 5432);
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
export const DB_NAME = process.env.DB_NAME || 'database';
