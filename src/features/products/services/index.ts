import { ApiClient } from '@/services/httpClient.ts';
import { Endpoint } from '@/features/products/services/endpoint.ts';
import {
  ProductDetailType,
  ProductListType,
} from '@/features/products/types.ts';
import { PaginationParamsType, WithPagination } from '@/services/types.ts';

export const getAllProducts = async ({
  pagination,
}: {
  pagination?: PaginationParamsType;
}) => {
  const res = await ApiClient.get<WithPagination<ProductListType>>(
    Endpoint.GetAllProducts,
    {
      params: {
        ...(pagination?.page && { page: pagination.page }),
        ...(pagination?.limit && { limit: pagination.limit }),
      },
    },
  );
  return res?.data;
};

export const getProductBySlug = async (slug: string) => {
  const res = await ApiClient.get<ProductDetailType>(
    Endpoint.GetProductBySlug.replace(':slug', slug),
  );
  return res?.data;
};
