export type ProductListType = {
  _id: string;
  slug: string;
  brand: {
    _id: string;
    slug: string;
    name: string;
  };
  title: string;
  price: number;
  strikePrice: number;
  offPercent: number;
  images: string[];
  variantType: string;
  ratings: number;
  totalRatings: number;
  ratedBy: number;
};

export interface ProductDetailType {
  _id: string;
  slug: string;
  category: Category;
  brand: Brand;
  title: string;
  ingredient: string;
  howToUse: string;
  description: string;
  price: number;
  strikePrice: number;
  offPercent: number;
  minOrder: number;
  maxOrder: number;
  status: boolean;
  images: string[];
  colorAttributes: ColorAttribute[];
  sizeAttributes: string[];
  variantType: string;
  colorVariants: ColorVariant[];
  ratings: number;
  totalRatings: number;
  ratedBy: number;
  metaRobots: string;
  isBestSeller: boolean;
  isFeatured: boolean;
  isNonBeauty: boolean;
  isPublished: boolean;
  searchWords: string;
  isDeleted: boolean;
  sizeVariants: SizeVariant[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  breadCrums: BreadCrum[];
  wished: boolean;
}

export interface Category {
  _id: string;
  slug: string;
  title: string;
  level: number;
  parentId: string;
}

export interface Brand {
  _id: string;
  slug: string;
  name: string;
}

export interface ColorAttribute {
  _id: string;
  isTwin: boolean;
  name: string;
  colorValue: string[];
}

export interface ColorVariant {
  color: Color;
  price: number;
  strikePrice: number;
  offPercent: number;
  minOrder: number;
  maxOrder: number;
  status: boolean;
  images: string[];
  productCode: string;
  _id: string;
}

export interface SizeVariant {
  variantName: string;
  price: number;
  strikePrice: number;
  offPercent: number;
  minOrder: number;
  maxOrder: number;
  status: boolean;
  images: string[];
  productCode: string;
  _id: string;
}

export interface Color {
  _id: string;
  isTwin: boolean;
  name: string;
  colorValue: string[];
}

export interface BreadCrum {
  title: string;
  slug: string;
}
