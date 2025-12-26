type Page = { page: number };

type MetaQuery = Page & {
  total: number;
  filter: number | undefined;
  lastPage: number;
};

export enum SortOrderType {
  ASC = 'asc',
  DESC = 'desc',
}

export type Nullable<T> = T | null;

export type DataFindAll<T> = {
  data: T[];
  meta: MetaQuery;
};
