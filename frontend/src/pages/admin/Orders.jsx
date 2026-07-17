import { useState, useEffect } from "react";
import { IcWhatsApp } from "../../components/Icons";
import { Spinner, Pagination } from "../../components/UI";
import { formatPrice } from "../../utils/helpers";
import api from "../../utils/api";
import toast from "react-hot-toast";

const STATUSES = ["pending","paid","processing","delivered","cancelled"];
const STATUS_STYLE = { pending:"status-pending", paid:"status-paid", processing:"status-processing", delivered:"status-delivered", cancelled:"status-cancelled" };

export default function AdminOrders() {
  const [orders,  setOrders]  = useState([]);
  const [total,   setTotal]   = useState(0);
  const [pages,   setPages]   = useState(1);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState("all");
  const [page,    setPage]    = useState(1);

  const load = () => {
    setLoading(true);
    const q = filter !== "all" ? `&status=${filter}` : "";
    api.get(`/orders?limit=15&page=${page}${q}`)
      .then(r => { setOrders(r.data.orders || []); setTotal(r.data.total || 0); setPages(r.data.pages || 1); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [filter, page]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/orders/${id}/status`, { status });
      toast.success("Order status updated!");
      load();
    } catch { toast.error("Update failed"); }
  };

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl t-text">Orders</h1>
        <p className="text-sm mt-0.5" style={{ color:"var(--muted)" }}>{total} total orders</p>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap">
        {["all", ...STATUSES].map(s => (
          <button key={s} onClick={() => { setFilter(s); setPage(1); }}
            className={`filter-chip capitalize ${filter === s ? "active" : ""}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden" style={{ borderRadius:"1rem" }}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>{["Order","Customer","Phone","Items","Total","Status","Date","Action"].map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} style={{ textAlign:"center", padding:"3rem" }}><Spinner size={32} /></td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign:"center", padding:"3rem", color:"var(--muted)" }}>No orders found</td></tr>
              ) : orders.map(o => (
                <tr key={o.id}>
                  <td><span className="font-mono text-xs t-text">#{o.id.slice(0,8)}</span></td>
                  <td><span className="font-medium text-sm t-text">{o.customer_name}</span></td>
                  <td>
                    <a href={`https://wa.me/${o.customer_phone?.replace(/\D/g,"")}`} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1 text-sm" style={{ color:"#25d366" }}>
                      <IcWhatsApp size={13} /> {o.customer_phone}
                    </a>
                  </td>
                  <td><span className="text-sm" style={{ color:"var(--muted)" }}>{o.items_count}</span></td>
                  <td><span className="font-bold text-sm t-primary">{formatPrice(o.total)}</span></td>
                  <td>
                    <span className={`badge ${STATUS_STYLE[o.status] || ""}`} style={{ fontSize:"0.68rem", padding:"3px 10px", textTransform:"capitalize" }}>
                      {o.status}
                    </span>
                  </td>
                  <td><span className="text-xs" style={{ color:"var(--muted)" }}>{new Date(o.created_at).toLocaleDateString("en-NG")}</span></td>
                  <td>
                    <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}
                      className="input input-sm" style={{ width:130, padding:"0.3rem 0.5rem", fontSize:"0.78rem" }}>
                      {STATUSES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} pages={pages} onChange={setPage} />
    </div>
  );
}