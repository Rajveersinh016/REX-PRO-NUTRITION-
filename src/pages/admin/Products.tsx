import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, Eye, Copy } from 'lucide-react';
import { getProducts, deleteProduct, saveProduct } from '../../services/DataService';
import type { Product } from '../../types';
import { useApp } from '../../context/AppContext';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const { showToast } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  function handleDelete(id: string, name: string) {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      setProducts(getProducts());
      showToast('info', `Product "${name}" deleted`);
    }
  }

  function handleDuplicate(product: Product) {
    const newProduct: Product = {
      ...product,
      id: `rxp-${Date.now()}`,
      name: `${product.name} (Copy)`,
      createdAt: new Date().toISOString(),
    };
    saveProduct(newProduct);
    setProducts(getProducts());
    showToast('success', 'Product duplicated successfully');
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex-between mb-xl">
        <div>
          <div className="section-label">Inventory</div>
          <h1 className="heading-lg">PRODUCT MANAGEMENT ({products.length})</h1>
        </div>
        <Link to="/admin/products/add" className="btn btn-primary">
          <Plus size={18} /> Add New Product
        </Link>
      </div>

      {/* Filter Bar */}
      <div style={{ background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)', marginBottom: 'var(--space-lg)', display: 'flex', gap: 'var(--space-md)' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            placeholder="Search products by name, brand or category..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: 40 }}
          />
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-text)' }} />
        </div>
      </div>

      {/* Product Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price / MRP</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <img src={p.images[0]} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--white)' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-text)' }}>SKU: {p.sku}</div>
                </td>
                <td>
                  <span className="badge badge-gray">{p.category}</span>
                </td>
                <td style={{ color: 'var(--gold)', fontWeight: 600, fontFamily: 'var(--font-label)' }}>{p.brand}</td>
                <td>
                  <div style={{ fontFamily: 'var(--font-label)', fontWeight: 700, color: 'var(--gold)' }}>₹{p.price.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-text)', textDecoration: 'line-through' }}>₹{p.mrp.toLocaleString('en-IN')}</div>
                </td>
                <td>
                  <span style={{ fontWeight: 700, color: p.stock === 0 ? 'var(--red)' : p.stock <= 5 ? 'var(--orange)' : 'var(--green)' }}>
                    {p.stock === 0 ? 'OUT OF STOCK' : `${p.stock} units`}
                  </span>
                </td>
                <td>
                  <span className={`badge ${p.status === 'active' ? 'badge-green' : 'badge-gray'}`}>{p.status}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => navigate(`/product/${p.id}`)} className="btn btn-ghost btn-sm" title="View Store Page">
                      <Eye size={14} />
                    </button>
                    <button onClick={() => navigate(`/admin/products/edit/${p.id}`)} className="btn btn-ghost btn-sm" title="Edit">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDuplicate(p)} className="btn btn-ghost btn-sm" title="Duplicate">
                      <Copy size={14} />
                    </button>
                    <button onClick={() => handleDelete(p.id, p.name)} className="btn btn-danger btn-sm" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
