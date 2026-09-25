import { useState } from 'react';
import { useStore } from './store';
import { formatNaira } from './data';

const NIGERIAN_STATES = ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];

export default function Checkout() {
  const { cart, cartTotal, go, clearCart, setLastOrder } = useStore();
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', state: 'Kwara', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (cart.length === 0) {
    return (
      <section className="section">
        <div className="container empty">
          <span className="empty-ico">🛒</span>
          <h3>Your cart is empty</h3>
          <p>Add products before checking out.</p>
          <button className="btn btn-primary" onClick={() => go('shop')}>Shop Now</button>
        </div>
      </section>
    );
  }

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.phone || !form.address || !form.city || !form.state) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    const orderId = 'JM-' + Date.now().toString(36).toUpperCase();
    const order = {
      id: orderId,
      items: cart,
      total: cartTotal,
      customer: form,
      paymentStatus: 'Awaiting Payment',
      orderStatus: 'New Order',
      createdAt: new Date().toISOString(),
    };
    try {
      await new Promise(r => setTimeout(r, 600));
      setLastOrder(order);
      clearCart();
      go('confirmation');
    } catch {
      setError('Could not submit your order. Please try again or call 09164591760.');
      setSubmitting(false);
    }
  };

  return (
    <section className="section section-tight">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <form className="checkout-grid" onSubmit={submit}>
          <div className="co-form">
            <h3>Delivery Details</h3>
            <div className="co-fields">
              <div className="field"><label>Full Name *</label><input value={form.name} onChange={e => set('name', e.target.value)} required /></div>
              <div className="field"><label>Phone Number *</label><input value={form.phone} onChange={e => set('phone', e.target.value)} required /></div>
              <div className="field"><label>Email</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} /></div>
              <div className="field"><label>Delivery Address *</label><input value={form.address} onChange={e => set('address', e.target.value)} required /></div>
              <div className="field"><label>City *</label><input value={form.city} onChange={e => set('city', e.target.value)} required /></div>
              <div className="field"><label>State *</label>
                <select value={form.state} onChange={e => set('state', e.target.value)}>
                  {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="field co-full"><label>Additional Notes</label><textarea rows={3} value={form.notes} onChange={e => set('notes', e.target.value)} /></div>
            </div>
            {error && <div className="co-error">{error}</div>}
          </div>
          <aside className="co-summary">
            <h3>Order Summary</h3>
            <div className="co-items">
              {cart.map(i => (
                <div key={i.product.id} className="co-item">
                  <span className="co-item-name">{i.product.name}</span>
                  <span className="co-item-qty">×{i.qty}</span>
                  <span className="co-item-price">{formatNaira(i.product.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <div className="co-total"><span>Total</span><span>{formatNaira(cartTotal)}</span></div>
            <div className="co-payment">
              <h4>Payment Method</h4>
              <p className="co-pay-label">Direct Bank Transfer</p>
              <div className="bank-box">
                <p><strong>Account Name:</strong> John Chibusor Enterprises</p>
                <p><strong>Account Number:</strong> 0149888021</p>
                <p><strong>Bank:</strong> Sterling Bank</p>
              </div>
              <p className="co-note">After placing your order, please transfer the total amount to the account above. Your order will remain <strong>Awaiting Payment</strong> until payment is verified.</p>
            </div>
            <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>{submitting ? 'Placing Order…' : 'Place Order'}</button>
          </aside>
        </form>
      </div>
      <style>{`
        .checkout-grid { display: grid; grid-template-columns: 1fr 360px; gap: 28px; align-items: start; }
        .co-form h3, .co-summary h3 { font-size: 18px; margin-bottom: 16px; }
        .co-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .co-full { grid-column: 1 / -1; }
        .co-error { background: #fef2f2; color: var(--error); padding: 12px 14px; border-radius: 10px; margin-top: 14px; font-size: 14px; border: 1px solid #fecaca; }
        .co-summary { background: var(--light); border-radius: var(--radius); padding: 22px; display: flex; flex-direction: column; gap: 14px; position: sticky; top: 140px; }
        .co-items { display: flex; flex-direction: column; gap: 8px; max-height: 200px; overflow-y: auto; }
        .co-item { display: flex; justify-content: space-between; gap: 8px; font-size: 13px; }
        .co-item-name { flex: 1; color: var(--charcoal); }
        .co-item-qty { color: var(--grey); }
        .co-item-price { font-weight: 700; }
        .co-total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 800; color: var(--navy); border-top: 1px solid #cbd5e1; padding-top: 10px; }
        .co-payment { background: white; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; }
        .co-payment h4 { font-size: 14px; margin: 0 0 6px; }
        .co-pay-label { font-weight: 800; color: var(--navy); margin: 0 0 10px; }
        .bank-box p { margin: 4px 0; font-size: 13px; }
        .co-note { font-size: 12px; color: var(--grey); margin: 10px 0 0; line-height: 1.5; }
        @media (max-width: 880px) { .checkout-grid { grid-template-columns: 1fr; } .co-fields { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
