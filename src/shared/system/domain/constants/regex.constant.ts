export const REGEX = {
  LETTER_NUMBER_SPACE: /^([\p{L}\p{M}\p{N}\u0027\u2019\u2018\u02BB\u02BC]+([\s]+[\p{L}\p{M}\p{N}\u0027\u2019\u2018\u02BB\u02BC]+)?)*$/u,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[57]+[0-9]{10}$/,
  USERNAME: /^([\p{L}\p{M}\d\u0027\u2019\u2018\u02BB\u02BC]+([_.-]+[\p{L}\p{M}\d\u0027\u2019\u2018\u02BB\u02BC])?)*$/u,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,64}$/, // At least one lowercase letter, one uppercase letter, one digit, one special character, length between 8 and 64
};
