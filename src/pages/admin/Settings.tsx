import { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { resetDemoData } from '../../services/DataService';
import { useApp } from '../../context/AppContext';

export default function Settings() {
  const { showToast } = useApp();

  const [storeInfo, setStoreInfo] = useState({
    storeName: 'Rex-Pro Nutrition Kosamba',
    phone: '+91 9327708205',
    email: 'contact@rexpro.demo',
    location: 'Kosamba, Gujarat, India',
    instagram: '@rexpro_nutration',
    freeShippingThreshold: 999,
  });

  function handleReset() {
    if (window.confirm('Reset all demo data back to default state? This will restore sample products and orders.')) {
      resetDemoData();
      showToast('info', 'Demo data reset to factory default!');
      window.location.reload();
    }
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    showToast('success', 'Store settings updated!');
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <div className="flex-between mb-xl">
        <div>
          <div className="section-label">Configuration</div>
          <h1 className="heading-lg">STORE SETTINGS</h1>
        </div>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
        {/* Store Info */}
        <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h3 className="heading-sm mb-lg" style={{ color: 'var(--gold)' }}>STORE DETAILS</h3>
          <div className="form-grid-2">
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Store Business Name</label>
              <input type="text" value={storeInfo.storeName} onChange={e => setStoreInfo({ ...storeInfo, storeName: e.target.value })} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone & WhatsApp Number</label>
              <input type="text" value={storeInfo.phone} onChange={e => setStoreInfo({ ...storeInfo, phone: e.target.value })} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Instagram Handle</label>
              <input type="text" value={storeInfo.instagram} onChange={e => setStoreInfo({ ...storeInfo, instagram: e.target.value })} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Location / Address</label>
              <input type="text" value={storeInfo.location} onChange={e => setStoreInfo({ ...storeInfo, location: e.target.value })} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Free Shipping Minimum (₹)</label>
              <input type="number" value={storeInfo.freeShippingThreshold} onChange={e => setStoreInfo({ ...storeInfo, freeShippingThreshold: Number(e.target.value) })} className="form-input" />
            </div>
          </div>
        </div>

        {/* Demo Data Management */}
        <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h3 className="heading-sm mb-md" style={{ color: 'var(--gold)' }}>DEMO DATA MANAGEMENT</h3>
          <p style={{ fontSize: 13, color: 'var(--gray-text)', marginBottom: 'var(--space-lg)' }}>
            If you ever make changes or test orders during a presentation and want to restore the clean demo data, click reset below.
          </p>
          <button type="button" onClick={handleReset} className="btn btn-outline">
            <RefreshCw size={16} /> Reset All Demo Data
          </button>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>
          <Save size={18} /> Save Settings
        </button>
      </form>
    </div>
  );
}
