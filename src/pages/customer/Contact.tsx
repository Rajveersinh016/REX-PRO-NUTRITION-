import { useState } from 'react';
import { MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import { saveInquiry } from '../../services/DataService';
import { useApp } from '../../context/AppContext';

export default function Contact() {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('error', 'Please complete all required fields');
      return;
    }

    saveInquiry({
      id: `inq-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      status: 'unread',
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
    showToast('success', 'Message received successfully!');
  }

  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div className="section-label">Get in Touch</div>
          <h1 className="heading-xl">CONTACT REX-PRO NUTRITION</h1>
          <p style={{ color: 'var(--gray-text)', fontSize: 16, maxWidth: 500, margin: 'var(--space-md) auto 0' }}>
            Have questions about products, authenticity, or shipping? Reach out to us anytime!
          </p>
        </div>

        <div className="grid-2" style={{ alignItems: 'start' }}>
          {/* Info Side */}
          <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-2xl)' }}>
            <h2 className="heading-md mb-lg" style={{ color: 'var(--gold)' }}>STORE INFO</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--charcoal)', color: 'var(--gold)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--white)', fontSize: 16 }}>Store Address</div>
                  <div style={{ color: 'var(--white-muted)', fontSize: 14, marginTop: 4 }}>Rex-Pro Nutrition, Kosamba, Gujarat, India</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--charcoal)', color: 'var(--gold)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--white)', fontSize: 16 }}>Phone & WhatsApp</div>
                  <div style={{ color: 'var(--white-muted)', fontSize: 14, marginTop: 4 }}>+91 9327708205</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--charcoal)', color: 'var(--gold)' }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--white)', fontSize: 16 }}>Instagram</div>
                  <div style={{ color: 'var(--white-muted)', fontSize: 14, marginTop: 4 }}>@rexpro_nutration</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--gray-border)' }}>
              <a
                href="https://wa.me/919327708205?text=Hi%20Rex-Pro%20Nutrition%2C%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-full"
              >
                Direct WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-2xl)' }}>
            <h2 className="heading-md mb-lg">SEND US A MESSAGE</h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-2xl) 0' }}>
                <CheckCircle2 size={48} color="var(--green)" style={{ margin: '0 auto var(--space-md)' }} />
                <h3 className="heading-sm mb-sm" style={{ color: 'var(--green)' }}>MESSAGE RECEIVED!</h3>
                <p style={{ color: 'var(--gray-text)', fontSize: 14 }}>
                  Thank you for reaching out. We will get back to you shortly on WhatsApp or Phone.
                </p>
                <button onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', message: '' }); }} className="btn btn-ghost mt-lg">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="form-input" placeholder="e.g. Rahul Patel" />
                </div>
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="form-input" placeholder="+91 9876543210" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address (Optional)</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="form-input" placeholder="name@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message / Inquiry *</label>
                  <textarea rows={4} required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="form-input" placeholder="Tell us what product you are interested in..." />
                </div>
                <button type="submit" className="btn btn-primary btn-lg mt-sm">
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
