export type CreateNewCartResponse = {
  orderId: string;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  subTotal: number;
  totalAmount: number;
  voucherCode: string;
  voucherAmount: number;
  deliveryAddress: string;
  deliveryCharge: number;
  isDeleted: boolean;
  _id: string;
  items: Item[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type GetCartDetailsResponse = {
  _id: string;
  orderId: string;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  subTotal: number;
  totalAmount: number;
  voucherCode: string;
  voucherAmount: number;
  deliveryAddress: string;
  deliveryCharge: number;
  isDeleted: boolean;
  items: Item[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Item = {
  product: Product;
  variantType: string;
  noneText: string;
  selectedVariantName: string;
  quantity: number;
  price: number;
  strikePrice: number;
  offPercent: number;
  minOrder: number;
  maxOrder: number;
  subTotal: number;
  reviewGiven: boolean;
  _id: string;
};

export type Product = {
  _id: string;
  slug: string;
  title: string;
  images: string[];
};

export type AddItemToCartPayload = {
  product: string;
  quantity: number;
  variantType: string;
};

export type UpdateCartItemPayload = {
  cartID: string;
  itemID: string;
  quantity: number;
};
