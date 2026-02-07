import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export type UserTokenTypes = 'CONFIRM_ACCOUNT' | 'RESET_PASSWORD' | 'LOGIN_EXTRA';

export interface UserTokenPrimitive {
  _id: string;
  userId: UserPrimitive['_id'];
  type: UserTokenTypes;
  token: string;
  expiresAt: Date;
}

export type UserTokenCreatePrimitive = UserTokenPrimitive;
