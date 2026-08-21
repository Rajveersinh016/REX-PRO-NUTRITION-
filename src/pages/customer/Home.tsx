import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Zap, Shield, Star, TrendingUp } from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import { getProducts, getCategories } from '../../services/DataService';
import type { Product } from '../../types';

// Countdown Timer
function useCountdown(hours = 23, minutes = 45, seconds = 30) {
  const [time, setTime] = useState({ h: hours, m: minutes, s: seconds });
  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function pad(n: number) { return String(n).padStart(2, '0'); }

// Animated counter
function Counter({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = Math.ceil(value / 50);
        const id = setInterval(() => {
          start += step;
          if (start >= value) { setCurrent(value); clearInterval(id); }
          else setCurrent(start);
        }, 30);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{prefix}{current.toLocaleString('en-IN')}</span>;
}

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const { h, m, s } = useCountdown();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const bestSellers = products.filter(p => p.bestSeller || p.featured).slice(0, 8);
  const categories = getCategories();

  const goals = [
    { id: 'muscle-gain', label: 'MUSCLE GAIN', desc: 'Build strength and size', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80', color: '#D4AF37' },
    { id: 'fat-loss', label: 'FAT LOSS', desc: 'Support your fitness journey', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80', color: '#E67E22' },
    { id: 'strength', label: 'STRENGTH', desc: 'Improve performance', img: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=500&q=80', color: '#C0392B' },
    { id: 'wellness', label: 'DAILY WELLNESS', desc: 'Essential vitamins and nutrition', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80', color: '#27AE60' },
  ];

  const goalProducts = selectedGoal
    ? products.filter(p => p.goal.includes(selectedGoal as any)).slice(0, 4)
    : [];

  const trustCards = [
    { icon: <Shield size={28} />, title: '100% AUTHENTIC', body: 'Every product comes with a QR verification code. Only genuine brands, no fakes.' },
    { icon: <TrendingUp size={28} />, title: 'BEST PRICES', body: 'Competitive pricing on all supplements. Price match guarantee available.' },
    { icon: <Star size={28} />, title: 'EXPERT GUIDANCE', body: 'Get personalized supplement advice from certified nutrition experts.' },
    { icon: <Zap size={28} />, title: 'PAN-INDIA DELIVERY', body: 'Fast and reliable delivery across India. Orders above ₹999 shipped free.' },
    { icon: <Shield size={28} />, title: 'SECURE PAYMENT', body: 'Razorpay powered secure checkout. UPI, Cards, Net Banking supported.' },
    { icon: <Star size={28} />, title: 'CUSTOMER SUPPORT', body: 'Reach us via WhatsApp or call. Always available for your supplement needs.' },
  ];

  const reviews = [
    { name: 'Rahul P.', rating: 5, title: 'Best supplement store!', body: 'Great products and excellent guidance. The team at Rex-Pro really knows their supplements. Highly recommended!', product: 'MuscleBlaze Whey' },
    { name: 'Dhruv S.', rating: 5, title: 'Worth every rupee', body: 'Very good pricing and fast response. Everything is 100% authentic — I verified all products and they all passed.', product: 'ON Gold Standard' },
    { name: 'Yash P.', rating: 5, title: 'Finally a reliable store', body: 'Finally found a reliable supplement store. No more worrying about fake products. Rex-Pro is the real deal!', product: 'ON Creatine' },
  ];

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-height)' }}>
      {/* ---- HERO ---- */}
      <section className="hero" style={{ paddingTop: 0 }}>
        <div className="hero-bg" />
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-tagline">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
                Rex-Pro Nutrition — Kosamba, Gujarat
              </div>
              <h1 className="heading-hero">
                <span className="text-gold">FUEL</span> YOUR BODY.<br />
                BUILD YOUR<br />
                <span style={{ WebkitTextStroke: '2px var(--gold)', color: 'transparent' }}>BEST.</span>
              </h1>
              <p style={{ fontSize: 17, color: 'var(--white-muted)', lineHeight: 1.8, marginTop: 'var(--space-lg)', maxWidth: 480 }}>
                Premium sports nutrition and authentic supplements for your fitness journey. 100% genuine products, expert guidance.
              </p>
              <div className="hero-ctas">
                <Link to="/shop" className="btn btn-primary btn-lg">
                  Shop Now <ArrowRight size={18} />
                </Link>
                <Link to="/category/whey-protein" className="btn btn-outline btn-lg">
                  Explore Supplements
                </Link>
              </div>
              <div className="hero-trust">
                {['100% Authentic Products', 'Best Price Guaranteed', 'Expert Guidance', 'Delivery Across India'].map(t => (
                  <div key={t} className="trust-item">
                    <div className="trust-check">✓</div>
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-wrapper">
                <div className="hero-glow" />
                <img
                  src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=700&q=85"
                  alt="Premium Supplements"
                  className="hero-image"
                />
                {/* Floating cards */}
                <div style={{ position: 'absolute', bottom: 24, left: -32, background: 'rgba(17,17,17,0.9)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: '12px 20px', backdropFilter: 'blur(20px)', animation: 'heroFloat 6s ease-in-out infinite', animationDelay: '1s' }}>
                  <div style={{ fontFamily: 'var(--font-label)', fontSize: 10, color: 'var(--gold)', letterSpacing: 2, marginBottom: 4 }}>HAPPY CUSTOMERS</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: 'var(--white)' }}><Counter value={500} />+</div>
                </div>
                <div style={{ position: 'absolute', top: 32, right: -20, background: 'rgba(17,17,17,0.9)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 'var(--radius-lg)', padding: '12px 20px', backdropFilter: 'blur(20px)' }}>
                  <div style={{ fontFamily: 'var(--font-label)', fontSize: 10, color: 'var(--gold)', letterSpacing: 2, marginBottom: 4 }}>PRODUCTS</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: 'var(--white)' }}><Counter value={50} />+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- STATS BAR ---- */}
      <div style={{ background: 'var(--charcoal)', borderTop: '1px solid var(--gray-border)', borderBottom: '1px solid var(--gray-border)', padding: '24px 0' }}>
        <div className="container">
          <div className="home-stats-grid">
            {[
              { value: 500, label: 'Happy Customers', suffix: '+' },
              { value: 50, label: 'Products', suffix: '+' },
              { value: 20, label: 'Premium Brands', suffix: '+' },
              { value: 100, label: 'Authentic Guarantee', suffix: '%' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 36, color: 'var(--gold)', lineHeight: 1 }}>
                  <Counter value={s.value} />{s.suffix}
                </div>
                <div style={{ fontFamily: 'var(--font-label)', fontSize: 11, color: 'var(--gray-text)', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- SHOP BY GOAL ---- */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Find Your Path</div>
            <h2 className="heading-lg section-title">SHOP BY GOAL</h2>
            <p className="section-subtitle">Choose your fitness goal and we&apos;ll recommend the right supplements for your journey.</p>
          </div>
          <div className="goal-grid">
            {goals.map(g => (
              <div
                key={g.id}
                className="goal-card"
                onClick={() => navigate(`/shop?goal=${g.id}`)}
                role="button"
                tabIndex={0}
              >
                <img src={g.img} alt={g.label} className="goal-card-img" loading="lazy" />
                <div className="goal-card-overlay" />
                <div className="goal-card-content">
                  <div className="goal-card-title" style={{ color: g.color }}>{g.label}</div>
                  <div className="goal-card-sub">{g.desc}</div>
                  <div className="goal-card-btn">Shop Now <ArrowRight size={12} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CATEGORIES ---- */}
      <section className="section" style={{ background: 'var(--charcoal)', paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Browse</div>
            <h2 className="heading-lg section-title">SHOP BY CATEGORY</h2>
          </div>
          <div className="category-grid">
            {categories.map(cat => (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => navigate(`/category/${cat.slug}`)}
                role="button"
                tabIndex={0}
              >
                <div style={{ overflow: 'hidden', aspectRatio: '1', background: 'var(--black-card)' }}>
                  <img src={cat.image} alt={cat.name} className="category-card-img" loading="lazy" />
                </div>
                <div className="category-card-body">
                  <div className="category-card-name">{cat.name}</div>
                  <div className="category-card-shop">Shop Now →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- BEST SELLERS ---- */}
      <section className="section">
        <div className="container">
          <div className="flex-between mb-xl">
            <div>
              <div className="section-label">🔥 Top Picks</div>
              <h2 className="heading-lg">BEST SELLERS</h2>
            </div>
            <Link to="/shop?sort=best-selling" className="btn btn-ghost btn-sm">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid-4">
            {bestSellers.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ---- LIMITED OFFER BANNER ---- */}
      <section className="section-sm">
        <div className="container">
          <div className="offer-banner">
            <div>
              <div className="section-label" style={{ marginBottom: 'var(--space-sm)' }}>Limited Time Deal</div>
              <h2 className="heading-xl" style={{ color: 'var(--white)' }}>LEVEL UP<br /><span className="text-gold">YOUR GAINS</span></h2>
              <p style={{ fontSize: 20, color: 'var(--white-muted)', marginTop: 'var(--space-md)' }}>UP TO <strong style={{ color: 'var(--gold)' }}>25% OFF</strong> on selected supplements</p>
              <div className="offer-countdown">
                {[{ n: pad(h), l: 'Hours' }, { n: pad(m), l: 'Minutes' }, { n: pad(s), l: 'Seconds' }].map((c, i) => (
                  <div key={i}>
                    <div className="countdown-unit">
                      <div className="countdown-num">{c.n}</div>
                      <div className="countdown-label">{c.l}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/offers" className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-xl)', display: 'inline-flex' }}>
                Shop Offers <ArrowRight size={18} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', minWidth: 280 }}>
              {products.slice(0, 3).map(p => (
                <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', padding: 'var(--space-md)', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-border)', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <img src={p.images[0]} alt={p.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} loading="lazy" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-label)', fontSize: 13, fontWeight: 600 }}>{p.name.substring(0, 24)}</div>
                    <div style={{ color: 'var(--gold)', fontFamily: 'var(--font-label)', fontSize: 14 }}>₹{p.price.toLocaleString('en-IN')}</div>
                  </div>
                  <span className="badge badge-red">{p.discount}% OFF</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- WHY SHOP WITH US ---- */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Promise</div>
            <h2 className="heading-lg section-title">WHY SHOP WITH REX-PRO?</h2>
            <p className="section-subtitle">We&apos;re committed to delivering the best supplement shopping experience in Gujarat.</p>
          </div>
          <div className="trust-grid">
            {trustCards.map((card, i) => (
              <div key={i} className="trust-card">
                <div className="trust-icon">{card.icon}</div>
                <div className="trust-card-title">{card.title}</div>
                <div className="trust-card-body">{card.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- GOAL RECOMMENDER ---- */}
      <section className="section-sm" style={{ background: 'var(--charcoal)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <div className="section-label">Personalized</div>
            <h2 className="heading-lg" style={{ marginBottom: 'var(--space-md)' }}>NOT SURE WHAT TO BUY?</h2>
            <p style={{ color: 'var(--gray-text)', fontSize: 16, maxWidth: 500, margin: '0 auto var(--space-xl)' }}>
              Tell us your fitness goal and we&apos;ll recommend the perfect supplement stack.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', justifyContent: 'center' }}>
              {goals.map(g => (
                <button
                  key={g.id}
                  className={`btn ${selectedGoal === g.id ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setSelectedGoal(selectedGoal === g.id ? null : g.id)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          {selectedGoal && goalProducts.length > 0 && (
            <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
              {goalProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          <div style={{ textAlign: 'center' }}>
            <a
              href="https://wa.me/919327708205?text=Hi%20Rex-Pro%20Nutrition%2C%20I%20need%20help%20choosing%20the%20right%20supplement%20for%20my%20goal."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Chat With Us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ---- REVIEWS ---- */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Customer Love</div>
            <h2 className="heading-lg section-title">WHAT OUR CUSTOMERS SAY</h2>
            <p className="section-subtitle" style={{ color: 'var(--gray-text)', fontSize: 13 }}>
              ⚠️ Demo reviews — actual customer reviews will appear here after launch.
            </p>
          </div>
          <div className="review-grid">
            {reviews.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-quote">"</div>
                <div className="stars" style={{ marginBottom: 'var(--space-md)' }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <div style={{ fontFamily: 'var(--font-label)', fontSize: 15, fontWeight: 600, color: 'var(--white)', marginBottom: 'var(--space-sm)' }}>{r.title}</div>
                <div className="review-body">{r.body}</div>
                <div className="review-author">— {r.name}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-text)', marginTop: 4 }}>Verified purchase: {r.product}</div>
                <div className="review-verified">
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                  Verified Purchase
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- INSTAGRAM ---- */}
      <section className="section-sm" style={{ background: 'var(--charcoal)', borderTop: '1px solid var(--gray-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label">Social</div>
          <h2 className="heading-lg" style={{ marginBottom: 'var(--space-md)' }}>FOLLOW REX-PRO NUTRITION</h2>
          <p style={{ color: 'var(--gray-text)', marginBottom: 'var(--space-xl)' }}>Stay updated with our latest products, offers, and fitness tips.</p>
          <div className="insta-grid">
            {[
              'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80',
              'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=300&q=80',
              'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&q=80',
              'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&q=80',
              'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&q=80',
            ].map((img, i) => (
              <a key={i} href="https://instagram.com/rexpro_nutration" target="_blank" rel="noopener noreferrer" style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: 'var(--radius-md)', display: 'block', position: 'relative' }}>
                <img src={img} alt="Instagram" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} loading="lazy" />
              </a>
            ))}
          </div>
          <a
            href="https://instagram.com/rexpro_nutration"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-lg"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            @rexpro_nutration — Follow Us on Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
