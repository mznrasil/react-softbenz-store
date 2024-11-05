import { useQuery } from '@tanstack/react-query';
import { Endpoint } from '@/features/cart/services/endpoint.ts';
import { getCartDetails } from '@/features/cart/services/index.ts';

export const useGetCartDetails = (cartID: string) => {
  return useQuery({
    queryKey: [Endpoint.GetCartDetails, cartID],
    queryFn: () => getCartDetails(cartID),
    // enabled: !!cartID,
    select: (res) => res?.data,
  });
};
