import { useGetAllProducts } from '@/features/products/services/queries.ts';
import {
  LoadingProductCard,
  ProductCard,
} from '@/features/products/components/ProductCard.tsx';
import { cn } from '@/lib/utils.ts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsPagination } from '@/features/products/components/ProductsPagination.tsx';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page') ?? 1),
  );
  useEffect(() => {
    setCurrentPage(Number(searchParams.get('page') ?? 1));
  }, [searchParams]);

  const { data: productsWithMetaData, isLoading: isProductsLoading } =
    useGetAllProducts({ pagination: { page: currentPage } });
  const products = productsWithMetaData?.docs || [];
  const pagination = productsWithMetaData?.pagination;
  const hasPrevPage = pagination?.perviousPage ?? false;
  const hasNextPage = pagination?.nextPage ?? false;

  const totalPages =
    pagination?.total && pagination?.limit
      ? Math.ceil(pagination.total / pagination.limit)
      : 1;

  return (
    <div className={'my-12'}>
      <div className={'flex flex-col items-center'}>
        <h1 className={'text-4xl font-bold'}>All Products</h1>
        <p className={'text-muted-foreground text-sm'}>
          You can browse all the products here.
        </p>
      </div>
      <div
        className={cn(
          'grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 mt-4',
          {
            'sm:grid-cols-3': !isProductsLoading && products.length < 3,
          },
        )}
      >
        {isProductsLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <LoadingProductCard key={i} />
            ))
          : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>

      <ProductsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
