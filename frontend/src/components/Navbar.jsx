import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart }  from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth }  from "../context/AuthContext";
import Logo from "./Logo";
import {
  IcCart, IcMenu, IcX, IcSun, IcMoon, IcZap, IcSearch
} from "./Icons";

const NAV = [
  { to: "/",             label: "Home"     },
  { to: "/shop",         label: "Shop"     },
  { to: "/consultation", label: "Consult"  },
  { to: "/about",        label: "About"    },
  { to: "/contact",      label: "Contact"  },
  { to: "/vendors",      label: "Partners" },
];

const THEMES = [
  { id: "light", Icon: IcSun  },
  { id: "dark",  Icon: IcMoon },
  { id: "neon",  Icon: IcZap  },
];

export default function Navbar() {
  const [open,       setOpen]       = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ,    setSearchQ]    = useState("");
  const [scrolled,   setScrolled]   = useState(false);
  const searchRef = useRef(null);
  const navigate  = useNavigate();
  const { count }           = useCart();
  const { theme, setTheme } = useTheme();
  const { user, logout }    = useAuth();
  const { pathname }        = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQ.trim())}`);
      setSearchOpen(false);
      setSearchQ("");
    }
  };

  return (
    <>
      <nav
        className="navbar"
        style={{ boxShadow: scrolled ? "var(--shadow)" : "none" }}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">

          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map(({ to, label }) => (
              <Link key={to} to={to}
                style={{
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: pathname === to ? 600 : 400,
                  color: pathname === to ? "var(--primary)" : "var(--muted)",
                  background: pathname === to ? "var(--primary-lt)" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-1.5">

            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
                color: "var(--muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "none",
              }}
              className="sm:flex items-center justify-center">
              <IcSearch size={18} />
            </button>

            {/* Theme Switcher */}
            <div
              className="hidden sm:flex items-center gap-0.5 rounded-xl p-1"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}>
              {THEMES.map(({ id, Icon }) => (
                <button
                  key={id}
                  onClick={() => setTheme(id)}
                  style={{
                    padding: "0.375rem",
                    borderRadius: "0.5rem",
                    background: theme === id ? "var(--primary)" : "none",
                    color: theme === id ? "#fff" : "var(--muted)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}>
                  <Icon size={14} />
                </button>
              ))}
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              style={{
                position: "relative",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                color: "var(--muted)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <IcCart size={20} />
              {count > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  color: "#000",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                {user.is_admin && (
                  <Link to="/admin" className="btn btn-primary btn-sm">
                    Dashboard
                  </Link>
                )}
                <button onClick={logout} className="btn btn-ghost btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex btn btn-primary btn-sm"
                style={{ textDecoration: "none" }}>
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden"
              style={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
                color: "var(--muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {open ? <IcX size={22} /> : <IcMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div
            className="border-t"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-card)",
            }}>
            <div className="max-w-7xl mx-auto px-4 py-3">
              <form
                onSubmit={handleSearch}
                style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <IcSearch
                  size={18}
                  style={{
                    position: "absolute",
                    left: "0.875rem",
                    color: "var(--muted)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  placeholder="Search for phones, laptops, accessories..."
                  className="input"
                  style={{ paddingLeft: "2.75rem", borderRadius: "0.875rem" }}
                />
              </form>
            </div>
          </div>
        )}

        {/* Mobile Drawer */}
        {open && (
          <div
            className="lg:hidden border-t"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-card)",
            }}>
            <div className="max-w-7xl mx-auto px-4 py-4">

              {/* Mobile Search */}
              <form
                onSubmit={handleSearch}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}>
                <IcSearch
                  size={18}
                  style={{
                    position: "absolute",
                    left: "0.875rem",
                    color: "var(--muted)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  placeholder="Search gadgets..."
                  className="input"
                  style={{ paddingLeft: "2.75rem" }}
                />
              </form>

              {/* Nav Links */}
              <div className="space-y-1 mb-3">
                {NAV.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.75rem 1rem",
                      borderRadius: "0.75rem",
                      fontSize: "0.875rem",
                      fontWeight: pathname === to ? 600 : 400,
                      color: pathname === to ? "var(--primary)" : "var(--text)",
                      background: pathname === to ? "var(--primary-lt)" : "transparent",
                      textDecoration: "none",
                    }}>
                    {label}
                  </Link>
                ))}
              </div>

              {/* Theme Switcher Row */}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                {THEMES.map(({ id, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTheme(id)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.375rem",
                      padding: "0.625rem",
                      borderRadius: "0.75rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      background: theme === id ? "var(--primary)" : "var(--bg)",
                      color: theme === id ? "#fff" : "var(--muted)",
                      border: theme === id ? "none" : "1px solid var(--border)",
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}>
                    <Icon size={13} /> {id}
                  </button>
                ))}
              </div>

              {/* Auth */}
              {user ? (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {user.is_admin && (
                    <Link to="/admin" className="btn btn-primary"
                      style={{ flex: 1, justifyContent: "center", textDecoration: "none" }}>
                      Dashboard
                    </Link>
                  )}
                  <button onClick={logout} className="btn btn-ghost" style={{ flex: 1 }}>
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary btn-full"
                  style={{ textDecoration: "none", justifyContent: "center" }}>
                  Login to Account
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}