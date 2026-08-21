# REX-PRO NUTRITION

Premium athletic supplement e-commerce platform demo for **Rex-Pro Nutrition**, located in **Kosamba, Gujarat, India**.

Designed with a high-performance dark aesthetic, rich typography (`Bebas Neue`, `Oswald`, `Inter`), and interactive workflows for both retail customers and store operations.

---

## 🌟 Key Features

### 🛒 Customer Storefront
- **Home & Hero Banner**: Highlighting top categories, brands, and customer value propositions.
- **Product Catalog & Filtering**: Search, filter by goal (Muscle Gain, Weight Loss, Performance), brand, category, price range, and ratings.
- **Product Detail Views**: Multi-image preview, flavour and size selector, benefits breakdown, ingredients, usage instructions, and stock indicators.
- **Interactive Cart & Wishlist**: Real-time quantity adjustments, subtotal calculation, coupon discounts, and instant shipping estimates.
- **Seamless Checkout**: Address management, Cash on Delivery (COD), and simulated Razorpay payment modal.
- **Order Tracking & Confirmation**: Dynamic order summary page with order status timelines.
- **Direct WhatsApp Consultation**: Floating WhatsApp support button linked directly to store management.

### 🛡️ Admin Management Panel
- **Operational Dashboard**: Revenue overview, total order count, customer statistics, recent order queue, and low-stock alerts.
- **Product Management (CRUD)**: Create, edit, duplicate, and soft-delete supplement inventory.
- **Order Processing**: Track order lifecycle (`Pending` ➔ `Confirmed` ➔ `Packed` ➔ `Shipped` ➔ `Delivered`).
- **Customer Directory**: View customer details, total orders placed, and lifetime spend.
- **Coupon Management**: Create active/inactive promotional discount codes with minimum purchase rules.
- **Customer Messages & Inquiries**: Receive and review contact form submissions and product inquiries.
- **Analytics & Reports**: Visual breakdown of revenue trends, top-selling categories, and payment method distribution.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Dev Server**: [Vite 8](https://vite.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Styling**: Custom Modern Vanilla CSS Design System with CSS variables and responsive glassmorphism

---

## 🚀 Getting Started Locally

### 1. Prerequisites
Ensure you have **Node.js** (v18+ recommended) and `npm` installed.

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Rajveersinh016/REX-PRO-NUTRITION-.git
cd REX-PRO-NUTRITION-

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚙️ Building for Production

### Type Check & Build
```bash
# Verify TypeScript without emitting files
npx tsc --noEmit

# Create optimized production build
npm run build
```

### Preview Production Build Locally
```bash
npm run preview
```

---

## 🔑 Demo Admin Credentials

To access the Store Admin Panel, visit `/admin/login` or click **Admin** in the footer.

- **URL**: `/admin/login`
- **Email**: `admin@rexpro.demo`
- **Password**: `demo123`

---

## ☁️ Deploying to Vercel

This repository is fully configured for single-click deployment on [Vercel](https://vercel.com).

### Step-by-Step Instructions

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** ➔ **Project**.
3. Import the GitHub repository:
   ```text
   Rajveersinh016/REX-PRO-NUTRITION-
   ```
4. Configure Project Settings (auto-detected by Vercel):
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

> **Note on Client-Side Routing**: The included `vercel.json` ensures that direct navigation to paths like `/admin`, `/shop`, `/checkout`, and `/product/:id` resolves smoothly without `404 NOT_FOUND` errors.

---

## ⚠️ Demo Mode & Production Notice

This project is configured as a **Vercel-ready presentation demo**:
- **Simulated Payment**: Online payment is handled via a simulated test gateway (`PaymentService.ts`). Real money is NOT charged.
- **Local Persistence**: Inventory, orders, coupons, and administrative edits persist locally in browser `localStorage`.
- **Integrations**: WhatsApp, Email, and SMS actions trigger client-side simulations.

Before going live for commercial sales, integrate backend APIs (Node.js/Express, Firebase, or Supabase) and live payment gateways (Razorpay, PhonePe, or Cashfree).

---

## 📍 Store Information

- **Brand**: REX-PRO NUTRITION
- **Location**: Kosamba, Gujarat, India
- **Phone / WhatsApp**: +91 9327708205
- **Instagram**: [@rexpro_nutration](https://instagram.com/rexpro_nutration)

---

Developed with ❤️ for Rex-Pro Nutrition.
