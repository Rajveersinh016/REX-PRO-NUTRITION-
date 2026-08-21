import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingBag, Package, Users, Clock, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';
import { getDashboardStats } from '../../services/DataService';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  if (!stats) return <div className="spinner" />;

  const statCards = [
    { label: 'TOTAL SALES', value: `₹${stats.totalSales.toLocaleString('en-IN')}`, icon: <DollarSign size={20} color="var(--gold)" />, change: '+18% this month', color: 'var(--gold)' },
    { label: 'TOTAL ORDERS', value: stats.totalOrders, icon: <ShoppingBag size={20} color="#5dade2" />, change: '+12% from last week', color: '#5dade2' },
    { label: 'PRODUCTS', value: stats.totalProducts, icon: <Package size={20} color="var(--green)" />, change: 'Active in catalog', color: 'var(--green)' },
    { label: 'CUSTOMERS', value: stats.totalCustomers, icon: <Users size={20} color="#bb8fce" />, change: '+5 new today', color: '#bb8fce' },
    { label: 'PENDING ORDERS', value: stats.pendingOrders, icon: <Clock size={20} color="var(--orange)" />, change: 'Needs processing', color: 'var(--orange)' },
  ];

  return (
    <div>
      <div className="flex-between mb-xl">
        <div>
          <div className="section-label">Overview</div>
          <h1 className="heading-lg">ADMIN DASHBOARD</h1>
        </div>
        <Link to="/admin/products/add" className="btn btn-primary btn-sm">
          + Add New Product
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid-4 mb-xl" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {statCards.map((card, i) => (
          <div key={i} className="stat-card">
            <div className="stat-card-accent" style={{ background: card.color }} />
            <div className="flex-between mb-sm">
              <span className="stat-label">{card.label}</span>
              {card.icon}
            </div>
            <div className="stat-value">{card.value}</div>
            <div className="stat-change">
              <TrendingUp size={12} /> {card.change}
            </div>
          </div>
        ))}
      </div>

      {/* Low Stock Warning Box */}
      {stats.lowStock.length > 0 && (
        <div style={{ background: 'rgba(230, 126, 34, 0.1)', border: '1px solid rgba(230, 126, 34, 0.3)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)', marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <AlertTriangle color="var(--orange)" size={24} />
            <div>
              <div style={{ color: 'var(--orange)', fontWeight: 600, fontFamily: 'var(--font-label)' }}>LOW STOCK ALERT</div>
              <div style={{ fontSize: 13, color: 'var(--white-muted)' }}>
                {stats.lowStock.length} product(s) have fewer than 5 units remaining ({stats.lowStock.map((p: any) => p.name).join(', ')})
              </div>
            </div>
          </div>
          <Link to="/admin/products" className="btn btn-outline btn-sm">Manage Inventory</Link>
        </div>
      )}

      {/* Recent Orders & Quick Overview */}
      <div className="grid-2" style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'start' }}>
        {/* Recent Orders Table */}
        <div className="table-wrapper">
          <div className="flex-between" style={{ padding: 'var(--space-lg)', borderBottom: '1px solid var(--gray-border)' }}>
            <h3 className="heading-sm">RECENT ORDERS</h3>
            <Link to="/admin/orders" style={{ fontSize: 12, color: 'var(--gold)', fontFamily: 'var(--font-label)' }}>View All Orders →</Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order: any) => (
                <tr key={order.id}>
                  <td style={{ fontFamily: 'var(--font-label)', fontWeight: 700, color: 'var(--gold)' }}>#{order.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-text)' }}>{order.customerPhone}</div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-label)', fontWeight: 700 }}>₹{order.total.toLocaleString('en-IN')}</td>
                  <td>
                    <span style={{ fontSize: 11, textTransform: 'uppercase', color: order.paymentStatus === 'paid' ? 'var(--green)' : 'var(--orange)' }}>
                      {order.paymentMethod} ({order.paymentStatus})
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>{order.status}</span>
                  </td>
                  <td>
                    <Link to={`/admin/orders/${order.id}`} className="btn btn-ghost btn-sm" style={{ padding: '4px 10px', fontSize: 11 }}>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sales Chart Mock / Summary */}
        <div className="chart-card">
          <h3 className="chart-title">SALES BY CATEGORY</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { cat: 'Whey Protein', share: 45, color: 'var(--gold)' },
              { cat: 'Creatine', share: 22, color: '#5dade2' },
              { cat: 'Mass Gainer', share: 15, color: '#bb8fce' },
              { cat: 'Pre-Workout', share: 12, color: 'var(--green)' },
              { cat: 'Vitamins', share: 6, color: 'var(--orange)' },
            ].map(item => (
              <div key={item.cat}>
                <div className="flex-between" style={{ fontSize: 13, marginBottom: 4 }}>
                  <span>{item.cat}</span>
                  <span style={{ fontWeight: 700, color: item.color }}>{item.share}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--charcoal)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.share}%`, background: item.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--gray-border)', textAlign: 'center' }}>
            <Link to="/admin/analytics" className="btn btn-outline btn-full btn-sm">
              Full Analytics Report <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
