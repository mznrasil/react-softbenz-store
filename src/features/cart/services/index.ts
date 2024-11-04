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
  const response = await ApiClient.get<GetCartDetailsResponse>(
    Endpoint.GetCartDetails.replace(':cartID', cartID),
  );
  return response;
};

export const addItemToCart = async (payload: AddItemToCartPayload) => {
  // check the session storage
  const cartID = sessionStorage.getItem('cart_id');
  let createdCartID = '';

  // if the cart id already exists, use the cart id from the session storage
  if (!cartID) {
    const data = await createNewCart();
    const cart_id = data?.data?._id;
    if (!cart_id) {
      throw new Error('Failed to create new cart');
    }
    sessionStorage.setItem('cart_id', data.data._id);
    createdCartID = cart_id;
  }

  // otherwise create a new cart and store the cart id in the session storage and use that id
  const response = await ApiClient.post<GetCartDetailsResponse>(
    Endpoint.AddItemToCart.replace(':cartID', cartID || createdCartID),
    payload,
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
