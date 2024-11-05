import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useCreateNewCart } from '@/features/cart/services/mutations.ts';

const CartContext = createContext<{
  cartID: string | null;
}>({
  cartID: null,
});

export default function CartProvider({ children }: PropsWithChildren) {
  const { mutateAsync: createNewCart } = useCreateNewCart();

  const [cartID, setCartID] = useState(() => {
    return sessionStorage.getItem('cart_id');
  });

  useEffect(() => {
    if (!cartID) {
      // create new cart
      createNewCart().then((res) => {
        if (res?.data?._id) {
          sessionStorage.setItem('cart_id', res.data._id);
          setCartID(res.data._id);
        }
      });
    }
  }, [cartID]);

  return (
    <CartContext.Provider value={{ cartID }}>{children}</CartContext.Provider>
  );
}

export const useCartContext = () => {
  return useContext(CartContext);
};
