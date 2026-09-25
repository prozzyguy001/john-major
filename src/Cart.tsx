import { useStore } from './store';
import { formatNaira } from './data';
import { ProductImage } from './Product';

export default function Cart() {
  const { cart, updateQty, removeFromCart, go, cartTotal, cartCount } = useStore();

  if (cart.length === 0) {
    return (
      <section className="section">
        <div className="container empty">
          <span className="empty-ico">🛒</span>
          <h3>Your cart is empty</h3>
          <p>Browse our catalog and add products to your cart.</p>
          <button className="btn btn-primary" onClick={() => go('shop')}>Start Shopping</button>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-tight">
      <div className="container">
        <h1 className="page-title">MY CART ({cartCount})</h1>
        <div className="cart-grid">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.product.id} className="cart-row">
                <div className="cart-img" onClick={() => go('product', item.product.id)}>
                  <ProductImage product={item.product} />
                </div>
                <div className="cart-info">
                  <h3 onClick={() => go('product', item.product.id)}>{item.product.name}</h3>
                  <span className="cart-meta">{item.product.brand} · SKU: {item.product.sku}</span>
                  <span className="cart-unit">{formatNaira(item.product.price)} each</span>
                </div>
                <div className="cart-qty">
                  <button onClick={() => updateQty(item.product.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.product.id, item.qty + 1)}>+</button>
                </div>
                <span className="cart-sub">{formatNaira(item.product.price * item.qty)}</span>
                <button className="cart-remove" onClick={() => removeFromCart(item.product.id)} aria-label="Remove">✕</button>
              </div>
            ))}
          </div>
          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <div className="sum-row"><span>Subtotal</span><span>{formatNaira(cartTotal)}</span></div>
            <div className="sum-row"><span>Delivery</span><span>Calculated after order</span></div>
            <div className="sum-total"><span>Total</span><span>{formatNaira(cartTotal)}</span></div>
            <button className="btn btn-primary btn-block" onClick={() => go('checkout')}>Proceed to Checkout</button>
            <button className="btn btn-outline btn-block" onClick={() => go('shop')}>Continue Shopping</button>
          </aside>
        </div>
      </div>
      <style>{`
        .page-title { font-size: 28px; margin-bottom: 20px; }
        .cart-grid { display: grid; grid-template-columns: 1fr 320px; gap: 28px; align-items: start; }
        .cart-items { display: flex; flex-direction: column; gap: 12px; }
        .cart-row { display: grid; grid-template-columns: 80px 1fr auto auto auto; gap: 14px; align-items: center; background: white; border: 1px solid #e2e8f0; border-radius: var(--radius); padding: 12px; }
        .cart-img { width: 80px; height: 80px; border-radius: 10px; overflow: hidden; cursor: pointer; }
        .cart-img .pimg { width: 100%; height: 100%; }
        .cart-info { display: flex; flex-direction: column; gap: 2px; }
        .cart-info h3 { font-size: 14px; color: var(--navy); cursor: pointer; text-align: left; margin: 0; }
        .cart-meta { font-size: 12px; color: var(--grey); }
        .cart-unit { font-size: 12px; color: var(--electric); font-weight: 600; }
        .cart-qty { display: flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 999px; overflow: hidden; }
        .cart-qty button { padding: 6px 12px; background: var(--light); font-size: 16px; }
        .cart-qty span { padding: 0 10px; font-weight: 700; }
        .cart-sub { font-weight: 800; color: var(--navy); font-size: 15px; }
        .cart-remove { color: var(--error); font-size: 16px; background: none; border: none; padding: 6px; }
        .cart-summary { background: var(--light); border-radius: var(--radius); padding: 22px; display: flex; flex-direction: column; gap: 12px; position: sticky; top: 140px; }
        .cart-summary h3 { font-size: 17px; margin-bottom: 6px; }
        .sum-row { display: flex; justify-content: space-between; font-size: 14px; color: var(--grey); }
        .sum-total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 800; color: var(--navy); border-top: 1px solid #cbd5e1; padding-top: 10px; }
        .cart-summary .btn { margin-top: 4px; }
        @media (max-width: 880px) {
          .cart-grid { grid-template-columns: 1fr; }
          .cart-row { grid-template-columns: 60px 1fr; grid-template-rows: auto auto; row-gap: 8px; }
          .cart-qty, .cart-sub, .cart-remove { grid-column: 2; }
        }
      `}</style>
    </section>
  );
}
