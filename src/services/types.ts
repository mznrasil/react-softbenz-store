export type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type ApiErrorType = {
  success: boolean;
  status_code: number;
  status_message: string;
};

export interface WithPagination<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
