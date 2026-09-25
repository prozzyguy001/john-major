import { useStore, useFilteredProducts } from './store';
import { products, categories, brands, formatNaira } from './data';
import { ProductCard, BrandStrip } from './Product';

const LOGO = '/photo_2026-09-24_15-38-55.jpg';

const catColors: Record<string, string> = {
  Smartphones: '#1d4ed8', Tablets: '#0ea5e9', Audio: '#dc2626', 'Power & Solar': '#f97316',
  Accessories: '#7c3aed', Storage: '#0d9488', 'Fans & Appliances': '#16a34a',
};

const catIcons: Record<string, string> = {
  Smartphones: '📱', Tablets: '📊', Audio: '🎧', 'Power & Solar': '🔋',
  Accessories: '🔌', Storage: '💾', 'Fans & Appliances': '🌬️',
};

export default function Home() {
  const { go, setCategory, setBrand } = useStore();
  const featured = products.filter(p => p.featured).slice(0, 8);
  const latest = products.slice(-8).reverse();
  const heroProducts = featured.slice(0, 5);

  const shopCat = (c: string) => { setCategory(c); go('shop'); };
  const shopBrand = (b: string) => { setBrand(b); go('shop'); };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-in">
          <div className="hero-text fade-up">
            <span className="hero-tag">Technology for the way you live</span>
            <h1 className="hero-title">JOHN MAJOR INNOVATION TECHNOLOGY</h1>
            <p className="hero-sub">Explore smartphones, gadgets, accessories and electronics from brands you know and love.</p>
            <div className="hero-btns">
              <button className="btn btn-orange" onClick={() => go('shop')}>SHOP NOW</button>
              <button className="btn btn-ghost" onClick={() => { setCategory('All'); go('shop'); }}>EXPLORE CATEGORIES</button>
            </div>
            <div className="hero-stats">
              <div><strong>{products.length}+</strong><span>Products</span></div>
              <div><strong>{brands.length}</strong><span>Brands</span></div>
              <div><strong>{categories.length}</strong><span>Categories</span></div>
            </div>
          </div>
          <div className="hero-collage">
            {heroProducts.map((p, i) => (
              <div key={p.id} className={`hc hc-${i + 1}`} style={{ '--c': catColors[p.category] } as any} onClick={() => go('product', p.id)}>
                <span className="hc-brand">{p.brand}</span>
                <span className="hc-name">{p.name.split(' ').slice(0, 3).join(' ')}</span>
                <span className="hc-price">{formatNaira(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .hero { background: linear-gradient(135deg, #071b3a 0%, #0a2a5e 60%, #1d4ed8 100%); color: white; padding: 56px 0 64px; position: relative; overflow: hidden; }
          .hero-in { display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: center; }
          .hero-tag { display: inline-block; background: rgba(249,115,22,.2); color: #fbbf24; padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 700; margin-bottom: 16px; }
          .hero-title { font-size: 42px; line-height: 1.1; color: white; margin-bottom: 14px; }
          .hero-sub { font-size: 17px; color: #cbd5e1; margin: 0 0 24px; max-width: 480px; }
          .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
          .hero-stats { display: flex; gap: 28px; }
          .hero-stats div { display: flex; flex-direction: column; }
          .hero-stats strong { font-size: 26px; color: white; }
          .hero-stats span { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: .05em; }
          .hero-collage { position: relative; height: 420px; }
          .hc { position: absolute; background: rgba(255,255,255,.95); border-radius: 16px; padding: 14px; display: flex; flex-direction: column; gap: 4px; box-shadow: var(--shadow-lg); cursor: pointer; transition: transform .2s; border-top: 4px solid var(--c, var(--electric)); width: 150px; }
          .hc:hover { transform: scale(1.05) rotate(0deg) !important; z-index: 10; }
          .hc-brand { font-size: 11px; font-weight: 800; color: var(--navy); text-transform: uppercase; }
          .hc-name { font-size: 12px; color: var(--grey); line-height: 1.3; }
          .hc-price { font-size: 14px; font-weight: 800; color: var(--electric); margin-top: 4px; }
          .hc-1 { top: 0; left: 10%; transform: rotate(-4deg); }
          .hc-2 { top: 20%; left: 42%; transform: rotate(3deg); }
          .hc-3 { top: 50%; left: 5%; transform: rotate(2deg); }
          .hc-4 { top: 55%; left: 38%; transform: rotate(-3deg); }
          .hc-5 { top: 10%; right: 0; transform: rotate(5deg); }
          @media (max-width: 880px) {
            .hero-in { grid-template-columns: 1fr; }
            .hero-title { font-size: 30px; }
            .hero-collage { display: none; }
          }
        `}</style>
      </section>

      {/* CATEGORIES */}
      <section className="section" style={{ background: 'var(--light)' }}>
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-sub">Browse our electronics range by category.</p>
          <div className="grid grid-cats">
            {categories.map(c => (
              <button key={c} className="cat-card" style={{ '--cc': catColors[c] ?? '#1d4ed8' } as any} onClick={() => shopCat(c)}>
                <span className="cat-ico">{catIcons[c] ?? '📦'}</span>
                <span className="cat-name">{c}</span>
                <span className="cat-count">{products.filter(p => p.category === c).length} items</span>
              </button>
            ))}
          </div>
        </div>
        <style>{`
          .cat-card { background: white; border: 1px solid #e2e8f0; border-radius: var(--radius); padding: 24px 18px; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: all .18s; border-top: 4px solid var(--cc); }
          .cat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--cc); }
          .cat-ico { font-size: 32px; }
          .cat-name { font-weight: 700; color: var(--navy); font-size: 15px; }
          .cat-count { font-size: 12px; color: var(--grey); }
        `}</style>
      </section>

      {/* FEATURED */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-sub">Hand-picked highlights from our catalog.</p>
            </div>
            <button className="btn btn-outline" onClick={() => go('shop')}>View All</button>
          </div>
          <div className="grid grid-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
        <style>{`.sec-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; gap: 16px; }`}</style>
      </section>

      {/* PROMO */}
      <section className="section" style={{ background: 'linear-gradient(120deg, #0a2a5e, #1d4ed8)' }}>
        <div className="container promo-in">
          <div className="promo-text">
            <h2 className="promo-title">Power & Solar Solutions</h2>
            <p className="promo-sub">Keep your home and devices running with our inverters, solar panels, lithium batteries and rechargeable fans.</p>
            <button className="btn btn-orange" onClick={() => shopCat('Power & Solar')}>EXPLORE POWER</button>
          </div>
          <div className="promo-cards">
            {products.filter(p => p.category === 'Power & Solar').slice(0, 3).map(p => (
              <div key={p.id} className="promo-card" onClick={() => go('product', p.id)}>
                <span className="pc-brand">{p.brand}</span>
                <span className="pc-name">{p.name}</span>
                <span className="pc-price">{formatNaira(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .promo-in { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
          .promo-title { color: white; font-size: 30px; margin-bottom: 12px; }
          .promo-sub { color: #cbd5e1; margin: 0 0 20px; font-size: 16px; }
          .promo-cards { display: flex; flex-direction: column; gap: 12px; }
          .promo-card { background: rgba(255,255,255,.95); border-radius: 12px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: transform .15s; }
          .promo-card:hover { transform: translateX(6px); }
          .pc-brand { font-weight: 800; color: var(--navy); font-size: 13px; }
          .pc-name { font-size: 13px; color: var(--grey); flex: 1; padding: 0 12px; }
          .pc-price { font-weight: 800; color: var(--electric); }
          @media (max-width: 880px) { .promo-in { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* LATEST */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Latest Products</h2>
          <p className="section-sub">New arrivals and additions to our catalog.</p>
          <div className="grid grid-4">
            {latest.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <BrandStrip />

      {/* BENEFITS */}
      <section className="section" style={{ background: 'var(--light)' }}>
        <div className="container">
          <h2 className="section-title">Why Shop With Us</h2>
          <p className="section-sub">A trusted electronics store serving Kwara State and beyond.</p>
          <div className="grid grid-4">
            <div className="benefit"><span className="b-ico">📦</span><h3>Wide Product Selection</h3><p>Phones, gadgets, accessories and electronics.</p></div>
            <div className="benefit"><span className="b-ico">🏪</span><h3>Physical Store</h3><p>Located at 155 Ibrahim Taiwo Road, Oko Erin, Kwara State.</p></div>
            <div className="benefit"><span className="b-ico">🛒</span><h3>Easy Ordering</h3><p>Browse products online and place orders.</p></div>
            <div className="benefit"><span className="b-ico">📞</span><h3>Customer Assistance</h3><p>Call us on 09164591760 for help.</p></div>
          </div>
        </div>
        <style>{`
          .benefit { background: white; border-radius: var(--radius); padding: 24px; border: 1px solid #e2e8f0; }
          .benefit h3 { font-size: 16px; margin: 10px 0 6px; }
          .benefit p { color: var(--grey); font-size: 14px; margin: 0; }
          .b-ico { font-size: 28px; }
        `}</style>
      </section>

      {/* SUPPORT */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container support-in">
          <div>
            <h2 className="support-title">Need assistance?</h2>
            <p className="support-sub">Call 09164591760 and our team will help you.</p>
          </div>
          <a href="tel:09164591760" className="btn btn-orange support-btn">CALL NOW</a>
        </div>
        <style>{`
          .support-in { display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; }
          .support-title { color: white; font-size: 26px; margin-bottom: 6px; }
          .support-sub { color: #cbd5e1; margin: 0; font-size: 16px; }
          .support-btn { font-size: 16px; padding: 14px 28px; }
        `}</style>
      </section>

      {/* LOCATION */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Visit Our Store</h2>
          <p className="section-sub">JOHN MAJOR INNOVATION TECHNOLOGY</p>
          <div className="loc-card">
            <div className="loc-info">
              <p className="loc-addr">155 Ibrahim Taiwo Road, Oko Erin, 240101, Kwara State, Nigeria</p>
              <a href="tel:09164591760" className="loc-phone">09164591760</a>
            </div>
            <div className="loc-map">
              <iframe title="Store location" src="https://www.google.com/maps?q=Ibrahim+Taiwo+Road+Ilorin+Kwara+Nigeria&output=embed" width="100%" height="240" style={{ border: 0, borderRadius: '12px' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
        <style>{`
          .loc-card { display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; background: var(--light); border-radius: var(--radius); padding: 24px; }
          .loc-info { display: flex; flex-direction: column; justify-content: center; gap: 12px; }
          .loc-addr { font-size: 18px; color: var(--navy); font-weight: 600; margin: 0; }
          .loc-phone { font-size: 20px; font-weight: 800; color: var(--electric); }
          @media (max-width: 880px) { .loc-card { grid-template-columns: 1fr; } }
        `}</style>
      </section>
    </>
  );
}
