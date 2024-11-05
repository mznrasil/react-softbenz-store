import { ApiClient } from '@/services/httpClient.ts';
import { Endpoint } from '@/features/cart/services/endpoint.ts';
import {
  AddItemToCartPayload,
  CreateNewCartResponse,
  GetCartDetailsResponse,
  UpdateCartItemPayload,
} from '@/features/cart/types.ts';

export const createNewCart = async () => {
  const response = await ApiClient.get<CreateNewCartResponse>(
    Endpoint.CreateNewCart,
  );
  return response?.data;
};

export const getCartDetails = async (cartID: string) => {
  if (!cartID) return null;
  const response = await ApiClient.get<GetCartDetailsResponse>(
    Endpoint.GetCartDetails.replace(':cartID', cartID),
  );
  return response;
};

export const addItemToCart = async (payload: AddItemToCartPayload) => {
  const { cartID, ...data } = payload;
  const response = await ApiClient.post<GetCartDetailsResponse>(
    Endpoint.AddItemToCart.replace(':cartID', cartID),
    data,
  );
  return response;
};

export const updateCartItem = async (payload: UpdateCartItemPayload) => {
  const { cartID, itemID, quantity } = payload;
  const response = await ApiClient.put<GetCartDetailsResponse>(
    Endpoint.UpdateCartItem.replace(':cartID', cartID).replace(
      ':itemID',
      itemID,
    ),
    { quantity },
  );
  return response;
};
