import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Logo({ size = "md", linkTo = "/" }) {
  const { theme } = useTheme();
  const sizes = { sm:{ img:28, text:"text-base" }, md:{ img:36, text:"text-xl" }, lg:{ img:48, text:"text-2xl" } };
  const s = sizes[size] || sizes.md;

  return (
    <Link to={linkTo} style={{ display:"flex", alignItems:"center", gap:"0.625rem", textDecoration:"none" }}>
      <img src="/dercy_tech_logo.png" alt="Dercy Tech Logo"
        width={s.img} height={s.img}
        style={{
          width:s.img, height:s.img, objectFit:"contain",
          filter: theme === "light"
            ? "none"
            : "brightness(0) invert(1) drop-shadow(0 0 5px rgba(0,212,255,0.4))",
          transition:"filter 0.3s",
        }} />
      <span className={`font-display font-bold ${s.text}`} style={{ color:"var(--text)", letterSpacing:"-0.02em" }}>
        Dercy<span style={{ color:"var(--primary)" }}>Tech</span>
      </span>
    </Link>
  );
}