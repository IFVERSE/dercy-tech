import { Link, useLocation } from "react-router-dom";
import { IcXCircle, IcWhatsApp, IcRefresh } from "../components/Icons";

export default function PaymentFailed() {
  const { state } = useLocation();
  return (
    <main className="pt-24 pb-16 flex items-center justify-center min-h-[80vh]">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
          style={{ background:"rgba(239,68,68,0.1)", border:"2px solid rgba(239,68,68,0.3)" }}>
          <IcXCircle size={44} style={{ color:"#ef4444" }} />
        </div>
        <div>
          <h1 className="font-display font-bold text-4xl t-text mb-2">Payment Failed</h1>
          <p style={{ color:"var(--muted)" }}>Don't worry — your cart items are still saved. Please try again or contact us.</p>
        </div>
        {state?.reference && (
          <div className="card p-4" style={{ borderRadius:"1rem" }}>
            <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color:"var(--muted)" }}>Reference</p>
            <p className="font-mono font-bold text-sm" style={{ color:"#ef4444" }}>{state.reference}</p>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <Link to="/checkout" className="btn btn-primary btn-lg btn-full">
            <IcRefresh size={18} /> Try Payment Again
          </Link>
          <a href="https://wa.me/2348114719834?text=Hello%20Dercy%20Tech!%20My%20payment%20failed%20and%20I%20need%20help."
            target="_blank" rel="noreferrer" className="btn btn-wa btn-full">
            <IcWhatsApp size={18} /> Get Help on WhatsApp
          </a>
          <Link to="/shop" className="btn btn-ghost btn-full">Continue Shopping</Link>
        </div>
      </div>
    </main>
  );
}