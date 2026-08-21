import { useState, useEffect } from 'react';
import { Tag, Copy, Check } from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import { getProducts, getCoupons } from '../../services/DataService';
import type { Product, Coupon } from '../../types';
import { useApp } from '../../context/AppContext';

export default function Offers() {
  const { showToast } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [copiedCode, setCopiedCode] = useState('');

  useEffect(() => {
    const all = getProducts();
    setProducts(all.filter(p => p.discount >= 15));
    setCoupons(getCoupons().filter(c => c.status === 'active'));
  }, []);

  function handleCopy(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast('info', `Coupon ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(''), 2000);
  }

  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div className="section-label">Exclusive Deals</div>
          <h1 className="heading-xl">SPECIAL OFFERS & COUPONS</h1>
          <p style={{ color: 'var(--gray-text)', fontSize: 16, maxWidth: 500, margin: 'var(--space-md) auto 0' }}>
            Save extra on your supplement orders with active coupon codes & deals.
          </p>
        </div>

        {/* Coupons List */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="heading-md mb-lg">ACTIVE COUPON CODES</h2>
          <div className="grid-3">
            {coupons.map(c => (
              <div key={c.id} style={{ background: 'var(--black-card)', border: '1px dashed var(--gold)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                  <span className="badge badge-gold"><Tag size={12} /> {c.type === 'percent' ? `${c.value}% OFF` : `₹${c.value} OFF`}</span>
                  <span style={{ fontSize: 11, color: 'var(--gray-text)' }}>Min Order: ₹{c.minOrder}</span>
                </div>

                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 32, letterSpacing: 2, color: 'var(--white)', marginBottom: 8 }}>
                  {c.code}
                </div>
                <div style={{ fontSize: 13, color: 'var(--white-muted)', marginBottom: 'var(--space-lg)' }}>
                  {c.type === 'percent' ? `Get ${c.value}% discount on orders above ₹${c.minOrder}` : `Get flat ₹${c.value} off on orders above ₹${c.minOrder}`}
                </div>

                <button onClick={() => handleCopy(c.code)} className="btn btn-outline btn-full btn-sm">
                  {copiedCode === c.code ? <><Check size={14} /> COPIED</> : <><Copy size={14} /> COPY CODE</>}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Discounted Products */}
        <div>
          <h2 className="heading-md mb-lg">TOP DISCOUNTED SUPPLEMENTS</h2>
          <div className="grid-4">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
