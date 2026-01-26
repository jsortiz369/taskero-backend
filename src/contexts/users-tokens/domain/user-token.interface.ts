import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export interface UserTokenPrimitive {
  _id: string;
  userId: UserPrimitive['_id'];
  token: string;
  expiresAt: Date;
}

export type UserTokenCreatePrimitive = UserTokenPrimitive;
