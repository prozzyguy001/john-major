import { useState } from 'react';
import { useStore } from './store';
import { products, formatNaira } from './data';
import { ProductCard, ProductImage } from './Product';

export default function ProductDetail() {
  const { activeProductId, go, addToCart } = useStore();
  const product = products.find(p => p.id === activeProductId);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <section className="section">
        <div className="container empty">
          <span className="empty-ico">📦</span>
          <h3>Product not found</h3>
          <p>The product you are looking for is not available.</p>
          <button className="btn btn-primary" onClick={() => go('shop')}>Back to Shop</button>
        </div>
      </section>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <section className="section section-tight">
        <div className="container">
          <button className="back-link" onClick={() => go('shop')}>← Back to Shop</button>
          <div className="pd-grid">
            <div className="pd-img">
              <ProductImage product={product} />
            </div>
            <div className="pd-info">
              <span className="pd-cat">{product.category}</span>
              <h1 className="pd-name">{product.name}</h1>
              <p className="pd-brand">Brand: <strong>{product.brand}</strong> · SKU: {product.sku}</p>
              <span className="pd-price">{formatNaira(product.price)}</span>
              <span className="badge badge-stock">In stock</span>
              <p className="pd-desc">{product.description}</p>
              <div className="pd-specs">
                <h3>Specifications</h3>
                <ul>
                  <li><span>Brand</span><span>{product.brand}</span></li>
                  <li><span>Category</span><span>{product.category}</span></li>
                  <li><span>SKU</span><span>{product.sku}</span></li>
                  <li><span>Stock</span><span>Available</span></li>
                </ul>
              </div>
              <div className="pd-actions">
                <div className="qty">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}>+</button>
                </div>
                <button className="btn btn-primary" onClick={() => { addToCart(product, qty); go('cart'); }}>Add to Cart</button>
                <button className="btn btn-orange" onClick={() => { addToCart(product, qty); go('checkout'); }}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section" style={{ background: 'var(--light)' }}>
          <div className="container">
            <h2 className="section-title">Related Products</h2>
            <div className="grid grid-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
      <style>{`
        .back-link { background: none; border: none; color: var(--electric); font-weight: 700; margin-bottom: 20px; padding: 0; }
        .pd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .pd-img { border-radius: var(--radius); overflow: hidden; }
        .pd-img .pimg { aspect-ratio: 1/1; }
        .pd-cat { font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--electric); letter-spacing: .05em; }
        .pd-name { font-size: 28px; margin: 8px 0 6px; color: var(--navy); }
        .pd-brand { font-size: 14px; color: var(--grey); margin: 0 0 12px; }
        .pd-price { font-size: 30px; font-weight: 800; color: var(--navy); display: block; margin-bottom: 10px; }
        .pd-desc { color: var(--grey); margin: 16px 0; line-height: 1.6; }
        .pd-specs { background: var(--light); border-radius: var(--radius); padding: 18px 20px; margin: 16px 0 24px; }
        .pd-specs h3 { font-size: 15px; margin-bottom: 10px; }
        .pd-specs ul { list-style: none; padding: 0; margin: 0; }
        .pd-specs li { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
        .pd-specs li:last-child { border-bottom: none; }
        .pd-specs li span:first-child { color: var(--grey); }
        .pd-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
        .qty { display: flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 999px; overflow: hidden; }
        .qty button { padding: 10px 16px; font-size: 18px; background: var(--light); color: var(--navy); }
        .qty span { padding: 0 16px; font-weight: 700; }
        @media (max-width: 880px) { .pd-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
