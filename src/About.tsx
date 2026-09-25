import { useStore } from './store';

export default function About() {
  const { go } = useStore();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Your trusted electronics retailer in Kwara State.</p>
        </div>
      </section>
      <section className="section">
        <div className="container about-in">
          <div className="about-text">
            <h2>JOHN MAJOR INNOVATION TECHNOLOGY</h2>
            <p>We are a Nigerian electronics, smartphone, gadget and accessories business based in Kwara State. Our store offers a wide selection of products from brands you know and love — from the latest smartphones and audio gear to power solutions, solar products and everyday accessories.</p>
            <p>Our mission is to make quality technology accessible and affordable. Browse our online catalog, place your order, and pay by direct bank transfer. Our team is ready to assist you every step of the way.</p>
            <button className="btn btn-primary" onClick={() => go('shop')}>Browse Our Catalog</button>
          </div>
          <div className="about-side">
            <div className="about-card"><span className="ac-ico">📍</span><h3>Our Address</h3><p>155 Ibrahim Taiwo Road, Oko Erin, 240101, Kwara State, Nigeria</p></div>
            <div className="about-card"><span className="ac-ico">📞</span><h3>Call Us</h3><a href="tel:09164591760">09164591760</a></div>
            <div className="about-card"><span className="ac-ico">💳</span><h3>Payment</h3><p>Direct Bank Transfer to Sterling Bank (John Chibusor Enterprises, 0149888021)</p></div>
          </div>
        </div>
      </section>
      <style>{`
        .page-hero { background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; padding: 40px 0; }
        .page-hero h1 { color: white; font-size: 32px; margin-bottom: 4px; }
        .page-hero p { color: #cbd5e1; margin: 0; }
        .about-in { display: grid; grid-template-columns: 1.4fr 1fr; gap: 36px; align-items: start; }
        .about-text h2 { font-size: 24px; margin-bottom: 12px; }
        .about-text p { color: var(--grey); line-height: 1.7; margin: 0 0 16px; }
        .about-side { display: flex; flex-direction: column; gap: 14px; }
        .about-card { background: var(--light); border-radius: var(--radius); padding: 20px; }
        .about-card h3 { font-size: 16px; margin: 8px 0 6px; }
        .about-card p, .about-card a { font-size: 14px; color: var(--grey); }
        .about-card a { font-weight: 800; color: var(--electric); font-size: 16px; }
        .ac-ico { font-size: 24px; }
        @media (max-width: 880px) { .about-in { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
