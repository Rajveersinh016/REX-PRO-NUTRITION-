import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { getProductById, getProducts, getReviews } from '../../services/DataService';
import { useApp } from '../../context/AppContext';
import type { Product, Review } from '../../types';
import ProductCard from '../../components/common/ProductCard';

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => <Star key={i} size={size} fill={i <= Math.round(rating) ? 'currentColor' : 'none'} />)}
    </div>
  );
}

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      <div className={`accordion-body ${open ? 'open' : ''}`}>{children}</div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, showToast, state } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedFlavour, setSelectedFlavour] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!id) return;
    const p = getProductById(id);
    if (!p) { navigate('/shop'); return; }
    setProduct(p);
    setSelectedFlavour(p.flavours[0] || '');
    setSelectedWeight(p.weights[0] || '');
    const allProducts = getProducts();
    setRelated(allProducts.filter(ap => ap.category === p.category && ap.id !== id).slice(0, 4));
    setReviews(getReviews().filter(r => r.productId === id));
    setSelectedImg(0);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return (
    <div style={{ minHeight: '100vh', paddingTop: 'calc(var(--nav-height) + 40px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner" />
    </div>
  );

  const isWished = state.wishlist.includes(product.id);
  const inStock = product.stock > 0;

  async function handleAddToCart() {
    if (!product || !inStock) return;
    setAdding(true);
    await new Promise(r => setTimeout(r, 400));
    addToCart(product, qty, selectedFlavour, selectedWeight);
    showToast('success', `${product.name} added to cart!`);
    setAdding(false);
  }

  function handleBuyNow() {
    if (!product || !inStock) return;
    addToCart(product, qty, selectedFlavour, selectedWeight);
    navigate('/checkout');
  }

  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-xl)', fontSize: 13, color: 'var(--gray-text)' }}>
          <Link to="/" style={{ color: 'var(--gray-text)', transition: 'color 0.2s' }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: 'var(--gray-text)' }}>Shop</Link>
          <span>/</span>
          <Link to={`/category/${product.category.toLowerCase().replace(' ', '-')}`} style={{ color: 'var(--gray-text)' }}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: 'var(--white-muted)' }}>{product.name}</span>
        </div>

        <div className="product-detail-layout">
          {/* Gallery */}
          <div className="product-gallery">
            <div style={{ position: 'relative' }}>
              <img src={product.images[selectedImg] || product.images[0]} alt={product.name} className="product-main-img" />
              {product.badge && (
                <div style={{ position: 'absolute', top: 16, left: 16 }}>
                  <span className={`badge ${product.badge === 'BEST SELLER' ? 'badge-gold' : product.badge === 'NEW' ? 'badge-green' : 'badge-orange'}`}>{product.badge}</span>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="product-thumbs">
                {product.images.map((img, i) => (
                  <img key={i} src={img} alt="" className={`product-thumb ${selectedImg === i ? 'active' : ''}`} onClick={() => setSelectedImg(i)} loading="lazy" />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-info">
            <div>
              <div style={{ fontSize: 12, color: 'var(--gold)', fontFamily: 'var(--font-label)', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>{product.brand}</div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, lineHeight: 1.1, marginBottom: 'var(--space-md)' }}>{product.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                <Stars rating={product.rating} />
                <span style={{ fontFamily: 'var(--font-label)', fontWeight: 700 }}>{product.rating}</span>
                <span style={{ color: 'var(--gray-text)', fontSize: 13 }}>({product.reviewCount} reviews)</span>
                <span style={{ color: 'var(--gray-text)' }}>·</span>
                <span style={{ color: inStock ? 'var(--green)' : 'var(--red)', fontFamily: 'var(--font-label)', fontSize: 13, fontWeight: 600 }}>
                  {product.stock === 0 ? '✗ Out of Stock' : product.stock <= 5 ? `⚠️ Only ${product.stock} left` : '✓ In Stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div style={{ background: 'var(--charcoal)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)', border: '1px solid var(--gray-border)' }}>
              <div className="price-group">
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 42, color: 'var(--gold)' }}>₹{product.price.toLocaleString('en-IN')}</span>
                {product.mrp > product.price && <span style={{ fontSize: 20, color: 'var(--gray-text)', textDecoration: 'line-through' }}>₹{product.mrp.toLocaleString('en-IN')}</span>}
              </div>
              {product.discount > 0 && <div style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', background: 'rgba(39,174,96,0.15)', border: '1px solid rgba(39,174,96,0.3)', borderRadius: 'var(--radius-full)', color: 'var(--green)', fontFamily: 'var(--font-label)', fontWeight: 700, fontSize: 14, marginTop: 8 }}>
                You save ₹{(product.mrp - product.price).toLocaleString('en-IN')} ({product.discount}% OFF)
              </div>}
              <p style={{ fontSize: 12, color: 'var(--gray-text)', marginTop: 8 }}>Inclusive of all taxes. Free shipping on orders above ₹999.</p>
            </div>

            {/* Flavour */}
            {product.flavours.length > 0 && (
              <div>
                <div style={{ fontFamily: 'var(--font-label)', fontSize: 13, fontWeight: 600, marginBottom: 'var(--space-sm)', textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--white-muted)' }}>
                  Flavour: <span style={{ color: 'var(--gold)' }}>{selectedFlavour}</span>
                </div>
                <div className="variant-selector">
                  {product.flavours.map(f => (
                    <button key={f} className={`variant-chip ${selectedFlavour === f ? 'selected' : ''}`} onClick={() => setSelectedFlavour(f)}>{f}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Weight */}
            {product.weights.length > 0 && (
              <div>
                <div style={{ fontFamily: 'var(--font-label)', fontSize: 13, fontWeight: 600, marginBottom: 'var(--space-sm)', textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--white-muted)' }}>
                  Size: <span style={{ color: 'var(--gold)' }}>{selectedWeight}</span>
                </div>
                <div className="variant-selector">
                  {product.weights.map(w => (
                    <button key={w} className={`variant-chip ${selectedWeight === w ? 'selected' : ''}`} onClick={() => setSelectedWeight(w)}>{w}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <div style={{ fontFamily: 'var(--font-label)', fontSize: 13, fontWeight: 600, marginBottom: 'var(--space-sm)', textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--white-muted)' }}>Quantity</div>
              <div className="qty-selector">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-num">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="product-actions">
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart} disabled={!inStock || adding} style={{ flex: 1 }}>
                {adding ? <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : <><ShoppingCart size={18} /> Add to Cart</>}
              </button>
              <button className="btn btn-outline btn-lg" onClick={handleBuyNow} disabled={!inStock} style={{ flex: 1 }}>
                Buy Now
              </button>
            </div>

            {/* Wishlist + Share */}
            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <button className={`btn btn-ghost btn-sm`} onClick={() => { toggleWishlist(product.id); showToast('info', isWished ? 'Removed from wishlist' : 'Added to wishlist'); }}>
                <Heart size={14} fill={isWished ? 'currentColor' : 'none'} color={isWished ? 'var(--red)' : undefined} />
                {isWished ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <a href={`https://wa.me/919327708205?text=Hi%20Rex-Pro%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                <Share2 size={14} /> Ask on WhatsApp
              </a>
            </div>

            {/* Delivery badges */}
            <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
              {[
                { icon: <Shield size={14} />, text: '100% Authentic' },
                { icon: <Truck size={14} />, text: 'Free Delivery ₹999+' },
                { icon: <RotateCcw size={14} />, text: 'Easy Returns' },
              ].map(b => (
                <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'var(--charcoal)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-full)', fontSize: 12, color: 'var(--white-muted)' }}>
                  <span style={{ color: 'var(--gold)' }}>{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="accordion mt-md">
              <AccordionItem title="Product Description">
                <p>{product.description}</p>
              </AccordionItem>
              <AccordionItem title="Key Benefits">
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {product.benefits.map((b, i) => (
                    <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
              <AccordionItem title="Ingredients">
                <p>{product.ingredients}</p>
              </AccordionItem>
              <AccordionItem title="How to Use">
                <p>{product.howToUse}</p>
              </AccordionItem>
              <AccordionItem title="Authenticity & Shipping">
                <p>All products sold by Rex-Pro Nutrition are 100% authentic and sourced directly from authorized distributors. Every product comes with a QR verification code.</p>
                <p style={{ marginTop: 8 }}>Orders are shipped within 1-2 business days. Expected delivery: 3-5 business days across India. Free shipping on orders above ₹999.</p>
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="heading-md" style={{ marginBottom: 'var(--space-xl)' }}>CUSTOMER REVIEWS</h2>
            <div className="review-grid">
              {reviews.map(r => (
                <div key={r.id} className="review-card">
                  <div className="stars" style={{ marginBottom: 'var(--space-sm)' }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= r.rating ? 'currentColor' : 'none'} />)}
                  </div>
                  <div style={{ fontFamily: 'var(--font-label)', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>{r.title}</div>
                  <div className="review-body">{r.body}</div>
                  <div className="review-author">— {r.customerName}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}>
            <h2 className="heading-md" style={{ marginBottom: 'var(--space-xl)' }}>RELATED PRODUCTS</h2>
            <div className="grid-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile CTA */}
      <div style={{ position: 'fixed', bottom: 60, left: 0, right: 0, padding: '12px 16px', background: 'rgba(8,8,8,0.97)', borderTop: '1px solid var(--gray-border)', backdropFilter: 'blur(20px)', display: 'none', gap: 12, zIndex: 100 }} className="mobile-sticky-cta">
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: 'var(--gold)' }}>₹{product.price.toLocaleString('en-IN')}</div>
        </div>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAddToCart} disabled={!inStock}>
          <ShoppingCart size={16} /> Add to Cart
        </button>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={handleBuyNow} disabled={!inStock}>
          Buy Now
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-sticky-cta { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
