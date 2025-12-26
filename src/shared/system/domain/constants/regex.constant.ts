export const REGEX = {
  LETTER_NUMBER_SPACE: /^[\p{L}\p{M}\p{N}\s\u0027\u2019\u2018\u02BB\u02BC]+$/u,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,64}$/, // At least one lowercase letter, one uppercase letter, one digit, one special character, length between 8 and 64
};
