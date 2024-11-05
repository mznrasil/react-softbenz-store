import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addItemToCart,
  createNewCart,
  updateCartItem,
} from '@/features/cart/services/index.ts';
import { Endpoint } from '@/features/cart/services/endpoint.ts';
import toast from 'react-hot-toast';

export const useCreateNewCart = () => {
  return useMutation({
    mutationFn: createNewCart,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addItemToCart,
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [Endpoint.GetCartDetails],
      });
      toast.success(res?.data.message ?? 'Item added to cart');
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [Endpoint.GetCartDetails],
      });
    },
  });
};
