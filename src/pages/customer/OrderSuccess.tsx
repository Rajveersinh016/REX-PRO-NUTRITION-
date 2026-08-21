import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { getOrderById } from '../../services/DataService';
import type { Order } from '../../types';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      const o = getOrderById(id);
      setOrder(o);
    }
  }, [id]);

  if (!order) {
    return (
      <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-3xl))', textAlign: 'center' }}>
        <h1 className="heading-md">Order Loading...</h1>
      </div>
    );
  }

  return (
    <div className="page-enter order-success" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="order-success-card">
          <div style={{ display: 'inline-flex', padding: 16, borderRadius: '50%', background: 'rgba(39, 174, 96, 0.15)', color: 'var(--green)', marginBottom: 'var(--space-lg)' }}>
            <CheckCircle2 size={48} />
          </div>

          <div className="section-label" style={{ color: 'var(--green)' }}>CONFIRMED</div>
          <h1 className="heading-lg mb-sm">ORDER PLACED SUCCESSFULLY!</h1>
          <p style={{ color: 'var(--gray-text)', fontSize: 16, marginBottom: 'var(--space-xl)' }}>
            Thank you, <strong style={{ color: 'var(--white)' }}>{order.customerName}</strong>! Your demo order has been received.
          </p>

          <div style={{ background: 'var(--charcoal)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', textAlign: 'left', marginBottom: 'var(--space-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-border)', paddingBottom: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--gray-text)' }}>Order Number</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: 'var(--gold)' }}>#{order.id}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'var(--gray-text)' }}>Total Amount</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: 'var(--white)' }}>₹{order.total.toLocaleString('en-IN')}</div>
              </div>
            </div>

            {/* Timeline */}
            <div className="order-status-timeline" style={{ marginBottom: 'var(--space-xl)' }}>
              <div className="timeline-step completed">
                <div className="timeline-dot">✓</div>
                <div className="timeline-label">Order Placed</div>
              </div>
              <div className="timeline-step active">
                <div className="timeline-dot">2</div>
                <div className="timeline-label">Confirmed</div>
              </div>
              <div className="timeline-step">
                <div className="timeline-dot">3</div>
                <div className="timeline-label">Packed</div>
              </div>
              <div className="timeline-step">
                <div className="timeline-dot">4</div>
                <div className="timeline-label">Shipped</div>
              </div>
              <div className="timeline-step">
                <div className="timeline-dot">5</div>
                <div className="timeline-label">Delivered</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', fontSize: 14 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--gray-text)', marginBottom: 4 }}>Delivery Address</div>
                <div style={{ color: 'var(--white-muted)' }}>{order.address.line1}, {order.address.area}</div>
                <div style={{ color: 'var(--white-muted)' }}>{order.address.city}, {order.address.state} - {order.address.pincode}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--gray-text)', marginBottom: 4 }}>Payment Details</div>
                <div style={{ color: 'var(--white-muted)' }}>Method: <strong style={{ textTransform: 'uppercase' }}>{order.paymentMethod}</strong></div>
                <div style={{ color: 'var(--white-muted)' }}>Status: <strong style={{ color: order.paymentStatus === 'paid' ? 'var(--green)' : 'var(--orange)' }}>{order.paymentStatus.toUpperCase()}</strong></div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
            <Link to="/shop" className="btn btn-primary btn-lg">
              Continue Shopping <ArrowRight size={18} />
            </Link>
            <Link to="/admin/orders" className="btn btn-outline btn-lg">
              View in Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
