import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export interface UserPasswordPrimitive {
  _id: string;
  userId: UserPrimitive['_id'];
  password: string;
  isCurrent: boolean;
  createdAt: Date;
}

export type UserPasswordCreatePrimitive = Omit<UserPasswordPrimitive, 'createdAt'>;
