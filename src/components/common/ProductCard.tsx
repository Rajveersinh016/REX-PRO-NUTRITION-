import { useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

const BADGE_COLORS: Record<string, string> = {
  'BEST SELLER': 'badge-gold',
  'NEW': 'badge-green',
  'HOT': 'badge-red',
  'LIMITED STOCK': 'badge-orange',
  'SALE': 'badge-orange',
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} fill={i <= Math.round(rating) ? 'currentColor' : 'none'} />
      ))}
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, showToast, state } = useApp();
  const isWished = state.wishlist.includes(product.id);

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    if (product.stock === 0) { showToast('error', 'This product is out of stock'); return; }
    addToCart(product, 1, product.flavours[0], product.weights[0]);
    showToast('success', `${product.name} added to cart!`);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast('info', isWished ? 'Removed from wishlist' : 'Added to wishlist');
  }

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      {/* Badge */}
      {product.badge && (
        <div className="product-card-badge">
          <span className={`badge ${BADGE_COLORS[product.badge] || 'badge-gray'}`}>{product.badge}</span>
        </div>
      )}

      {/* Wishlist */}
      <button
        className={`product-card-wish ${isWished ? 'active' : ''}`}
        onClick={handleWishlist}
        aria-label="Wishlist"
      >
        <Heart size={14} fill={isWished ? 'currentColor' : 'none'} />
      </button>

      {/* Image */}
      <div className="product-card-img-wrapper">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />
        {product.stock === 0 && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="badge badge-gray">OUT OF STOCK</span>
          </div>
        )}
        {product.stock > 0 && product.stock <= 5 && (
          <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
            <span className="badge badge-orange">LOW STOCK</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="product-card-body">
        <div className="product-card-brand">{product.brand}</div>
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-rating">
          <Stars rating={product.rating} />
          <span>{product.rating}</span>
          <span style={{ fontSize: 11 }}>({product.reviewCount})</span>
        </div>
        {product.flavours.length > 1 && (
          <div className="product-card-flavours">
            {product.flavours.slice(0, 3).map(f => (
              <span key={f} className="flavour-chip">{f}</span>
            ))}
            {product.flavours.length > 3 && (
              <span className="flavour-chip">+{product.flavours.length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="product-card-footer">
        <div>
          <div className="price-group">
            <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
            {product.mrp > product.price && (
              <span className="price-mrp">₹{product.mrp.toLocaleString('en-IN')}</span>
            )}
          </div>
          {product.discount > 0 && (
            <span className="price-discount">{product.discount}% OFF</span>
          )}
        </div>
        <button
          className="product-card-add"
          onClick={handleAddToCart}
          aria-label="Add to cart"
          disabled={product.stock === 0}
        >
          <ShoppingCart size={16} />
        </button>
      </div>
    </div>
  );
}

export { Stars };
