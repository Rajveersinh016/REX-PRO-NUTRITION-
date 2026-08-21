// ============================================================
// REX-PRO NUTRITION — DataService
// Modular data layer using localStorage.
// PRODUCTION UPGRADE: Replace localStorage calls with API calls.
// ============================================================

import type { Product, Order, Customer, Coupon, Notification, Inquiry, OrderStatus } from '../types';
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from '../data/products';
import {
  DEMO_ORDERS, DEMO_CUSTOMERS, DEMO_COUPONS,
  DEMO_NOTIFICATIONS, DEMO_REVIEWS, DEMO_INQUIRIES
} from '../data/demoData';

const KEYS = {
  PRODUCTS: 'rxp_products',
  ORDERS: 'rxp_orders',
  CUSTOMERS: 'rxp_customers',
  COUPONS: 'rxp_coupons',
  NOTIFICATIONS: 'rxp_notifications',
  REVIEWS: 'rxp_reviews',
  INQUIRIES: 'rxp_inquiries',
  INITIALIZED: 'rxp_initialized',
};

function get<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]') as T[];
  } catch { return []; }
}

function set<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

function initializeData() {
  if (localStorage.getItem(KEYS.INITIALIZED)) return;
  set(KEYS.PRODUCTS, DEMO_PRODUCTS);
  set(KEYS.ORDERS, DEMO_ORDERS);
  set(KEYS.CUSTOMERS, DEMO_CUSTOMERS);
  set(KEYS.COUPONS, DEMO_COUPONS);
  set(KEYS.NOTIFICATIONS, DEMO_NOTIFICATIONS);
  set(KEYS.REVIEWS, DEMO_REVIEWS);
  set(KEYS.INQUIRIES, DEMO_INQUIRIES);
  localStorage.setItem(KEYS.INITIALIZED, 'true');
}

// ---- Products ----
export function getProducts(): Product[] {
  initializeData();
  return get<Product>(KEYS.PRODUCTS);
}
export function getProductById(id: string): Product | null {
  return getProducts().find(p => p.id === id) || null;
}
export function saveProduct(product: Product): void {
  const products = getProducts();
  const idx = products.findIndex(p => p.id === product.id);
  if (idx >= 0) products[idx] = product;
  else products.unshift(product);
  set(KEYS.PRODUCTS, products);
}
export function deleteProduct(id: string): void {
  set(KEYS.PRODUCTS, getProducts().filter(p => p.id !== id));
}
export function getCategories() {
  return DEMO_CATEGORIES;
}

// ---- Orders ----
export function getOrders(): Order[] {
  initializeData();
  return get<Order>(KEYS.ORDERS);
}
export function getOrderById(id: string): Order | null {
  return getOrders().find(o => o.id === id) || null;
}
export function saveOrder(order: Order): void {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === order.id);
  if (idx >= 0) orders[idx] = order;
  else orders.unshift(order);
  set(KEYS.ORDERS, orders);
  // Add notification
  addNotification({
    id: `notif-${Date.now()}`,
    type: 'order',
    title: 'New Order Received',
    message: `Order #${order.id} from ${order.customerName} — ₹${order.total.toLocaleString('en-IN')}`,
    read: false,
    createdAt: new Date().toISOString(),
    orderId: order.id,
  });
  // Save/update customer
  upsertCustomer(order);
}
export function updateOrderStatus(id: string, status: OrderStatus, note?: string): void {
  const orders = getOrders();
  const order = orders.find(o => o.id === id);
  if (!order) return;
  order.status = status;
  order.updatedAt = new Date().toISOString();
  order.statusHistory.push({ status, timestamp: new Date().toISOString(), note });
  set(KEYS.ORDERS, orders);
}
export function generateOrderId(): string {
  const orders = getOrders();
  const num = orders.length + 1;
  return `RXP${String(10000 + num).padStart(5, '0')}`;
}

// ---- Customers ----
export function getCustomers(): Customer[] {
  initializeData();
  return get<Customer>(KEYS.CUSTOMERS);
}
function upsertCustomer(order: Order): void {
  const customers = getCustomers();
  let customer = customers.find(c => c.phone === order.customerPhone || c.email === order.customerEmail);
  if (customer) {
    if (!customer.orders.includes(order.id)) customer.orders.push(order.id);
    customer.totalSpending += order.total;
    customer.lastOrderAt = order.createdAt;
  } else {
    customers.unshift({
      id: `cust-${Date.now()}`,
      name: order.customerName,
      phone: order.customerPhone,
      email: order.customerEmail,
      address: order.address,
      orders: [order.id],
      totalSpending: order.total,
      createdAt: new Date().toISOString(),
      lastOrderAt: order.createdAt,
    });
  }
  set(KEYS.CUSTOMERS, customers);
}

// ---- Coupons ----
export function getCoupons(): Coupon[] {
  initializeData();
  return get<Coupon>(KEYS.COUPONS);
}
export function saveCoupon(coupon: Coupon): void {
  const coupons = getCoupons();
  const idx = coupons.findIndex(c => c.id === coupon.id);
  if (idx >= 0) coupons[idx] = coupon;
  else coupons.unshift(coupon);
  set(KEYS.COUPONS, coupons);
}
export function deleteCoupon(id: string): void {
  set(KEYS.COUPONS, getCoupons().filter(c => c.id !== id));
}
export function validateCoupon(code: string, orderTotal: number): { valid: boolean; coupon?: Coupon; error?: string } {
  const coupon = getCoupons().find(c => c.code.toUpperCase() === code.toUpperCase());
  if (!coupon) return { valid: false, error: 'Invalid coupon code' };
  if (coupon.status === 'inactive') return { valid: false, error: 'This coupon is no longer active' };
  if (new Date(coupon.expiry) < new Date()) return { valid: false, error: 'This coupon has expired' };
  if (orderTotal < coupon.minOrder) return { valid: false, error: `Minimum order of ₹${coupon.minOrder} required` };
  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) return { valid: false, error: 'Coupon usage limit reached' };
  return { valid: true, coupon };
}
export function calculateCouponDiscount(coupon: Coupon, orderTotal: number): number {
  let discount = coupon.type === 'percent' ? (orderTotal * coupon.value) / 100 : coupon.value;
  if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
  return Math.round(discount);
}

// ---- Notifications ----
export function getNotifications(): Notification[] {
  initializeData();
  return get<Notification>(KEYS.NOTIFICATIONS);
}
export function addNotification(notif: Notification): void {
  const notifs = getNotifications();
  notifs.unshift(notif);
  set(KEYS.NOTIFICATIONS, notifs.slice(0, 50));
}
export function markNotificationRead(id: string): void {
  const notifs = getNotifications();
  const n = notifs.find(n => n.id === id);
  if (n) { n.read = true; set(KEYS.NOTIFICATIONS, notifs); }
}
export function markAllNotificationsRead(): void {
  const notifs = getNotifications().map(n => ({ ...n, read: true }));
  set(KEYS.NOTIFICATIONS, notifs);
}

// ---- Reviews ----
export function getReviews(): import('../types').Review[] {
  initializeData();
  return get<import('../types').Review>(KEYS.REVIEWS);
}

// ---- Inquiries ----
export function getInquiries(): Inquiry[] {
  initializeData();
  return get<Inquiry>(KEYS.INQUIRIES);
}
export function saveInquiry(inquiry: Inquiry): void {
  const inquiries = getInquiries();
  inquiries.unshift(inquiry);
  set(KEYS.INQUIRIES, inquiries);
}
export function updateInquiryStatus(id: string, status: Inquiry['status']): void {
  const inquiries = getInquiries();
  const inq = inquiries.find(i => i.id === id);
  if (inq) { inq.status = status; set(KEYS.INQUIRIES, inquiries); }
}

// ---- Dashboard Stats ----
export function getDashboardStats() {
  const orders = getOrders();
  const products = getProducts();
  const customers = getCustomers();
  const delivered = orders.filter(o => o.status === 'delivered');
  const pending = orders.filter(o => o.status === 'pending');
  const totalSales = delivered.reduce((s, o) => s + o.total, 0);
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5);
  const outOfStock = products.filter(p => p.stock === 0);
  return { totalSales, totalOrders: orders.length, totalProducts: products.length, totalCustomers: customers.length, pendingOrders: pending.length, recentOrders, lowStock, outOfStock };
}

// ---- Reset Demo Data ----
export function resetDemoData(): void {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
  initializeData();
}
