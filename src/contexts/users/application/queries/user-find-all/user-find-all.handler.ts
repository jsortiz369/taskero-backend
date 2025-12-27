import { IUserQueryRepository } from 'src/contexts/users/domain/repositories';
import { UserFindAllQuery } from './user-find-all.query';
import { PageNotFoundException } from 'src/shared/system/domain/exceptions';
import { DataFindAll } from 'src/shared/system/domain/system.interface';
import { UserFindAllProjection } from 'src/contexts/users/domain/projections';

export class UserFindAllHandler {
  /**
   * Creates an instance of UserFindAllHandler.
   * @date 2025-12-26 17:00:09
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserQueryRepository} _userQueryRepository
   */
  constructor(private readonly _userQueryRepository: IUserQueryRepository) {}

  async execute(query: UserFindAllQuery): Promise<DataFindAll<UserFindAllProjection>> {
    // TODO: get all user
    const result = await this._userQueryRepository.findAll(query);

    // TODO: validate page
    if (query.page != 1 && result.meta.lastPage < result.meta.page) throw new PageNotFoundException();
    return {
      meta: result.meta,
      data: result.data,
    };
  }
}
