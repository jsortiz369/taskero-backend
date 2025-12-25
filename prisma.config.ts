import { defineConfig } from 'prisma/config';
import path from 'path';

import { ZodEnvPersistence } from './src/shared/env/infrastructure/persistences';
const dataBaseUrl = new ZodEnvPersistence().dataBaseUrl;
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
