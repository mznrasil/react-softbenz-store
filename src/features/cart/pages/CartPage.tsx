import { useGetCartDetails } from '@/features/cart/services/queries.ts';
import { ShoppingBagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';
import { formatMoney } from '@/lib/utils.ts';
import { CartTable } from '@/features/cart/components/CartTable.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

export default function CartPage() {
  const cartID = sessionStorage.getItem('cart_id');
  const { data: cartData, isLoading: isCartLoading } = useGetCartDetails(
    cartID ?? '',
  );

  if (!isCartLoading && !cartID) {
    return <EmptyState />;
  }

  const handleClearCart = () => {
    sessionStorage.removeItem('cart_id');
    window.location.reload();
  };

  return (
    <div>
      {isCartLoading ? (
        <LoadingCartPage />
      ) : cartData && cartData?.data.items.length > 0 ? (
        <div className={'grid mt-24 mb-4'}>
          <div>
            <h2 className={'text-2xl lg:text-4xl font-bold text-center'}>
              Cart
            </h2>
            <p className={'text-muted-foreground text-sm text-center'}>
              Your Items in Cart
            </p>
            <div className={'my-8 flex flex-col gap-8'}>
              <CartTable cartID={cartID} items={cartData?.data.items} />
              <div
                className={
                  'bg-muted w-full md:w-[600px] self-end rounded-lg p-8'
                }
              >
                <h2 className={'text-xl font-semibold tracking-tight'}>
                  Summary
                </h2>
                <div className={'flex justify-between mt-4'}>
                  <p className={'text-muted-foreground'}>SubTotal</p>
                  <p>{formatMoney(cartData?.data.subTotal)}</p>
                </div>
                <div className={'flex justify-between mt-4'}>
                  <p className={'text-muted-foreground'}>Delivery Charge</p>
                  <p>{formatMoney(cartData?.data.deliveryCharge)}</p>
                </div>
                <div className={'flex justify-between mt-4'}>
                  <p>Total</p>
                  <p className={'font-bold'}>
                    {formatMoney(cartData?.data.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
            <div className={'w-full flex justify-end'}>
              <Button variant={'destructive'} onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

const LoadingCartPage = () => {
  return (
    <div className={'grid mt-24'}>
      <div>
        <Skeleton className={'w-32 h-10 mx-auto'} />
        <Skeleton className={'w-56 h-4 mt-4 mx-auto'} />
        <div className={'my-8 flex flex-col gap-8'}>
          <Skeleton className={'w-full h-[200px]'} />
          <Skeleton
            className={
              'bg-muted w-full h-[250px] md:w-[600px] self-end rounded-lg p-8'
            }
          />
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className={'h-full grid place-items-center'}>
      <div className={'grid place-items-center'}>
        <div
          className={'bg-primary/10 p-12 rounded-full grid place-items-center'}
        >
          <ShoppingBagIcon className={'size-24 stroke-primary/80'} />
        </div>
        <p className={'mt-4 font-medium'}>No Items in Shopping Cart</p>
        <Button asChild className={'mt-4'}>
          <Link to={'/products'}>Shop Now</Link>
        </Button>
      </div>
    </div>
  );
};
