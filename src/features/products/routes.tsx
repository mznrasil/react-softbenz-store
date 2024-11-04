import { RouteObject } from 'react-router-dom';
import App from '@/App.tsx';
import ProductsPage from '@/features/products/pages/ProductsPage.tsx';
import ProductDetailPage from '@/features/products/pages/ProductDetailPage.tsx';

export const PRODUCTS_ROUTES: RouteObject[] = [
  { index: true, element: <App /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/products/:slug', element: <ProductDetailPage /> },
];
