import { Bell, LogOut, Store } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getNotifications } from '../../services/DataService';
import { adminLogout } from '../../services/PaymentService';
import { useApp } from '../../context/AppContext';

export default function AdminHeader() {
  const unreadCount = getNotifications().filter(n => !n.read).length;
  const location = useLocation();
  const navigate = useNavigate();
  const { setAdminAuth, showToast } = useApp();

  const navItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Orders', path: '/admin/orders' },
    { label: 'Customers', path: '/admin/customers' },
    { label: 'Coupons', path: '/admin/coupons' },
    { label: 'Messages', path: '/admin/messages' },
    { label: 'Notifications', path: '/admin/notifications' },
    { label: 'Analytics', path: '/admin/analytics' },
    { label: 'Settings', path: '/admin/settings' },
  ];

  function handleLogout() {
    adminLogout();
    setAdminAuth(false);
    showToast('info', 'Logged out of admin panel');
    navigate('/admin/login');
  }

  return (
    <>
      <header className="admin-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="badge badge-gold">DEMO MODE</span>
          <span className="admin-topbar-brand" style={{ fontSize: 13, color: 'var(--gray-text)' }}>Rex-Pro Nutrition Kosamba</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/admin/notifications" style={{ position: 'relative', color: 'var(--white-muted)' }} title="Notifications">
            <Bell size={20} />
            {unreadCount > 0 && <span className="nav-badge" style={{ top: -6, right: -6 }}>{unreadCount}</span>}
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--white-muted)', paddingLeft: 12, borderLeft: '1px solid var(--gray-border)' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--gold)', color: 'var(--black-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              A
            </div>
            <span className="admin-topbar-email">admin@rexpro.demo</span>
          </div>

          <button onClick={handleLogout} className="admin-mobile-logout-btn" title="Logout" style={{ color: 'var(--red-light)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Mobile Admin Horizontal Nav Bar */}
      <nav className="admin-mobile-nav">
        <div className="admin-mobile-nav-inner">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={`admin-mobile-nav-chip ${isActive ? 'active' : ''}`}>
                {item.label}
              </Link>
            );
          })}
          <Link to="/" target="_blank" className="admin-mobile-nav-chip" style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Store size={12} /> Site
          </Link>
        </div>
      </nav>
    </>
  );
}
