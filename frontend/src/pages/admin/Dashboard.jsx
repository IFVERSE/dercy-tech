import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IcPackage, IcBag, IcDollar, IcUsers } from "../../components/Icons";
import { StatCard, Spinner } from "../../components/UI";
import { formatPrice } from "../../utils/helpers";
import api from "../../utils/api";

const STATUS_STYLE = { pending:"status-pending", paid:"status-paid", processing:"status-processing", delivered:"status-delivered", cancelled:"status-cancelled" };

export default function AdminDashboard() {
  const [stats,  setStats]  = useState({ products:0, orders:0, revenue:0, customers:0 });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/admin/stats"),
      api.get("/orders?limit=8"),
    ]).then(([s, o]) => {
      setStats(s.data);
      setOrders(o.data.orders || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Spinner size={36} /></div>;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl t-text">Dashboard</h1>
        <p className="text-sm mt-0.5" style={{ color:"var(--muted)" }}>Welcome back, Admin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={IcPackage} label="Total Products" value={stats.products} color="var(--primary)" />
        <StatCard icon={IcBag}     label="Total Orders"   value={stats.orders}   color="#a855f7" />
        <StatCard icon={IcDollar}  label="Revenue"        value={formatPrice(stats.revenue)} color="#22c55e" />
        <StatCard icon={IcUsers}   label="Customers"      value={stats.customers} color="#f59e0b" />
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/admin/products" className="card p-5 card-hover" style={{ borderRadius:"1rem", textDecoration:"none" }}>
          <IcPackage size={24} style={{ color:"var(--primary)", marginBottom:"0.75rem" }} />
          <h3 className="font-display font-semibold t-text">Manage Products</h3>
          <p className="text-sm mt-1" style={{ color:"var(--muted)" }}>Add, edit, delete, and toggle stock status</p>
        </Link>
        <Link to="/admin/orders" className="card p-5 card-hover" style={{ borderRadius:"1rem", textDecoration:"none" }}>
          <IcBag size={24} style={{ color:"#a855f7", marginBottom:"0.75rem" }} />
          <h3 className="font-display font-semibold t-text">Manage Orders</h3>
          <p className="text-sm mt-1" style={{ color:"var(--muted)" }}>View, update status, and track all orders</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold t-text">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm" style={{ color:"var(--primary)" }}>View All →</Link>
        </div>
        <div className="card overflow-hidden" style={{ borderRadius:"1rem" }}>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  {["Order ID","Customer","Phone","Total","Status","Date"].map(h => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign:"center", padding:"2rem", color:"var(--muted)" }}>No orders yet</td></tr>
                ) : orders.map(o => (
                  <tr key={o.id}>
                    <td><span className="font-mono text-xs t-text">#{o.id.slice(0,8)}</span></td>
                    <td className="t-text font-medium">{o.customer_name}</td>
                    <td style={{ color:"var(--muted)" }}>{o.customer_phone}</td>
                    <td className="font-bold t-primary">{formatPrice(o.total)}</td>
                    <td>
                      <span className={`badge ${STATUS_STYLE[o.status] || ""}`} style={{ fontSize:"0.7rem", padding:"3px 10px" }}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ color:"var(--muted)", fontSize:"0.8rem" }}>{new Date(o.created_at).toLocaleDateString("en-NG")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}