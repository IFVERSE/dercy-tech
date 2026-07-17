import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Sun, Moon, Zap } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const NAV = [
  { to: "/",            label: "Home"     },
  { to: "/shop",        label: "Shop"     },
  { to: "/consultation",label: "Consult"  },
  { to: "/about",       label: "About"    },
  { to: "/contact",     label: "Contact"  },
  { to: "/vendors",     label: "Partners" },
];

const THEMES = [
  { id: "light", Icon: Sun  },
  { id: "dark",  Icon: Moon },
  { id: "neon",  Icon: Zap  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count }       = useCart();
  const { theme, setTheme } = useTheme();
  const { user, logout }    = useAuth();
  const { pathname }        = useLocation();

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Logo size="md" />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(({ to, label }) => (
            <Link key={to} to={to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === to
                  ? "t-primary font-semibold"
                  : "t-muted hover:t-text"
              }`}
              style={pathname === to ? { color: "var(--primary)" } : {}}>
              {label}
            </Link>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">

          {/* Theme switcher */}
          <div className="hidden sm:flex items-center gap-0.5 rounded-xl p-1"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            {THEMES.map(({ id, Icon }) => (
              <button key={id} onClick={() => setTheme(id)}
                className="p-1.5 rounded-lg transition-all"
                style={theme === id
                  ? { background: "var(--primary)", color: "#fff" }
                  : { color: "var(--muted)" }}>
                <Icon size={14} />
              </button>
            ))}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 rounded-lg transition-all"
            style={{ color: "var(--muted)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                style={{ background: "var(--accent)", color: "#000" }}>
                {count}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="hidden sm:flex gap-2">
              {user.is_admin && <Link to="/admin" className="btn-primary text-sm py-2 px-4">Dashboard</Link>}
              <button onClick={logout} className="btn-outline text-sm py-2 px-4">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:block btn-primary text-sm py-2 px-4">Login</Link>
          )}

          {/* Mobile menu */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2"
            style={{ color: "var(--muted)" }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden card" style={{ borderRadius: 0, borderLeft: 0, borderRight: 0 }}>
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {NAV.map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={pathname === to
                  ? { color: "var(--primary)", background: "color-mix(in srgb, var(--primary) 10%, transparent)" }
                  : { color: "var(--text)" }}>
                {label}
              </Link>
            ))}
            {/* Theme row */}
            <div className="flex gap-2 pt-2 pb-1">
              {THEMES.map(({ id, Icon }) => (
                <button key={id} onClick={() => setTheme(id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm transition-all"
                  style={theme === id
                    ? { background: "var(--primary)", color: "#fff" }
                    : { background: "var(--bg-card)", color: "var(--muted)", border: "1px solid var(--border)" }}>
                  <Icon size={14} /> {id}
                </button>
              ))}
            </div>
            {!user && (
              <Link to="/login" onClick={() => setOpen(false)} className="btn-primary w-full mt-2">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}