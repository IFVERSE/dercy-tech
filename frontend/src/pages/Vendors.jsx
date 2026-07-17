import { useState } from "react";
import { IcPackage, IcTrend, IcUsers, IcShield, IcCheckCircle } from "../components/Icons";
import { Spinner } from "../components/UI";
import api from "../utils/api";
import toast from "react-hot-toast";

const PERKS = [
  { Icon:IcPackage, title:"List Your Products",    desc:"Reach thousands of verified gadget buyers across Nigeria from day one." },
  { Icon:IcTrend,   title:"Real-Time Analytics",   desc:"Track your sales, revenue, and customer insights in your vendor dashboard." },
  { Icon:IcUsers,   title:"Massive Customer Base", desc:"Tap into Dercy Tech's growing community of 10,000+ active buyers." },
  { Icon:IcShield,  title:"Verified Vendor Badge", desc:"Get verified status that signals trust and boosts your product visibility." },
];

export default function Vendors() {
  const [form, setForm] = useState({ business_name:"",contact_name:"",email:"",phone:"",category:"",description:"" });
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  const setF = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.business_name || !form.email || !form.phone) return toast.error("Please fill required fields");
    setLoading(true);
    try { await api.post("/vendors/apply", form); setDone(true); }
    catch { toast.error("Submission failed. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="py-20 sm:py-28 text-center grid-bg relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4">
          <div className="section-label mb-4 mx-auto w-fit">Partner With Us</div>
          <h1 className="font-display font-bold text-4xl sm:text-6xl t-text mb-5">
            Sell on <span className="glow-text">Dercy Tech</span>
          </h1>
          <p className="text-base sm:text-xl leading-relaxed" style={{ color:"var(--muted)" }}>
            Join Nigeria's fastest-growing gadget marketplace. Reach verified buyers, grow your revenue, and build your brand with trusted support.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {PERKS.map(({ Icon, title, desc }) => (
          <div key={title} className="card p-6 text-center card-hover" style={{ borderRadius:"1.25rem" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background:"var(--primary-lt)", border:"1px solid color-mix(in srgb, var(--primary) 25%, transparent)" }}>
              <Icon size={26} style={{ color:"var(--primary)" }} />
            </div>
            <h3 className="font-display font-bold t-text mb-2">{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color:"var(--muted)" }}>{desc}</p>
          </div>
        ))}
      </section>

      {/* Application Form */}
      <section className="pb-20 max-w-2xl mx-auto px-4">
        <h2 className="font-display font-bold text-2xl sm:text-3xl t-text text-center mb-8">Apply to Become a Vendor</h2>

        {done ? (
          <div className="card p-12 text-center space-y-4" style={{ borderRadius:"1.5rem" }}>
            <IcCheckCircle size={52} style={{ color:"var(--primary)", margin:"0 auto" }} />
            <h2 className="font-display font-bold text-2xl t-text">Application Received!</h2>
            <p style={{ color:"var(--muted)" }}>Our team will review your application and contact you within 3–5 business days via WhatsApp and email.</p>
          </div>
        ) : (
          <div className="card p-6 sm:p-8 space-y-4" style={{ borderRadius:"1.5rem" }}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name:"business_name", label:"Business Name *",   placeholder:"e.g. TechZone Stores"     },
                { name:"contact_name",  label:"Contact Person",    placeholder:"Your full name"            },
                { name:"email",         label:"Business Email *",  placeholder:"store@email.com", type:"email" },
                { name:"phone",         label:"Phone Number *",    placeholder:"08012345678",    type:"tel"   },
                { name:"category",      label:"Product Category",  placeholder:"e.g. Phones, Laptops, Accessories" },
              ].map(({ name, label, placeholder, type="text" }) => (
                <div key={name} className={name === "category" ? "sm:col-span-2" : ""}>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color:"var(--muted)" }}>{label}</label>
                  <input name={name} type={type} placeholder={placeholder} value={form[name]} onChange={setF} className="input" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color:"var(--muted)" }}>About Your Business</label>
                <textarea name="description" rows={4} className="input"
                  placeholder="Tell us about your business, the products you sell, and your experience in the tech industry..."
                  value={form.description} onChange={setF} />
              </div>
            </div>
            <button onClick={handleSubmit} disabled={loading} className="btn btn-primary btn-full btn-lg">
              {loading ? <Spinner size={18} /> : "Submit Application"}
            </button>
            <p className="text-xs text-center" style={{ color:"var(--muted)" }}>
              We review all applications within 3-5 business days. No joining fee.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}