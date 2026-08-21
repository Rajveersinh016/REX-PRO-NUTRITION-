import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getProducts } from '../../services/DataService';
import type { Product } from '../../types';

export default function SearchOverlay() {
  const { state, setSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.searchOpen) { setQuery(''); setResults([]); return; }
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [state.searchOpen]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const products = getProducts();
    const found = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 8);
    setResults(found);
  }, [query]);

  if (!state.searchOpen) return null;

  return (
    <div className="search-overlay" onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false); }}>
      <button onClick={() => setSearchOpen(false)} style={{ position: 'absolute', top: 24, right: 24, color: 'var(--gray-text)', background: 'none', border: 'none', cursor: 'pointer' }}>
        <X size={24} />
      </button>
      <div style={{ marginBottom: 'var(--space-xl)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-label)', fontSize: 12, letterSpacing: 3, color: 'var(--gray-text)', textTransform: 'uppercase' }}>Search Products</p>
      </div>
      <div className="search-input-wrapper">
        <input
          autoFocus
          type="text"
          className="search-big-input"
          placeholder="Search proteins, creatine, vitamins..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Search size={20} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-text)' }} />
      </div>
      {query && (
        <div className="search-results">
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--gray-text)' }}>
              No products found for "{query}"
            </div>
          ) : results.map(p => (
            <div
              key={p.id}
              className="search-result-item"
              onClick={() => { navigate(`/product/${p.id}`); setSearchOpen(false); }}
            >
              <img src={p.images[0]} alt={p.name} className="search-result-img" loading="lazy" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'var(--font-label)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{p.brand}</div>
                <div style={{ fontWeight: 500, color: 'var(--white)', fontSize: 14 }}>{p.name}</div>
                <div style={{ fontFamily: 'var(--font-label)', color: 'var(--gold)', fontWeight: 700, fontSize: 15, marginTop: 2 }}>₹{p.price.toLocaleString('en-IN')}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--gray-text)', fontFamily: 'var(--font-label)', padding: '4px 10px', background: 'var(--charcoal)', borderRadius: 'var(--radius-full)' }}>{p.category}</div>
            </div>
          ))}
        </div>
      )}
      {!query && (
        <div style={{ color: 'var(--gray-text)', fontSize: 14, marginTop: 'var(--space-xl)', textAlign: 'center' }}>
          Try searching: "creatine", "whey protein", "pre-workout"
        </div>
      )}
    </div>
  );
}
