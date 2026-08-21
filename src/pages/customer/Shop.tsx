import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import { getProducts, getCategories } from '../../services/DataService';
import type { Product } from '../../types';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories] = useState(getCategories());
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
    inStock: false,
    goal: searchParams.get('goal') || '',
  });
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured');

  useEffect(() => {
    const ps = getProducts();
    setProducts(ps);
  }, []);

  useEffect(() => {
    let result = [...products];
    if (filters.categories.length) result = result.filter(p => filters.categories.includes(p.category));
    if (filters.brands.length) result = result.filter(p => filters.brands.includes(p.brand));
    if (filters.goal) result = result.filter(p => p.goal.includes(filters.goal as any));
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    if (filters.rating) result = result.filter(p => p.rating >= filters.rating);
    if (filters.inStock) result = result.filter(p => p.stock > 0);
    result = result.filter(p => p.status === 'active');

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'best-selling': result.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0)); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    setFiltered(result);
  }, [products, filters, sort]);

  const brands = [...new Set(products.map(p => p.brand))];

  function toggleCategory(cat: string) {
    setFilters(f => ({
      ...f,
      categories: f.categories.includes(cat) ? f.categories.filter(c => c !== cat) : [...f.categories, cat],
    }));
  }
  function toggleBrand(brand: string) {
    setFilters(f => ({
      ...f,
      brands: f.brands.includes(brand) ? f.brands.filter(b => b !== brand) : [...f.brands, brand],
    }));
  }
  function clearFilters() {
    setFilters({ categories: [], brands: [], minPrice: 0, maxPrice: 10000, rating: 0, inStock: false, goal: '' });
  }

  const activeFilterCount = filters.categories.length + filters.brands.length + (filters.inStock ? 1 : 0) + (filters.rating ? 1 : 0) + (filters.goal ? 1 : 0);

  const Sidebar = () => (
    <div className="shop-sidebar">
      <div className="flex-between mb-md">
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20 }}>FILTERS</div>
        {activeFilterCount > 0 && <button onClick={clearFilters} className="btn btn-ghost btn-sm" style={{ padding: '4px 10px' }}>Clear All</button>}
      </div>

      <div className="filter-section">
        <div className="filter-title">Category</div>
        {categories.map(cat => (
          <label key={cat.id} className="filter-option">
            <input type="checkbox" checked={filters.categories.includes(cat.name)} onChange={() => toggleCategory(cat.name)} />
            <span style={{ flex: 1, fontSize: 14, color: 'var(--white-muted)', cursor: 'pointer' }}>{cat.name}</span>
            <span style={{ fontSize: 11, color: 'var(--gray-text)' }}>{cat.productCount}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <div className="filter-title">Brand</div>
        {brands.map(brand => (
          <label key={brand} className="filter-option">
            <input type="checkbox" checked={filters.brands.includes(brand)} onChange={() => toggleBrand(brand)} />
            <span style={{ fontSize: 14, color: 'var(--white-muted)', cursor: 'pointer' }}>{brand}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <div className="filter-title">Price Range</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="number" placeholder="Min" value={filters.minPrice || ''} onChange={e => setFilters(f => ({ ...f, minPrice: Number(e.target.value) || 0 }))} style={{ width: 80, background: 'var(--charcoal)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', color: 'var(--white)', fontSize: 13, outline: 'none' }} />
          <span style={{ color: 'var(--gray-text)' }}>–</span>
          <input type="number" placeholder="Max" value={filters.maxPrice === 10000 ? '' : filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) || 10000 }))} style={{ width: 80, background: 'var(--charcoal)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', color: 'var(--white)', fontSize: 13, outline: 'none' }} />
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-title">Min Rating</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[4, 4.5, 4.8].map(r => (
            <button key={r} onClick={() => setFilters(f => ({ ...f, rating: f.rating === r ? 0 : r }))} className={`btn btn-sm ${filters.rating === r ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '4px 12px' }}>
              {r}★
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-option">
          <input type="checkbox" checked={filters.inStock} onChange={e => setFilters(f => ({ ...f, inStock: e.target.checked }))} />
          <span style={{ fontSize: 14, color: 'var(--white-muted)', cursor: 'pointer' }}>In Stock Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="section-label">Our Collection</div>
          <h1 className="heading-lg">SHOP ALL SUPPLEMENTS</h1>
        </div>

        {/* Mobile Controls */}
        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }} className="mobile-filter-bar">
          <button onClick={() => setShowFilters(o => !o)} className="btn btn-ghost btn-sm" style={{ flex: 1 }}>
            <SlidersHorizontal size={16} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <select value={sort} onChange={e => setSort(e.target.value)} className="form-select" style={{ flex: 1, padding: '9px 16px', fontSize: 13 }}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="newest">Newest</option>
            <option value="best-selling">Best Selling</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="active-filters">
            {filters.categories.map(c => (
              <button key={c} className="filter-chip" onClick={() => toggleCategory(c)}>{c} <X size={12} /></button>
            ))}
            {filters.brands.map(b => (
              <button key={b} className="filter-chip" onClick={() => toggleBrand(b)}>{b} <X size={12} /></button>
            ))}
            {filters.goal && <button className="filter-chip" onClick={() => setFilters(f => ({ ...f, goal: '' }))}>{filters.goal.replace('-', ' ')} <X size={12} /></button>}
            {filters.inStock && <button className="filter-chip" onClick={() => setFilters(f => ({ ...f, inStock: false }))}>In Stock <X size={12} /></button>}
            <button onClick={clearFilters} style={{ fontSize: 12, color: 'var(--gray-text)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-label)', textDecoration: 'underline' }}>Clear All</button>
          </div>
        )}

        <div className="shop-layout">
          <Sidebar />
          <div>
            {/* Sort Bar */}
            <div className="shop-header">
              <div className="shop-count" style={{ color: 'var(--gray-text)', fontSize: 14 }}>
                Showing <strong style={{ color: 'var(--white)' }}>{filtered.length}</strong> products
              </div>
              <div className="shop-sort">
                <ArrowUpDown size={14} style={{ color: 'var(--gray-text)' }} />
                <select value={sort} onChange={e => setSort(e.target.value)} className="form-select" style={{ padding: '8px 16px', fontSize: 13, minWidth: 200 }}>
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="newest">Newest First</option>
                  <option value="best-selling">Best Selling</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <SlidersHorizontal size={32} />
                </div>
                <h3 className="heading-sm">No products found</h3>
                <p style={{ color: 'var(--gray-text)' }}>Try adjusting your filters</p>
                <button onClick={clearFilters} className="btn btn-outline">Clear Filters</button>
              </div>
            ) : (
              <div className="grid-4">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 800 }} onClick={() => setShowFilters(false)}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '85%', maxWidth: 320, background: 'var(--black-card)', padding: 'var(--space-lg)', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="flex-between mb-lg">
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24 }}>FILTERS</div>
              <button onClick={() => setShowFilters(false)}><X size={20} /></button>
            </div>
            <div style={{ '--sidebar-width': 'auto' } as any}>
              <Sidebar />
            </div>
            <button className="btn btn-primary btn-full mt-lg" onClick={() => setShowFilters(false)}>Apply Filters</button>
          </div>
        </div>
      )}
    </div>
  );
}
