import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/features/shared/layouts/MainLayout.tsx';
import { ErrorPage } from '@/components/common/ErrorPage.tsx';
import { PRODUCTS_ROUTES } from '@/features/products/routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CART_ROUTES } from '@/features/cart/routes.tsx';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [...PRODUCTS_ROUTES, ...CART_ROUTES],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
