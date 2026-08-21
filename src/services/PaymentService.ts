// ============================================================
// REX-PRO NUTRITION — Payment Service
// Simulates Razorpay payment flow.
// PRODUCTION: Replace simulate() with real Razorpay SDK integration.
// ============================================================

export interface PaymentOptions {
  amount: number; // in INR
  name: string;
  email: string;
  phone: string;
  orderId: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

function generateTransactionId(): string {
  return `TXN-RXP${Date.now().toString(36).toUpperCase()}`;
}

// DEMO: Simulates network delay + success
// PRODUCTION: Replace with window.Razorpay({...}).open()
export function simulatePayment(_options: PaymentOptions): Promise<PaymentResult> {
  return new Promise((resolve) => {
    // Simulate 2 second processing
    setTimeout(() => {
      // 95% success rate in demo
      const success = Math.random() > 0.05;
      if (success) {
        resolve({ success: true, transactionId: generateTransactionId() });
      } else {
        resolve({ success: false, error: 'Payment declined by bank. Please try again.' });
      }
    }, 2000);
  });
}

// Auth Service (Demo Only)
// PRODUCTION: Replace with Firebase Auth / JWT
const ADMIN_CREDENTIALS = {
  email: 'admin@rexpro.demo',
  password: 'demo123',
};

export function adminLogin(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem('rxp_admin_auth') === 'true';
}

export function adminLogout(): void {
  localStorage.removeItem('rxp_admin_auth');
}

export function setAdminLoggedIn(): void {
  localStorage.setItem('rxp_admin_auth', 'true');
}
