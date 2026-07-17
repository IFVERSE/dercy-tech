import { useEffect } from "react";

/* ── SPINNER ── */
export function Spinner({ size = 28, className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div style={{
        width: size,
        height: size,
        border: "2.5px solid var(--border)",
        borderTopColor: "var(--primary)",
        borderRadius: "50%",
        animation: "uiSpin 0.7s linear infinite",
      }} />
      <style>{`@keyframes uiSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ── PAGE LOADER ── */
export function PageLoader() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"60vh" }}>
      <Spinner size={40} />
    </div>
  );
}

/* ── MODAL ── */
export function Modal({ open, onClose, title, children, maxWidth = "520px" }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.2s ease",
      }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "1.5rem",
          width: "100%",
          maxWidth,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "var(--shadow-lg)",
          animation: "slideUp 0.3s ease",
        }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.25rem 1.5rem 1rem",
          borderBottom: "1px solid var(--border)",
        }}>
          <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:700, fontSize:"1.1rem", color:"var(--text)", margin:0 }}>
            {title}
          </h2>
          <button onClick={onClose} style={{
            background:"none", border:"none", cursor:"pointer",
            color:"var(--muted)", padding:"0.25rem", borderRadius:"0.5rem",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"1.25rem", lineHeight:1,
          }}>✕</button>
        </div>
        <div style={{ padding: "1.25rem 1.5rem" }}>{children}</div>
      </div>
    </div>
  );
}

/* ── EMPTY STATE ── */
export function EmptyState({ emoji = "📦", title, desc, action }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "5rem 1rem", textAlign: "center",
    }}>
      <span style={{ fontSize: "4rem", marginBottom: "1rem" }}>{emoji}</span>
      <h3 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:700, fontSize:"1.25rem", color:"var(--text)", marginBottom:"0.5rem" }}>
        {title}
      </h3>
      {desc && <p style={{ fontSize:"0.9rem", color:"var(--muted)", marginBottom:"1.5rem", maxWidth:"280px" }}>{desc}</p>}
      {action}
    </div>
  );
}

/* ── SKELETON CARD ── */
export function SkeletonCard() {
  return (
    <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:"1.25rem", overflow:"hidden" }}>
      <div className="skeleton" style={{ aspectRatio:"1", width:"100%" }} />
      <div style={{ padding:"1rem" }}>
        <div className="skeleton" style={{ height:10, width:"40%", marginBottom:"0.5rem" }} />
        <div className="skeleton" style={{ height:14, width:"90%", marginBottom:"0.5rem" }} />
        <div className="skeleton" style={{ height:14, width:"55%" }} />
      </div>
    </div>
  );
}

/* ── PAGINATION ── */
export function Pagination({ page, pages, onChange }) {
  if (!pages || pages <= 1) return null;

  const items = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - page) <= 1) {
      items.push(i);
    } else if (items[items.length - 1] !== "...") {
      items.push("...");
    }
  }

  const btnStyle = (active) => ({
    width: 36, height: 36,
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "0.5rem", fontSize: "0.85rem", fontWeight: 600,
    cursor: active === "disabled" ? "not-allowed" : "pointer",
    border: "1px solid var(--border)",
    background: active === true ? "var(--primary)" : "var(--bg-card)",
    color: active === true ? "#fff" : "var(--muted)",
    opacity: active === "disabled" ? 0.4 : 1,
    transition: "all 0.15s",
  });

  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", marginTop:"2rem", flexWrap:"wrap" }}>
      <button onClick={() => onChange(page - 1)} disabled={page === 1} style={btnStyle(page === 1 ? "disabled" : false)}>‹</button>
      {items.map((item, i) =>
        item === "..." ? (
          <span key={`d${i}`} style={{ color:"var(--muted)", padding:"0 0.25rem" }}>…</span>
        ) : (
          <button key={item} onClick={() => onChange(item)} style={btnStyle(page === item)}>
            {item}
          </button>
        )
      )}
      <button onClick={() => onChange(page + 1)} disabled={page === pages} style={btnStyle(page === pages ? "disabled" : false)}>›</button>
    </div>
  );
}

/* ── BACK TO TOP ── */
export function BackToTop() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button
      onClick={scrollTop}
      aria-label="Back to top"
      style={{
        position: "fixed", bottom: "5.5rem", right: "1.5rem", zIndex: 40,
        width: 42, height: 42, borderRadius: "50%",
        background: "var(--primary)", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "var(--shadow)", cursor: "pointer",
        border: "none", fontSize: "1.1rem", transition: "all 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
      ↑
    </button>
  );
}

/* ── ALERT ── */
export function Alert({ type = "info", children }) {
  const styles = {
    info:    { bg: "var(--primary-lt)", border: "var(--primary)",   color: "var(--primary)"  },
    success: { bg: "rgba(34,197,94,0.1)", border: "#22c55e",        color: "#22c55e"          },
    warning: { bg: "rgba(245,158,11,0.1)", border: "#f59e0b",       color: "#f59e0b"          },
    danger:  { bg: "rgba(239,68,68,0.1)",  border: "#ef4444",       color: "#ef4444"          },
  };
  const s = styles[type] || styles.info;
  return (
    <div style={{
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      borderRadius: "0.75rem", padding: "0.75rem 1rem",
      fontSize: "0.875rem", fontWeight: 500,
    }}>
      {children}
    </div>
  );
}

/* ── STAT CARD ── */
export function StatCard({ icon: Icon, label, value, color = "var(--primary)" }) {
  return (
    <div style={{
      background: "var(--bg-card)", border: "1px solid var(--border)",
      borderRadius: "1rem", padding: "1.25rem", boxShadow: "var(--shadow)",
    }}>
      <Icon size={22} style={{ color, marginBottom: "0.75rem" }} />
      <div style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:700, fontSize:"1.5rem", color:"var(--text)" }}>
        {value}
      </div>
      <div style={{ fontSize:"0.85rem", color:"var(--muted)", marginTop:"0.25rem" }}>{label}</div>
    </div>
  );
}