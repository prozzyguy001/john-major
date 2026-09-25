import { useStore } from './store';
import { formatNaira } from './data';
import { ProductImage } from './Product';

export default function Confirmation() {
  const { lastOrder, go } = useStore();

  if (!lastOrder) {
    return (
      <section className="section">
        <div className="container empty">
          <span className="empty-ico">📋</span>
          <h3>No order to display</h3>
          <p>You have not placed an order yet.</p>
          <button className="btn btn-primary" onClick={() => go('shop')}>Shop Now</button>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-tight">
      <div className="container conf-in">
        <div className="conf-head">
          <span className="conf-check">✓</span>
          <h1>Thank you for your order!</h1>
          <p>Your order <strong>{lastOrder.id}</strong> has been received. Please complete payment to confirm.</p>
        </div>
        <div className="conf-grid">
          <div className="conf-main">
            <div className="conf-card">
              <h3>Order Details</h3>
              <div className="conf-statuses">
                <div><span className="conf-label">Payment Status</span><span className="badge" style={{ background: '#fef3c7', color: '#92400e' }}>{lastOrder.paymentStatus}</span></div>
                <div><span className="conf-label">Order Status</span><span className="badge" style={{ background: '#dbeafe', color: '#1e40af' }}>{lastOrder.orderStatus}</span></div>
              </div>
              <div className="conf-items">
                {lastOrder.items.map(i => (
                  <div key={i.product.id} className="conf-item">
                    <div className="conf-img"><ProductImage product={i.product} /></div>
                    <div><h4>{i.product.name}</h4><span>{i.product.brand} · SKU: {i.product.sku}</span></div>
                    <span className="conf-qty">×{i.qty}</span>
                    <span className="conf-price">{formatNaira(i.product.price * i.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="conf-total"><span>Total</span><span>{formatNaira(lastOrder.total)}</span></div>
            </div>
            <div className="conf-card">
              <h3>Customer Details</h3>
              <div className="conf-cust">
                <p><strong>Name:</strong> {lastOrder.customer.name}</p>
                <p><strong>Phone:</strong> {lastOrder.customer.phone}</p>
                {lastOrder.customer.email && <p><strong>Email:</strong> {lastOrder.customer.email}</p>}
                <p><strong>Address:</strong> {lastOrder.customer.address}, {lastOrder.customer.city}, {lastOrder.customer.state}</p>
                {lastOrder.customer.notes && <p><strong>Notes:</strong> {lastOrder.customer.notes}</p>}
              </div>
            </div>
          </div>
          <aside className="conf-side">
            <div className="conf-card conf-pay">
              <h3>Payment Instructions</h3>
              <p className="conf-pay-label">Direct Bank Transfer</p>
              <div className="bank-box">
                <p><strong>Account Name:</strong> John Chibusor Enterprises</p>
                <p><strong>Account Number:</strong> 0149888021</p>
                <p><strong>Bank:</strong> Sterling Bank</p>
              </div>
              <p className="conf-amt">Transfer <strong>{formatNaira(lastOrder.total)}</strong> to the account above.</p>
              <p className="conf-note">Your order status is <strong>Awaiting Payment</strong>. Once we verify your transfer, your order will be updated to <strong>Paid</strong> and <strong>Processing</strong>.</p>
              <a href="tel:09164591760" className="btn btn-orange btn-block">Call to Confirm Payment</a>
            </div>
          </aside>
        </div>
        <div className="conf-actions">
          <button className="btn btn-primary" onClick={() => go('shop')}>Continue Shopping</button>
          <button className="btn btn-outline" onClick={() => go('home')}>Back to Home</button>
        </div>
      </div>
      <style>{`
        .conf-in { max-width: 960px; }
        .conf-head { text-align: center; margin-bottom: 32px; }
        .conf-check { display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 999px; background: #dcfce7; color: #16a34a; font-size: 28px; margin-bottom: 12px; }
        .conf-head h1 { font-size: 26px; margin-bottom: 6px; }
        .conf-head p { color: var(--grey); margin: 0; }
        .conf-grid { display: grid; grid-template-columns: 1fr 320px; gap: 24px; align-items: start; }
        .conf-main { display: flex; flex-direction: column; gap: 20px; }
        .conf-card { background: white; border: 1px solid #e2e8f0; border-radius: var(--radius); padding: 22px; }
        .conf-card h3 { font-size: 17px; margin-bottom: 14px; }
        .conf-statuses { display: flex; gap: 16px; margin-bottom: 16px; }
        .conf-statuses > div { display: flex; flex-direction: column; gap: 4px; }
        .conf-label { font-size: 12px; color: var(--grey); text-transform: uppercase; letter-spacing: .04em; }
        .conf-items { display: flex; flex-direction: column; gap: 10px; }
        .conf-item { display: grid; grid-template-columns: 50px 1fr auto auto; gap: 12px; align-items: center; }
        .conf-img { width: 50px; height: 50px; border-radius: 8px; overflow: hidden; }
        .conf-img .pimg { width: 100%; height: 100%; }
        .conf-item h4 { font-size: 13px; margin: 0; }
        .conf-item span { font-size: 12px; color: var(--grey); }
        .conf-qty { font-weight: 700; }
        .conf-price { font-weight: 800; color: var(--navy); }
        .conf-total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 800; color: var(--navy); border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 12px; }
        .conf-cust p { margin: 4px 0; font-size: 14px; }
        .conf-pay .bank-box { background: var(--light); border-radius: 10px; padding: 14px; }
        .conf-pay .bank-box p { margin: 4px 0; font-size: 13px; }
        .conf-pay-label { font-weight: 800; color: var(--navy); margin: 0 0 10px; }
        .conf-amt { font-size: 15px; margin: 12px 0; }
        .conf-note { font-size: 12px; color: var(--grey); line-height: 1.5; margin: 0 0 14px; }
        .conf-actions { display: flex; gap: 12px; justify-content: center; margin-top: 28px; }
        @media (max-width: 880px) { .conf-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
