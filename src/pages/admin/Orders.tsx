import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../../services/DataService';
import type { Order, OrderStatus } from '../../types';
import { useApp } from '../../context/AppContext';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { showToast } = useApp();

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    updateOrderStatus(orderId, newStatus);
    setOrders(getOrders());
    showToast('success', `Order #${orderId} status updated to ${newStatus.toUpperCase()}`);
  }

  const filtered = orders.filter(o => {
    const matchesQuery =
      o.id.toLowerCase().includes(query.toLowerCase()) ||
      o.customerName.toLowerCase().includes(query.toLowerCase()) ||
      o.customerPhone.includes(query);
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div>
      <div className="flex-between mb-xl">
        <div>
          <div className="section-label">Fulfillment</div>
          <h1 className="heading-lg">ORDER MANAGEMENT ({orders.length})</h1>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-xs)', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--gray-border)', paddingBottom: 'var(--space-xs)' }}>
        {['all', 'pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'].map(tab => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`btn btn-sm ${statusFilter === tab ? 'btn-primary' : 'btn-ghost'}`}
            style={{ textTransform: 'uppercase', fontSize: 12 }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search by Order ID (#RXP...), Customer Name or Phone..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: 40 }}
          />
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-text)' }} />
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id}>
                <td style={{ fontFamily: 'var(--font-label)', fontWeight: 700, color: 'var(--gold)' }}>#{o.id}</td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--white)' }}>{o.customerName}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-text)' }}>{o.customerPhone}</div>
                </td>
                <td style={{ fontSize: 13 }}>
                  {o.items.length} item(s)
                  <div style={{ fontSize: 11, color: 'var(--gray-text)' }} className="truncate">
                    {o.items.map(i => i.productName).join(', ').substring(0, 24)}...
                  </div>
                </td>
                <td style={{ fontFamily: 'var(--font-label)', fontWeight: 700 }}>₹{o.total.toLocaleString('en-IN')}</td>
                <td>
                  <span style={{ fontSize: 11, textTransform: 'uppercase', color: o.paymentStatus === 'paid' ? 'var(--green)' : 'var(--orange)' }}>
                    {o.paymentMethod} ({o.paymentStatus})
                  </span>
                </td>
                <td style={{ fontSize: 12, color: 'var(--gray-text)' }}>
                  {new Date(o.createdAt).toLocaleDateString('en-IN')}
                </td>
                <td>
                  <span className={`status-badge status-${o.status}`}>{o.status}</span>
                </td>
                <td>
                  <select
                    value={o.status}
                    onChange={e => handleStatusChange(o.id, e.target.value as OrderStatus)}
                    className="form-select"
                    style={{ padding: '4px 8px', fontSize: 12, width: 'auto' }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <Link to={`/admin/orders/${o.id}`} className="btn btn-ghost btn-sm" style={{ padding: '4px 10px', fontSize: 11 }}>
                    <Eye size={14} /> View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
