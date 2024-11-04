import { ProductListType } from '@/features/products/types.ts';
import { formatMoney } from '@/lib/utils.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product }: { product: ProductListType }) => {
  return (
    <Link to={`/products/${product.slug}`} key={product._id}>
      <img
        src={product.images?.[0]}
        alt={product.title}
        className={'w-full h-[200px] md:h-[400px] object-center rounded-xl'}
      />
      <div className={'mt-3'}>
        <h3
          className={
            'font-semibold text-lg md:text-xl tracking-tighter line-clamp-1'
          }
          title={product.title}
        >
          {product.title}
        </h3>
        <p className={'text-muted-foreground text-sm'}>{product.brand.name}</p>
        <p className={'mt-1 font-medium text-md md:text-lg'}>
          {formatMoney(product.price)}
        </p>
      </div>
    </Link>
  );
};

export const LoadingProductCard = () => {
  return (
    <div>
      <Skeleton className={'w-full h-[200px] md:h-[400px] rounded-xl'} />
      <div className={'mt-3'}>
        <Skeleton className={'w-11/12 h-6'} />
        <Skeleton className={'mt-2 w-24 h-4'} />
        <Skeleton className={'mt-3 w-36 h-4'} />
      </div>
    </div>
  );
};
