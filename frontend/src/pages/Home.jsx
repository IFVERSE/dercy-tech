import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, Headphones, TrendingUp, MessageCircle, Star, Package } from "lucide-react";
import ProductCard from "../components/ProductCard";
import api from "../utils/api";

const CATS = [
  { id: "phones",      label: "Phones",        emoji: "📱" },
  { id: "laptops",     label: "Laptops",        emoji: "💻" },
  { id: "tablets",     label: "Tablets",        emoji: "📟" },
  { id: "accessories", label: "Accessories",    emoji: "🎧" },
  { id: "smart",       label: "Smart Gadgets",  emoji: "⌚" },
];

const TRUST = [
  { icon: ShieldCheck, label: "100% Authentic",  desc: "Every product verified genuine"  },
  { icon: Zap,         label: "Fast Delivery",   desc: "Same-day delivery in Lagos"       },
  { icon: Headphones,  label: "Expert Support",  desc: "Real tech consultation always"   },
  { icon: TrendingUp,  label: "Best Prices",     desc: "Market-beating deals daily"      },
];

function SkeletonCard() {
  return (
    <div className="card rounded-2xl overflow-hidden">
      <div className="skeleton aspect-square" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-1/2" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
      </div>
    </div>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    api.get("/products?featured=true&limit=8")
      .then(r => setFeatured(r.data.products || []))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="pt-16">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
        {/* Glow orbs */}
        <div className="pointer-events-none absolute top-1/4 left-1/3 w-[480px] h-[480px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(59,53,176,0.12) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-7 animate-slide-up">
            <div className="section-label">
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              Nigeria's Most Trusted Tech Store
            </div>

            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.04] t-text">
              Buy Gadgets<br />
              <span className="glow-text">You Can Trust</span>
            </h1>

            <p className="text-lg leading-relaxed max-w-md" style={{ color: "var(--muted)" }}>
              Authentic phones, laptops, accessories and more. Expert consultation, Paystack-secured payments, same-day delivery in Lagos.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary text-base px-7 py-3.5">
                Shop Gadgets <ArrowRight size={18} />
              </Link>
              <a href="https://wa.me/2348114719834?text=Hello%20Dercy%20Tech!" target="_blank" rel="noreferrer"
                className="btn-wa text-base px-7 py-3.5">
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
              <Link to="/consultation" className="btn-outline text-base px-7 py-3.5">
                <Zap size={18} /> Free Consultation
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-2">
              {[["500+","Products"],["10K+","Customers"],["4.9★","Rating"]].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-2xl t-primary">{v}</div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="hidden md:flex justify-center relative">
            <div className="relative w-[340px] h-[340px]">
              <div className="absolute inset-0 rounded-3xl animate-glow-pulse"
                style={{ border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)", background: "color-mix(in srgb, var(--primary) 6%, transparent)" }} />
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=680&q=80"
                alt="Premium Gadgets" className="w-full h-full object-cover rounded-3xl" style={{ opacity: 0.92 }} />

              {/* Floating review badge */}
              <div className="absolute -bottom-5 -right-5 card rounded-2xl px-4 py-3 shadow-2xl animate-float">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_,i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                  <span className="font-display font-bold text-sm t-text">4.9</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>10,000+ happy customers</p>
              </div>

              {/* Floating delivery badge */}
              <div className="absolute -top-4 -left-4 card rounded-xl px-3 py-2 shadow-xl">
                <div className="flex items-center gap-1.5">
                  <Package size={14} style={{ color: "var(--accent)" }} />
                  <span className="font-display font-semibold text-xs t-text">Same-day delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="py-12" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "color-mix(in srgb, var(--primary) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 25%, transparent)" }}>
                <Icon size={20} style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <p className="font-display font-semibold text-sm t-text">{label}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-label mb-3">Browse</div>
            <h2 className="font-display font-bold text-3xl t-text">Shop by Category</h2>
          </div>
          <Link to="/shop" className="btn-outline text-sm py-2 px-4">
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATS.map(({ id, label, emoji }) => (
            <Link key={id} to={`/shop?cat=${id}`}
              className="product-card p-6 flex flex-col items-center gap-3 text-center hover:-translate-y-2">
              <span className="text-4xl">{emoji}</span>
              <span className="font-display font-semibold text-sm t-text">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-label mb-3">Hot Picks</div>
            <h2 className="font-display font-bold text-3xl t-text">Featured Products</h2>
          </div>
          <Link to="/shop" className="btn-outline text-sm py-2 px-4">
            All Products <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {loading
            ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            : featured.map(p => <ProductCard key={p.id} product={p} />)
          }
        </div>
      </section>

      {/* ── MARQUEE BRANDS ── */}
      <section className="py-10 overflow-hidden" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <p className="text-center text-xs uppercase tracking-widest mb-5 font-semibold" style={{ color: "var(--muted)" }}>Official Products From</p>
        <div className="flex gap-10 items-center justify-center flex-wrap px-4">
          {["Apple","Samsung","Tecno","Infinix","HP","Dell","Lenovo","Xiaomi","Anker","Logitech"].map(b => (
            <span key={b} className="font-display font-bold text-lg" style={{ color: "var(--muted)", opacity: 0.6 }}>{b}</span>
          ))}
        </div>
      </section>

      {/* ── WHY DERCY TECH ── */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label mb-4">Why Us</div>
            <h2 className="font-display font-bold text-4xl t-text mb-6">
              Why Nigerians Choose<br />
              <span className="glow-text">Dercy Tech</span>
            </h2>
            <div className="space-y-4">
              {[
                ["🔐","Zero Fake Guarantee","Every product is physically verified before listing. We stake our reputation on authenticity."],
                ["💬","Expert-Led Consultation","Not sure what to buy? Our specialists guide you based on your exact budget and use-case."],
                ["⚡","Lightning-Fast Support","WhatsApp response within minutes, not hours. Real humans, not bots."],
                ["🔒","Secure Paystack Payments","Card details never touch our servers. Paystack's PCI-compliant checkout handles it all."],
              ].map(([e, t, d]) => (
                <div key={t} className="flex gap-4 items-start">
                  <span className="text-2xl mt-0.5">{e}</span>
                  <div>
                    <p className="font-display font-semibold t-text">{t}</p>
                    <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80"
                alt="Happy customer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 card rounded-2xl px-5 py-4 shadow-2xl animate-float">
              <p className="font-display font-bold text-2xl t-primary">10,000+</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>Happy Nigerians Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONSULTATION CTA ── */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl p-12 text-center"
          style={{ background: "linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 60%, var(--accent)) 100%)" }}>
          <div className="absolute inset-0 grid-bg opacity-10" />
          <h2 className="font-display font-bold text-4xl text-white mb-4 relative">Not sure what to buy?</h2>
          <p className="text-white/80 text-lg mb-8 relative max-w-xl mx-auto">
            Tell us your budget and purpose — our tech experts will pick the perfect gadget for you. Completely free.
          </p>
          <Link to="/consultation"
            className="inline-flex items-center gap-2 bg-white font-display font-bold px-8 py-4 rounded-xl hover:-translate-y-1 transition-all shadow-xl relative"
            style={{ color: "var(--primary)" }}>
            <Zap size={20} /> Get Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}