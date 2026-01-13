import { Controller, Get, Param, Query } from '@nestjs/common';

import { ROUTES } from 'src/app/http/routes';
import { UuidDto } from 'src/app/http/dto';
import { UserFindAllDto } from '../dto';
import { UserFindAllHandler, UserFindAllQuery, Userfilters } from 'src/contexts/users/application/queries/user-find-all';
import { UserFindOneByIdHandler, UserFindOneByIdQuery } from 'src/contexts/users/application/queries/user-find-one-by-id';
import { UserFindAllProjection } from 'src/contexts/users/domain/projections';
import { DataFindAll } from 'src/shared/system/domain/system.interface';

@Controller(ROUTES.USERS)
export class UserController {
  constructor(
    //private readonly userDeleteHandler: UserDeleteHandler,
    //private readonly userUpdateHandler: UserUpdateHandler,
    private readonly userFindAllHandler: UserFindAllHandler,
    private readonly userFindOneByIdHandler: UserFindOneByIdHandler,
    //private readonly userCheckEmailExistHandler: UserCheckEmailExistHandler,
    //private readonly userCheckPhoneExistHandler: UserCheckPhoneExistHandler,
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
}
