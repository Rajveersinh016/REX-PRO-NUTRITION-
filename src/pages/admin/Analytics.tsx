import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { getDashboardStats } from '../../services/DataService';

export default function Analytics() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  if (!stats) return <div className="spinner" />;

  return (
    <div>
      <div className="flex-between mb-xl">
        <div>
          <div className="section-label">Performance</div>
          <h1 className="heading-lg">STORE ANALYTICS & INSIGHTS</h1>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid-4 mb-xl">
        <div className="stat-card">
          <div className="stat-card-accent" style={{ background: 'var(--gold)' }} />
          <div className="stat-label">TOTAL REVENUE</div>
          <div className="stat-value">₹{stats.totalSales.toLocaleString('en-IN')}</div>
          <div className="stat-change"><TrendingUp size={12} /> +18.4% vs last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-accent" style={{ background: '#5dade2' }} />
          <div className="stat-label">AVERAGE ORDER VALUE</div>
          <div className="stat-value">₹{stats.totalOrders ? Math.round(stats.totalSales / stats.totalOrders).toLocaleString('en-IN') : 0}</div>
          <div className="stat-change"><TrendingUp size={12} /> +5.2% vs last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-accent" style={{ background: 'var(--green)' }} />
          <div className="stat-label">CONVERSION RATE</div>
          <div className="stat-value">3.8%</div>
          <div className="stat-change"><TrendingUp size={12} /> +0.6% vs benchmark</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-accent" style={{ background: '#bb8fce' }} />
          <div className="stat-label">REPEAT CUSTOMERS</div>
          <div className="stat-value">34%</div>
          <div className="stat-change"><TrendingUp size={12} /> High loyalty rate</div>
        </div>
      </div>

      {/* Sales Trend Visualizer */}
      <div className="chart-card mb-xl">
        <h3 className="chart-title">MONTHLY SALES PERFORMANCE (IN INR)</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 200, paddingTop: 40, borderBottom: '1px solid var(--gray-border)', paddingBottom: 10 }}>
          {[
            { month: 'Oct', val: 65000 },
            { month: 'Nov', val: 82000 },
            { month: 'Dec', val: 110000 },
            { month: 'Jan', val: 125000 },
            { month: 'Feb', val: 138000 },
            { month: 'Mar', val: 148590 },
          ].map(m => {
            const h = (m.val / 150000) * 100;
            return (
              <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'var(--font-label)', marginBottom: 6, fontWeight: 700 }}>₹{(m.val / 1000).toFixed(0)}k</div>
                <div style={{ width: '100%', maxWidth: 48, height: `${h}%`, background: 'var(--grad-gold)', borderRadius: '4px 4px 0 0', transition: 'height 0.5s' }} />
                <div style={{ fontSize: 12, color: 'var(--gray-text)', marginTop: 8, fontFamily: 'var(--font-label)' }}>{m.month}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
