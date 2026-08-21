import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldAlert } from 'lucide-react';
import { adminLogin, setAdminLoggedIn } from '../../services/PaymentService';
import { useApp } from '../../context/AppContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@rexpro.demo');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAdminAuth, showToast } = useApp();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (adminLogin(email, password)) {
      setAdminLoggedIn();
      setAdminAuth(true);
      showToast('success', 'Logged into Admin Dashboard');
      navigate('/admin');
    } else {
      setError('Invalid email or password');
      showToast('error', 'Invalid login credentials');
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black-deep)', padding: 'var(--space-lg)' }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-2xl)' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <div className="logo-rex" style={{ fontSize: 36, color: 'var(--gold)', fontFamily: 'var(--font-heading)', letterSpacing: 2 }}>REX-PRO</div>
          <div style={{ fontFamily: 'var(--font-label)', fontSize: 12, letterSpacing: 5, color: 'var(--white)', fontWeight: 600 }}>ADMIN PANEL</div>
          <div style={{ fontSize: 13, color: 'var(--gray-text)', marginTop: 6 }}>Store Management & Operations</div>
        </div>

        {/* Demo Warning Box */}
        <div style={{ background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-xl)', fontSize: 13 }}>
          <div style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--black-deep)', fontWeight: 700, fontSize: 10, padding: '2px 8px', borderRadius: 4, letterSpacing: 1, marginBottom: 8, fontFamily: 'var(--font-label)' }}>
            DEMO ENVIRONMENT
          </div>
          <div style={{ color: 'var(--gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontFamily: 'var(--font-label)' }}>
            <ShieldAlert size={16} /> DEMO CREDENTIALS
          </div>
          <div style={{ color: 'var(--white-muted)' }}>Email: <strong style={{ color: 'var(--white)' }}>admin@rexpro.demo</strong></div>
          <div style={{ color: 'var(--white-muted)' }}>Password: <strong style={{ color: 'var(--white)' }}>demo123</strong></div>
          <div style={{ fontSize: 11, color: 'var(--gray-text)', marginTop: 6, fontStyle: 'italic' }}>
            Note: This authentication is for demonstration purposes.
          </div>
        </div>

        {error && <div className="form-error mb-md" style={{ textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <div style={{ position: 'relative' }}>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="form-input" style={{ paddingLeft: 40 }} />
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-text)' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="form-input" style={{ paddingLeft: 40 }} />
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-text)' }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg btn-full mt-sm">
            Login to Admin <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)', borderTop: '1px solid var(--gray-border)', paddingTop: 'var(--space-md)' }}>
          <Link to="/" style={{ fontSize: 13, color: 'var(--gray-text)' }}>← Back to Customer Website</Link>
        </div>
      </div>
    </div>
  );
}
