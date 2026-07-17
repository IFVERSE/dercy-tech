import { IcWhatsApp } from "./Icons";

export default function WhatsAppButton() {
  return (
    <a href="https://wa.me/2348114719834?text=Hello%20Dercy%20Tech!%20I%20need%20help."
      target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1"
      style={{
        background:"#25d366",
        boxShadow:"0 4px 20px rgba(37,211,102,0.5)",
        animation:"glowPulseGreen 2.5s ease-in-out infinite",
      }}>
      <IcWhatsApp size={28} style={{ color:"#fff" }} />
      <style>{`
        @keyframes glowPulseGreen {
          0%,100% { box-shadow: 0 4px 20px rgba(37,211,102,0.5); }
          50%      { box-shadow: 0 4px 35px rgba(37,211,102,0.85); }
        }
      `}</style>
    </a>
  );
}