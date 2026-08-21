import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ArrowRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getProductById, saveOrder, generateOrderId } from '../../services/DataService';
import { simulatePayment } from '../../services/PaymentService';
import type { Order, OrderItem } from '../../types';

export default function Checkout() {
  const { state, cartTotal, clearCart, showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const passedCoupon = (location.state as any)?.coupon;

  const [formData, setFormData] = useState({
    name: 'Rahul Patel',
    phone: '+91 93277 08205',
    email: 'rahul.patel@gmail.com',
    line1: '12 Shiv Nagar Society, Station Road',
    area: 'Kosamba',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '394120',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [modalTab, setModalTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [txnId, setTxnId] = useState('');

  const cartItemsWithDetails = state.cart.map(item => {
    const product = getProductById(item.productId);
    return { ...item, product };
  }).filter(i => i.product !== null);

  const subtotal = cartTotal;
  const couponDiscount = passedCoupon ? passedCoupon.discount : 0;
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - couponDiscount + shipping);

  if (cartItemsWithDetails.length === 0) {
    navigate('/cart');
    return null;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function createOrderObject(payStatus: 'pending' | 'paid', transactionId?: string): Order {
    const orderItems: OrderItem[] = cartItemsWithDetails.map(item => ({
      productId: item.productId,
      productName: item.product!.name,
      productImage: item.product!.images[0],
      brand: item.product!.brand,
      flavour: item.flavour,
      weight: item.weight,
      quantity: item.quantity,
      price: item.price,
      mrp: item.product!.mrp,
    }));

    const newId = generateOrderId();

    return {
      id: newId,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      address: {
        line1: formData.line1,
        area: formData.area,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      items: orderItems,
      subtotal,
      discount: cartItemsWithDetails.reduce((acc, i) => acc + (i.product!.mrp - i.product!.price) * i.quantity, 0),
      couponDiscount,
      couponCode: passedCoupon?.code,
      shipping,
      total,
      paymentMethod,
      paymentStatus: payStatus,
      transactionId,
      status: 'pending',
      statusHistory: [{ status: 'pending', timestamp: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.line1 || !formData.city || !formData.pincode) {
      showToast('error', 'Please fill in all required shipping fields');
      return;
    }

    if (paymentMethod === 'online') {
      setShowPaymentModal(true);
      setPaymentStatus('idle');
    } else {
      // COD Order
      setIsProcessing(true);
      const order = createOrderObject('pending');
      saveOrder(order);
      clearCart();
      showToast('success', 'Order placed successfully!');
      navigate(`/order-success/${order.id}`);
    }
  }

  async function executeSimulatedPayment() {
    setPaymentStatus('processing');
    const res = await simulatePayment({
      amount: total,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      orderId: 'DEMO-' + Date.now(),
    });

    if (res.success && res.transactionId) {
      setTxnId(res.transactionId);
      setPaymentStatus('success');
      setTimeout(() => {
        const order = createOrderObject('paid', res.transactionId);
        saveOrder(order);
        clearCart();
        setShowPaymentModal(false);
        showToast('success', 'Payment successful & Order placed!');
        navigate(`/order-success/${order.id}`);
      }, 1200);
    } else {
      setPaymentStatus('failed');
      showToast('error', res.error || 'Payment failed');
    }
  }

  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="section-label">Final Step</div>
          <h1 className="heading-lg">CHECKOUT</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="checkout-layout">
          {/* Shipping & Payment Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {/* Contact Info */}
            <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
              <h3 className="heading-sm mb-lg" style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 8 }}>
                1. CONTACT INFORMATION
              </h3>
              <div className="form-grid-2">
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="form-input" />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
              <h3 className="heading-sm mb-lg" style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 8 }}>
                2. DELIVERY ADDRESS
              </h3>
              <div className="form-grid-2">
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Flat, House No., Building, Street *</label>
                  <input type="text" name="line1" required value={formData.line1} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Area / Landmark</label>
                  <input type="text" name="area" value={formData.area} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input type="text" name="state" required value={formData.state} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Pincode *</label>
                  <input type="text" name="pincode" required value={formData.pincode} onChange={handleInputChange} className="form-input" />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
              <h3 className="heading-sm mb-lg" style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 8 }}>
                3. SELECT PAYMENT METHOD
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <label className={`payment-option ${paymentMethod === 'online' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
                  <CreditCard size={24} color="var(--gold)" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--white)' }}>Online Payment (UPI / Cards / NetBanking)</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-text)' }}>Instant confirmation. Razorpay Demo Gateway.</div>
                  </div>
                  <span className="badge badge-gold">RECOMMENDED</span>
                </label>

                <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                  <Truck size={24} color="var(--gold)" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--white)' }}>Cash on Delivery (COD)</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-text)' }}>Pay cash when your supplements arrive.</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Panel */}
          <div className="cart-summary">
            <h3 className="heading-sm mb-lg" style={{ color: 'var(--white)', borderBottom: '1px solid var(--gray-border)', paddingBottom: 'var(--space-sm)' }}>
              YOUR ORDER ({cartItemsWithDetails.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 'var(--space-lg)', maxHeight: 240, overflowY: 'auto' }}>
              {cartItemsWithDetails.map(item => (
                <div key={`${item.productId}-${item.flavour}`} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <img src={item.product!.images[0]} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                  <div style={{ flex: 1, fontSize: 13 }}>
                    <div style={{ color: 'var(--white)', fontWeight: 500 }} className="truncate">{item.product!.name}</div>
                    <div style={{ color: 'var(--gray-text)', fontSize: 11 }}>Qty: {item.quantity} | {item.flavour}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-label)', color: 'var(--gold)', fontWeight: 700 }}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary-row">
              <span>Items Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="cart-summary-row" style={{ color: 'var(--green)' }}>
                <span>Coupon Discount ({passedCoupon?.code})</span>
                <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="cart-summary-row">
              <span>Shipping Charge</span>
              <span>{shipping === 0 ? <strong style={{ color: 'var(--green)' }}>FREE</strong> : `₹${shipping}`}</span>
            </div>

            <div className="cart-summary-row cart-summary-total">
              <span>Total Payable</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button type="submit" disabled={isProcessing} className="btn btn-primary btn-lg btn-full mt-lg">
              {paymentMethod === 'online' ? 'Proceed to Pay' : 'Place COD Order'} <ArrowRight size={18} />
            </button>

            <div style={{ marginTop: 'var(--space-md)', textAlign: 'center', fontSize: 12, color: 'var(--gray-text)' }}>
              🔒 100% Encrypted & Safe Checkout
            </div>
          </div>
        </form>
      </div>

      {/* Razorpay Demo Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="flex-between mb-lg">
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--gold)' }}>RAZORPAY DEMO</div>
                <div style={{ fontSize: 12, color: 'var(--gray-text)' }}>Simulated Test Gateway</div>
              </div>
              <button onClick={() => setShowPaymentModal(false)} style={{ color: 'var(--gray-text)' }}><X size={20} /></button>
            </div>

            <div style={{ background: 'var(--black-deep)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--gray-text)' }}>Amount to Pay</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 36, color: 'var(--white)' }}>₹{total.toLocaleString('en-IN')}</div>
            </div>

            {paymentStatus === 'idle' && (
              <>
                <div className="payment-tabs">
                  <div className={`payment-tab ${modalTab === 'upi' ? 'active' : ''}`} onClick={() => setModalTab('upi')}>UPI / GPay</div>
                  <div className={`payment-tab ${modalTab === 'card' ? 'active' : ''}`} onClick={() => setModalTab('card')}>Card</div>
                  <div className={`payment-tab ${modalTab === 'netbanking' ? 'active' : ''}`} onClick={() => setModalTab('netbanking')}>Net Banking</div>
                </div>

                {modalTab === 'upi' && (
                  <div className="form-group mb-lg">
                    <label className="form-label">UPI ID (Demo)</label>
                    <input type="text" defaultValue="success@razorpay" className="form-input" />
                  </div>
                )}
                {modalTab === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                    <input type="text" defaultValue="4111 1111 1111 1111" className="form-input" placeholder="Card Number" />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input type="text" defaultValue="12/28" className="form-input" placeholder="MM/YY" />
                      <input type="password" defaultValue="123" className="form-input" placeholder="CVV" />
                    </div>
                  </div>
                )}
                {modalTab === 'netbanking' && (
                  <div className="form-group mb-lg">
                    <label className="form-label">Select Bank</label>
                    <select className="form-select">
                      <option>HDFC Bank</option>
                      <option>State Bank of India</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}

                <button onClick={executeSimulatedPayment} className="btn btn-primary btn-full btn-lg">
                  PAY NOW ₹{total.toLocaleString('en-IN')}
                </button>
              </>
            )}

            {paymentStatus === 'processing' && (
              <div className="payment-processing">
                <div className="spinner" />
                <div style={{ fontWeight: 600, color: 'var(--white)' }}>Processing Secure Payment...</div>
                <div style={{ fontSize: 12, color: 'var(--gray-text)' }}>Connecting to bank gateway demo</div>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="payment-success">
                <div className="success-icon">✓</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: 'var(--green)' }}>PAYMENT SUCCESSFUL!</div>
                <div style={{ fontSize: 13, color: 'var(--gray-text)' }}>Transaction ID: {txnId}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
