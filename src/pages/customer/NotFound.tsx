import { Link } from 'react-router-dom';
import { Home as HomeIcon, ShoppingBag, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="page-enter" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'calc(var(--nav-height) + var(--space-2xl))', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: 640 }}>
        {/* 404 Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '6px 16px', borderRadius: 'var(--radius-full)', color: 'var(--gold)', fontFamily: 'var(--font-label)', fontSize: 13, letterSpacing: 2, marginBottom: 'var(--space-lg)' }}>
          <AlertTriangle size={16} /> 404 ERROR — PAGE NOT FOUND
        </div>

        {/* Big 404 Headline */}
        <h1 className="heading-xl" style={{ fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 1, color: 'var(--white)', marginBottom: 'var(--space-md)' }}>
          LOOKS LIKE YOU TOOK A <span style={{ color: 'var(--gold)' }}>WRONG TURN</span>.
        </h1>

        <p style={{ color: 'var(--white-muted)', fontSize: 18, lineHeight: 1.6, marginBottom: 'var(--space-2xl)', maxWidth: 500, margin: '0 auto var(--space-2xl)' }}>
          The page or supplement product you are looking for doesn&apos;t exist or may have been moved.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <HomeIcon size={18} /> BACK TO HOME
          </Link>
          <Link to="/shop" className="btn btn-ghost btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <ShoppingBag size={18} /> SHOP SUPPLEMENTS
          </Link>
        </div>
      </div>
    </div>
  );
}
