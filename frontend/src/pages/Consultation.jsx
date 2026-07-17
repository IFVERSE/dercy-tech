import { useState } from "react";
import { IcZap, IcWhatsApp, IcCheckCircle } from "../components/Icons";
import { Spinner } from "../components/UI";
import { whatsappLink, WHATSAPP_NUMBER } from "../utils/helpers";
import api from "../utils/api";
import toast from "react-hot-toast";

const PURPOSES = ["Gaming","School/Study","Work/Office","Business","Content Creation","Photography","Video Editing","Casual Use","Programming","Music Production"];
const BUDGETS  = ["Under ₦50,000","₦50k – ₦100k","₦100k – ₦200k","₦200k – ₦500k","Above ₦500k","No budget limit"];
const GADGETS  = ["Phone","Laptop","Tablet","Smart Watch","Earbuds/Headphones","Gaming Accessories","Any — help me decide"];

export default function Consultation() {
  const [form, setForm] = useState({ name:"",phone:"",email:"",gadget_type:"",purpose:"",budget:"",details:"" });
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  const setF = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const pick = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.purpose || !form.budget)
      return toast.error("Please fill all required fields");
    setLoading(true);
    try {
      await api.post("/consultations", form);
      setDone(true);
    } catch { toast.error("Submission failed. Please WhatsApp us directly."); }
    finally   { setLoading(false); }
  };

  const waMsg = `Hello Dercy Tech! I need gadget consultation.\n\nName: ${form.name}\nPhone: ${form.phone}\nGadget: ${form.gadget_type}\nPurpose: ${form.purpose}\nBudget: ${form.budget}\nDetails: ${form.details}`;

  if (done) return (
    <main className="pt-24 pb-16 flex items-center justify-center min-h-[70vh]">
      <div className="text-center space-y-5 max-w-md px-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
          style={{ background:"var(--primary-lt)", border:"2px solid var(--primary)" }}>
          <IcCheckCircle size={40} style={{ color:"var(--primary)" }} />
        </div>
        <h1 className="font-display font-bold text-3xl t-text">Request Received! 🎉</h1>
        <p style={{ color:"var(--muted)" }}>Our tech expert will reach out via WhatsApp within 2 hours with the perfect recommendation for you.</p>
        <a href={whatsappLink(WHATSAPP_NUMBER, waMsg)} target="_blank" rel="noreferrer"
          className="btn btn-wa btn-lg btn-full">
          <IcWhatsApp size={18} /> Continue on WhatsApp Now
        </a>
      </div>
    </main>
  );

  return (
    <main className="pt-20 pb-16">
      {/* Hero */}
      <section className="text-center py-12 sm:py-16 grid-bg relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 relative">
          <div className="section-label mb-4 mx-auto w-fit">
            <IcZap size={13} /> Free Service
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl t-text mb-4">
            Find Your <span className="glow-text">Perfect Gadget</span>
          </h1>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color:"var(--muted)" }}>
            Tell us what you need and our tech experts will recommend the best gadget for your exact budget and purpose. Free, no pressure.
          </p>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 mt-8">
        <div className="card p-6 sm:p-8 space-y-6" style={{ borderRadius:"1.5rem" }}>

          {/* Name & Phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color:"var(--muted)" }}>Your Name *</label>
              <input name="name" placeholder="Chukwuemeka Obi" value={form.name} onChange={setF} className="input" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color:"var(--muted)" }}>WhatsApp Number *</label>
              <input name="phone" type="tel" placeholder="08012345678" value={form.phone} onChange={setF} className="input" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color:"var(--muted)" }}>Email (optional)</label>
              <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={setF} className="input" />
            </div>
          </div>

          {/* Gadget type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-3" style={{ color:"var(--muted)" }}>What gadget do you need?</label>
            <div className="flex flex-wrap gap-2">
              {GADGETS.map(g => (
                <button key={g} onClick={() => pick("gadget_type", g)}
                  className="filter-chip" style={form.gadget_type === g ? { background:"var(--primary)", color:"#fff", borderColor:"var(--primary)" } : {}}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-3" style={{ color:"var(--muted)" }}>Main Purpose *</label>
            <div className="flex flex-wrap gap-2">
              {PURPOSES.map(p => (
                <button key={p} onClick={() => pick("purpose", p)}
                  className="filter-chip" style={form.purpose === p ? { background:"var(--primary)", color:"#fff", borderColor:"var(--primary)" } : {}}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-3" style={{ color:"var(--muted)" }}>Budget Range *</label>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map(b => (
                <button key={b} onClick={() => pick("budget", b)}
                  className="filter-chip" style={form.budget === b ? { background:"var(--primary)", color:"#fff", borderColor:"var(--primary)" } : {}}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color:"var(--muted)" }}>Additional Details</label>
            <textarea name="details" rows={3} className="input"
              placeholder="Any specific requirements? Brand preference? Color? Screen size? RAM? Tell us anything..."
              value={form.details} onChange={setF} />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleSubmit} disabled={loading} className="btn btn-primary btn-lg flex-1">
              {loading ? <Spinner size={18} /> : <IcZap size={18} />}
              Submit Request
            </button>
            <a href={whatsappLink(WHATSAPP_NUMBER, waMsg)} target="_blank" rel="noreferrer"
              className="btn btn-wa btn-lg flex-1">
              <IcWhatsApp size={18} /> Chat Directly
            </a>
          </div>
          <p className="text-xs text-center" style={{ color:"var(--muted)" }}>
            We respond within 2 hours. No spam, no pressure — just expert help.
          </p>
        </div>
      </div>
    </main>
  );
}