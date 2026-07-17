import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import api from "../utils/api";

const CATEGORIES = ["all", "phones", "laptops", "tablets", "accessories", "smart"];
const BRANDS = ["Apple", "Samsung", "Tecno", "Infinix", "HP", "Dell", "Lenovo", "Xiaomi"];
const CONDITIONS = ["all", "brand new", "fairly used"];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get("q") || "",
    category: searchParams.get("cat") || "all",
    brand: "",
    condition: "all",
    min_price: "",
    max_price: "",
    sort: "newest",
    page: 1,
  });

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v && v !== "all") params.set(k, v); });
    api.get(`/products?${params}`).then(r => {
      setProducts(r.data.products || []);
      setTotal(r.data.total || 0);
    }).finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const setFilter = (key, val) => setFilters(f => ({ ...f, [key]: val, page: 1 }));

  return (
    <main className="pt-24 pb-16 max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="font-display font-bold text-4xl theme-text mb-2">Shop Gadgets</h1>
        <p className="theme-text-muted">{total} products available</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="theme-card rounded-2xl p-5 space-y-6 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold theme-text">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="lg:hidden theme-text-muted"><X size={18} /></button>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold theme-text-muted uppercase tracking-wider mb-2 block">Category</label>
              <div className="space-y-1">
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setFilter("category", c)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all ${filters.category === c ? "bg-sky-500 text-white" : "theme-text-muted hover:text-sky-500 hover:bg-sky-500/10"}`}>
                    {c === "all" ? "All Categories" : c}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="text-xs font-semibold theme-text-muted uppercase tracking-wider mb-2 block">Price Range (₦)</label>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" value={filters.min_price} onChange={e => setFilter("min_price", e.target.value)} className="input-field text-sm" />
                <input type="number" placeholder="Max" value={filters.max_price} onChange={e => setFilter("max_price", e.target.value)} className="input-field text-sm" />
              </div>
            </div>

            {/* Brand */}
            <div>
              <label className="text-xs font-semibold theme-text-muted uppercase tracking-wider mb-2 block">Brand</label>
              <select value={filters.brand} onChange={e => setFilter("brand", e.target.value)} className="input-field text-sm">
                <option value="">All Brands</option>
                {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="text-xs font-semibold theme-text-muted uppercase tracking-wider mb-2 block">Condition</label>
              {CONDITIONS.map(c => (
                <label key={c} className="flex items-center gap-2 py-1 cursor-pointer">
                  <input type="radio" name="condition" value={c} checked={filters.condition === c} onChange={() => setFilter("condition", c)} className="accent-sky-500" />
                  <span className="theme-text text-sm capitalize">{c === "all" ? "All" : c}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          {/* Search + Sort Bar */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 theme-text-muted" />
              <input type="text" placeholder="Search gadgets..."
                value={filters.search} onChange={e => setFilter("search", e.target.value)}
                className="input-field pl-10" />
            </div>
            <select value={filters.sort} onChange={e => setFilter("sort", e.target.value)} className="input-field w-40">
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low-High</option>
              <option value="price_desc">Price: High-Low</option>
            </select>
            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden btn-ghost p-3">
              <SlidersHorizontal size={18} />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="theme-card rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200 dark:bg-navy-700" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-navy-700 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 dark:bg-navy-700 rounded" />
                    <div className="h-4 bg-gray-200 dark:bg-navy-700 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">📦</p>
              <p className="font-display font-bold theme-text text-xl mb-2">No products found</p>
              <p className="theme-text-muted">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}