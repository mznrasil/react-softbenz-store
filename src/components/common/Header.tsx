import Logo from '@/assets/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { BoxIcon, HomeIcon, ShoppingBagIcon } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import { useGetCartDetails } from '@/features/cart/services/queries.ts';

export const Header = () => {
  const cartID = sessionStorage.getItem('cart_id');
  const { data: cartData } = useGetCartDetails(cartID ?? '');

  return (
    <>
      <header
        className={
          'flex h-16 justify-center sm:justify-between items-center z-50 py-2 top-0 sticky bg-white'
        }
      >
        <div className={'flex gap-12 items-center'}>
          <Link to={'/'} className={'flex shrink-0 max-h-16'}>
            <img src={Logo} alt={'Logo'} />
          </Link>
          <nav className={'hidden sm:block'}>
            <ul>
              <li>
                <NavLink
                  to={'/products'}
                  className={({ isActive }) =>
                    cn('hover:text-primary', {
                      'text-primary font-medium': isActive,
                    })
                  }
                >
                  All Products
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <NavLink
          to={'/cart'}
          className={({ isActive }) =>
            cn('hidden sm:block relative', {
              'text-primary': isActive,
            })
          }
        >
          <ShoppingBagIcon className={'hover:text-primary/50'} />
          <div
            className={
              'absolute -top-3 -right-3 bg-primary text-white w-6 h-6 flex justify-center items-center rounded-full'
            }
          >
            {cartData?.data.items.length ?? 0}
          </div>
        </NavLink>
      </header>

      <nav
        className={
          'sm:hidden fixed z-50 bottom-0 inset-x-0 bg-white border-t py-4'
        }
      >
        <ul className={'flex justify-around items-center'}>
          {MobileNavigations.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn('flex flex-col items-center', {
                    'text-primary font-medium': isActive,
                  })
                }
              >
                <item.icon />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

const MobileNavigations = [
  { name: 'Home', icon: HomeIcon, to: '/' },
  { name: 'Products', icon: BoxIcon, to: '/products' },
  { name: 'Cart', icon: ShoppingBagIcon, to: '/cart' },
];
