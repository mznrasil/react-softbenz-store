export type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type ApiErrorType = {
  title: string;
  message: string;
};

export interface ApiSuccessType<T> {
  title: string;
  message: string;
  data: T;
}

export interface WithPagination<T> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    perviousPage: boolean;
    nextPage: boolean;
  };
  docs: T[];
}

export type PaginationParamsType = {
  page?: number;
  limit?: number;
};
