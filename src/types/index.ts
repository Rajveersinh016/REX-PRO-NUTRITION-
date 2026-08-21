// ============================================================
// REX-PRO NUTRITION — Type Definitions
// Replace with API types when connecting production backend
// ============================================================

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  images: string[];
  mrp: number;
  price: number;
  discount: number;
  stock: number;
  sku: string;
  flavours: string[];
  weights: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  badge?: 'BEST SELLER' | 'NEW' | 'LIMITED STOCK' | 'HOT' | 'SALE';
  featured: boolean;
  bestSeller: boolean;
  isNew: boolean;
  status: 'active' | 'draft' | 'out_of_stock';
  goal: ('muscle-gain' | 'fat-loss' | 'strength' | 'wellness')[];
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  flavour: string;
  weight: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
  couponDiscount?: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: Address;
  orders: string[];
  totalSpending: number;
  createdAt: string;
  lastOrderAt?: string;
}

export interface Address {
  line1: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  brand: string;
  flavour: string;
  weight: string;
  quantity: number;
  price: number;
  mrp: number;
}

export interface Order {
  id: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponDiscount: number;
  couponCode?: string;
  shipping: number;
  total: number;
  paymentMethod: 'cod' | 'online';
  paymentStatus: 'pending' | 'paid' | 'failed';
  transactionId?: string;
  status: OrderStatus;
  statusHistory: { status: OrderStatus; timestamp: string; note?: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  expiry: string;
  status: 'active' | 'inactive';
  usageCount: number;
  usageLimit?: number;
}

export interface Notification {
  id: string;
  type: 'order' | 'stock' | 'payment' | 'review' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  orderId?: string;
  productId?: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}
