import { useStore } from './store';
import { formatNaira } from './data';

export default function Footer() {
  const { go } = useStore();
  return (
    <footer className="ftr">
      <div className="container ftr-grid">
        <div>
          <h3 className="ftr-h">JOHN MAJOR INNOVATION TECHNOLOGY</h3>
          <p className="ftr-p">155 Ibrahim Taiwo Road, Oko Erin, 240101, Kwara State, Nigeria</p>
          <a href="tel:09164591760" className="ftr-phone">09164591760</a>
        </div>
        <div>
          <h4 className="ftr-sh">Navigation</h4>
          <ul className="ftr-list">
            <li><button onClick={() => go('home')}>Home</button></li>
            <li><button onClick={() => go('shop')}>Shop</button></li>
            <li><button onClick={() => go('about')}>About Us</button></li>
            <li><button onClick={() => go('contact')}>Contact</button></li>
            <li><button onClick={() => go('cart')}>MY CART</button></li>
          </ul>
        </div>
        <div>
          <h4 className="ftr-sh">Categories</h4>
          <ul className="ftr-list">
            <li><button onClick={() => go('shop')}>Smartphones</button></li>
            <li><button onClick={() => go('shop')}>Tablets</button></li>
            <li><button onClick={() => go('shop')}>Audio</button></li>
            <li><button onClick={() => go('shop')}>Power & Solar</button></li>
            <li><button onClick={() => go('shop')}>Accessories</button></li>
          </ul>
        </div>
        <div>
          <h4 className="ftr-sh">Payment Information</h4>
          <p className="ftr-pay"><strong>Direct Bank Transfer</strong><br/>Account Name: John Chibusor Enterprises<br/>Account Number: 0149888021<br/>Bank: Sterling Bank</p>
        </div>
      </div>
      <div className="ftr-bottom">
        <div className="container">© {new Date().getFullYear()} JOHN MAJOR INNOVATION TECHNOLOGY. All rights reserved.</div>
      </div>
      <style>{`
        .ftr { background: var(--navy); color: #cbd5e1; padding: 56px 0 0; }
        .ftr-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 36px; padding-bottom: 40px; }
        .ftr-h { color: white; font-size: 18px; margin-bottom: 12px; line-height: 1.3; }
        .ftr-p { margin: 0 0 10px; font-size: 14px; }
        .ftr-phone { color: #fbbf24; font-weight: 700; font-size: 16px; }
        .ftr-sh { color: white; font-size: 14px; text-transform: uppercase; letter-spacing: .06em; margin: 0 0 12px; }
        .ftr-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .ftr-list button { color: #cbd5e1; font-size: 14px; padding: 0; background: none; border: none; text-align: left; }
        .ftr-list button:hover { color: white; }
        .ftr-pay { font-size: 14px; line-height: 1.6; margin: 0; }
        .ftr-bottom { border-top: 1px solid rgba(255,255,255,.1); padding: 18px 0; font-size: 13px; color: #94a3b8; }
        @media (max-width: 880px) { .ftr-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) { .ftr-grid { grid-template-columns: 1fr; } }
      `}</style>
    </footer>
  );
}
