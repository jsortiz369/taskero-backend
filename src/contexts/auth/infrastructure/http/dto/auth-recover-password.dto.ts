import { OmitType } from '@nestjs/mapped-types';

import { AuthLoginDto } from './auth-login.dto';

export class AuthRecoverPasswordDto extends OmitType(AuthLoginDto, ['password']) {}
