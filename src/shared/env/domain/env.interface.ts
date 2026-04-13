type expiredAt =
  | 'Years'
  | 'Year'
  | 'Yrs'
  | 'Yr'
  | 'Y'
  | 'Weeks'
  | 'Week'
  | 'W'
  | 'Days'
  | 'Day'
  | 'D'
  | 'Hours'
  | 'Hour'
  | 'Hrs'
  | 'Hr'
  | 'H'
  | 'Minutes'
  | 'Minute'
  | 'Mins'
  | 'Min'
  | 'M'
  | 'Seconds'
  | 'Second'
  | 'Secs'
  | 'Sec'
  | 's'
  | 'Milliseconds'
  | 'Millisecond'
  | 'Msecs'
  | 'Msec'
  | 'Ms';

type UnitAnyCase = expiredAt | Uppercase<expiredAt> | Lowercase<expiredAt>;
export type EnvJwtExpiresIn = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}`;

export type Env = {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  CORS_ORIGIN: string | string[];
  APP_URL: string;
  SECRET_COOKIE?: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD?: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_CONFIRM_ACCOUNT: string;
  JWT_EXPIRES_IN: EnvJwtExpiresIn | number;
  JWT_REFRESH_EXPIRES_IN: EnvJwtExpiresIn | number;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USERNAME: string;
  SMTP_PASSWORD: string;
};
