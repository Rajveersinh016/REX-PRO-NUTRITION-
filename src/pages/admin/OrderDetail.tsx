import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, CreditCard, Phone, Mail } from 'lucide-react';
import { getOrderById, updateOrderStatus } from '../../services/DataService';
import type { Order, OrderStatus } from '../../types';
import { useApp } from '../../context/AppContext';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      const o = getOrderById(id);
      setOrder(o);
    }
  }, [id]);

  if (!order) return <div className="spinner" />;

  function handleStatusChange(newStatus: OrderStatus) {
    if (!id) return;
    updateOrderStatus(id, newStatus);
    setOrder(getOrderById(id));
    showToast('success', `Order status updated to ${newStatus.toUpperCase()}`);
  }

  const steps: OrderStatus[] = ['pending', 'confirmed', 'packed', 'shipped', 'delivered'];

  return (
    <div style={{ maxWidth: 1000 }}>
      <div className="flex-between mb-xl">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/admin/orders')} className="btn btn-ghost btn-sm">
            <ArrowLeft size={16} /> Back to Orders
          </button>
          <h1 className="heading-lg">ORDER #{order.id}</h1>
          <span className={`status-badge status-${order.status}`}>{order.status}</span>
        </div>

        {/* Change Status Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--gray-text)' }}>Update Status:</span>
          <select
            value={order.status}
            onChange={e => handleStatusChange(e.target.value as OrderStatus)}
            className="form-select"
            style={{ width: 'auto', padding: '8px 16px', fontSize: 13 }}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="packed">Packed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Status Progress Timeline */}
      <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
        <h3 className="heading-sm mb-lg" style={{ color: 'var(--gold)' }}>ORDER FULFILLMENT TIMELINE</h3>
        <div className="order-status-timeline">
          {steps.map((step, idx) => {
            const currentIdx = steps.indexOf(order.status as OrderStatus);
            const isCompleted = currentIdx >= idx && order.status !== 'cancelled';
            const isActive = currentIdx === idx && order.status !== 'cancelled';
            return (
              <div key={step} className={`timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                <div className="timeline-dot">{isCompleted ? '✓' : idx + 1}</div>
                <div className="timeline-label" style={{ textTransform: 'uppercase' }}>{step}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid-2 mb-xl" style={{ alignItems: 'start' }}>
        {/* Customer & Address */}
        <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h3 className="heading-sm mb-lg" style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <User size={18} /> CUSTOMER DETAILS
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--gray-text)' }}>Name</div>
              <div style={{ fontWeight: 600, color: 'var(--white)' }}>{order.customerName}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--gray-text)' }}>Phone Number</div>
              <a href={`tel:${order.customerPhone}`} style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Phone size={14} /> {order.customerPhone}
              </a>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--gray-text)' }}>Email</div>
              <div style={{ color: 'var(--white-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Mail size={14} /> {order.customerEmail}
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--gray-border)', paddingTop: 12, marginTop: 4 }}>
              <div style={{ fontSize: 11, color: 'var(--gray-text)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <MapPin size={14} color="var(--gold)" /> Shipping Address
              </div>
              <div style={{ color: 'var(--white-muted)', lineHeight: 1.5 }}>
                {order.address.line1}, {order.address.area}<br />
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Order Summary */}
        <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h3 className="heading-sm mb-lg" style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <CreditCard size={18} /> PAYMENT INFORMATION
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
            <div className="flex-between">
              <span style={{ color: 'var(--gray-text)' }}>Payment Method</span>
              <strong style={{ textTransform: 'uppercase' }}>{order.paymentMethod}</strong>
            </div>
            <div className="flex-between">
              <span style={{ color: 'var(--gray-text)' }}>Payment Status</span>
              <strong style={{ color: order.paymentStatus === 'paid' ? 'var(--green)' : 'var(--orange)' }}>{order.paymentStatus.toUpperCase()}</strong>
            </div>
            {order.transactionId && (
              <div className="flex-between">
                <span style={{ color: 'var(--gray-text)' }}>Transaction ID</span>
                <span style={{ fontFamily: 'var(--font-label)', color: 'var(--gold)' }}>{order.transactionId}</span>
              </div>
            )}
            <div className="flex-between">
              <span style={{ color: 'var(--gray-text)' }}>Date Placed</span>
              <span>{new Date(order.createdAt).toLocaleString('en-IN')}</span>
            </div>

            <div style={{ borderTop: '1px solid var(--gray-border)', paddingTop: 12, marginTop: 4 }}>
              <div className="flex-between" style={{ marginBottom: 4 }}>
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order.couponDiscount > 0 && (
                <div className="flex-between" style={{ color: 'var(--green)', marginBottom: 4 }}>
                  <span>Coupon Discount</span>
                  <span>-₹{order.couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex-between" style={{ marginBottom: 8 }}>
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
              </div>
              <div className="flex-between" style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--gold)', borderTop: '1px solid var(--gray-border)', paddingTop: 8 }}>
                <span>Total</span>
                <span>₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ordered Items Table */}
      <div className="table-wrapper">
        <div style={{ padding: 'var(--space-lg)', borderBottom: '1px solid var(--gray-border)' }}>
          <h3 className="heading-sm">ORDERED ITEMS ({order.items.length})</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Variant</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i}>
                <td>
                  <img src={item.productImage} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--white)' }}>{item.productName}</div>
                  <div style={{ fontSize: 11, color: 'var(--gold)' }}>{item.brand}</div>
                </td>
                <td style={{ fontSize: 13, color: 'var(--white-muted)' }}>
                  {item.flavour} / {item.weight}
                </td>
                <td style={{ fontFamily: 'var(--font-label)' }}>₹{item.price.toLocaleString('en-IN')}</td>
                <td style={{ fontWeight: 700 }}>{item.quantity}</td>
                <td style={{ fontFamily: 'var(--font-label)', fontWeight: 700, color: 'var(--gold)' }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
