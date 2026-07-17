import { useState, useEffect, useRef } from "react";
import { IcPlus, IcEdit, IcTrash, IcCheck, IcX, IcUpload } from "../../components/Icons";
import { Spinner, Modal } from "../../components/UI";
import { formatPrice } from "../../utils/helpers";
import api from "../../utils/api";
import toast from "react-hot-toast";

const CATS  = ["phones","laptops","tablets","accessories","smart"];
const EMPTY = { name:"",category:"phones",brand:"",price:"",condition:"brand new",description:"",warranty:"",image_url:"",in_stock:true,is_new:true,is_featured:false,specs:{} };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [total,    setTotal]    = useState(0);
  const [loading,  setLoading]  = useState(true);
  const [showModal,setShowModal]= useState(false);
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState(EMPTY);
  const [saving,   setSaving]   = useState(false);
  const [search,   setSearch]   = useState("");

  const load = () => {
    setLoading(true);
    api.get(`/products?limit=100${search ? `&search=${search}` : ""}`)
      .then(r => { setProducts(r.data.products || []); setTotal(r.data.total || 0); })
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [search]);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit   = (p)  => { setEditing(p.id); setForm({ ...EMPTY, ...p, price: String(p.price), specs: p.specs || {} }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category) return toast.error("Name, price and category are required");
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price) };
      if (editing) await api.put(`/products/${editing}`, payload);
      else         await api.post("/products", payload);
      toast.success(editing ? "Product updated!" : "Product added!");
      load(); setShowModal(false);
    } catch (err) { toast.error(err.response?.data?.detail || "Error saving product"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try { await api.delete(`/products/${id}`); toast.success("Product deleted"); load(); }
    catch { toast.error("Delete failed"); }
  };

  const setF = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl t-text">Products</h1>
          <p className="text-sm" style={{ color:"var(--muted)" }}>{total} total products</p>
        </div>
        <button onClick={openCreate} className="btn btn-primary">
          <IcPlus size={18} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="search-bar">
        <span className="search-icon" style={{ position:"absolute", left:"0.875rem", top:"50%", transform:"translateY(-50%)", color:"var(--muted)", pointerEvents:"none" }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search products..." className="input" style={{ paddingLeft:"2.75rem" }} />
      </div>

      {/* Table */}
      <div className="card overflow-hidden" style={{ borderRadius:"1rem" }}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>{["Image","Name","Category","Brand","Price","Stock","Featured","Actions"].map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} style={{ textAlign:"center", padding:"3rem" }}><Spinner size={32} /></td></tr>
              ) : products.map(p => (
                <tr key={p.id}>
                  <td>
                    <img src={p.image_url || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=48&q=60`}
                      alt="" className="w-11 h-11 rounded-xl object-cover"
                      style={{ border:"1px solid var(--border)" }}
                      onError={e => e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=48&q=60"} />
                  </td>
                  <td><span className="font-medium text-sm t-text">{p.name.slice(0,32)}{p.name.length > 32 ? "…" : ""}</span></td>
                  <td><span className="capitalize text-sm" style={{ color:"var(--muted)" }}>{p.category}</span></td>
                  <td><span className="text-sm" style={{ color:"var(--muted)" }}>{p.brand || "—"}</span></td>
                  <td><span className="font-bold text-sm t-primary">{formatPrice(p.price)}</span></td>
                  <td>
                    {p.in_stock
                      ? <IcCheck size={18} style={{ color:"#22c55e" }} />
                      : <IcX    size={18} style={{ color:"#ef4444" }} />}
                  </td>
                  <td>
                    {p.is_featured
                      ? <span className="badge badge-hot">Yes</span>
                      : <span className="text-xs" style={{ color:"var(--muted)" }}>No</span>}
                  </td>
                  <td>
                    <div className="flex gap-1.5">
                      <button onClick={() => openEdit(p)} className="btn btn-ghost btn-sm" style={{ padding:"0.35rem 0.625rem" }}>
                        <IcEdit size={15} />
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)} className="btn btn-sm" style={{ padding:"0.35rem 0.625rem", background:"rgba(239,68,68,0.1)", color:"#ef4444", border:"1px solid rgba(239,68,68,0.2)" }}>
                        <IcTrash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? "Edit Product" : "Add New Product"} maxWidth="580px">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>Product Name *</label>
              <input name="name" value={form.name} onChange={setF} placeholder="e.g. iPhone 15 Pro 256GB" className="input" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>Price (₦) *</label>
              <input name="price" type="number" value={form.price} onChange={setF} placeholder="0" className="input" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>Category *</label>
              <select name="category" value={form.category} onChange={setF} className="input">
                {CATS.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>Brand</label>
              <input name="brand" value={form.brand} onChange={setF} placeholder="Apple, Samsung..." className="input" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>Condition</label>
              <select name="condition" value={form.condition} onChange={setF} className="input">
                <option value="brand new">Brand New</option>
                <option value="fairly used">Fairly Used</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>Image URL</label>
              <input name="image_url" value={form.image_url} onChange={setF} placeholder="https://..." className="input" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>Description</label>
              <textarea name="description" value={form.description} onChange={setF} rows={3} className="input" placeholder="Product description..." />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:"var(--muted)" }}>Warranty</label>
              <input name="warranty" value={form.warranty} onChange={setF} placeholder="1 Year" className="input" />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              {[
                { key:"in_stock",    label:"In Stock"   },
                { key:"is_new",      label:"Mark as New"},
                { key:"is_featured", label:"Featured"   },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={!!form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                    style={{ accentColor:"var(--primary)", width:16, height:16 }} />
                  <span className="text-sm font-medium t-text">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="btn btn-primary flex-1">
              {saving ? <Spinner size={17} /> : (editing ? "Save Changes" : "Add Product")}
            </button>
            <button onClick={() => setShowModal(false)} className="btn btn-ghost flex-1">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}