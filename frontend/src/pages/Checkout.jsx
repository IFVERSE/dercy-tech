import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";
import { IcCheck, IcShield } from "../components/Icons";
import { Spinner } from "../components/UI";
import api from "../utils/api";
import toast from "react-hot-toast";

const STATES = ["Lagos","Abuja","Rivers","Kano","Oyo","Kaduna","Anambra","Delta","Enugu","Imo","Ogun","Osun","Ekiti","Kwara","Niger","Benue","Kogi","Plateau","Nasarawa","Taraba","Adamawa","Bauchi","Gombe","Borno","Yobe","Jigawa","Katsina","Zamfara","Kebbi","Sokoto","Akwa Ibom","Cross River","Bayelsa","Ebonyi","Edo","Ondo","Abia","FCT"];

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name:"", email:"", phone:"", address:"", state:"Lagos", city:""
  });

  const setF = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const validateStep1 = () => {
    if (!form.name.trim()) return toast.error("Please enter your full name");
    if (!form.email.includes("@")) return toast.error("Please enter a valid email");
    if (form.phone.length < 10) return toast.error("Please enter a valid phone number");
    setStep(2);
  };

  const handlePay = async () => {
    if (!form.address.trim()) return toast.error("Please enter delivery address");
    if (!form.city.trim()) return toast.error("Please enter your city");
    setLoading(true);

    try {
      const { data } = await api.post("/orders", { customer: form, items: cart, total });

      const PaystackPop = window.PaystackPop;
      if (!PaystackPop) {
        toast.error("Payment system not loaded. Please refresh.");
        setLoading(false);
        return;
      }

      const handler = PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder",
        email: form.email,
        amount: Math.round(total * 100),
        currency: "NGN",
        ref: data.reference,
        metadata: { order_id: data.order_id, customer_name: form.name, customer_phone: form.phone },
        callback: async (response) => {
          try {
            await api.post("/payments/verify", { reference: response.reference, order_id: data.order_id });
            clearCart();
            navigate("/payment/success", { state: { order_id: data.order_id, reference: response.reference, name: form.name } });
          } catch {
            navigate("/payment/failed", { state: { reference: response.reference } });
          }
        },
        onClose: () => {
          toast("Payment cancelled. Your order is saved — retry anytime.", { icon: "⚠️" });
          setLoading(false);
        },
      });
      handler.openIframe();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (cart.length === 0) return (
    <main className="pt-24 text-center py-20">
      <p className="text-5xl mb-4">🛒</p>
      <h2 className="font-display font-bold text-2xl t-text mb-4">Your cart is empty</h2>
      <Link to="/shop" className="btn btn-primary">Shop Gadgets</Link>
    </main>
  );

  return (
    <main className="pt-20 pb-16 max-w-5xl mx-auto px-4">
      <h1 className="font-display font-bold text-2xl sm:text-3xl t-text mb-6">Checkout</h1>

      {/* Steps indicator */}
      <div className="flex items-center gap-3 mb-8">
        {[["1","Your Details"],["2","Delivery & Pay"]].map(([n, label], idx) => (
          <div key={n} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                style={step >= idx+1
                  ? { background:"var(--primary)", color:"#fff" }
                  : { background:"var(--bg-card)", border:"2px solid var(--border)", color:"var(--muted)" }}>
                {step > idx+1 ? <IcCheck size={14} /> : n}
              </div>
              <span className="text-sm font-medium hidden sm:block"
                style={{ color: step >= idx+1 ? "var(--text)" : "var(--muted)" }}>
                {label}
              </span>
            </div>
            {idx === 0 && <div className="w-12 sm:w-20 h-0.5" style={{ background:"var(--border)" }} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 1 ? (
            <div className="card p-6 space-y-4" style={{ borderRadius:"1.25rem" }}>
              <h2 className="font-display font-bold t-text text-lg">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>Full Name *</label>
                  <input name="name" placeholder="e.g. Chukwuemeka Obi" value={form.name} onChange={setF} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>Email Address *</label>
                  <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={setF} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>Phone Number *</label>
                  <input name="phone" type="tel" placeholder="08012345678" value={form.phone} onChange={setF} className="input" />
                </div>
              </div>
              <button onClick={validateStep1} className="btn btn-primary btn-full btn-lg">
                Continue to Delivery <IcCheck size={18} />
              </button>
            </div>
          ) : (
            <div className="card p-6 space-y-4" style={{ borderRadius:"1.25rem" }}>
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold t-text text-lg">Delivery Address</h2>
                <button onClick={() => setStep(1)} className="text-sm" style={{ color:"var(--primary)" }}>← Edit Details</button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>State *</label>
                  <select name="state" value={form.state} onChange={setF} className="input">
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>City / LGA *</label>
                  <input name="city" placeholder="e.g. Ikeja, Victoria Island" value={form.city} onChange={setF} className="input" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>Delivery Address *</label>
                  <textarea name="address" rows={2} placeholder="Street address, landmark, area..." value={form.address} onChange={setF} className="input" />
                </div>
              </div>

              <div className="card p-4" style={{ borderRadius:"0.875rem", background:"var(--bg)" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color:"var(--muted)" }}>Payment Method</p>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0"
                    style={{ background:"var(--primary)", border:"3px solid var(--bg-card)", outline:"2px solid var(--primary)" }} />
                  <div>
                    <p className="font-semibold text-sm t-text">Paystack — Card / Bank Transfer / USSD</p>
                    <p className="text-xs" style={{ color:"var(--muted)" }}>Secure. Fast. Nigerian-trusted.</p>
                  </div>
                  <img src="https://website-v3-assets.s3.amazonaws.com/assets/img/hero/Paystack-mark-white-twitter.png"
                    alt="Paystack" className="h-7 ml-auto" style={{ filter:"brightness(0.8)" }}
                    onError={e => e.target.style.display = "none"} />
                </div>
              </div>

              <button onClick={handlePay} disabled={loading} className="btn btn-primary btn-full btn-xl">
                {loading ? <Spinner size={20} /> : <><IcShield size={20} /> Pay {formatPrice(total)} Securely</>}
              </button>
              <p className="text-xs text-center" style={{ color:"var(--muted)" }}>
                🔒 Your card details are never stored on our servers. Secured by Paystack PCI-DSS.
              </p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="card p-5 h-fit sticky top-24 space-y-4" style={{ borderRadius:"1.25rem" }}>
          <h3 className="font-display font-bold t-text">Order Summary</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {cart.map(i => (
              <div key={i.id} className="flex gap-3 items-center">
                <img src={i.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&q=60"}
                  alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" style={{ border:"1px solid var(--border)" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs t-text font-medium leading-snug">{i.name.slice(0,30)}…</p>
                  <p className="text-xs mt-0.5" style={{ color:"var(--muted)" }}>Qty: {i.qty}</p>
                </div>
                <span className="text-sm font-bold t-primary flex-shrink-0">{formatPrice(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="divider" />
          <div className="flex justify-between font-display font-bold t-text text-lg">
            <span>Total</span>
            <span className="t-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}