import { defineConfig } from 'prisma/config';
import path from 'path';

import { EnvRepositoryZod } from './src/shared/env/infrastructure/persistences';
const dataBaseUrl = new EnvRepositoryZod().dataBaseUrl;
process.env.DATABASE_URL = dataBaseUrl;

export default defineConfig({
  schema: path.join(`./prisma/`),
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: dataBaseUrl,
  },
});
