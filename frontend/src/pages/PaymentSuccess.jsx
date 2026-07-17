import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { IcCheckCircle, IcPackage, IcWhatsApp } from "../components/Icons";

export default function PaymentSuccess() {
  const { state } = useLocation();

  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <main className="pt-24 pb-16 flex items-center justify-center min-h-[80vh]">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        {/* Success icon */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto animate-glow-pulse"
          style={{ background:"rgba(34,197,94,0.12)", border:"2px solid rgba(34,197,94,0.3)" }}>
          <IcCheckCircle size={44} style={{ color:"#22c55e" }} />
        </div>

        <div>
          <h1 className="font-display font-bold text-4xl t-text mb-2">Payment Successful!</h1>
          <p className="text-lg" style={{ color:"var(--muted)" }}>
            {state?.name ? `Thank you, ${state.name.split(" ")[0]}! ` : ""}
            Your order has been confirmed and is being processed.
          </p>
        </div>

        {state?.reference && (
          <div className="card p-4" style={{ borderRadius:"1rem" }}>
            <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color:"var(--muted)" }}>Order Reference</p>
            <p className="font-mono font-bold t-primary text-sm">{state.reference}</p>
            <p className="text-xs mt-1" style={{ color:"var(--muted)" }}>Save this for tracking</p>
          </div>
        )}

        <div className="card p-5 space-y-3 text-left" style={{ borderRadius:"1.25rem" }}>
          <p className="font-semibold t-text text-sm">What happens next?</p>
          {["We'll confirm your order via WhatsApp within 30 minutes","Your gadget will be packaged and dispatched","Track delivery updates via WhatsApp"].map((t,i) => (
            <div key={i} className="flex items-start gap-3 text-sm" style={{ color:"var(--muted)" }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background:"var(--primary)", color:"#fff" }}>{i+1}</span>
              {t}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/shop" className="btn btn-primary flex-1">
            <IcPackage size={18} /> Shop More
          </Link>
          <a href="https://wa.me/2348114719834?text=Hello%20Dercy%20Tech!%20I%20just%20made%20a%20payment%20and%20want%20to%20confirm%20my%20order."
            target="_blank" rel="noreferrer" className="btn btn-wa flex-1">
            <IcWhatsApp size={18} /> Confirm on WhatsApp
          </a>
        </div>
        <Link to="/" className="block text-sm" style={{ color:"var(--muted)" }}>← Back to Home</Link>
      </div>
    </main>
  );
}