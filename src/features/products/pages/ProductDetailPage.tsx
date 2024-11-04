import { useParams } from 'react-router-dom';
import { useGetProductBySlug } from '@/features/products/services/queries.ts';
import {
  LoadingProductDetail,
  ProductDetail,
} from '@/features/products/components/ProductDetail.tsx';

export default function ProductDetailPage() {
  const params = useParams();
  const { slug = '' } = params;

  const { data: product, isLoading: isProductLoading } =
    useGetProductBySlug(slug);

  if (!slug) {
    throw new Error('Slug is required');
  }

  return (
    <div>
      {isProductLoading ? (
        <LoadingProductDetail />
      ) : (
        product && <ProductDetail product={product} />
      )}
    </div>
  );
}
