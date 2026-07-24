import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { IcSearch, IcFilter, IcX, IcGrid, IcList } from "../components/Icons";
import ProductCard from "../components/ProductCard";
import { SkeletonCard, Pagination, EmptyState } from "../components/UI";
import api from "../utils/api";

const CATS  = ["all","phones","laptops","tablets","accessories","smart"];
const BRANDS = ["All","Apple","Samsung","Tecno","Infinix","HP","Dell","Lenovo","Xiaomi","Anker","Logitech"];
const SORTS  = [["newest","Newest First"],["price_asc","Price: Low → High"],["price_desc","Price: High → Low"]];
const CONDS  = ["all","brand new","fairly used"];

export default function Shop() {
  const [params]   = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total,    setTotal]    = useState(0);
  const [pages,    setPages]    = useState(1);
  const [loading,  setLoading]  = useState(true);
  const [showSide, setShowSide] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const [filters, setFilters] = useState({
    search:    params.get("q")   || "",
    category:  params.get("cat") || "all",
    brand:     "",
    condition: "all",
    min_price: "",
    max_price: "",
    sort:      "newest",
    page:      1,
    limit:     12,
  });

  const setF = (key, val) => setFilters(f => ({ ...f, [key]: val, page: 1 }));

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const p = new URLSearchParams();
    Object.entries(filters).forEach(([k,v]) => {
      if (v && v !== "all" && v !== "") p.set(k, v);
    });
    api.get(`/products?${p}`)
      .then(r => {
        setProducts(r.data.products || []);
        setTotal(r.data.total || 0);
        setPages(r.data.pages || 1);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return (
    <main className="pt-20 pb-16 max-w-7xl mx-auto px-4">

      <div className="mb-6 sm:mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl t-text mb-1">Shop Gadgets</h1>
        <p className="text-sm" style={{ color:"var(--muted)" }}>
          {loading ? "Loading…" : `${total} product${total !== 1 ? "s" : ""} found`}
        </p>
      </div>

      <div className="flex gap-6">

        {/* Sidebar overlay on mobile */}
        {showSide && (
          <div className="fixed inset-0 z-40 lg:hidden"
            style={{ background:"rgba(0,0,0,0.4)", backdropFilter:"blur(2px)" }}
            onClick={() => setShowSide(false)} />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 lg:top-24 z-50 lg:z-auto h-full lg:h-fit
          w-72 lg:w-60 xl:w-64 flex-shrink-0 transition-transform duration-300
          ${showSide ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `} style={{ maxHeight:"calc(100vh - 6rem)", overflowY:"auto" }}>
          <div className="card p-5 space-y-6" style={{ borderRadius:"1.25rem" }}>
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold t-text">Filters</h3>
              <button onClick={() => setShowSide(false)} className="lg:hidden p-1"
                style={{ background:"none", border:"none", cursor:"pointer", color:"var(--muted)" }}>
                <IcX size={18} />
              </button>
            </div>

            {/* Category */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color:"var(--muted)" }}>Category</p>
              <div className="space-y-0.5">
                {CATS.map(c => (
                  <button key={c} onClick={() => setF("category", c)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all"
                    style={{
                      background: filters.category === c ? "var(--primary)" : "transparent",
                      color: filters.category === c ? "#fff" : "var(--muted)",
                      fontWeight: filters.category === c ? 600 : 400,
                      border: "none", cursor: "pointer",
                    }}>
                    {c === "all" ? "All Categories" : c}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color:"var(--muted)" }}>Price (₦)</p>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" value={filters.min_price}
                  onChange={e => setF("min_price", e.target.value)} className="input input-sm" />
                <input type="number" placeholder="Max" value={filters.max_price}
                  onChange={e => setF("max_price", e.target.value)} className="input input-sm" />
              </div>
            </div>

            {/* Brand */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color:"var(--muted)" }}>Brand</p>
              <select value={filters.brand}
                onChange={e => setF("brand", e.target.value === "All" ? "" : e.target.value)}
                className="input input-sm">
                {BRANDS.map(b => <option key={b} value={b === "All" ? "" : b}>{b}</option>)}
              </select>
            </div>

            {/* Condition */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color:"var(--muted)" }}>Condition</p>
              {CONDS.map(c => (
                <label key={c} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                  <input type="radio" name="cond" value={c}
                    checked={filters.condition === c}
                    onChange={() => setF("condition", c)}
                    style={{ accentColor:"var(--primary)" }} />
                  <span className="text-sm t-text capitalize">
                    {c === "all" ? "All Conditions" : c}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setFilters(f => ({ ...f, category:"all", brand:"", condition:"all", min_price:"", max_price:"", page:1 }))}
              className="btn btn-ghost btn-full text-sm">
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">

          {/* Toolbar */}
          <div className="flex gap-2 mb-5 flex-wrap">
            <div style={{ flex:1, minWidth:180, position:"relative", display:"flex", alignItems:"center" }}>
              <IcSearch size={16} style={{ position:"absolute", left:"0.875rem", color:"var(--muted)", pointerEvents:"none" }} />
              <input type="text" placeholder="Search gadgets..."
                value={filters.search} onChange={e => setF("search", e.target.value)}
                className="input" style={{ paddingLeft:"2.5rem", width:"100%" }} />
            </div>
            <select value={filters.sort} onChange={e => setF("sort", e.target.value)}
              className="input" style={{ width:"auto", minWidth:150 }}>
              {SORTS.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <div className="flex gap-1 card" style={{ padding:"4px", borderRadius:"0.75rem" }}>
              <button onClick={() => setViewMode("grid")}
                className="p-2 rounded-lg transition-all"
                style={{
                  background: viewMode === "grid" ? "var(--primary)" : "transparent",
                  color: viewMode === "grid" ? "#fff" : "var(--muted)",
                  border:"none", cursor:"pointer",
                }}>
                <IcGrid size={16} />
              </button>
              <button onClick={() => setViewMode("list")}
                className="p-2 rounded-lg transition-all"
                style={{
                  background: viewMode === "list" ? "var(--primary)" : "transparent",
                  color: viewMode === "list" ? "#fff" : "var(--muted)",
                  border:"none", cursor:"pointer",
                }}>
                <IcList size={16} />
              </button>
            </div>
            <button onClick={() => setShowSide(true)}
              className="btn btn-outline lg:hidden"
              style={{ padding:"0.6rem 1rem" }}>
              <IcFilter size={16} /> Filters
            </button>
          </div>

          {/* Active filters */}
          {(filters.category !== "all" || filters.brand || filters.condition !== "all") && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {filters.category !== "all" && (
                <button className="filter-chip active" onClick={() => setF("category","all")}>
                  {filters.category} <IcX size={12} />
                </button>
              )}
              {filters.brand && (
                <button className="filter-chip active" onClick={() => setF("brand","")}>
                  {filters.brand} <IcX size={12} />
                </button>
              )}
              {filters.condition !== "all" && (
                <button className="filter-chip active" onClick={() => setF("condition","all")}>
                  {filters.condition} <IcX size={12} />
                </button>
              )}
            </div>
          )}

          {/* Product grid */}
          {loading ? (
            <div className={viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4"
              : "space-y-3"}>
              {[...Array(9)].map((_,i) => <SkeletonCard key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <EmptyState emoji="🔍" title="No products found"
              desc="Try adjusting your search or filters"
              action={
                <button onClick={() => setFilters(f => ({ ...f, search:"", category:"all", page:1 }))}
                  className="btn btn-primary">
                  Clear Filters
                </button>
              } />
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {products.map(p => <ProductCard key={p.id} product={p} view="list" />)}
            </div>
          )}

          <Pagination
            page={filters.page}
            pages={pages}
            onChange={p => setFilters(f => ({ ...f, page: p }))}
          />
        </div>
      </div>
    </main>
  );
}