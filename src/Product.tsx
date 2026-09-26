import { useState } from 'react';
import { useStore } from './store';
import { type Product, formatNaira, brands } from './data';
import { getProductImage, hasVerifiedImage } from './images';

const catColors: Record<string, string> = {
  Smartphones: '#1d4ed8', Tablets: '#0ea5e9', 'Laptops & Computers': '#0d9488', Audio: '#dc2626',
  'Power & Solar': '#f97316', Accessories: '#7c3aed', Storage: '#0d9488', 'Fans & Appliances': '#16a34a',
  Networking: '#1e40af', Gaming: '#9333ea', Smartwatches: '#0ea5e9',
};

export function ProductImage({ product, className }: { product: Product; className?: string }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const src = getProductImage(product.id, product.category);
  const verified = hasVerifiedImage(product.id);

  return (
    <div
      className={`pimg ${className ?? ''}`}
      style={{ background: `linear-gradient(135deg, ${catColors[product.category] ?? '#1d4ed8'}18, #f8fafc)` }}
    >
      {!imgError ? (
        <>
          <img
            src={src}
            alt={product.name}
            className={`pimg-photo ${imgLoaded ? 'loaded' : ''}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
          {!imgLoaded && <div className="pimg-skeleton" />}
        </>
      ) : (
        <div className="pimg-fallback">
          <span className="pimg-fallback-brand">{product.brand}</span>
          <span className="pimg-fallback-name">{product.name}</span>
          <span className="pimg-fallback-cat">{product.category}</span>
        </div>
      )}
      {!verified && !imgError && (
        <span className="pimg-badge">Image pending</span>
      )}
      <style>{`
        .pimg { position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .pimg-photo { width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .3s ease; }
        .pimg-photo.loaded { opacity: 1; }
        .pimg-skeleton { position: absolute; inset: 0; }
        .pimg-fallback { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 18px; text-align: center; }
        .pimg-fallback-brand { font-size: 14px; font-weight: 800; color: var(--navy); text-transform: uppercase; letter-spacing: .05em; }
        .pimg-fallback-name { font-size: 13px; color: var(--grey); max-width: 85%; }
        .pimg-fallback-cat { font-size: 11px; color: var(--electric); font-weight: 600; text-transform: uppercase; }
        .pimg-badge { position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,.92); color: #9a3412; font-size: 9px; font-weight: 700; padding: 3px 8px; border-radius: 999px; text-transform: uppercase; letter-spacing: .04em; border: 1px solid #fed7aa; }
      `}</style>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { go, addToCart } = useStore();
  return (
    <article className="pcard fade-up">
      <button className="pcard-img-btn" onClick={() => go('product', product.id)} aria-label={`View ${product.name}`}>
        <ProductImage product={product} className="pcard-img" />
      </button>
      <div className="pcard-body">
        <span className="pcard-cat">{product.category}</span>
        <h3 className="pcard-name" onClick={() => go('product', product.id)}>{product.name}</h3>
        <span className="pcard-sku">SKU: {product.sku}</span>
        <div className="pcard-foot">
          <span className="pcard-price">{formatNaira(product.price)}</span>
          <span className="badge badge-stock">In stock</span>
        </div>
        <div className="pcard-actions">
          <button className="btn btn-primary btn-sm" onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="btn btn-outline btn-sm" onClick={() => go('product', product.id)}>View</button>
        </div>
      </div>
      <style>{`
        .pcard { background: white; border: 1px solid #e2e8f0; border-radius: var(--radius); overflow: hidden; display: flex; flex-direction: column; transition: transform .18s ease, box-shadow .18s ease, border-color .18s; }
        .pcard:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: #cbd5e1; }
        .pcard-img-btn { padding: 0; border: none; background: none; }
        .pcard-img { aspect-ratio: 1/1; }
        .pcard-body { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 4px; flex: 1; }
        .pcard-cat { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--electric); }
        .pcard-name { font-size: 15px; font-weight: 700; color: var(--navy); margin: 2px 0 0; line-height: 1.3; cursor: pointer; text-align: left; }
        .pcard-name:hover { color: var(--electric); }
        .pcard-sku { font-size: 11px; color: var(--grey); }
        .pcard-foot { display: flex; justify-content: space-between; align-items: center; margin: 8px 0 12px; }
        .pcard-price { font-size: 17px; font-weight: 800; color: var(--navy); }
        .pcard-actions { display: flex; gap: 8px; margin-top: auto; }
        .btn-sm { padding: 9px 14px; font-size: 13px; flex: 1; justify-content: center; }
      `}</style>
    </article>
  );
}

export function BrandStrip() {
  const { setBrand, go } = useStore();
  return (
    <section className="section" style={{ background: 'var(--light)' }}>
      <div className="container">
        <h2 className="section-title">Shop by Brand</h2>
        <p className="section-sub">Brands available in our catalog.</p>
        <div className="brand-grid">
          {brands.map(b => (
            <button key={b} className="brand-chip" onClick={() => { setBrand(b); go('shop'); }}>{b}</button>
          ))}
        </div>
      </div>
      <style>{`
        .brand-grid { display: flex; flex-wrap: wrap; gap: 12px; }
        .brand-chip { background: white; border: 1px solid #e2e8f0; border-radius: 999px; padding: 12px 20px; font-weight: 700; color: var(--navy); font-size: 14px; transition: all .15s; cursor: pointer; }
        .brand-chip:hover { border-color: var(--electric); color: var(--electric); transform: translateY(-2px); box-shadow: var(--shadow); }
      `}</style>
    </section>
  );
}
