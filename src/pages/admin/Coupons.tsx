import { useState, useEffect } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { getCoupons, saveCoupon, deleteCoupon } from '../../services/DataService';
import type { Coupon } from '../../types';
import { useApp } from '../../context/AppContext';

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const { showToast } = useApp();

  const [formData, setFormData] = useState<Partial<Coupon>>({
    code: '',
    type: 'percent',
    value: 10,
    minOrder: 1000,
    maxDiscount: 500,
    expiry: '2024-12-31T23:59:59Z',
    status: 'active',
  });

  useEffect(() => {
    setCoupons(getCoupons());
  }, []);

  function handleToggleStatus(coupon: Coupon) {
    const updated: Coupon = { ...coupon, status: coupon.status === 'active' ? 'inactive' : 'active' };
    saveCoupon(updated);
    setCoupons(getCoupons());
    showToast('info', `Coupon ${coupon.code} status set to ${updated.status}`);
  }

  function handleDelete(id: string, code: string) {
    if (window.confirm(`Delete coupon "${code}"?`)) {
      deleteCoupon(id);
      setCoupons(getCoupons());
      showToast('info', `Coupon ${code} deleted`);
    }
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.code || !formData.value) return;

    const newCoupon: Coupon = {
      id: `cpn-${Date.now()}`,
      code: formData.code.toUpperCase().trim(),
      type: formData.type || 'percent',
      value: Number(formData.value),
      minOrder: Number(formData.minOrder || 0),
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
      expiry: formData.expiry || '2024-12-31T23:59:59Z',
      status: formData.status || 'active',
      usageCount: 0,
    };

    saveCoupon(newCoupon);
    setCoupons(getCoupons());
    setShowAddForm(false);
    showToast('success', `Coupon ${newCoupon.code} created!`);
  }

  return (
    <div>
      <div className="flex-between mb-xl">
        <div>
          <div className="section-label">Promotions</div>
          <h1 className="heading-lg">COUPON MANAGEMENT ({coupons.length})</h1>
        </div>
        <button onClick={() => setShowAddForm(o => !o)} className="btn btn-primary">
          <Plus size={18} /> {showAddForm ? 'Close Form' : 'Create New Coupon'}
        </button>
      </div>

      {showAddForm && (
        <div style={{ background: 'var(--black-card)', border: '1px solid var(--gold)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h3 className="heading-sm mb-lg" style={{ color: 'var(--gold)' }}>CREATE DISCOUNT COUPON</h3>
          <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-md)' }}>
            <div className="form-group">
              <label className="form-label">Coupon Code *</label>
              <input type="text" required placeholder="e.g. SUMMER20" value={formData.code || ''} onChange={e => setFormData({ ...formData, code: e.target.value })} className="form-input" style={{ textTransform: 'uppercase' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value as any })} className="form-select">
                <option value="percent">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Discount Value *</label>
              <input type="number" required value={formData.value || ''} onChange={e => setFormData({ ...formData, value: Number(e.target.value) })} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Min Order (₹)</label>
              <input type="number" value={formData.minOrder || ''} onChange={e => setFormData({ ...formData, minOrder: Number(e.target.value) })} className="form-input" />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 4' }}>
              <button type="submit" className="btn btn-primary btn-sm">Save & Activate Coupon</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Discount</th>
              <th>Min Order</th>
              <th>Max Cap</th>
              <th>Times Used</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id}>
                <td style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--gold)', letterSpacing: 1 }}>{c.code}</td>
                <td style={{ fontWeight: 600 }}>{c.type === 'percent' ? `${c.value}% OFF` : `₹${c.value} OFF`}</td>
                <td style={{ fontSize: 13, color: 'var(--gray-text)' }}>₹{c.minOrder}</td>
                <td style={{ fontSize: 13, color: 'var(--gray-text)' }}>{c.maxDiscount ? `₹${c.maxDiscount}` : 'No cap'}</td>
                <td style={{ fontWeight: 700 }}>{c.usageCount} times</td>
                <td>
                  <span className={`badge ${c.status === 'active' ? 'badge-green' : 'badge-gray'}`}>{c.status}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleToggleStatus(c)} className="btn btn-ghost btn-sm">
                      {c.status === 'active' ? <ToggleRight color="var(--green)" size={18} /> : <ToggleLeft color="var(--gray-text)" size={18} />}
                    </button>
                    <button onClick={() => handleDelete(c.id, c.code)} className="btn btn-danger btn-sm">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
