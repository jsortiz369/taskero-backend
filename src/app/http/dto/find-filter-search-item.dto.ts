import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { MatchModeBooleanType, MatchModeEnumType, MatchModeNumberType, MatchModeStringType } from 'src/shared/database/domain/database.interface';

export class FilterStringItemDto {
  @IsString({ message: 'The filter value must be a string' })
  @IsNotEmpty({ message: 'The filter value must not be empty' })
  @MaxLength(100, { message: `The filter value must not exceed 100 characters` })
  readonly value: string;

  @IsEnum(MatchModeStringType, { message: 'The match mode must be startsWith | contains | notContains| endsWith | equals | notEquals | in' }) // startsWith | contains | notContains| endsWith | equals | notEquals | in
  readonly matchMode: MatchModeStringType;
}

export class FilterEnumItemDto {
  @IsString({ message: 'The filter value must be a string' })
  @IsNotEmpty({ message: 'The filter value must not be empty' })
  @MaxLength(100, { message: `The filter value must not exceed 100 characters` })
  readonly value: string;

  @IsEnum(MatchModeEnumType, { message: 'The match mode must be equals | notEquals | in' }) // equals | notEquals | in
  readonly matchMode: MatchModeEnumType;
}

export class FilterNumberItemDto {
  @IsNotEmpty({ message: 'The filter value must not be empty' })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 10 }, { message: 'The filter value must be a number' })
  readonly value: number;

  @IsEnum(MatchModeNumberType, { message: 'The match mode must be equals | lt | gt | lte | gte | notEquals | in' }) //
  readonly matchMode: MatchModeNumberType;
}

export class FilterBooleanItemDto {
  @IsNotEmpty({ message: 'The filter value must not be empty' })
  @IsString({ message: 'The filter value must be a string' })
  readonly value: string;

  @IsEnum(MatchModeBooleanType, { message: 'The match mode must be equals | notEquals' }) // equals | notEquals
  readonly matchMode: MatchModeBooleanType;
}
