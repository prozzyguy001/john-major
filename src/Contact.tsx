export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We are here to help with your orders and enquiries.</p>
        </div>
      </section>
      <section className="section">
        <div className="container contact-in">
          <div className="contact-info">
            <div className="contact-card">
              <span className="cc-ico">📍</span>
              <h3>Visit Our Store</h3>
              <p>JOHN MAJOR INNOVATION TECHNOLOGY<br/>155 Ibrahim Taiwo Road, Oko Erin, 240101, Kwara State, Nigeria</p>
            </div>
            <div className="contact-card">
              <span className="cc-ico">📞</span>
              <h3>Call Us</h3>
              <a href="tel:09164591760" className="contact-phone">09164591760</a>
              <p className="contact-help">Need assistance? Call 09164591760</p>
            </div>
            <div className="contact-card">
              <span className="cc-ico">💳</span>
              <h3>Payment</h3>
              <p>Direct Bank Transfer<br/>Account Name: John Chibusor Enterprises<br/>Account Number: 0149888021<br/>Bank: Sterling Bank</p>
            </div>
          </div>
          <div className="contact-map">
            <iframe title="Store location" src="https://www.google.com/maps?q=Ibrahim+Taiwo+Road+Ilorin+Kwara+Nigeria&output=embed" width="100%" height="100%" style={{ border: 0, borderRadius: '14px', minHeight: '320px' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
      <style>{`
        .page-hero { background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; padding: 40px 0; }
        .page-hero h1 { color: white; font-size: 32px; margin-bottom: 4px; }
        .page-hero p { color: #cbd5e1; margin: 0; }
        .contact-in { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .contact-info { display: flex; flex-direction: column; gap: 16px; }
        .contact-card { background: var(--light); border-radius: var(--radius); padding: 22px; }
        .contact-card h3 { font-size: 17px; margin: 10px 0 8px; }
        .contact-card p { color: var(--grey); line-height: 1.7; margin: 0; font-size: 14px; }
        .contact-phone { font-size: 22px; font-weight: 800; color: var(--electric); display: inline-block; margin-bottom: 4px; }
        .contact-help { color: var(--grey) !important; font-size: 13px !important; }
        .cc-ico { font-size: 26px; }
        .contact-map { border-radius: var(--radius); overflow: hidden; }
        @media (max-width: 880px) { .contact-in { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
