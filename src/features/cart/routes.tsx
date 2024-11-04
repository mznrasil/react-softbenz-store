import { RouteObject } from 'react-router-dom';
import CartPage from '@/features/cart/pages/CartPage.tsx';

export const CART_ROUTES: RouteObject[] = [
  {
    path: '/cart',
    element: <CartPage />,
  },
];
