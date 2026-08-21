import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { getProductById, saveProduct, getCategories } from '../../services/DataService';
import type { Product } from '../../types';
import { useApp } from '../../context/AppContext';

export default function AddEditProduct() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    brand: 'MuscleBlaze',
    category: 'Whey Protein',
    description: '',
    benefits: [''],
    ingredients: '',
    howToUse: '',
    images: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80'],
    mrp: 3499,
    price: 2999,
    discount: 14,
    stock: 10,
    sku: `RXP-${Math.floor(1000 + Math.random() * 9000)}`,
    flavours: ['Chocolate', 'Vanilla'],
    weights: ['1 KG', '2 KG'],
    tags: ['protein', 'supplements'],
    rating: 4.8,
    reviewCount: 0,
    badge: 'NEW',
    featured: true,
    bestSeller: false,
    isNew: true,
    status: 'active',
    goal: ['muscle-gain'],
  });

  useEffect(() => {
    if (isEdit && id) {
      const existing = getProductById(id);
      if (existing) setFormData(existing);
    }
  }, [id, isEdit]);

  function handleChange(field: keyof Product, value: any) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      showToast('error', 'Product name and price are required');
      return;
    }

    const calculatedDiscount = Math.round(((Number(formData.mrp) - Number(formData.price)) / Number(formData.mrp)) * 100);

    const productToSave: Product = {
      ...(formData as Product),
      id: isEdit && id ? id : `rxp-${Date.now()}`,
      discount: calculatedDiscount > 0 ? calculatedDiscount : 0,
      createdAt: formData.createdAt || new Date().toISOString(),
    };

    saveProduct(productToSave);
    showToast('success', isEdit ? 'Product updated successfully!' : 'Product added to store!');
    navigate('/admin/products');
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <div className="flex-between mb-xl">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/admin/products')} className="btn btn-ghost btn-sm">
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="heading-lg">{isEdit ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
        {/* Basic Details */}
        <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h3 className="heading-sm mb-lg" style={{ color: 'var(--gold)' }}>1. BASIC INFORMATION</h3>
          <div className="form-grid-2">
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Product Name *</label>
              <input type="text" required value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} className="form-input" placeholder="e.g. Whey Gold Standard 100%" />
            </div>

            <div className="form-group">
              <label className="form-label">Brand *</label>
              <input type="text" required value={formData.brand || ''} onChange={e => handleChange('brand', e.target.value)} className="form-input" placeholder="e.g. Optimum Nutrition" />
            </div>

            <div className="form-group">
              <label className="form-label">Category *</label>
              <select value={formData.category || 'Whey Protein'} onChange={e => handleChange('category', e.target.value)} className="form-select">
                {getCategories().map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Full Description *</label>
              <textarea rows={4} required value={formData.description || ''} onChange={e => handleChange('description', e.target.value)} className="form-input" placeholder="Detailed product description..." />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h3 className="heading-sm mb-lg" style={{ color: 'var(--gold)' }}>2. PRICING & INVENTORY</h3>
          <div className="form-grid-4">
            <div className="form-group">
              <label className="form-label">Selling Price (₹) *</label>
              <input type="number" required value={formData.price || ''} onChange={e => handleChange('price', Number(e.target.value))} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">MRP (₹) *</label>
              <input type="number" required value={formData.mrp || ''} onChange={e => handleChange('mrp', Number(e.target.value))} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Stock Quantity *</label>
              <input type="number" required value={formData.stock ?? 10} onChange={e => handleChange('stock', Number(e.target.value))} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">SKU Code</label>
              <input type="text" value={formData.sku || ''} onChange={e => handleChange('sku', e.target.value)} className="form-input" />
            </div>
          </div>
        </div>

        {/* Variants & Image */}
        <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h3 className="heading-sm mb-lg" style={{ color: 'var(--gold)' }}>3. VARIANTS & IMAGES</h3>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Flavours (comma separated)</label>
              <input type="text" value={formData.flavours?.join(', ') || ''} onChange={e => handleChange('flavours', e.target.value.split(',').map(s => s.trim()))} className="form-input" placeholder="Chocolate, Vanilla" />
            </div>
            <div className="form-group">
              <label className="form-label">Weights/Sizes (comma separated)</label>
              <input type="text" value={formData.weights?.join(', ') || ''} onChange={e => handleChange('weights', e.target.value.split(',').map(s => s.trim()))} className="form-input" placeholder="1 KG, 2 KG" />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Main Image URL</label>
              <input type="url" value={formData.images?.[0] || ''} onChange={e => handleChange('images', [e.target.value])} className="form-input" />
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h3 className="heading-sm mb-lg" style={{ color: 'var(--gold)' }}>4. DISPLAY BADGES</h3>
          <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.bestSeller} onChange={e => handleChange('bestSeller', e.target.checked)} />
              <span>Mark as Best Seller</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.featured} onChange={e => handleChange('featured', e.target.checked)} />
              <span>Featured on Homepage</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.status === 'active'} onChange={e => handleChange('status', e.target.checked ? 'active' : 'draft')} />
              <span>Active in Store</span>
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>
          <Save size={18} /> {isEdit ? 'Update Product' : 'Save & Publish Product'}
        </button>
      </form>
    </div>
  );
}
