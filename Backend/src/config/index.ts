import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;

export type AppConfig = {
    NODE_ENV: string;
    SECRET_KEY: string;
    PORT: string;
    DB_HOST: string;
    DB_PORT: string;  
    DB_DATABASE: string;
  };
  
  const appConfig: AppConfig = {
      NODE_ENV,
      SECRET_KEY,
      PORT,
      DB_HOST,
      DB_PORT,
      DB_DATABASE
  };
  
  export { appConfig };  