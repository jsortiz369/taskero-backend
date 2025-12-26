import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { ROUTES } from 'src/app/http/routes';
import { UserCreateDto } from '../dto';
import { UserCreateCommand, UserCreateHandler } from 'src/contexts/users/application/commands/user-create';
import { UserDeleteHandler, UserDeleteIdCommand } from 'src/contexts/users/application/commands/user-delete';
import { UserUpdateCommand, UserUpdateHandler, UserUpdateIdCommand } from 'src/contexts/users/application/commands/user-update';
import { UuidDto } from 'src/app/http/dto';
import { UserUpdateDto } from '../dto/user-update.dto';

@Controller(ROUTES.USERS)
export class UserController {
  constructor(
    private readonly userCreateHandler: UserCreateHandler,
    private readonly userDeleteHandler: UserDeleteHandler,
    private readonly userUpdateHandler: UserUpdateHandler,
  ) {}

  @Get()
  async findAll() {
    // Logic to find all users
  }

  @Get(':id')
  async findOne() {
    // Logic to find one user
  }

  @Get('exist/email')
  async existsByEmail() {
    // Logic to find one user
  }

  @Get('exist/phone')
  async existsByPhone() {
    // Logic to find one user
  }

  @Post()
  async create(@Body() body: UserCreateDto) {
    return await this.userCreateHandler.execute(
      new UserCreateCommand(body.names, body.surnames, body.birthday, body.phone, body.email, body.password),
    );
  }

  @Patch(':id')
  async update(@Param() param: UuidDto, @Body() body: UserUpdateDto) {
    return await this.userUpdateHandler.execute(
      new UserUpdateIdCommand(param.id),
      new UserUpdateCommand(body.names, body.surnames, body.birthday, undefined, undefined, body.status, body.isConfirmed),
    );
  }

  @Delete(':id')
  async remove(@Param() param: UuidDto) {
    return await this.userDeleteHandler.execute(new UserDeleteIdCommand(param.id));
  }
}
