export interface UserPrimitive {
  _id: string;
  names: string;
  surnames: string;
  birthday: Date;
  phone: string;
  email: string;
  avatar?: string | null;
  confirmed?: boolean | null;
  status?: boolean | null;
  failedAttempts?: number | null;
  lockUntil?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type UserCreatePrimitive = Omit<UserPrimitive, 'createdAt' | 'updatedAt' | 'deletedAt' | 'failedAttempts' | 'lockUntil'>;
