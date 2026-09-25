import { useState } from 'react';
import { useStore } from './store';
import { formatNaira } from './data';

const LOGO = '/photo_2026-09-24_15-38-55.jpg';

export default function Header() {
  const { go, page, cartCount, setSearch } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const nav = (p: any) => { go(p); setOpen(false); };
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSearch(q); go('shop'); setOpen(false); };
  const linkCls = (p: string) => `nav-link${page === p ? ' active' : ''}`;
  return (
    <header className="hdr">
      <div className="hdr-top">
        <div className="container hdr-top-in">
          <span className="hdr-addr">155 Ibrahim Taiwo Road, Oko Erin, 240101, Kwara State</span>
          <a href="tel:09164591760" className="hdr-phone">Need assistance? Call 09164591760</a>
        </div>
      </div>
      <div className="container hdr-main">
        <button className="logo-btn" onClick={() => nav('home')} aria-label="John Major Innovation Technology home">
          <img src={LOGO} alt="John Major Innovation Technology" className="logo" />
        </button>
        <form className="hdr-search" onSubmit={submit}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products, brands, models…" aria-label="Search" />
          <button type="submit" className="hdr-search-btn" aria-label="Search">Search</button>
        </form>
        <div className="hdr-actions">
          <button className="cart-btn" onClick={() => nav('cart')} aria-label="My Cart">
            <span className="cart-ico">MY CART</span>
            <span className="cart-count">{cartCount}</span>
          </button>
          <button className="menu-btn" onClick={() => setOpen(o => !o)} aria-label="Menu">☰</button>
        </div>
      </div>
      <nav className={`hdr-nav${open ? ' open' : ''}`}>
        <div className="container hdr-nav-in">
          <button className={linkCls('home')} onClick={() => nav('home')}>Home</button>
          <button className={linkCls('shop')} onClick={() => nav('shop')}>Shop</button>
          <button className={linkCls('shop')} onClick={() => nav('shop')}>Categories</button>
          <button className={linkCls('about')} onClick={() => nav('about')}>About Us</button>
          <button className={linkCls('contact')} onClick={() => nav('contact')}>Contact</button>
          <a href="tel:09164591760" className="nav-phone">09164591760</a>
        </div>
      </nav>
      <style>{`
        .hdr { position: sticky; top: 0; z-index: 50; background: var(--navy); color: white; box-shadow: var(--shadow); }
        .hdr-top { background: var(--navy-2); font-size: 12px; }
        .hdr-top-in { display: flex; justify-content: space-between; align-items: center; height: 34px; gap: 10px; }
        .hdr-addr { color: #cbd5e1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .hdr-phone { color: #fbbf24; font-weight: 700; white-space: nowrap; }
        .hdr-main { display: flex; align-items: center; gap: 16px; padding: 12px 20px; }
        .logo-btn { padding: 0; background: none; border: none; }
        .logo { height: 46px; width: auto; border-radius: 8px; background: white; padding: 3px; object-fit: contain; }
        .hdr-search { flex: 1; display: flex; max-width: 560px; }
        .hdr-search input { flex: 1; padding: 11px 14px; border: none; border-radius: 10px 0 0 10px; font-size: 14px; }
        .hdr-search-btn { padding: 0 18px; background: var(--orange); color: white; font-weight: 700; border-radius: 0 10px 10px 0; }
        .hdr-actions { display: flex; align-items: center; gap: 10px; margin-left: auto; }
        .cart-btn { display: flex; align-items: center; gap: 8px; color: white; font-weight: 700; font-size: 13px; padding: 8px 14px; border-radius: 999px; background: rgba(255,255,255,.1); }
        .cart-btn:hover { background: rgba(255,255,255,.2); }
        .cart-count { background: var(--orange); color: white; border-radius: 999px; padding: 1px 8px; font-size: 12px; }
        .menu-btn { display: none; color: white; font-size: 22px; padding: 4px 8px; }
        .hdr-nav { background: var(--navy); border-top: 1px solid rgba(255,255,255,.08); }
        .hdr-nav-in { display: flex; gap: 4px; flex-wrap: wrap; align-items: center; padding: 0 20px; }
        .hdr-nav button, .hdr-nav .nav-phone { color: #cbd5e1; font-size: 14px; font-weight: 600; padding: 12px 14px; background: none; border: none; }
        .hdr-nav button:hover, .hdr-nav .nav-phone:hover { color: white; }
        .nav-link.active { color: white; box-shadow: inset 0 -2px 0 var(--orange); }
        .nav-phone { margin-left: auto; color: #fbbf24; }
        @media (max-width: 880px) {
          .hdr-search { display: none; }
          .menu-btn { display: block; }
          .hdr-addr { display: none; }
          .hdr-nav { display: none; }
          .hdr-nav.open { display: block; }
          .hdr-nav-in { flex-direction: column; align-items: stretch; }
          .nav-phone { margin-left: 0; }
        }
      `}</style>
    </header>
  );
}
