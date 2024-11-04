export const Endpoint = {
  CreateNewCart: '/order/user/new-cart',
  GetCartDetails: '/order/user/cart-details/:cartID',
  AddItemToCart: '/order/add-item/:cartID',
  UpdateCartItem: '/order/update-item/:cartID/:itemID',
} as const;
