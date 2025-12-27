import { MatchModeBooleanType, MatchModeStringType } from 'src/shared/database/domain/database.interface';
import { SortOrderType } from 'src/shared/system/domain/system.interface';

export interface UserPrimitive {
  _id: string;
  names: string;
  surnames: string;
  birthday: Date;
  phone: string;
  email: string;
  avatar?: string | null;
  confirmed: boolean;
  status: boolean;
  failedAttempts?: number | null;
  lockUntil?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type UserCreatePrimitive = Omit<UserPrimitive, 'createdAt' | 'updatedAt' | 'deletedAt' | 'failedAttempts' | 'lockUntil'>;

//export type UserSort = keyof Pick<UserPrimitive, 'names' | 'surnames' | 'phone' | 'email' | 'status' | 'confirmed' | 'createdAt' | 'updatedAt'>;
export enum UserSort {
  NAMES = 'names',
  SURNAMES = 'surnames',
  PHONE = 'phone',
  EMAIL = 'email',
  STATUS = 'status',
  CONFIRMED = 'confirmed',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export type UserFindAllFilters = {
  names?: { value: string; matchMode: MatchModeStringType };
  email?: { value: string; matchMode: MatchModeStringType };
  phone?: { value: string; matchMode: MatchModeStringType };
  status?: { value: string; matchMode: MatchModeBooleanType };
  confirmed?: { value: string; matchMode: MatchModeBooleanType };
};
export type UserFindAll = {
  page: number;
  limit: number;
  sortOrder: SortOrderType;
  sort: UserSort;
  search?: string;
  filters?: UserFindAllFilters;
};
