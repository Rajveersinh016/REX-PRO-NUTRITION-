import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/common/ErrorBoundary';

// Common
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import WhatsAppButton from './components/common/WhatsAppButton';
import SearchOverlay from './components/common/SearchOverlay';

// Customer Pages
import Home from './pages/customer/Home';
import Shop from './pages/customer/Shop';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderSuccess from './pages/customer/OrderSuccess';
import About from './pages/customer/About';
import Contact from './pages/customer/Contact';
import Offers from './pages/customer/Offers';
import FAQ from './pages/customer/FAQ';
import Category from './pages/customer/Category';
import NotFound from './pages/customer/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import AddEditProduct from './pages/admin/AddEditProduct';
import Orders from './pages/admin/Orders';
import OrderDetail from './pages/admin/OrderDetail';
import Customers from './pages/admin/Customers';
import Coupons from './pages/admin/Coupons';
import Messages from './pages/admin/Messages';
import AdminNotifications from './pages/admin/AdminNotifications';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';

function CustomerLayout() {
  return (
    <>
      <Navbar />
      <SearchOverlay />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toast />
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Login */}
        <Route path="/admin/login" element={<><AdminLogin /><Toast /></>} />

        {/* Admin Panel */}
        <Route path="/admin" element={<><AdminLayout /><Toast /></>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddEditProduct />} />
          <Route path="products/edit/:id" element={<AddEditProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="customers" element={<Customers />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Customer Site */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ErrorBoundary>
  );
}
