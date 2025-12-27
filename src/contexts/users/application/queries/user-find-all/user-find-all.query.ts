import { UserFindAll, UserFindAllFilters, UserSort } from 'src/contexts/users/domain/user.interface';
import { MatchModeBooleanType, MatchModeStringType } from 'src/shared/database/domain/database.interface';
import { SortOrderType } from 'src/shared/system/domain/system.interface';

export class UserFindAllQuery implements UserFindAll {
  /**
   * Creates an instance of UserFindAllQuery.
   * @date 2025-12-26 16:59:17
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {number} page
   * @param {number} limit
   * @param {SortOrderType} sortOrder
   * @param {UserSort} sort
   * @param {?string} [search]
   * @param {?filters} [filters]
   */
  constructor(
    readonly page: number,
    readonly limit: number,
    readonly sortOrder: SortOrderType,
    readonly sort: UserSort,
    readonly search?: string,
    readonly filters?: Userfilters,
  ) {}
}

export class Userfilters implements UserFindAllFilters {
  /**
   * Creates an instance of filters.
   * @date 2025-12-26 16:59:22
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {?{ value: string; matchMode: MatchModeStringType }} [names]
   * @param {?{ value: string; matchMode: MatchModeStringType }} [email]
   * @param {?{ value: string; matchMode: MatchModeStringType }} [phone]
   * @param {?{ value: string; matchMode: MatchModeBooleanType }} [status]
   * @param {?{ value: string; matchMode: MatchModeBooleanType }} [confirmed]
   */
  constructor(
    readonly names?: { value: string; matchMode: MatchModeStringType },
    readonly email?: { value: string; matchMode: MatchModeStringType },
    readonly phone?: { value: string; matchMode: MatchModeStringType },
    readonly status?: { value: string; matchMode: MatchModeBooleanType },
    readonly confirmed?: { value: string; matchMode: MatchModeBooleanType },
  ) {}
}
