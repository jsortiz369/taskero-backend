import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsEnum, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';

import { FilterBooleanItemDto, FilterStringItemDto, FindFilterDto } from 'src/app/http/dto';
import { UserSort } from 'src/contexts/users/domain/user.interface';

class UserFiltersDto {
  @IsOptional()
  @Transform(({ value }) => plainToInstance(FilterStringItemDto, value))
  @IsObject({ message: 'The names filter must be a valid object' })
  @ValidateNested({ message: 'The names filter must be a valid object' })
  readonly names?: FilterStringItemDto;

  @IsOptional()
  @Transform(({ value }) => plainToInstance(FilterStringItemDto, value))
  @IsObject({ message: 'The email filter must be a valid object' })
  @ValidateNested({ message: 'The email filter must be a valid object' })
  readonly email?: FilterStringItemDto;

  @IsOptional()
  @Transform(({ value }) => plainToInstance(FilterStringItemDto, value))
  @IsObject({ message: 'The phone filter must be a valid object' })
  @ValidateNested({ message: 'The phone filter must be a valid object' })
  readonly phone?: FilterStringItemDto;

  @IsOptional()
  @Transform(({ value }) => plainToInstance(FilterBooleanItemDto, value))
  @IsObject({ message: 'The status filter must be a valid object' })
  @ValidateNested({ message: 'The status filter must be a valid object' })
  readonly status?: FilterBooleanItemDto;

  @IsOptional()
  @Transform(({ value }) => plainToInstance(FilterBooleanItemDto, value))
  @IsObject({ message: 'The confirmed filter must be a valid object' })
  @ValidateNested({ message: 'The confirmed filter must be a valid object' })
  readonly confirmed?: FilterBooleanItemDto;
}

export class UserFindAllDto extends FindFilterDto {
  @IsOptional()
  @IsEnum(UserSort, {
    message: `The sort must be a valid value of the enum ${JSON.stringify(Object.values(UserSort).join(' | '))}`,
  })
  readonly sort: UserSort = UserSort.CREATED_AT;

  @IsOptional()
  @Transform(({ value }) => plainToInstance(UserFiltersDto, JSON.parse(value as string) ?? {}))
  @Type(() => UserFiltersDto)
  @ValidateNested({ message: 'The filters must be a valid object' })
  readonly filters?: UserFiltersDto;

  @IsOptional()
  @IsString({ message: 'The search must be a string' })
  @MaxLength(100, { message: 'The search must be less than 100 characters' })
  readonly search?: string;
}
