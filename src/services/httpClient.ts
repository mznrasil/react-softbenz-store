import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Api } from '@/services/axios.ts';
import { ApiErrorType, MethodType } from '@/services/types.ts';
import toast from 'react-hot-toast';

export const ApiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig<T>) =>
    createRequest<T>('get', url, undefined, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<T>) =>
    createRequest<T>('post', url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<T>) =>
    createRequest<T>('put', url, data, config),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<T>) =>
    createRequest<T>('patch', url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig<T>) =>
    createRequest('delete', url, undefined, config),
};

const createRequest = async <TData>(
  method: MethodType,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig<TData>,
): Promise<AxiosResponse<TData> | undefined> => {
  try {
    switch (method) {
      case 'get':
      case 'delete':
        return await Api[method]<TData>(url, config);
      case 'post':
      case 'put':
      case 'patch':
        return await Api[method]<TData>(url, data, config);
      default:
        toast.error('Method not supported');
        return Promise.reject('Method not supported');
    }
  } catch (err) {
    let errorMessage: string = '';
    if (err instanceof AxiosError) {
      const responseData = err.response?.data as ApiErrorType;
      if (!responseData) {
        errorMessage = err.cause?.message ?? err.message;
      }
      if (!responseData.success) {
        errorMessage = responseData.status_message;
      }
    } else if (err instanceof Error) {
      errorMessage = err?.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    } else {
      errorMessage = 'Something went wrong.';
    }
    console.error(errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
