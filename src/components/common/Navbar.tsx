import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Heart, X, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const { cartCount, setSearchOpen, state } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Categories', path: '/category/all' },
    { label: 'Offers', path: '/offers' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Hamburger */}
            <button className="hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
              {mobileOpen ? <X size={22} /> : (<><span /><span /><span /></>)}
            </button>

            {/* Logo */}
            <Link to="/" className="navbar-logo">
              <div className="logo-mark">
                <span className="logo-rex">REX-PRO</span>
                <span className="logo-nutrition">NUTRITION</span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="navbar-nav">
              {navLinks.map(l => (
                <Link key={l.path} to={l.path} className={`nav-link ${isActive(l.path) ? 'active' : ''}`}>
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="navbar-actions">
              <button className="nav-action" onClick={() => setSearchOpen(true)} aria-label="Search">
                <Search size={18} />
              </button>
              <button className="nav-action" onClick={() => navigate('/cart')} aria-label="Wishlist">
                <Heart size={18} />
                {state.wishlist.length > 0 && <span className="nav-badge">{state.wishlist.length}</span>}
              </button>
              <button className="nav-action" style={{ position: 'relative' }} onClick={() => navigate('/cart')} aria-label="Cart">
                <ShoppingCart size={18} />
                {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map(l => (
          <Link key={l.path} to={l.path} className="mobile-nav-link">
            {l.label}
          </Link>
        ))}
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Link to="/cart" className="btn btn-primary" style={{ justifyContent: 'center' }}>
            <ShoppingCart size={16} /> Cart ({cartCount})
          </Link>
          <Link to="/admin" className="btn btn-ghost" style={{ justifyContent: 'center' }}>
            <User size={16} /> Admin Panel
          </Link>
        </div>
      </div>

      {/* Bottom Nav (Mobile) */}
      <div className="bottom-nav">
        <Link to="/" className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          Home
        </Link>
        <Link to="/shop" className={`bottom-nav-item ${location.pathname === '/shop' ? 'active' : ''}`}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
          Shop
        </Link>
        <button className="bottom-nav-item" onClick={() => setSearchOpen(true)}>
          <Search size={20} />
          Search
        </button>
        <Link to="/cart" className={`bottom-nav-item ${location.pathname === '/cart' ? 'active' : ''}`} style={{ position: 'relative' }}>
          <ShoppingCart size={20} />
          {cartCount > 0 && <span className="nav-badge" style={{ top: 2, right: 10 }}>{cartCount}</span>}
          Cart
        </Link>
        <Link to="/offers" className={`bottom-nav-item ${location.pathname === '/offers' ? 'active' : ''}`}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>
          Offers
        </Link>
      </div>
    </>
  );
}
