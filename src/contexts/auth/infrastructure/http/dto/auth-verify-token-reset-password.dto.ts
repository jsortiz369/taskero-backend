import { PickType } from '@nestjs/mapped-types';

import { AuthResetPasswordDto } from './auth-reset-password.dto';

export class AuthVerifyTokenResetPasswordDto extends PickType(AuthResetPasswordDto, ['token']) {}
