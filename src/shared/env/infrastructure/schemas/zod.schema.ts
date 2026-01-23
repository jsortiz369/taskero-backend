import z from 'zod';
import { Env, EnvJwtExpiresIn } from '../../domain/env.interface';

const unit = '(Years?|Yrs?|Y|Weeks?|W|Days?|D|Hours?|Hrs?|Hr|H|Minutes?|Mins?|Min|M|Seconds?|Secs?|Sec|s|Milliseconds?|Msecs?|Msec|Ms)';
const jwtExpiration = z.custom<EnvJwtExpiresIn>((val) => typeof val === 'string' && new RegExp(`^\\d+(?:\\s?${unit})?$`, 'i').test(val), {
  message: 'EXPIRES_IN is not valid',
});

const validateNumber = (val: string) => (typeof val === 'string' && /^[0-9]+$/.test(val) ? Number(val) : val);
const replace = (val: string) => val.replaceAll('[', '').replaceAll(']', '').replaceAll(' ', '');
const validateStringArray = (val: string | string[]) => (typeof val == 'string' ? replace(val).split(',') : val);

export const ZodEnvSchema: z.ZodType<Env> = z.object({
  PORT: z.preprocess(
    validateNumber,
    z
      .number({ error: 'PORT must be a number' })
      .min(1000, { message: 'PORT must be greater than 1000' })
      .max(65535, { message: 'PORT must be less than 65535' }),
  ),
  NODE_ENV: z
    .enum(['development', 'production', 'test'], { error: `NODE_ENV must be a 'development' | 'production' | 'test'` })
    .default('development'),
  CORS_ORIGIN: z.preprocess(
    validateStringArray,
    z.array(z.url({ message: 'CORS_ORIGIN must be a valid URL' }), { error: 'CORS_ORIGIN must by an array of valid URLs' }),
  ),
  DB_HOST: z.string({ error: 'DB_HOST must be a string' }).nonempty({ message: 'DB_HOST is no empty' }).nonoptional({
    message: 'DB_HOST is required',
  }),
  DB_NAME: z.string({ error: 'DB_NAME must be a string' }).nonempty({ message: 'DB_NAME is no empty' }).nonoptional({
    message: 'DB_NAME is required',
  }),
  DB_USERNAME: z.string({ error: 'DB_USERNAME must be a string' }).nonempty({ message: 'DB_USERNAME is no empty' }).nonoptional({
    message: 'DB_USERNAME is required',
  }),
  DB_PASSWORD: z.string({ error: 'DB_PASSWORD must be a string' }).nonoptional({
    message: 'DB_USERNAME is required',
  }),
  DB_PORT: z.preprocess(
    validateNumber,
    z
      .number({ error: 'DB_PORT must be a number' })
      .min(1000, { message: 'DB_PORT must be greater than 1000' })
      .max(65535, { message: 'DB_PORT must be less than 65535' }),
  ),
  JWT_SECRET: z.string({ error: 'JWT_SECRET must be a string' }).nonempty({ message: 'JWT_SECRET is no empty' }).nonoptional({
    message: 'JWT_SECRET is required',
  }),
  JWT_REFRESH_SECRET: z.string({ error: 'JWT_REFRESH_SECRET must be a string' }).nonempty({ message: 'JWT_REFRESH_SECRET is no empty' }).nonoptional({
    message: 'JWT_REFRESH_SECRET is required',
  }),
  JWT_EXPIRES_IN: z
    .union([jwtExpiration, z.number({ error: 'JWT_EXPIRES_IN must be a number' })], {
      error: 'JWT_EXPIRES_IN must be a string or a number',
    })
    .nonoptional({ message: 'JWT_EXPIRES_IN is required' }),
  JWT_REFRESH_EXPIRES_IN: z
    .union([jwtExpiration, z.number({ error: 'JWT_REFRESH_EXPIRES_IN must be a number' })], {
      error: 'JWT_REFRESH_EXPIRES_IN must be a string or a number',
    })
    .nonoptional({ message: 'JWT_REFRESH_EXPIRES_IN is required' }),
  REDIS_HOST: z.string({ error: 'REDIS_HOST must be a string' }).nonempty({ message: 'REDIS_HOST is no empty' }).nonoptional({
    message: 'REDIS_HOST is required',
  }),
  REDIS_PORT: z.preprocess(
    validateNumber,
    z
      .number({ error: 'DB_PORT must be a number' })
      .min(1000, { message: 'DB_PORT must be greater than 1000' })
      .max(65535, { message: 'DB_PORT must be less than 65535' }),
  ),
});
