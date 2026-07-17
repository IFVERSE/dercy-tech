import { IcWhatsApp, IcInstagram, IcTwitter, IcFacebook, IcTikTok, IcExternal, IcPhone, IcMail } from "../components/Icons";

const WA_NUMBERS = [
  { label:"Sales & Orders",   number:"08114719834",  link:"2348114719834"  },
  { label:"Customer Support", number:"0815 411 8442", link:"2348154118442" },
];

const SOCIALS = [
  { Icon:IcInstagram, label:"Instagram",  handle:"@Dercy_tech", href:"https://instagram.com/dercy_tech",  color:"#E1306C" },
  { Icon:IcTwitter,   label:"X (Twitter)",handle:"@Dercy_tech", href:"https://x.com/dercy_tech",          color:"#1DA1F2" },
  { Icon:IcFacebook,  label:"Facebook",   handle:"Dercy_tech",  href:"https://facebook.com/dercy_tech",   color:"#1877F2" },
  { Icon:IcTikTok,    label:"TikTok",     handle:"@Dercy_tech", href:"https://tiktok.com/@dercy_tech",    color:"#000000" },
];

export default function Contact() {
  return (
    <main className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <div className="section-label mb-4 mx-auto w-fit">Get in Touch</div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl t-text mb-3">
            We're <span className="glow-text">Always Here</span>
          </h1>
          <p className="text-lg" style={{ color:"var(--muted)" }}>
            Fastest response via WhatsApp. We reply within minutes — real humans, always.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* WhatsApp */}
          <div className="card p-6 sm:p-8 space-y-5" style={{ borderRadius:"1.5rem" }}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background:"rgba(37,211,102,0.12)" }}>
                <IcWhatsApp size={22} style={{ color:"#25d366" }} />
              </div>
              <h2 className="font-display font-bold t-text text-xl">WhatsApp Support</h2>
            </div>

            {WA_NUMBERS.map(({ label, number, link }) => (
              <a key={number} href={`https://wa.me/${link}?text=Hello%20Dercy%20Tech!`} target="_blank" rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-xl transition-all"
                style={{ background:"var(--bg)", border:"1px solid var(--border)" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#25d366"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color:"var(--muted)" }}>{label}</p>
                  <p className="font-display font-bold t-text">{number}</p>
                </div>
                <IcExternal size={16} style={{ color:"var(--muted)" }} />
              </a>
            ))}

            <div className="space-y-2.5 pt-2">
              {[
                ["Join WhatsApp Group","https://chat.whatsapp.com/your-group-link"],
                ["Follow WhatsApp Channel","https://whatsapp.com/channel/your-channel"],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="btn btn-full" style={{ border:"1.5px solid #25d366", color:"#25d366", background:"transparent", justifyContent:"center", gap:"0.5rem" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(37,211,102,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <IcWhatsApp size={16} /> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="card p-6 sm:p-8 space-y-4" style={{ borderRadius:"1.5rem" }}>
            <h2 className="font-display font-bold t-text text-xl">
              Follow <span className="glow-text">@Dercy_tech</span>
            </h2>
            {SOCIALS.map(({ Icon, label, handle, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl transition-all"
                style={{ background:"var(--bg)", border:"1px solid var(--border)" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:`${color}15`, color }}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-display font-semibold t-text text-sm">{label}</p>
                  <p className="text-xs" style={{ color:"var(--muted)" }}>{handle}</p>
                </div>
                <IcExternal size={14} style={{ color:"var(--muted)" }} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 card p-8 sm:p-10 text-center" style={{ borderRadius:"1.5rem", background:"var(--primary-lt)", border:"1px solid color-mix(in srgb, var(--primary) 25%, transparent)" }}>
          <h3 className="font-display font-bold text-2xl t-text mb-2">Need gadget advice?</h3>
          <p className="mb-6" style={{ color:"var(--muted)" }}>Our tech experts will guide you to the perfect gadget for free.</p>
          <a href="/consultation" className="btn btn-primary btn-lg">Get Free Consultation</a>
        </div>
      </div>
    </main>
  );
}