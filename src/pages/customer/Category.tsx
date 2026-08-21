import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import { getProducts, getCategories } from '../../services/DataService';
import type { Product } from '../../types';

export default function Category() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories] = useState(getCategories());
  const [currentCategoryName, setCurrentCategoryName] = useState('');

  useEffect(() => {
    const all = getProducts();
    if (slug === 'all' || !slug) {
      setProducts(all);
      setCurrentCategoryName('ALL CATEGORIES');
    } else {
      const cat = categories.find(c => c.slug === slug);
      if (cat) {
        setCurrentCategoryName(cat.name.toUpperCase());
        setProducts(all.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()));
      } else {
        setProducts(all);
        setCurrentCategoryName('ALL CATEGORIES');
      }
    }
  }, [slug, categories]);

  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container">
        {/* Category Pills Header */}
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <div className="section-label">Category Filter</div>
          <h1 className="heading-xl mb-lg">{currentCategoryName}</h1>

          <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/category/all')}
              className={`btn btn-sm ${slug === 'all' || !slug ? 'btn-primary' : 'btn-ghost'}`}
            >
              All Categories
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => navigate(`/category/${c.slug}`)}
                className={`btn btn-sm ${slug === c.slug ? 'btn-primary' : 'btn-ghost'}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
