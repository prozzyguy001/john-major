import { useStore } from './store';
import { products, categories, brands, formatNaira, type Category } from './data';
import { ProductCard, BrandStrip } from './Product';
import { getProductImage } from './images';

const LOGO = '/photo_2026-09-24_15-38-55.jpg';

const catColors: Record<string, string> = {
  Smartphones: '#1d4ed8', Tablets: '#0ea5e9', 'Laptops & Computers': '#0d9488', Audio: '#dc2626',
  'Power & Solar': '#f97316', Accessories: '#7c3aed', Storage: '#0d9488', 'Fans & Appliances': '#16a34a',
  Networking: '#1e40af', Gaming: '#9333ea', Smartwatches: '#0ea5e9',
};

const catIcons: Record<string, string> = {
  Smartphones: '📱', Tablets: '📊', 'Laptops & Computers': '💻', Audio: '🎧',
  'Power & Solar': '🔋', Accessories: '🔌', Storage: '💾', 'Fans & Appliances': '🌬️',
  Networking: '📡', Gaming: '🎮', Smartwatches: '⌚',
};

export default function Home() {
  const { go, setCategory, setBrand } = useStore();
  const featured = products.filter(p => p.featured).slice(0, 8);
  const latest = products.slice(-10).reverse();
  const heroProducts = featured.slice(0, 5);

  const shopCat = (c: string) => { setCategory(c); go('shop'); };
  const shopBrand = (b: string) => { setBrand(b); go('shop'); };

  // Promotional category banners
  const promoCats: { cat: Category; title: string; desc: string; color: string }[] = [
    { cat: 'Smartphones', title: 'Smartphones', desc: 'Latest flagships and budget phones from Samsung, Apple, Tecno, Xiaomi and more.', color: '#1d4ed8' },
    { cat: 'Audio', title: 'Audio', desc: 'Earbuds, headphones and speakers from JBL, Oraimo, Zealot and more.', color: '#dc2626' },
    { cat: 'Power & Solar', title: 'Power Solutions', desc: 'Inverters, solar panels, lithium batteries and power banks.', color: '#f97316' },
    { cat: 'Laptops & Computers', title: 'Computing', desc: 'Lenovo laptops and computer accessories for work and study.', color: '#0d9488' },
  ];

  return (
    <>
      {/* TOP PROMO STRIP */}
      <div className="promo-strip">
        <div className="container promo-strip-in">
          <span className="ps-item">Quality Electronics</span>
          <span className="ps-dot">•</span>
          <span className="ps-item">Easy Ordering</span>
          <span className="ps-dot">•</span>
          <span className="ps-item">Direct Bank Transfer</span>
          <span className="ps-spacer" />
          <a href="tel:09164591760" className="ps-phone">Need assistance? Call 09164591760</a>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-in">
          <div className="hero-text fade-up">
            <span className="hero-tag">JOHN MAJOR INNOVATION TECHNOLOGY</span>
            <h1 className="hero-title">Your World.<br/>Your Tech.<br/>Your Way.</h1>
            <p className="hero-sub">Explore smartphones, gadgets, accessories and electronics from brands you know and love. Quality products, easy ordering, and customer assistance every step of the way.</p>
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
                <div className="hc-img-wrap">
                  <img src={getProductImage(p.id, p.category)} alt={p.name} loading="lazy" />
                </div>
                <span className="hc-brand">{p.brand}</span>
                <span className="hc-name">{p.name.split(' ').slice(0, 3).join(' ')}</span>
                <span className="hc-price">{formatNaira(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
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
      </section>

      {/* FEATURED PRODUCTS */}
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
      </section>

      {/* PROMOTIONAL BANNERS */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>Shop by Collection</h2>
          <p className="section-sub" style={{ color: '#cbd5e1' }}>Explore our product ranges across key categories.</p>
          <div className="promo-banners">
            {promoCats.map(pc => {
              const sample = products.find(p => p.category === pc.cat);
              return (
                <div key={pc.cat} className="promo-banner" style={{ '--bc': pc.color } as any} onClick={() => shopCat(pc.cat)}>
                  <div className="pb-img">
                    {sample && <img src={getProductImage(sample.id, sample.category)} alt={pc.title} loading="lazy" />}
                  </div>
                  <div className="pb-text">
                    <h3>{pc.title}</h3>
                    <p>{pc.desc}</p>
                    <span className="pb-cta">Shop Now →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LATEST PRODUCTS */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <div>
              <h2 className="section-title">Just Landed</h2>
              <p className="section-sub">New arrivals and additions to our catalog.</p>
            </div>
            <button className="btn btn-outline" onClick={() => go('shop')}>View All</button>
          </div>
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
            <div className="benefit"><span className="b-ico">📦</span><h3>Quality Products</h3><p>Phones, gadgets, accessories and electronics from brands you know.</p></div>
            <div className="benefit"><span className="b-ico">🏪</span><h3>Physical Store</h3><p>Located at 155 Ibrahim Taiwo Road, Oko Erin, Kwara State.</p></div>
            <div className="benefit"><span className="b-ico">🛒</span><h3>Easy Ordering</h3><p>Browse products online and place orders with direct bank transfer.</p></div>
            <div className="benefit"><span className="b-ico">📞</span><h3>Customer Support</h3><p>Call us on 09164591760 for help choosing the right device.</p></div>
          </div>
        </div>
      </section>

      {/* SUPPORT CTA */}
      <section className="section" style={{ background: 'linear-gradient(120deg, #071b3a, #0a2a5e)' }}>
        <div className="container support-in">
          <div>
            <h2 className="support-title">Need Help Choosing<br/>the Right Device?</h2>
            <p className="support-sub">Talk to JOHN MAJOR INNOVATION TECHNOLOGY. Our team is ready to assist you.</p>
          </div>
          <a href="tel:09164591760" className="btn btn-orange support-btn">CALL 09164591760</a>
        </div>
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
              <p className="loc-hours">Visit us for quality electronics, smartphones, gadgets and accessories.</p>
            </div>
            <div className="loc-map">
              <iframe title="Store location" src="https://www.google.com/maps?q=Ibrahim+Taiwo+Road+Ilorin+Kwara+Nigeria&output=embed" width="100%" height="240" style={{ border: 0, borderRadius: '12px' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .promo-strip { background: #050f24; color: #94a3b8; font-size: 12px; padding: 7px 0; }
        .promo-strip-in { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .ps-item { white-space: nowrap; }
        .ps-dot { color: #475569; }
        .ps-spacer { flex: 1; }
        .ps-phone { color: #fbbf24; font-weight: 700; white-space: nowrap; }

        .hero { position: relative; background: linear-gradient(135deg, #071b3a 0%, #0a2a5e 50%, #1d4ed8 100%); color: white; padding: 56px 0 64px; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 20%, rgba(249,115,22,.12), transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(37,99,235,.15), transparent 50%); pointer-events: none; }
        .hero-in { position: relative; display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: center; }
        .hero-tag { display: inline-block; background: rgba(249,115,22,.18); color: #fbbf24; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 700; margin-bottom: 16px; letter-spacing: .03em; }
        .hero-title { font-size: 44px; line-height: 1.05; color: white; margin-bottom: 16px; font-weight: 800; }
        .hero-sub { font-size: 16px; color: #cbd5e1; margin: 0 0 24px; max-width: 480px; line-height: 1.6; }
        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
        .hero-stats { display: flex; gap: 28px; }
        .hero-stats div { display: flex; flex-direction: column; }
        .hero-stats strong { font-size: 28px; color: white; }
        .hero-stats span { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: .05em; }
        .hero-collage { position: relative; height: 440px; }
        .hc { position: absolute; background: white; border-radius: 16px; padding: 10px; display: flex; flex-direction: column; gap: 3px; box-shadow: var(--shadow-lg); cursor: pointer; transition: transform .25s ease; border-top: 4px solid var(--c, var(--electric)); width: 160px; }
        .hc:hover { transform: scale(1.06) !important; z-index: 10; }
        .hc-img-wrap { width: 100%; aspect-ratio: 1; border-radius: 10px; overflow: hidden; background: #f1f5f9; }
        .hc-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .hc-brand { font-size: 11px; font-weight: 800; color: var(--navy); text-transform: uppercase; padding: 4px 4px 0; }
        .hc-name { font-size: 11px; color: var(--grey); line-height: 1.3; padding: 0 4px; }
        .hc-price { font-size: 14px; font-weight: 800; color: var(--electric); padding: 2px 4px 4px; }
        .hc-1 { top: 0; left: 8%; transform: rotate(-5deg); }
        .hc-2 { top: 18%; left: 44%; transform: rotate(3deg); }
        .hc-3 { top: 48%; left: 4%; transform: rotate(2deg); }
        .hc-4 { top: 52%; left: 40%; transform: rotate(-3deg); }
        .hc-5 { top: 8%; right: 0; transform: rotate(6deg); }

        .sec-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; gap: 16px; }

        .cat-card { background: white; border: 1px solid #e2e8f0; border-radius: var(--radius); padding: 24px 18px; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: all .18s; border-top: 4px solid var(--cc); cursor: pointer; }
        .cat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--cc); }
        .cat-ico { font-size: 32px; }
        .cat-name { font-weight: 700; color: var(--navy); font-size: 15px; }
        .cat-count { font-size: 12px; color: var(--grey); }

        .promo-banners { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .promo-banner { display: flex; background: rgba(255,255,255,.06); border-radius: 16px; overflow: hidden; cursor: pointer; transition: transform .2s, background .2s; border: 1px solid rgba(255,255,255,.1); }
        .promo-banner:hover { transform: translateY(-3px); background: rgba(255,255,255,.1); }
        .pb-img { width: 140px; flex-shrink: 0; overflow: hidden; }
        .pb-img img { width: 100%; height: 100%; object-fit: cover; }
        .pb-text { padding: 18px; display: flex; flex-direction: column; gap: 6px; }
        .pb-text h3 { color: white; font-size: 18px; margin: 0; }
        .pb-text p { color: #cbd5e1; font-size: 13px; margin: 0; line-height: 1.5; }
        .pb-cta { color: var(--orange); font-weight: 700; font-size: 13px; margin-top: auto; }

        .benefit { background: white; border-radius: var(--radius); padding: 24px; border: 1px solid #e2e8f0; }
        .benefit h3 { font-size: 16px; margin: 10px 0 6px; }
        .benefit p { color: var(--grey); font-size: 14px; margin: 0; line-height: 1.5; }
        .b-ico { font-size: 28px; }

        .support-in { display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; }
        .support-title { color: white; font-size: 28px; margin-bottom: 8px; line-height: 1.2; }
        .support-sub { color: #cbd5e1; margin: 0; font-size: 16px; }
        .support-btn { font-size: 16px; padding: 14px 28px; }

        .loc-card { display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; background: var(--light); border-radius: var(--radius); padding: 24px; }
        .loc-info { display: flex; flex-direction: column; justify-content: center; gap: 12px; }
        .loc-addr { font-size: 18px; color: var(--navy); font-weight: 600; margin: 0; }
        .loc-phone { font-size: 20px; font-weight: 800; color: var(--electric); }
        .loc-hours { font-size: 14px; color: var(--grey); margin: 0; }

        @media (max-width: 880px) {
          .hero-in { grid-template-columns: 1fr; }
          .hero-title { font-size: 32px; }
          .hero-collage { display: none; }
          .promo-banners { grid-template-columns: 1fr; }
          .pb-img { width: 100px; }
          .loc-card { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
