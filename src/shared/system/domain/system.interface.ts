export enum SortOrderType {
  ASC = 'asc',
  DESC = 'desc',
}

type Page = { page: number };

type MetaQuery = Page & {
  total: number;
  filter: number | undefined;
  lastPage: number;
};

export type DataFindAll<T> = {
  data: T[];
  meta: MetaQuery;
};
