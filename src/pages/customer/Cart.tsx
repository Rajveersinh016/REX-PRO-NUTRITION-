import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getProductById, validateCoupon, calculateCouponDiscount } from '../../services/DataService';

export default function Cart() {
  const { state, updateQuantity, removeFromCart, clearCart, cartTotal, showToast } = useApp();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  const cartItemsWithDetails = state.cart.map(item => {
    const product = getProductById(item.productId);
    return {
      ...item,
      product,
    };
  }).filter(item => item.product !== null);

  const subtotal = cartTotal;
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  function handleApplyCoupon(e: React.FormEvent) {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    const res = validateCoupon(couponCode, subtotal);
    if (!res.valid || !res.coupon) {
      setCouponError(res.error || 'Invalid coupon');
      showToast('error', res.error || 'Invalid coupon');
      return;
    }

    const discount = calculateCouponDiscount(res.coupon, subtotal);
    setAppliedCoupon({ code: res.coupon.code, discount });
    showToast('success', `Coupon ${res.coupon.code} applied! Saved ₹${discount}`);
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponCode('');
    showToast('info', 'Coupon removed');
  }

  if (cartItemsWithDetails.length === 0) {
    return (
      <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-3xl))', minHeight: '80vh' }}>
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">
              <ShoppingBag size={40} />
            </div>
            <h1 className="heading-md">YOUR CART IS EMPTY</h1>
            <p style={{ color: 'var(--gray-text)', maxWidth: 400 }}>
              Looks like you haven&apos;t added any supplements to your cart yet.
            </p>
            <Link to="/shop" className="btn btn-primary btn-lg mt-md">
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="section-label">Checkout Ready</div>
          <h1 className="heading-lg">SHOPPING CART ({state.cart.length})</h1>
        </div>

        <div className="cart-layout">
          {/* Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
              <span style={{ fontSize: 13, color: 'var(--gray-text)' }}>Selected Items</span>
              <button onClick={clearCart} style={{ color: 'var(--gray-text)', fontSize: 13, textDecoration: 'underline' }}>Clear All</button>
            </div>

            {cartItemsWithDetails.map(item => {
              const p = item.product!;
              return (
                <div key={`${item.productId}-${item.flavour}-${item.weight}`} className="cart-item">
                  <img src={p.images[0]} alt={p.name} className="cart-item-img" />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'var(--font-label)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{p.brand}</div>
                    <Link to={`/product/${p.id}`} style={{ fontWeight: 600, color: 'var(--white)', fontSize: 16, lineHeight: 1.3 }}>{p.name}</Link>
                    <div style={{ fontSize: 12, color: 'var(--gray-text)', display: 'flex', gap: 12 }}>
                      {item.flavour && <span>Flavour: <strong style={{ color: 'var(--white-muted)' }}>{item.flavour}</strong></span>}
                      {item.weight && <span>Weight: <strong style={{ color: 'var(--white-muted)' }}>{item.weight}</strong></span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                      <div className="qty-selector">
                        <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
                        <span className="qty-num">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-label)', fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                        {p.mrp > p.price && (
                          <div style={{ fontSize: 12, color: 'var(--gray-text)', textDecoration: 'line-through' }}>
                            ₹{(p.mrp * item.quantity).toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} style={{ color: 'var(--gray-text)', padding: 4 }} title="Remove item">
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}

            <div style={{ marginTop: 'var(--space-md)' }}>
              <Link to="/shop" className="btn btn-ghost btn-sm">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Cart Summary Side */}
          <div className="cart-summary">
            <h3 className="heading-sm mb-lg" style={{ color: 'var(--white)', borderBottom: '1px solid var(--gray-border)', paddingBottom: 'var(--space-sm)' }}>
              ORDER SUMMARY
            </h3>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="coupon-input">
              <input
                type="text"
                placeholder="Coupon code (e.g. REXPRO20)"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value.toUpperCase())}
                className="form-input"
                style={{ fontSize: 13, textTransform: 'uppercase' }}
                disabled={!!appliedCoupon}
              />
              {appliedCoupon ? (
                <button type="button" onClick={handleRemoveCoupon} className="btn btn-danger btn-sm">
                  Remove
                </button>
              ) : (
                <button type="submit" className="btn btn-outline btn-sm">
                  Apply
                </button>
              )}
            </form>
            {couponError && <div className="form-error mb-sm">{couponError}</div>}
            {appliedCoupon && (
              <div style={{ fontSize: 12, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 'var(--space-md)', background: 'rgba(39, 174, 96, 0.1)', padding: '6px 12px', borderRadius: 'var(--radius-sm)' }}>
                <Tag size={14} /> Coupon {appliedCoupon.code} applied (-₹{appliedCoupon.discount})
              </div>
            )}

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {appliedCoupon && (
              <div className="cart-summary-row" style={{ color: 'var(--green)' }}>
                <span>Discount ({appliedCoupon.code})</span>
                <span>-₹{appliedCoupon.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="cart-summary-row">
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? <strong style={{ color: 'var(--green)' }}>FREE</strong> : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <div style={{ fontSize: 11, color: 'var(--gold)', marginTop: -4, marginBottom: 8 }}>
                Add ₹{(1000 - subtotal).toLocaleString('en-IN')} more for FREE shipping!
              </div>
            )}

            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => navigate('/checkout', { state: { coupon: appliedCoupon } })}
              className="btn btn-primary btn-lg btn-full mt-lg"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div style={{ marginTop: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--gray-text)', justifyContent: 'center' }}>
              <ShieldCheck size={16} color="var(--gold)" />
              100% Authentic Products & Safe Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
