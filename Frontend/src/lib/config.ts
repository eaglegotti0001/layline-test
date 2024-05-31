export type AppConfig = {
  baseUrl: string;
  ENV: string;
};

export const appConfig: AppConfig = {
  baseUrl: process.env.NEXT_BASE_URL || 'http://localhost:3000/',
  ENV: process.env.NEXT_ENV_APP || 'DEVELOPMENT',
};
