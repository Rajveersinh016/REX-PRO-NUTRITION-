// ============================================================
// REX-PRO NUTRITION — Demo Data (Orders, Customers, etc.)
// ============================================================

import type { Order, Customer, Coupon, Notification, Review, Inquiry } from '../types';

export const DEMO_CUSTOMERS: Customer[] = [
  { id: 'cust-001', name: 'Rahul Patel', phone: '+91 98765 43210', email: 'rahul@gmail.com', orders: ['ORD-001','ORD-008'], totalSpending: 8497, createdAt: '2024-01-15T10:00:00Z', lastOrderAt: '2024-03-10T10:00:00Z' },
  { id: 'cust-002', name: 'Dhruv Shah', phone: '+91 87654 32109', email: 'dhruv@gmail.com', orders: ['ORD-002'], totalSpending: 5999, createdAt: '2024-01-22T10:00:00Z', lastOrderAt: '2024-02-15T10:00:00Z' },
  { id: 'cust-003', name: 'Yash Patel', phone: '+91 76543 21098', email: 'yash@gmail.com', orders: ['ORD-003','ORD-010'], totalSpending: 6497, createdAt: '2024-02-01T10:00:00Z', lastOrderAt: '2024-03-05T10:00:00Z' },
  { id: 'cust-004', name: 'Arjun Mehta', phone: '+91 65432 10987', email: 'arjun@gmail.com', orders: ['ORD-004'], totalSpending: 2999, createdAt: '2024-02-10T10:00:00Z', lastOrderAt: '2024-02-28T10:00:00Z' },
  { id: 'cust-005', name: 'Priya Sharma', phone: '+91 54321 09876', email: 'priya@gmail.com', orders: ['ORD-005'], totalSpending: 1799, createdAt: '2024-02-15T10:00:00Z', lastOrderAt: '2024-03-01T10:00:00Z' },
  { id: 'cust-006', name: 'Virat Desai', phone: '+91 43210 98765', email: 'virat@gmail.com', orders: ['ORD-006'], totalSpending: 4799, createdAt: '2024-02-20T10:00:00Z', lastOrderAt: '2024-03-08T10:00:00Z' },
  { id: 'cust-007', name: 'Neha Joshi', phone: '+91 32109 87654', email: 'neha@gmail.com', orders: ['ORD-007'], totalSpending: 1499, createdAt: '2024-03-01T10:00:00Z', lastOrderAt: '2024-03-12T10:00:00Z' },
  { id: 'cust-008', name: 'Rohan Gupta', phone: '+91 21098 76543', email: 'rohan@gmail.com', orders: ['ORD-009'], totalSpending: 2399, createdAt: '2024-03-05T10:00:00Z', lastOrderAt: '2024-03-15T10:00:00Z' },
  { id: 'cust-009', name: 'Akash Thakur', phone: '+91 10987 65432', email: 'akash@gmail.com', orders: ['ORD-011'], totalSpending: 999, createdAt: '2024-03-10T10:00:00Z', lastOrderAt: '2024-03-16T10:00:00Z' },
  { id: 'cust-010', name: 'Shreya Kapoor', phone: '+91 90876 54321', email: 'shreya@gmail.com', orders: ['ORD-012'], totalSpending: 699, createdAt: '2024-03-15T10:00:00Z', lastOrderAt: '2024-03-18T10:00:00Z' },
];

export const DEMO_ORDERS: Order[] = [
  {
    id: 'ORD-001', customerId: 'cust-001', customerName: 'Rahul Patel', customerPhone: '+91 98765 43210', customerEmail: 'rahul@gmail.com',
    address: { line1: '12 Shiv Nagar Society', area: 'Kosamba', city: 'Surat', state: 'Gujarat', pincode: '394120' },
    items: [{ productId: 'rxp-005', productName: 'Whey Gold Standard', productImage: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&q=80', brand: 'Optimum Nutrition', flavour: 'Double Rich Chocolate', weight: '1.8 KG', quantity: 1, price: 5999, mrp: 7499 }],
    subtotal: 5999, discount: 1500, couponDiscount: 0, shipping: 0, total: 5499,
    paymentMethod: 'online', paymentStatus: 'paid', transactionId: 'TXN-RXP10001',
    status: 'delivered',
    statusHistory: [
      { status: 'pending', timestamp: '2024-01-15T10:00:00Z' },
      { status: 'confirmed', timestamp: '2024-01-15T14:00:00Z' },
      { status: 'packed', timestamp: '2024-01-16T09:00:00Z' },
      { status: 'shipped', timestamp: '2024-01-17T10:00:00Z' },
      { status: 'delivered', timestamp: '2024-01-20T16:00:00Z' },
    ],
    createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-01-20T16:00:00Z',
  },
  {
    id: 'ORD-002', customerId: 'cust-002', customerName: 'Dhruv Shah', customerPhone: '+91 87654 32109', customerEmail: 'dhruv@gmail.com',
    address: { line1: '45 Ganga Residency', area: 'Kim', city: 'Surat', state: 'Gujarat', pincode: '394110' },
    items: [{ productId: 'rxp-005', productName: 'Whey Gold Standard', productImage: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&q=80', brand: 'Optimum Nutrition', flavour: 'Vanilla Ice Cream', weight: '908g', quantity: 1, price: 5999, mrp: 7499 }],
    subtotal: 5999, discount: 1500, couponDiscount: 0, shipping: 0, total: 5999,
    paymentMethod: 'cod', paymentStatus: 'pending',
    status: 'shipped',
    statusHistory: [
      { status: 'pending', timestamp: '2024-01-22T10:00:00Z' },
      { status: 'confirmed', timestamp: '2024-01-22T16:00:00Z' },
      { status: 'packed', timestamp: '2024-01-23T10:00:00Z' },
      { status: 'shipped', timestamp: '2024-01-24T09:00:00Z' },
    ],
    createdAt: '2024-01-22T10:00:00Z', updatedAt: '2024-01-24T09:00:00Z',
  },
  {
    id: 'ORD-003', customerId: 'cust-003', customerName: 'Yash Patel', customerPhone: '+91 76543 21098', customerEmail: 'yash@gmail.com',
    address: { line1: '7 Krishna Park', area: 'Olpad', city: 'Surat', state: 'Gujarat', pincode: '394540' },
    items: [
      { productId: 'rxp-001', productName: 'Whey Protein Concentrate 80%', productImage: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&q=80', brand: 'MuscleBlaze', flavour: 'Chocolate', weight: '2 KG', quantity: 1, price: 2999, mrp: 3499 },
      { productId: 'rxp-002', productName: 'Creatine Monohydrate', productImage: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&q=80', brand: 'Optimum Nutrition', flavour: 'Unflavored', weight: '250g', quantity: 1, price: 1499, mrp: 1899 },
    ],
    subtotal: 4498, discount: 899, couponDiscount: 450, couponCode: 'WELCOME10', shipping: 0, total: 3499,
    paymentMethod: 'online', paymentStatus: 'paid', transactionId: 'TXN-RXP10003',
    status: 'confirmed',
    statusHistory: [
      { status: 'pending', timestamp: '2024-02-01T10:00:00Z' },
      { status: 'confirmed', timestamp: '2024-02-01T14:00:00Z' },
    ],
    createdAt: '2024-02-01T10:00:00Z', updatedAt: '2024-02-01T14:00:00Z',
  },
  {
    id: 'ORD-004', customerId: 'cust-004', customerName: 'Arjun Mehta', customerPhone: '+91 65432 10987', customerEmail: 'arjun@gmail.com',
    address: { line1: '22 Swaminarayan Nagar', area: 'Kosamba', city: 'Surat', state: 'Gujarat', pincode: '394120' },
    items: [{ productId: 'rxp-001', productName: 'Whey Protein Concentrate 80%', productImage: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&q=80', brand: 'MuscleBlaze', flavour: 'Vanilla', weight: '2 KG', quantity: 1, price: 2999, mrp: 3499 }],
    subtotal: 2999, discount: 500, couponDiscount: 0, shipping: 0, total: 2999,
    paymentMethod: 'cod', paymentStatus: 'pending',
    status: 'pending',
    statusHistory: [{ status: 'pending', timestamp: '2024-02-10T10:00:00Z' }],
    createdAt: '2024-02-10T10:00:00Z', updatedAt: '2024-02-10T10:00:00Z',
  },
  {
    id: 'ORD-005', customerId: 'cust-005', customerName: 'Priya Sharma', customerPhone: '+91 54321 09876', customerEmail: 'priya@gmail.com',
    address: { line1: '5 Rose Valley', area: 'Bardoli', city: 'Surat', state: 'Gujarat', pincode: '394601' },
    items: [{ productId: 'rxp-013', productName: 'Plant Protein — Vegan Formula', productImage: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&q=80', brand: 'Oziva', flavour: 'Chocolate Brownie', weight: '500g', quantity: 1, price: 1799, mrp: 2199 }],
    subtotal: 1799, discount: 400, couponDiscount: 0, shipping: 99, total: 1799,
    paymentMethod: 'online', paymentStatus: 'paid', transactionId: 'TXN-RXP10005',
    status: 'packed',
    statusHistory: [
      { status: 'pending', timestamp: '2024-02-15T10:00:00Z' },
      { status: 'confirmed', timestamp: '2024-02-15T14:00:00Z' },
      { status: 'packed', timestamp: '2024-02-16T10:00:00Z' },
    ],
    createdAt: '2024-02-15T10:00:00Z', updatedAt: '2024-02-16T10:00:00Z',
  },
  {
    id: 'ORD-006', customerId: 'cust-006', customerName: 'Virat Desai', customerPhone: '+91 43210 98765', customerEmail: 'virat@gmail.com',
    address: { line1: '18 Sardar Patel Road', area: 'Kamrej', city: 'Surat', state: 'Gujarat', pincode: '394180' },
    items: [{ productId: 'rxp-003', productName: 'Serious Mass Gainer', productImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&q=80', brand: 'Optimum Nutrition', flavour: 'Chocolate', weight: '3 KG', quantity: 1, price: 4799, mrp: 5999 }],
    subtotal: 4799, discount: 1200, couponDiscount: 0, shipping: 0, total: 4799,
    paymentMethod: 'cod', paymentStatus: 'pending',
    status: 'delivered',
    statusHistory: [
      { status: 'pending', timestamp: '2024-02-20T10:00:00Z' },
      { status: 'confirmed', timestamp: '2024-02-20T14:00:00Z' },
      { status: 'packed', timestamp: '2024-02-21T10:00:00Z' },
      { status: 'shipped', timestamp: '2024-02-22T10:00:00Z' },
      { status: 'delivered', timestamp: '2024-02-25T16:00:00Z' },
    ],
    createdAt: '2024-02-20T10:00:00Z', updatedAt: '2024-02-25T16:00:00Z',
  },
  {
    id: 'ORD-007', customerId: 'cust-007', customerName: 'Neha Joshi', customerPhone: '+91 32109 87654', customerEmail: 'neha@gmail.com',
    address: { line1: '3 Tulsi Park', area: 'Surat', city: 'Surat', state: 'Gujarat', pincode: '395001' },
    items: [{ productId: 'rxp-002', productName: 'Creatine Monohydrate', productImage: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&q=80', brand: 'Optimum Nutrition', flavour: 'Unflavored', weight: '500g', quantity: 1, price: 1499, mrp: 1899 }],
    subtotal: 1499, discount: 400, couponDiscount: 0, shipping: 0, total: 1499,
    paymentMethod: 'online', paymentStatus: 'paid', transactionId: 'TXN-RXP10007',
    status: 'shipped',
    statusHistory: [
      { status: 'pending', timestamp: '2024-03-01T10:00:00Z' },
      { status: 'confirmed', timestamp: '2024-03-01T14:00:00Z' },
      { status: 'packed', timestamp: '2024-03-02T10:00:00Z' },
      { status: 'shipped', timestamp: '2024-03-03T10:00:00Z' },
    ],
    createdAt: '2024-03-01T10:00:00Z', updatedAt: '2024-03-03T10:00:00Z',
  },
  {
    id: 'ORD-008', customerId: 'cust-001', customerName: 'Rahul Patel', customerPhone: '+91 98765 43210', customerEmail: 'rahul@gmail.com',
    address: { line1: '12 Shiv Nagar Society', area: 'Kosamba', city: 'Surat', state: 'Gujarat', pincode: '394120' },
    items: [{ productId: 'rxp-004', productName: 'Pre-Workout Energy Blend', productImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80', brand: 'C4 Original', flavour: 'Fruit Punch', weight: '60 servings', quantity: 1, price: 1999, mrp: 2499 }, { productId: 'rxp-016', productName: 'ZMA Sleep & Recovery', productImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80', brand: 'MusclePharm', flavour: 'Unflavored', weight: '90 capsules', quantity: 1, price: 749, mrp: 899 }],
    subtotal: 2748, discount: 649, couponDiscount: 275, couponCode: 'REXPRO20', shipping: 0, total: 2498,
    paymentMethod: 'cod', paymentStatus: 'pending',
    status: 'confirmed',
    statusHistory: [
      { status: 'pending', timestamp: '2024-03-10T10:00:00Z' },
      { status: 'confirmed', timestamp: '2024-03-10T15:00:00Z' },
    ],
    createdAt: '2024-03-10T10:00:00Z', updatedAt: '2024-03-10T15:00:00Z',
  },
  {
    id: 'ORD-009', customerId: 'cust-008', customerName: 'Rohan Gupta', customerPhone: '+91 21098 76543', customerEmail: 'rohan@gmail.com',
    address: { line1: '9 Navgam Road', area: 'Sachin', city: 'Surat', state: 'Gujarat', pincode: '394230' },
    items: [{ productId: 'rxp-019', productName: 'Casein Night Protein', productImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80', brand: 'MuscleBlaze', flavour: 'Chocolate Milkshake', weight: '1 KG', quantity: 1, price: 2399, mrp: 2999 }],
    subtotal: 2399, discount: 600, couponDiscount: 0, shipping: 0, total: 2399,
    paymentMethod: 'online', paymentStatus: 'paid', transactionId: 'TXN-RXP10009',
    status: 'pending',
    statusHistory: [{ status: 'pending', timestamp: '2024-03-15T10:00:00Z' }],
    createdAt: '2024-03-15T10:00:00Z', updatedAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 'ORD-010', customerId: 'cust-003', customerName: 'Yash Patel', customerPhone: '+91 76543 21098', customerEmail: 'yash@gmail.com',
    address: { line1: '7 Krishna Park', area: 'Olpad', city: 'Surat', state: 'Gujarat', pincode: '394540' },
    items: [{ productId: 'rxp-009', productName: 'Whey Protein Isolate', productImage: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&q=80', brand: 'Dymatize', flavour: 'Gourmet Chocolate', weight: '908g', quantity: 1, price: 5299, mrp: 6499 }],
    subtotal: 5299, discount: 1200, couponDiscount: 0, shipping: 0, total: 5299,
    paymentMethod: 'cod', paymentStatus: 'pending',
    status: 'cancelled',
    statusHistory: [
      { status: 'pending', timestamp: '2024-03-05T10:00:00Z' },
      { status: 'cancelled', timestamp: '2024-03-06T10:00:00Z', note: 'Customer requested cancellation' },
    ],
    createdAt: '2024-03-05T10:00:00Z', updatedAt: '2024-03-06T10:00:00Z',
  },
  {
    id: 'ORD-011', customerId: 'cust-009', customerName: 'Akash Thakur', customerPhone: '+91 10987 65432', customerEmail: 'akash@gmail.com',
    address: { line1: '1 Vrundavan Society', area: 'Kosamba', city: 'Surat', state: 'Gujarat', pincode: '394120' },
    items: [{ productId: 'rxp-011', productName: 'L-Glutamine Recovery', productImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80', brand: 'MuscleBlaze', flavour: 'Unflavored', weight: '250g', quantity: 1, price: 799, mrp: 999 }],
    subtotal: 799, discount: 200, couponDiscount: 0, shipping: 99, total: 799,
    paymentMethod: 'online', paymentStatus: 'paid', transactionId: 'TXN-RXP10011',
    status: 'pending',
    statusHistory: [{ status: 'pending', timestamp: '2024-03-16T10:00:00Z' }],
    createdAt: '2024-03-16T10:00:00Z', updatedAt: '2024-03-16T10:00:00Z',
  },
  {
    id: 'ORD-012', customerId: 'cust-010', customerName: 'Shreya Kapoor', customerPhone: '+91 90876 54321', customerEmail: 'shreya@gmail.com',
    address: { line1: '33 Patel Colony', area: 'Vyara', city: 'Tapi', state: 'Gujarat', pincode: '394650' },
    items: [{ productId: 'rxp-012', productName: 'Electrolyte Hydration Mix', productImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&q=80', brand: 'Fast&Up', flavour: 'Lemon', weight: '40 tablets', quantity: 1, price: 549, mrp: 699 }],
    subtotal: 549, discount: 150, couponDiscount: 0, shipping: 99, total: 549,
    paymentMethod: 'cod', paymentStatus: 'pending',
    status: 'pending',
    statusHistory: [{ status: 'pending', timestamp: '2024-03-18T10:00:00Z' }],
    createdAt: '2024-03-18T10:00:00Z', updatedAt: '2024-03-18T10:00:00Z',
  },
];

export const DEMO_COUPONS: Coupon[] = [
  { id: 'cpn-001', code: 'WELCOME10', type: 'percent', value: 10, minOrder: 1000, maxDiscount: 500, expiry: '2024-12-31T23:59:59Z', status: 'active', usageCount: 24, usageLimit: 100 },
  { id: 'cpn-002', code: 'FIRSTORDER', type: 'percent', value: 15, minOrder: 1500, maxDiscount: 750, expiry: '2024-12-31T23:59:59Z', status: 'active', usageCount: 11, usageLimit: 50 },
  { id: 'cpn-003', code: 'REXPRO20', type: 'percent', value: 20, minOrder: 2000, maxDiscount: 1000, expiry: '2024-06-30T23:59:59Z', status: 'active', usageCount: 8, usageLimit: 30 },
  { id: 'cpn-004', code: 'FLAT200', type: 'fixed', value: 200, minOrder: 1000, expiry: '2024-04-30T23:59:59Z', status: 'active', usageCount: 15 },
  { id: 'cpn-005', code: 'SUMMER25', type: 'percent', value: 25, minOrder: 3000, maxDiscount: 1500, expiry: '2024-05-31T23:59:59Z', status: 'inactive', usageCount: 0 },
];

export const DEMO_NOTIFICATIONS: Notification[] = [
  { id: 'notif-001', type: 'order', title: 'New Order Received', message: 'Order #ORD-012 from Shreya Kapoor — ₹549', read: false, createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), orderId: 'ORD-012' },
  { id: 'notif-002', type: 'order', title: 'New Order Received', message: 'Order #ORD-011 from Akash Thakur — ₹799', read: false, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), orderId: 'ORD-011' },
  { id: 'notif-003', type: 'stock', title: 'Low Stock Alert', message: 'Nitro Surge Pre-Workout has only 3 units remaining', read: false, createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), productId: 'rxp-014' },
  { id: 'notif-004', type: 'payment', title: 'Payment Received', message: 'Online payment of ₹2,399 received for Order #ORD-009', read: true, createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), orderId: 'ORD-009' },
  { id: 'notif-005', type: 'order', title: 'Order Confirmed', message: 'Order #ORD-008 confirmed for Rahul Patel', read: true, createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), orderId: 'ORD-008' },
  { id: 'notif-006', type: 'review', title: 'New Review', message: 'Yash Patel left a 5-star review for Whey Gold Standard', read: true, createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
  { id: 'notif-007', type: 'stock', title: 'Low Stock Alert', message: 'Dymatize ISO100 has only 7 units remaining', read: true, createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), productId: 'rxp-009' },
  { id: 'notif-008', type: 'payment', title: 'Payment Received', message: 'Online payment of ₹5,999 received for Order #ORD-001', read: true, createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), orderId: 'ORD-001' },
  { id: 'notif-009', type: 'order', title: 'Order Delivered', message: 'Order #ORD-006 delivered to Virat Desai', read: true, createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), orderId: 'ORD-006' },
  { id: 'notif-010', type: 'system', title: 'New Customer Registered', message: 'Shreya Kapoor created an account', read: true, createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString() },
];

export const DEMO_REVIEWS: Review[] = [
  { id: 'rev-001', productId: 'rxp-001', customerName: 'Rahul P.', rating: 5, title: 'Best protein in this price range!', body: 'Great products and excellent guidance from the Rex-Pro team. The chocolate flavour is amazing and mixes really well. Highly recommend!', verified: true, createdAt: '2024-02-10T10:00:00Z' },
  { id: 'rev-002', productId: 'rxp-005', customerName: 'Dhruv S.', rating: 5, title: 'Worth every rupee', body: 'Very good pricing and fast response from the store. The ON Gold Standard is genuinely authentic — I can see the QR code verification passing. Trust these guys!', verified: true, createdAt: '2024-02-15T10:00:00Z' },
  { id: 'rev-003', productId: 'rxp-002', customerName: 'Yash P.', rating: 5, title: 'Finally a reliable supplement store', body: 'Finally found a reliable supplement store near Kosamba. No more worrying about fake products. Rex-Pro always delivers authentic supplements at the best price.', verified: true, createdAt: '2024-02-20T10:00:00Z' },
  { id: 'rev-004', productId: 'rxp-003', customerName: 'Arjun M.', rating: 4, title: 'Great mass gainer', body: 'Gained 3kg in 6 weeks using ON Serious Mass from Rex-Pro. The price was lower than any other store nearby. Will keep buying here.', verified: true, createdAt: '2024-03-01T10:00:00Z' },
  { id: 'rev-005', productId: 'rxp-004', customerName: 'Virat D.', rating: 5, title: 'C4 is 🔥', body: 'Pre-workout arrived quickly and is 100% authentic. The energy from C4 is unmatched. Rex-Pro is the best supplement store in South Gujarat!', verified: true, createdAt: '2024-03-05T10:00:00Z' },
  { id: 'rev-006', productId: 'rxp-013', customerName: 'Priya S.', rating: 4, title: 'Great vegan option', body: 'Happy to finally find plant protein at Rex-Pro. The Chocolate Brownie flavour is actually delicious. Good service and quick delivery.', verified: true, createdAt: '2024-03-10T10:00:00Z' },
];

export const DEMO_INQUIRIES: Inquiry[] = [
  { id: 'inq-001', name: 'Ravi Kumar', phone: '+91 99887 76655', email: 'ravi@gmail.com', message: 'Hi, I want to know which protein is best for a beginner who just started gymming. My budget is around ₹3000.', status: 'replied', createdAt: '2024-03-15T10:00:00Z' },
  { id: 'inq-002', name: 'Karan Patel', phone: '+91 88776 65544', email: 'karan@gmail.com', message: 'Do you have COD option for Surat delivery? Also is ON Gold Standard 5lb available?', status: 'read', createdAt: '2024-03-17T10:00:00Z' },
  { id: 'inq-003', name: 'Sunita Jain', phone: '+91 77665 54433', email: 'sunita@gmail.com', message: 'I am looking for a fat burner supplement. What do you recommend? I am a female, 28 years old.', status: 'unread', createdAt: '2024-03-18T14:00:00Z' },
];
