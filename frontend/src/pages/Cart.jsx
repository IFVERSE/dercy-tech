import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";
import { EmptyState } from "../components/UI";
import { IcTrash, IcBag, IcArrow, IcWhatsApp } from "../components/Icons";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();

  if (cart.length === 0) return (
    <main className="pt-24">
      <EmptyState emoji="🛒" title="Your cart is empty"
        desc="Browse our amazing gadgets and add something you love!"
        action={<Link to="/shop" className="btn btn-primary btn-lg">Browse Shop</Link>} />
    </main>
  );

  return (
    <main className="pt-20 pb-16 max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl t-text">
          Shopping Cart <span className="text-lg font-normal" style={{ color:"var(--muted)" }}>({cart.length} items)</span>
        </h1>
        <button onClick={clearCart} className="btn btn-ghost btn-sm text-red-400"
          style={{ borderColor:"rgba(239,68,68,0.3)" }}>
          Clear All
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map(item => {
            const img = item.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&q=70";
            return (
              <div key={item.id} className="card p-4 flex gap-4 items-center" style={{ borderRadius:"1rem" }}>
                <img src={img} alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0"
                  style={{ border:"1px solid var(--border)" }} />

                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider mb-0.5 font-semibold" style={{ color:"var(--muted)" }}>
                    {item.brand || item.category}
                  </p>
                  <p className="font-display font-semibold text-sm t-text leading-snug">
                    {item.name.slice(0, 45)}{item.name.length > 45 ? "…" : ""}
                  </p>
                  <p className="font-display font-bold t-primary mt-1">{formatPrice(item.price)}</p>
                </div>

                <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
                  {/* Qty controls */}
                  <div className="flex items-center gap-1 card" style={{ borderRadius:"0.625rem", padding:"2px" }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-lg font-bold transition-all t-text"
                      onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      −
                    </button>
                    <span className="w-8 text-center font-bold text-sm t-text">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-lg font-bold transition-all t-text"
                      onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold t-primary">{formatPrice(item.price * item.qty)}</span>
                    <button onClick={() => removeFromCart(item.id)}
                      className="p-1.5 rounded-lg transition-all" style={{ color:"var(--muted)" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>
                      <IcTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-5 sticky top-24 space-y-4" style={{ borderRadius:"1.25rem" }}>
            <h3 className="font-display font-bold t-text text-lg">Order Summary</h3>

            <div className="space-y-2 text-sm">
              {cart.map(i => (
                <div key={i.id} className="flex justify-between gap-2">
                  <span className="t-muted">{i.name.slice(0,22)}… ×{i.qty}</span>
                  <span className="t-text font-medium flex-shrink-0">{formatPrice(i.price * i.qty)}</span>
                </div>
              ))}
            </div>

            <div className="divider" />

            <div className="flex justify-between items-center">
              <span className="font-display font-bold t-text">Total</span>
              <span className="font-display font-bold text-xl t-primary">{formatPrice(total)}</span>
            </div>

            <Link to="/checkout" className="btn btn-primary btn-full btn-lg">
              Proceed to Checkout <IcArrow size={18} />
            </Link>

            <a href="https://wa.me/2348114719834?text=Hello%20Dercy%20Tech!%20I%20want%20to%20order%20some%20items."
              target="_blank" rel="noreferrer"
              className="btn btn-wa btn-full">
              <IcWhatsApp size={16} /> Order via WhatsApp
            </a>

            <Link to="/shop" className="btn btn-ghost btn-full text-sm">
              ← Continue Shopping
            </Link>

            <p className="text-xs text-center" style={{ color:"var(--muted)" }}>
              🔒 Secured by Paystack. Delivery across Nigeria.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}