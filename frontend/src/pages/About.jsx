import { Link } from "react-router-dom";
import { IcShield, IcZap, IcGlobe, IcUsers, IcArrow } from "../components/Icons";

const VALUES = [
  { Icon:IcShield, title:"Authenticity First",    desc:"Every product we sell is 100% genuine. No clones, no fakes, no compromise." },
  { Icon:IcZap,    title:"Expert Guidance",        desc:"We don't just sell gadgets — we help you choose the right one for your needs." },
  { Icon:IcUsers,  title:"Community Trust",        desc:"Built for Nigerians, by people who understand Nigerian tech challenges." },
  { Icon:IcGlobe,  title:"Sustainable Tech",       desc:"Fake gadgets create toxic e-waste. We fight that with every authentic sale." },
];

const TEAM = [
  { name:"Dercy Tech Team", role:"Founders & Tech Experts", img:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&q=70" },
];

export default function About() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden grid-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="section-label mb-4 mx-auto w-fit">Our Story</div>
          <h1 className="font-display font-bold text-4xl sm:text-6xl t-text mb-6">
            Tech Access for <span className="glow-text">Every Nigerian</span>
          </h1>
          <p className="text-base sm:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color:"var(--muted)" }}>
            Dercy Tech was born from frustration — too many Nigerians buying fake gadgets, getting burned by bad advice, and overpaying for tech they didn't need. We built Dercy Tech to change that forever.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 grid sm:grid-cols-2 gap-6">
        {[
          { label:"Our Mission", emoji:"🎯", text:"To make authentic technology accessible, affordable, and understandable for every Nigerian — from students to business owners." },
          { label:"Our Vision",  emoji:"🔭", text:"A Nigeria where nobody wastes money on counterfeit gadgets, and everyone has access to expert tech guidance at their fingertips." },
        ].map(({ label, emoji, text }) => (
          <div key={label} className="card p-8 card-hover" style={{ borderRadius:"1.5rem" }}>
            <span className="text-5xl">{emoji}</span>
            <h3 className="font-display font-bold text-xl t-text mt-5 mb-3">{label}</h3>
            <p className="leading-relaxed" style={{ color:"var(--muted)" }}>{text}</p>
          </div>
        ))}
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20" style={{ background:"var(--bg-card)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-label mb-3 mx-auto w-fit">Values</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl t-text">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ Icon, title, desc }) => (
              <div key={title} className="card p-6 card-hover" style={{ borderRadius:"1.25rem" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background:"var(--primary-lt)", border:"1px solid color-mix(in srgb, var(--primary) 25%, transparent)" }}>
                  <Icon size={24} style={{ color:"var(--primary)" }} />
                </div>
                <h4 className="font-display font-bold t-text mb-2">{title}</h4>
                <p className="text-sm leading-relaxed" style={{ color:"var(--muted)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Climate impact */}
      <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4">
        <div className="card p-8 sm:p-10" style={{ borderRadius:"1.5rem", borderLeft:"4px solid var(--primary)" }}>
          <h2 className="font-display font-bold text-2xl t-text mb-4">⚠️ The Hidden Cost of Fake Gadgets</h2>
          <p className="leading-relaxed mb-4" style={{ color:"var(--muted)" }}>
            Counterfeit electronics don't just waste your money — they contribute to dangerous e-waste that poisons soil and water, damage the environment, and drain communities of resources. A fake phone bought today becomes toxic landfill tomorrow.
          </p>
          <p className="leading-relaxed" style={{ color:"var(--muted)" }}>
            Every authentic product we sell is one less counterfeit in the market. That's our promise: real products, real value, real positive impact on Nigeria's tech ecosystem.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center"
          style={{ background:"linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 60%, var(--accent)))" }}>
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="relative">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">Ready to buy with confidence?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Browse our authentic gadgets or get a free expert consultation today.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop" className="btn btn-xl" style={{ background:"#fff", color:"var(--primary)", fontWeight:700 }}>
                Shop Gadgets <IcArrow size={20} />
              </Link>
              <Link to="/consultation" className="btn btn-xl" style={{ background:"rgba(255,255,255,0.15)", color:"#fff", border:"1.5px solid rgba(255,255,255,0.4)" }}>
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}