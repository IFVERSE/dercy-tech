import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IcArrow, IcShield, IcZap, IcHeadphone,
  IcTrend, IcWhatsApp, IcStar, IcPackage
} from "../components/Icons";
import ProductCard from "../components/ProductCard";
import { SkeletonCard } from "../components/UI";
import api from "../utils/api";

const CATS = [
  { id:"phones",      label:"Phones",       emoji:"📱", img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=70" },
  { id:"laptops",     label:"Laptops",      emoji:"💻", img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=70" },
  { id:"tablets",     label:"Tablets",      emoji:"📟", img:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=70" },
  { id:"accessories", label:"Accessories",  emoji:"🎧", img:"https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=300&q=70" },
  { id:"smart",       label:"Smart Gadgets",emoji:"⌚", img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=70" },
];

const TRUST = [
  { Icon: IcShield,    label:"100% Authentic",  desc:"Every product physically verified"    },
  { Icon: IcPackage,   label:"Fast Delivery",   desc:"Same-day delivery in Lagos"            },
  { Icon: IcHeadphone, label:"Expert Support",  desc:"Real tech consultation, always free"   },
  { Icon: IcTrend,     label:"Best Prices",     desc:"Fair market pricing, no markup tricks" },
];

const TESTIMONIALS = [
  { name:"Chukwuemeka O.", city:"Lagos",        rating:5, text:"Bought my MacBook Air here. Arrived sealed, original charger included. Delivery was same day! Dercy Tech is legit." },
  { name:"Amina B.",       city:"Abuja",        rating:5, text:"I used the consultation feature. They helped me pick the right laptop for my design work within my budget. Amazing!" },
  { name:"Tobi A.",        city:"Port Harcourt",rating:5, text:"iPhone 15 Pro arrived in 2 hours after payment. Paystack payment was smooth. Will definitely buy again!" },
];

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

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
        <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background:"radial-gradient(circle, var(--primary-lt), transparent 70%)" }} />
        <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl"
          style={{ background:"radial-gradient(circle, var(--accent-lt), transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-6">
            <div className="section-label w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Nigeria's #1 Trusted Tech Store
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight t-text">
              Buy Gadgets<br />
              <span className="glow-text">You Can Trust</span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed max-w-lg" style={{ color:"var(--muted)" }}>
              Authentic phones, laptops, tablets and accessories. Expert consultation, Paystack-secured payments, and same-day delivery across Lagos.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="btn btn-primary btn-lg">
                Shop Gadgets <IcArrow size={18} />
              </Link>
              <a href="https://wa.me/2348114719834?text=Hello%20Dercy%20Tech!" target="_blank" rel="noreferrer"
                className="btn btn-wa btn-lg">
                <IcWhatsApp size={18} /> WhatsApp Us
              </a>
              <Link to="/consultation" className="btn btn-outline btn-lg">
                <IcZap size={18} /> Free Consult
              </Link>
            </div>

            <div className="flex gap-6 sm:gap-10 pt-2">
              {[["500+","Products"],["10K+","Customers"],["4.9★","Rating"],["2hrs","Avg Delivery"]].map(([v,l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-xl sm:text-2xl t-primary">{v}</div>
                  <div className="text-xs" style={{ color:"var(--muted)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex justify-center relative">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-3xl animate-glow-pulse"
                style={{ border:"1px solid color-mix(in srgb, var(--primary) 30%, transparent)", background:"var(--primary-lt)" }} />
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80"
                alt="Premium Gadgets" className="w-full h-full object-cover rounded-3xl" />
              <div className="absolute -bottom-5 -right-5 card rounded-2xl px-4 py-3 shadow-2xl animate-float">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_,i) => <IcStar key={i} size={13} style={{ color:"#f59e0b", fill:"#f59e0b" }} />)}
                  <span className="font-display font-bold text-sm t-text">4.9</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color:"var(--muted)" }}>10,000+ happy customers</p>
              </div>
              <div className="absolute -top-4 -left-4 card rounded-xl px-3 py-2.5 shadow-xl">
                <div className="flex items-center gap-2">
                  <IcPackage size={14} style={{ color:"var(--accent)" }} />
                  <span className="font-display font-semibold text-xs t-text">Same-day Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-10 sm:py-12"
        style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {TRUST.map(({ Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background:"var(--primary-lt)", border:"1px solid color-mix(in srgb, var(--primary) 25%, transparent)" }}>
                <Icon size={20} style={{ color:"var(--primary)" }} />
              </div>
              <div>
                <p className="font-display font-semibold text-sm t-text">{label}</p>
                <p className="text-xs" style={{ color:"var(--muted)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-14 sm:py-16 max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-label mb-3">Browse</div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl t-text">Shop by Category</h2>
          </div>
          <Link to="/shop" className="btn btn-outline btn-sm hidden sm:inline-flex">
            View All <IcArrow size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {CATS.map(({ id, label, emoji, img }) => (
            <Link key={id} to={`/shop?cat=${id}`}
              className="product-card group relative overflow-hidden"
              style={{ aspectRatio:"1", textDecoration:"none" }}>
              <img src={img} alt={label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0"
                style={{ background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <div className="text-2xl mb-1">{emoji}</div>
                <p className="font-display font-bold text-white text-sm">{label}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/shop" className="btn btn-outline btn-full mt-4 sm:hidden"
          style={{ textDecoration:"none" }}>
          View All Products <IcArrow size={14} />
        </Link>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-14 sm:py-16 max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-label mb-3">Hot Picks</div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl t-text">Featured Products</h2>
          </div>
          <Link to="/shop" className="btn btn-outline btn-sm hidden sm:inline-flex"
            style={{ textDecoration:"none" }}>
            All Products <IcArrow size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {loading
            ? [...Array(8)].map((_,i) => <SkeletonCard key={i} />)
            : featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <Link to="/shop" className="btn btn-outline btn-full mt-6 sm:hidden"
          style={{ textDecoration:"none" }}>
          See All Products <IcArrow size={14} />
        </Link>
      </section>

      {/* BRANDS */}
      <section className="py-10 overflow-hidden"
        style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <p className="text-center text-xs uppercase tracking-widest font-bold mb-5"
          style={{ color:"var(--muted)" }}>
          Official Products From Top Brands
        </p>
        <div className="flex gap-8 sm:gap-12 items-center justify-center flex-wrap px-4">
          {["Apple","Samsung","Tecno","Infinix","HP","Dell","Lenovo","Xiaomi","Anker","Logitech"].map(b => (
            <span key={b} className="font-display font-bold text-base sm:text-lg transition-colors"
              style={{ color:"var(--muted)", opacity:0.55 }}>
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* WHY DERCY */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label mb-4">Why Us</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl t-text mb-6">
              Why Nigerians Choose<br />
              <span className="glow-text">Dercy Tech</span>
            </h2>
            <div className="space-y-5">
              {[
                ["🔐","Zero Fake Guarantee","Every product is physically verified before listing."],
                ["💬","Expert Consultation","Specialists guide you based on budget and use-case — free."],
                ["⚡","Lightning-Fast Support","WhatsApp response within minutes. Real humans, not bots."],
                ["🔒","Secure Payments","Card details never touch our servers. Paystack handles it all."],
              ].map(([e,t,d]) => (
                <div key={t} className="flex gap-4 items-start">
                  <span className="text-2xl mt-0.5 flex-shrink-0">{e}</span>
                  <div>
                    <p className="font-display font-semibold t-text">{t}</p>
                    <p className="text-sm mt-0.5 leading-relaxed" style={{ color:"var(--muted)" }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden" style={{ aspectRatio:"4/3" }}>
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80"
                alt="Happy customer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 card rounded-2xl px-5 py-4 shadow-2xl animate-float hidden sm:block">
              <p className="font-display font-bold text-2xl t-primary">10,000+</p>
              <p className="text-sm" style={{ color:"var(--muted)" }}>Happy Nigerians Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-20" style={{ background:"var(--bg-card)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="section-label mb-3 mx-auto w-fit">Reviews</div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl t-text">What Customers Say</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, city, rating, text }) => (
              <div key={name} className="card card-hover p-6" style={{ borderRadius:"1.25rem" }}>
                <div className="flex gap-1 mb-3">
                  {[...Array(rating)].map((_,i) => (
                    <IcStar key={i} size={15} style={{ color:"#f59e0b", fill:"#f59e0b" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color:"var(--muted)" }}>"{text}"</p>
                <div>
                  <p className="font-display font-semibold text-sm t-text">{name}</p>
                  <p className="text-xs" style={{ color:"var(--muted)" }}>{city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-16 max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center"
          style={{ background:"linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 55%, var(--accent)) 100%)" }}>
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="relative">
            <div className="text-4xl mb-4">🤔</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Not sure what to buy?
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Tell us your budget and purpose — our tech experts will pick the perfect gadget. Completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/consultation"
                className="btn btn-xl"
                style={{ background:"#fff", color:"var(--primary)", fontWeight:700, textDecoration:"none" }}>
                <IcZap size={20} /> Get Free Consultation
              </Link>
              <a href="https://wa.me/2348114719834?text=Hello%20Dercy%20Tech!%20I%20need%20help%20choosing%20a%20gadget."
                target="_blank" rel="noreferrer"
                className="btn btn-xl"
                style={{ background:"rgba(255,255,255,0.15)", color:"#fff", border:"1.5px solid rgba(255,255,255,0.4)" }}>
                <IcWhatsApp size={20} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}