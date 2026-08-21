import { MapPin, Phone, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div className="section-label">Authentic & Pure</div>
          <h1 className="heading-xl">ABOUT REX-PRO NUTRITION</h1>
          <p style={{ color: 'var(--gray-text)', fontSize: 18, maxWidth: 600, margin: 'var(--space-md) auto 0' }}>
            Your trusted sports nutrition and supplement destination in Kosamba, Gujarat.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid-2" style={{ alignItems: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div>
            <div className="section-label">Our Story</div>
            <h2 className="heading-lg mb-md">BUILDING FITTER COMMUNITIES SINCE DAY ONE</h2>
            <p style={{ color: 'var(--white-muted)', lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
              Rex-Pro Nutrition was established with a singular mission: to eliminate fake supplements from the market and provide fitness enthusiasts with 100% authentic, lab-certified nutrition products at the best prices.
            </p>
            <p style={{ color: 'var(--white-muted)', lineHeight: 1.8, marginBottom: 'var(--space-lg)' }}>
              Located in Kosamba, Gujarat, we stock a wide array of premium international and Indian brands, ranging from Whey Proteins, Creatine, Mass Gainers, to Essential Vitamins and Pre-Workouts.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Direct Distributor Sourced', 'FSSAI & QR Verification Passed', 'Free Expert Consultation', 'Pan-India Delivery'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: 'var(--white)' }}>
                  <CheckCircle2 size={18} color="var(--gold)" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=700&q=85"
              alt="Rex-Pro Nutrition Store"
              style={{ width: '100%', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-border)' }}
            />
          </div>
        </div>

        {/* Store Location Card */}
        <div style={{ background: 'var(--charcoal)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-2xl)', textAlign: 'center' }}>
          <h2 className="heading-md mb-md">VISIT OUR KOSAMBA STORE</h2>
          <p style={{ color: 'var(--gray-text)', marginBottom: 'var(--space-xl)' }}>Drop by for a chat and personalized guidance for your fitness goals.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2xl)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <MapPin color="var(--gold)" size={24} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, color: 'var(--white)' }}>Location</div>
                <div style={{ fontSize: 13, color: 'var(--gray-text)' }}>Kosamba, Gujarat, India</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Phone color="var(--gold)" size={24} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, color: 'var(--white)' }}>Call / WhatsApp</div>
                <div style={{ fontSize: 13, color: 'var(--gray-text)' }}>+91 9327708205</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="24" height="24" fill="none" stroke="var(--gold)" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, color: 'var(--white)' }}>Instagram</div>
                <div style={{ fontSize: 13, color: 'var(--gray-text)' }}>@rexpro_nutration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
