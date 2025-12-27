import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { ROUTES } from 'src/app/http/routes';
import { UuidDto } from 'src/app/http/dto';
import { UserCheckExistDto, UserCreateDto, UserFindAllDto, UserUpdateDto } from '../dto';
import { UserCreateCommand, UserCreateHandler } from 'src/contexts/users/application/commands/user-create';
import { UserDeleteHandler, UserDeleteIdCommand } from 'src/contexts/users/application/commands/user-delete';
import { UserUpdateCommand, UserUpdateHandler, UserUpdateIdCommand } from 'src/contexts/users/application/commands/user-update';
import { UserFindAllHandler, UserFindAllQuery, Userfilters } from 'src/contexts/users/application/queries/user-find-all';
import { UserFindOneByIdHandler, UserFindOneByIdQuery } from 'src/contexts/users/application/queries/user-find-one-by-id';
import { UserCheckEmailExistHandler, UserCheckEmailExistQuery } from 'src/contexts/users/application/queries/user-check-email-exist';
import { UserCheckPhoneExistHandler, UserCheckPhoneExistQuery } from 'src/contexts/users/application/queries/user-check-phone-exist';
import { UserFindAllProjection } from 'src/contexts/users/domain/projections';
import { DataFindAll } from 'src/shared/system/domain/system.interface';

@Controller(ROUTES.USERS)
export class UserController {
  constructor(
    private readonly userCreateHandler: UserCreateHandler,
    private readonly userDeleteHandler: UserDeleteHandler,
    private readonly userUpdateHandler: UserUpdateHandler,
    private readonly userFindAllHandler: UserFindAllHandler,
    private readonly userFindOneByIdHandler: UserFindOneByIdHandler,
    private readonly userCheckEmailExistHandler: UserCheckEmailExistHandler,
    private readonly userCheckPhoneExistHandler: UserCheckPhoneExistHandler,
  ) {}

  @Get()
  async findAll(@Query() query: UserFindAllDto) {
    const result: DataFindAll<UserFindAllProjection> = await this.userFindAllHandler.execute(
      new UserFindAllQuery(
        query.page,
        query.limit,
        query.sortOrder,
        query.sort,
        query.search,
        new Userfilters(query.filters?.names, query.filters?.email, query.filters?.phone, query.filters?.status, query.filters?.confirmed),
      ),
    );

    return result;
  }

  @Get(':id')
  async findOneById(@Param() param: UuidDto) {
    return await this.userFindOneByIdHandler.execute(new UserFindOneByIdQuery(param.id));
  }

  @Get('exist/email')
  async existsByEmail(@Query() queryDTO: UserCheckExistDto) {
    return await this.userCheckEmailExistHandler.execute(new UserCheckEmailExistQuery(queryDTO.value, queryDTO.id));
  }

  @Get('exist/phone')
  async existsByPhone(@Query() queryDTO: UserCheckExistDto) {
    return await this.userCheckPhoneExistHandler.execute(new UserCheckPhoneExistQuery(queryDTO.value, queryDTO.id));
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
