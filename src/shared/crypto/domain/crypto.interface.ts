export type TokenOptions = TokenNumberOptions | TokenAlphanumericOptions;
export type TokenBytes = 16 | 32 | 64;
export type TokenLength = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

export type TokenNumberOptions = {
  kind: 'NUMBER';
  length?: TokenLength;
};

export type TokenAlphanumericOptions = {
  kind: 'ALPHANUMERIC';
  bytes?: TokenBytes;
};
