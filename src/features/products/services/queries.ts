import { useQuery } from '@tanstack/react-query';
import { Endpoint } from '@/features/products/services/endpoint.ts';
import {
  getAllProducts,
  getProductBySlug,
} from '@/features/products/services/index.ts';
import { PaginationParamsType } from '@/services/types.ts';

export const useGetAllProducts = (pagination?: {
  pagination?: PaginationParamsType;
}) => {
  const p = pagination?.pagination;

  return useQuery({
    queryKey: [Endpoint.GetAllProducts, p?.page, p?.limit],
    queryFn: () => getAllProducts({ pagination: p }),
    select: (data) => data?.data,
  });
};

export const useGetProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: [Endpoint.GetProductBySlug, slug],
    queryFn: () => getProductBySlug(slug),
    select: (data) => data?.data,
    enabled: !!slug,
  });
};
