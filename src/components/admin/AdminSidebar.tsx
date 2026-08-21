import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, MessageSquare, Bell, BarChart2, Settings, LogOut, Store } from 'lucide-react';
import { adminLogout } from '../../services/PaymentService';
import { useApp } from '../../context/AppContext';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAdminAuth, showToast } = useApp();

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { label: 'Products', path: '/admin/products', icon: <Package size={18} /> },
    { label: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={18} /> },
    { label: 'Customers', path: '/admin/customers', icon: <Users size={18} /> },
    { label: 'Coupons', path: '/admin/coupons', icon: <Tag size={18} /> },
    { label: 'Messages', path: '/admin/messages', icon: <MessageSquare size={18} /> },
    { label: 'Notifications', path: '/admin/notifications', icon: <Bell size={18} /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart2 size={18} /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ];

  function handleLogout() {
    adminLogout();
    setAdminAuth(false);
    showToast('info', 'Logged out of admin panel');
    navigate('/admin/login');
  }

  return (
    <aside className="admin-sidebar">
      {/* Brand */}
      <div style={{ padding: 'var(--space-xl) var(--space-lg)', borderBottom: '1px solid var(--gray-border)' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: 'var(--gold)', letterSpacing: 1 }}>REX-PRO ADMIN</div>
        <div style={{ fontSize: 11, color: 'var(--gray-text)', fontFamily: 'var(--font-label)', letterSpacing: 2 }}>STORE MANAGEMENT</div>
      </div>

      <div style={{ flex: 1, padding: 'var(--space-md) 0' }}>
        <div className="admin-nav-section">Navigation</div>
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer / Quick Links */}
      <div style={{ padding: 'var(--space-md)', borderTop: '1px solid var(--gray-border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Link to="/" target="_blank" className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'center' }}>
          <Store size={14} /> Open Customer Site
        </Link>
        <button onClick={handleLogout} className="btn btn-danger btn-sm btn-full" style={{ justifyContent: 'center' }}>
          <LogOut size={14} /> Logout
        </button>
      </div>
    </aside>
  );
}
