import { useState, useEffect } from 'react';
import { Search, Phone, Mail, ShoppingBag } from 'lucide-react';
import { getCustomers } from '../../services/DataService';
import type { Customer } from '../../types';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setCustomers(getCustomers());
  }, []);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.phone.includes(query) ||
    c.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex-between mb-xl">
        <div>
          <div className="section-label">User Base</div>
          <h1 className="heading-lg">CUSTOMER DIRECTORY ({customers.length})</h1>
        </div>
      </div>

      <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search by Customer Name, Phone Number or Email..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: 40 }}
          />
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-text)' }} />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact Info</th>
              <th>Total Orders</th>
              <th>Total Spending</th>
              <th>Joined Date</th>
              <th>Last Order</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--charcoal)', border: '1px solid var(--gray-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--gold)' }}>
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--white)' }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-text)' }}>ID: {c.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Phone size={12} color="var(--gold)" /> {c.phone}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--gray-text)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Mail size={12} /> {c.email}
                  </div>
                </td>
                <td>
                  <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <ShoppingBag size={12} /> {c.orders.length} orders
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-label)', fontWeight: 700, color: 'var(--gold)', fontSize: 16 }}>
                  ₹{c.totalSpending.toLocaleString('en-IN')}
                </td>
                <td style={{ fontSize: 12, color: 'var(--gray-text)' }}>
                  {new Date(c.createdAt).toLocaleDateString('en-IN')}
                </td>
                <td style={{ fontSize: 12, color: 'var(--gray-text)' }}>
                  {c.lastOrderAt ? new Date(c.lastOrderAt).toLocaleDateString('en-IN') : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
