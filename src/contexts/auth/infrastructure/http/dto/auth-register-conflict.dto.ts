import { OmitType } from '@nestjs/mapped-types';

import { UserCheckExistDto } from 'src/contexts/users/infrastructure/http/dto';

export class AuthRegisterConflictDto extends OmitType(UserCheckExistDto, ['id']) {}
