import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { UuidDto } from 'src/app/http/dto';

export class UserCheckExistDto extends PartialType(UuidDto) {
  @IsString({ message: 'The value is not valid must be a string' })
  @IsNotEmpty({ message: 'The value is not empty' })
  @Length(1, 100, { message: 'The value must be between 1 and 100 characters' })
  readonly value: string;
}
