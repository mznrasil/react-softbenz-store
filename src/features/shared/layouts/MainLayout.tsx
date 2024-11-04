import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from '@/components/common/Header.tsx';
import { Footer } from '@/components/common/Footer.tsx';

export default function MainLayout() {
  return (
    <div className={'container grid grid-rows-[auto_1fr_auto] min-h-screen'}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
