import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/Logo";
import {
  IcLayout, IcPackage, IcBag, IcUsers, IcSettings,
  IcLogOut, IcMenu, IcX, IcZap
} from "../../components/Icons";

const LINKS = [
  { to:"/admin",          Icon:IcLayout,  label:"Dashboard" },
  { to:"/admin/products", Icon:IcPackage, label:"Products"  },
  { to:"/admin/orders",   Icon:IcBag,     label:"Orders"    },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  const SideContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b" style={{ borderColor:"var(--border)" }}>
        {collapsed ? (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto"
            style={{ background:"linear-gradient(135deg, var(--primary), var(--accent))" }}>
            <IcZap size={16} style={{ color:"#fff" }} />
          </div>
        ) : <Logo size="sm" />}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 pt-4 overflow-y-auto">
        {LINKS.map(({ to, Icon, label }) => {
          const active = pathname === to || (to !== "/admin" && pathname.startsWith(to));
          return (
            <Link key={to} to={to} onClick={() => setMobileOpen(false)}
              className="flex items-center rounded-xl transition-all font-medium text-sm"
              style={{
                gap: collapsed ? 0 : "0.75rem",
                padding: collapsed ? "0.6rem" : "0.625rem 0.875rem",
                justifyContent: collapsed ? "center" : "flex-start",
                background: active ? "var(--primary)" : "transparent",
                color: active ? "#fff" : "var(--muted)",
              }}
              onMouseEnter={e => { if(!active) { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text)"; }}}
              onMouseLeave={e => { if(!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; }}}>
              <Icon size={18} style={{ flexShrink:0 }} />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t space-y-1" style={{ borderColor:"var(--border)" }}>
        <button onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center rounded-xl transition-all text-sm py-2.5"
          style={{ gap: collapsed ? 0 : "0.75rem", padding: collapsed ? "0.6rem" : "0.625rem 0.875rem", justifyContent: collapsed ? "center" : "flex-start", color:"var(--muted)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; }}>
          {collapsed ? <IcMenu size={18} /> : <><IcX size={18} /><span>Collapse</span></>}
        </button>
        <button onClick={handleLogout}
          className="w-full flex items-center rounded-xl transition-all text-sm"
          style={{ gap: collapsed ? 0 : "0.75rem", padding: collapsed ? "0.6rem" : "0.625rem 0.875rem", justifyContent: collapsed ? "center" : "flex-start", color:"#ef4444" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          <IcLogOut size={18} style={{ flexShrink:0 }} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen t-bg overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col flex-shrink-0 transition-all duration-300"
        style={{ width: collapsed ? 64 : 220, background:"var(--bg-card)", borderRight:"1px solid var(--border)" }}>
        <SideContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 lg:hidden" style={{ background:"rgba(0,0,0,0.4)" }} onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 bottom-0 z-50 w-60 lg:hidden flex flex-col"
            style={{ background:"var(--bg-card)", borderRight:"1px solid var(--border)" }}>
            <SideContent />
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between px-4 border-b flex-shrink-0"
          style={{ background:"var(--bg-card)", borderColor:"var(--border)" }}>
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg" style={{ color:"var(--muted)" }}>
            <IcMenu size={20} />
          </button>
          <span className="font-display font-bold text-sm t-text hidden sm:block">
            Dercy Tech — Admin Panel
          </span>
          <Link to="/" className="text-xs" style={{ color:"var(--muted)" }}>← View Site</Link>
        </header>
        <main className="flex-1 overflow-y-auto" style={{ background:"var(--bg)" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}