import { ProductDetailType } from '@/features/products/types.ts';
import { useMemo, useState } from 'react';
import { cn, formatMoney } from '@/lib/utils.ts';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Loader2Icon, ShoppingBagIcon } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { useAddToCart } from '@/features/cart/services/mutations.ts';
import { useCartContext } from '@/providers/CartProvider.tsx';

export const ProductDetail = ({ product }: { product: ProductDetailType }) => {
  const productVariants = useMemo(() => {
    const productImages: {
      image: string;
      variantID: string | null;
      price: number;
      strikePrice: number;
      offPercent: number;
      minOrder: number;
      maxOrder: number;
    }[] = product.images.map((item) => ({
      image: item,
      variantID: null,
      price: product.price,
      strikePrice: product.strikePrice,
      offPercent: product.offPercent,
      minOrder: product.minOrder,
      maxOrder: product.maxOrder,
    }));

    if (product.colorVariants.length > 0) {
      for (let i = 0; i < product.colorVariants.length; i++) {
        productImages.push({
          image: product.colorVariants[i].images[0],
          variantID: product.colorVariants[i]._id,
          price: product.colorVariants[i].price,
          strikePrice: product.colorVariants[i].strikePrice,
          offPercent: product.colorVariants[i].offPercent,
          minOrder: product.colorVariants[i].minOrder,
          maxOrder: product.colorVariants[i].maxOrder,
        });
      }
    }

    if (product.sizeVariants.length > 0) {
      for (let i = 0; i < product.sizeVariants.length; i++) {
        productImages.push({
          image: product.sizeVariants[i].images[0],
          variantID: product.sizeVariants[i]._id,
          price: product.sizeVariants[i].price,
          strikePrice: product.sizeVariants[i].strikePrice,
          offPercent: product.sizeVariants[i].offPercent,
          minOrder: product.sizeVariants[i].minOrder,
          maxOrder: product.sizeVariants[i].maxOrder,
        });
      }
    }
    return productImages;
  }, [product]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSelectThumbnail = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleSelectColorVariant = (variantID: string) => {
    const index = productVariants.findIndex(
      (image) => image.variantID === variantID,
    );
    setCurrentImageIndex(index);
  };

  const handleSelectSizeVariant = (variantID: string) => {
    const index = productVariants.findIndex(
      (image) => image.variantID === variantID,
    );
    setCurrentImageIndex(index);
  };

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const { cartID } = useCartContext();
  const handleAddToCart = () => {
    if (!cartID) return;
    // Add to cart logic
    addToCart({
      cartID,
      product: product._id,
      quantity: 1,
      variantType: 'None',
    });
  };

  return (
    <section className={'my-12'}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Categories</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>{product.category.title}</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <div className={'mt-6 flex flex-col lg:flex-row gap-6 md:gap-12'}>
        <div className={'basis-[500px] lg:sticky lg:top-24 h-fit'}>
          <div>
            <img
              src={
                productVariants[currentImageIndex].image || product.images?.[0]
              }
              alt="Current Image"
              className={'rounded-xl object-cover h-[500px]'}
            />
          </div>
          <div
            className={
              'mt-2 grid grid-cols-[repeat(auto-fill,minmax(75px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2'
            }
          >
            {productVariants
              .filter((item) => !!item.image)
              .map((item, index) => (
                <div
                  key={index}
                  onMouseOver={() => handleSelectThumbnail(index)}
                  onTouchStart={() => handleSelectThumbnail(index)}
                >
                  <img
                    src={item.image}
                    alt="Thumbnail"
                    className={cn(
                      'rounded-xl object-cover border-2 border-transparent',
                      {
                        'border-primary': currentImageIndex === index,
                      },
                    )}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className={'flex-1'}>
          <h2 className={'text-2xl md:text-4xl font-bold tracking-tighter'}>
            {product.title}
          </h2>
          <div
            className={'mt-2 inline-flex items-center justify-between w-full'}
          >
            <p className={'text-muted-foreground'}>{product.brand.name}</p>
            <p className={'flex items-center gap-2'}>
              <StarFilledIcon className={'text-amber-400'} />
              {product.ratings} ({product.ratedBy})
            </p>
          </div>
          <div className={'mt-6 flex items-center gap-2'}>
            <p className={'text-4xl font-bold tracking-tighter'}>
              {formatMoney(productVariants[currentImageIndex].price)}
            </p>
            {product.price < product.strikePrice && (
              <>
                <p className={'text-xl text-muted-foreground line-through'}>
                  {formatMoney(productVariants[currentImageIndex].strikePrice)}
                </p>
                <Badge className={'ml-2'}>
                  {productVariants[currentImageIndex].offPercent}% off
                </Badge>
              </>
            )}
          </div>

          {product.colorVariants.length > 0 && (
            <div className={'mt-6'}>
              <h3 className={'text-lg font-semibold'}>Colors</h3>
              <div className={'mt-2 flex flex-wrap gap-2'}>
                {product.colorVariants.map((item) => (
                  <div
                    key={item._id}
                    className={cn(
                      'border rounded-lg px-4 py-0.5 text-muted-foreground inline-flex gap-2 items-center cursor-pointer',
                      {
                        'border-primary text-primary':
                          item._id ===
                          productVariants[currentImageIndex].variantID,
                      },
                    )}
                    onClick={() => handleSelectColorVariant(item._id)}
                  >
                    <div
                      style={{ backgroundColor: item.color.colorValue[0] }}
                      className={'size-5 rounded-full'}
                    />
                    {item.color.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.sizeVariants.length > 0 && (
            <div className={'mt-6'}>
              <h3 className={'text-md font-medium'}>Sizes</h3>
              <div className={'mt-2 flex flex-wrap gap-2'}>
                {product.sizeVariants.map((item) => (
                  <div
                    key={item._id}
                    className={cn(
                      'border rounded-lg px-4 py-0.5 text-muted-foreground cursor-pointer',
                      {
                        'border-primary text-primary':
                          item._id ===
                          productVariants[currentImageIndex].variantID,
                      },
                    )}
                    onClick={() => handleSelectSizeVariant(item._id)}
                  >
                    {item.variantName}
                  </div>
                ))}
              </div>
            </div>
          )}

          <p
            className={cn('mt-6 font-medium text-sm', {
              'text-green-500/80':
                productVariants[currentImageIndex].maxOrder > 0,
              'text-red-500/80':
                productVariants[currentImageIndex].maxOrder === 0,
            })}
          >
            {productVariants[currentImageIndex].maxOrder} items in stock
          </p>

          {isAddingToCart ? (
            <Button disabled className={'mt-4 w-full'} size={'lg'}>
              {' '}
              <Loader2Icon className={'animate-spin'} /> Adding to Cart
            </Button>
          ) : (
            <Button
              className={'mt-4 w-full'}
              size={'lg'}
              onClick={handleAddToCart}
            >
              <ShoppingBagIcon />
              Add to Cart
            </Button>
          )}

          {product.description && (
            <div className={'mt-6'}>
              <h3
                className={
                  'font-semibold text-lg underline underline-offset-8 mb-2'
                }
              >
                Description
              </h3>
              <style>{`
                .prose img {
                  width: 100% !important;
                  max-width: 100% !important;
                }
              `}</style>
              <div
                className={'prose w-full overflow-hidden'}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {product.ingredient && (
            <div className={'mt-6'}>
              <h3
                className={
                  'font-semibold text-lg underline underline-offset-8 mb-2'
                }
              >
                Ingredients
              </h3>
              <div
                className={'prose'}
                dangerouslySetInnerHTML={{ __html: product.ingredient }}
              />
            </div>
          )}

          {product.howToUse && (
            <div className={'mt-6'}>
              <h3
                className={
                  'font-semibold text-lg underline underline-offset-8 mb-2'
                }
              >
                How To Use
              </h3>
              <div
                className={'prose'}
                dangerouslySetInnerHTML={{ __html: product.howToUse }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const LoadingProductDetail = () => {
  return (
    <section className={'my-12'}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Skeleton className={'w-16 h-4'} />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>
            <Skeleton className={'w-32 h-4'} />
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <div className={'mt-6 flex flex-col lg:flex-row gap-6 md:gap-12'}>
        <div className={'basis-[500px] lg:sticky lg:top-24 h-fit'}>
          <div>
            <Skeleton className={'rounded-xl h-[500px] w-full'} />
          </div>
          <div
            className={
              'mt-2 grid grid-cols-[repeat(auto-fill,minmax(75px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2'
            }
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Skeleton
                  className={
                    'w-full h-[100px] rounded-xl border-2 border-transparent'
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className={'flex-1'}>
          <Skeleton className={'h-8 md:h-10 w-11/12'} />
          <div
            className={'mt-2 inline-flex items-center justify-between w-full'}
          >
            <Skeleton className={'w-32 h-4'} />
            <Skeleton className={'w-32 h-4'} />
          </div>
          <div className={'mt-6 flex items-center gap-2'}>
            <Skeleton className={'w-32 h-8'} />
            <Skeleton className={'w-32 h-4'} />
            <Skeleton className={'w-16 h-4'} />
          </div>

          <div className={'mt-6'}>
            <Skeleton className={'h-[1.75rem] w-12'} />
            <div className={'mt-2 flex flex-wrap gap-2'}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'border rounded-lg px-4 py-0.5 text-muted-foreground inline-flex gap-2 items-center cursor-pointer',
                  )}
                >
                  <div className={'size-5 rounded-full'} />
                  <Skeleton className={'w-12 h-4'} />
                </div>
              ))}
            </div>
          </div>

          <Skeleton className={'mt-6 h-[1.25rem] w-48'} />

          <Skeleton className={'h-10 w-full mt-4'} />

          <div className={'mt-6'}>
            <Skeleton className={'h-[1.75rem] w-32 mb-2'} />
            <div className={'flex flex-col gap-4'}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className={'w-full h-4'} />
              ))}
            </div>
            <div className={'mt-8 flex flex-col gap-4'}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className={'w-full h-4'} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
