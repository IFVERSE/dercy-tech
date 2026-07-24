import { Link } from "react-router-dom";
import { IcCart, IcWhatsApp, IcStar, IcHeart, IcHeartFill } from "./Icons";
import { useCart } from "../context/CartContext";
import { formatPrice, productWhatsApp } from "../utils/helpers";
import toast from "react-hot-toast";

function truncate(str, n) { return str?.length > n ? str.slice(0, n) + "…" : str; }

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault(); e.stopPropagation();
    addToCart(product);
    toast.success(`Added to cart!`, { icon: "🛒" });
  };

  const img = product.image_url
    || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=70`;

  return (
    <Link to={`/product/${product.id}`} className="product-card group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square"
        style={{ background: "var(--bg-card)" }}>
        <img src={img} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          {product.is_new && <span className="badge-new">NEW</span>}
          {!product.in_stock && <span className="badge-sold">SOLD OUT</span>}
          {product.condition === "fairly used" && (
            <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(251,191,36,0.15)", color: "#f59e0b" }}>USED</span>
          )}
        </div>

        {/* Quick-action bar */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button onClick={handleAdd} disabled={!product.in_stock}
            className="flex-1 btn-primary text-xs py-2 disabled:opacity-50">
            <ShoppingCart size={13} /> Add to Cart
          </button>
          <a href={productWhatsApp(product.name)} target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="w-9 h-9 btn-wa rounded-xl flex items-center justify-center p-0 flex-shrink-0">
            <MessageCircle size={15} />
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider mb-1 font-medium" style={{ color: "var(--muted)" }}>{product.brand || product.category}</p>
        <h3 className="font-display font-semibold text-sm leading-snug mb-2.5 t-text">{truncate(product.name, 38)}</h3>
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-base t-primary">{formatPrice(product.price)}</span>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs" style={{ color: "var(--muted)" }}>{product.rating?.toFixed(1) || "4.8"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}