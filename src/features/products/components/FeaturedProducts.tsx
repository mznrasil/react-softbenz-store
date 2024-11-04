import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { useGetAllProducts } from '@/features/products/services/queries.ts';
import {
  LoadingProductCard,
  ProductCard,
} from '@/features/products/components/ProductCard.tsx';

export const FeaturedProducts = () => {
  const { data: productsData, isLoading: isProductsLoading } =
    useGetAllProducts({
      pagination: { limit: 6 },
    });
  const products = productsData?.docs ?? [];

  return (
    <section className={'my-24'}>
      <h2 className={'text-2xl md:text-4xl text-center font-bold'}>
        Featured Products
      </h2>
      <div className={'flex justify-center mt-2'}>
        <Button variant={'link'}>
          <Link to={'/products'}>Browse All Products &rarr;</Link>
        </Button>
      </div>
      <div
        className={
          'mt-8 grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-x-4 gap-y-6'
        }
      >
        {isProductsLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <LoadingProductCard key={i} />
            ))
          : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
};
