import { OmitType } from '@nestjs/mapped-types';

import { UserCheckExistDto } from 'src/contexts/users/infrastructure/http/dto';

export class AuthRegisterCheckExistDto extends OmitType(UserCheckExistDto, ['id']) {}
