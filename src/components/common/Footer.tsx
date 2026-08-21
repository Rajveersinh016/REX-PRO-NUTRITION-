import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const shopLinks = [
    { label: 'Whey Protein', path: '/category/whey-protein' },
    { label: 'Creatine', path: '/category/creatine' },
    { label: 'Mass Gainer', path: '/category/mass-gainer' },
    { label: 'Pre-Workout', path: '/category/pre-workout' },
    { label: 'Vitamins', path: '/category/vitamins' },
    { label: 'All Products', path: '/shop' },
  ];
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Offers', path: '/offers' },
  ];
  const supportLinks = [
    { label: 'WhatsApp Us', path: 'https://wa.me/919327708205?text=Hi%20Rex-Pro%20Nutrition%2C%20I%20need%20help.' },
    { label: 'Call Us', path: 'tel:+919327708205' },
    { label: 'Shipping Policy', path: '/faq' },
    { label: 'Return Policy', path: '/faq' },
    { label: 'Admin Panel', path: '/admin' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <div className="logo-rex" style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: 'var(--gold)', letterSpacing: 2 }}>REX-PRO</div>
              <div style={{ fontFamily: 'var(--font-label)', fontSize: 12, letterSpacing: 5, color: 'var(--white-muted)', fontWeight: 600 }}>NUTRITION</div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--gray-text)', lineHeight: 1.8, marginBottom: 'var(--space-lg)' }}>
              Premium sports nutrition and authentic supplements for your fitness journey. India's trusted supplement store.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--white-muted)' }}>
                <MapPin size={14} color="var(--gold)" />
                Kosamba, Gujarat, India
              </div>
              <a href="tel:+919327708205" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--white-muted)' }}>
                <Phone size={14} color="var(--gold)" />
                +91 9327708205
              </a>
              <a href="https://instagram.com/rexpro_nutration" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--white-muted)' }}>
                <svg width="14" height="14" fill="none" stroke="var(--gold)" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                @rexpro_nutration
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <div className="footer-heading">Shop</div>
            <div className="footer-links">
              {shopLinks.map(l => (
                <Link key={l.path} to={l.path} className="footer-link">{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-heading">Quick Links</div>
            <div className="footer-links">
              {quickLinks.map(l => (
                <Link key={l.path} to={l.path} className="footer-link">{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <div className="footer-heading">Support</div>
            <div className="footer-links">
              {supportLinks.map(l => (
                l.path.startsWith('http') || l.path.startsWith('tel') ? (
                  <a key={l.path} href={l.path} target={l.path.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="footer-link">{l.label}</a>
                ) : (
                  <Link key={l.path} to={l.path} className="footer-link">{l.label}</Link>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2024 Rex-Pro Nutrition. All rights reserved. | <span style={{ color: 'var(--gold)' }}>DEMO WEBSITE</span></div>
          <div style={{ fontSize: 12, color: 'var(--gray-mid)' }}>Kosamba, Gujarat, India — Premium Supplements</div>
          <div className="footer-social">
            <a href="https://instagram.com/rexpro_nutration" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://wa.me/919327708205" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
              <Phone size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
