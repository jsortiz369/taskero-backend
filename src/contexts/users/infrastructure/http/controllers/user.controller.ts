import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';

import { ROUTES } from 'src/app/http/routes';
import { UserCreateDto } from '../dto';
import { UserCreateCommand, UserCreateHandler } from 'src/contexts/users/application/commands/user-create';

@Controller(ROUTES.USERS)
export class UserController {
  constructor(private readonly userCreateHandler: UserCreateHandler) {}

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
  async update() {
    // Logic to update a user
  }

  @Delete(':id')
  async remove() {
    // Logic to delete a user
  }
}
