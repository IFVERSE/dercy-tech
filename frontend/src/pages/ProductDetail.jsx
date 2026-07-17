import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice, productWhatsApp } from "../utils/helpers";
import { PageLoader } from "../components/UI";
import {
  IcCart, IcWhatsApp, IcShare, IcChevronL,
  IcCheck, IcStar, IcShield, IcTruck
} from "../components/Icons";
import api from "../utils/api";
import toast from "react-hot-toast";

const FALLBACKS = {
  phones:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
  laptops:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
  tablets:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
  accessories:"https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&q=80",
  smart:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product,  setProduct]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [selImg,   setSelImg]   = useState(0);
  const [qty,      setQty]      = useState(1);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get(`/products/${id}`)
      .then(r => setProduct(r.data))
      .catch(() => toast.error("Product not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="pt-16"><PageLoader /></div>;
  if (!product) return (
    <main className="pt-24 text-center">
      <p className="text-6xl mb-4">😕</p>
      <h2 className="font-display font-bold text-2xl t-text mb-4">Product not found</h2>
      <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
    </main>
  );

  const images = (product.images?.length > 0 ? product.images : [product.image_url]).filter(Boolean);
  if (images.length === 0) images.push(FALLBACKS[product.category] || FALLBACKS.accessories);
  const mainImg = (!imgError && images[selImg]) ? images[selImg] : FALLBACKS[product.category] || FALLBACKS.accessories;
  const stars = Math.round(product.rating || 4.8);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    toast.success(`${qty}x ${product.name.slice(0,20)}… added to cart!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Breadcrumb */}
        <nav className="breadcrumb py-4">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to="/shop">Shop</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to={`/shop?cat=${product.category}`} className="capitalize">{product.category}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="t-text" style={{ fontWeight:500 }}>{product.name.slice(0,30)}…</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

          {/* Images */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio:"1", background:"var(--bg-card)", border:"1px solid var(--border)" }}>
              <img src={mainImg} alt={product.name} onError={() => setImgError(true)}
                className="w-full h-full object-cover" />
              {!product.in_stock && (
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background:"rgba(0,0,0,0.5)" }}>
                  <span className="badge badge-sold text-base px-5 py-2">Out of Stock</span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSelImg(i)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all"
                    style={{ border: selImg === i ? "2.5px solid var(--primary)" : "2px solid var(--border)" }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="section-label text-xs">{product.category}</span>
                {product.condition === "fairly used" && <span className="badge badge-used">Fairly Used</span>}
                {product.is_new && <span className="badge badge-new">New</span>}
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl t-text leading-snug">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_,i) => (
                    <IcStar key={i} size={15} className={i < stars ? "star-filled" : "star-empty"} />
                  ))}
                </div>
                <span className="text-sm font-semibold t-text">{(product.rating || 4.8).toFixed(1)}</span>
                <span className="text-sm" style={{ color:"var(--muted)" }}>({product.reviews_count || 0} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-4xl t-primary">{formatPrice(product.price)}</span>
              <span className={`badge ${product.in_stock ? "badge-free" : "badge-sold"} text-sm px-3 py-1.5`}>
                {product.in_stock ? "✓ In Stock" : "✗ Out of Stock"}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm leading-relaxed" style={{ color:"var(--muted)" }}>{product.description}</p>
            )}

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="card p-4" style={{ borderRadius:"1rem" }}>
                <h3 className="font-display font-semibold text-sm t-text mb-3 uppercase tracking-wider">Specifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="text-sm">
                      <span className="block text-xs uppercase tracking-wider mb-0.5" style={{ color:"var(--muted)" }}>{k}</span>
                      <span className="font-semibold t-text">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add */}
            {product.in_stock && (
              <div className="flex items-center gap-3">
                <div className="flex items-center card" style={{ borderRadius:"0.75rem", overflow:"hidden" }}>
                  <button onClick={() => setQty(q => Math.max(1, q-1))}
                    className="w-10 h-10 flex items-center justify-center transition-all font-bold text-lg t-text"
                    style={{ borderRight:"1px solid var(--border)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    −
                  </button>
                  <span className="w-12 text-center font-display font-bold t-text">{qty}</span>
                  <button onClick={() => setQty(q => q+1)}
                    className="w-10 h-10 flex items-center justify-center transition-all font-bold text-lg t-text"
                    style={{ borderLeft:"1px solid var(--border)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    +
                  </button>
                </div>
                <span className="text-sm" style={{ color:"var(--muted)" }}>
                  Total: <strong className="t-primary">{formatPrice(product.price * qty)}</strong>
                </span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button onClick={handleAdd} disabled={!product.in_stock}
                className="btn btn-primary btn-lg btn-full">
                <IcCart size={20} />
                {product.in_stock ? `Add ${qty > 1 ? qty + "x " : ""}to Cart` : "Out of Stock"}
              </button>
              <a href={productWhatsApp(product.name)} target="_blank" rel="noreferrer"
                className="btn btn-wa btn-lg btn-full">
                <IcWhatsApp size={20} /> Chat Before Buying
              </a>
              <div className="flex gap-3">
                <Link to="/consultation" className="btn btn-outline flex-1">
                  Get Expert Advice
                </Link>
                <button onClick={handleShare} className="btn btn-ghost" style={{ padding:"0.65rem 1rem" }}>
                  <IcShare size={18} />
                </button>
              </div>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {[
                [IcShield, product.warranty || "Dercy Guarantee"],
                [IcTruck,  "Lagos Same-Day Delivery"],
              ].map(([Icon, text]) => (
                <div key={text} className="flex items-center gap-2 text-xs" style={{ color:"var(--muted)" }}>
                  <Icon size={15} style={{ color:"var(--primary)", flexShrink:0 }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}