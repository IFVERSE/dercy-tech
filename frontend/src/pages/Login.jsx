import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IcZap, IcEye, IcEyeOff } from "../components/Icons";
import { Spinner } from "../components/UI";
import toast from "react-hot-toast";

export default function Login() {
  const [form,    setForm]    = useState({ email:"", password:"" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const setF = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogin = async () => {
    if (!form.email || !form.password) return toast.error("Please fill in all fields");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back! 👋`);
      navigate(user.is_admin ? "/admin" : "/");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Invalid email or password");
    } finally { setLoading(false); }
  };

  return (
    <main className="pt-24 pb-16 flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background:"linear-gradient(135deg, var(--primary), var(--accent))" }}>
            <IcZap size={26} style={{ color:"#fff" }} />
          </div>
          <h1 className="font-display font-bold text-3xl t-text">Welcome Back</h1>
          <p className="text-sm mt-1" style={{ color:"var(--muted)" }}>Sign in to your Dercy Tech account</p>
        </div>

        <div className="card p-7 space-y-4" style={{ borderRadius:"1.5rem" }}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color:"var(--muted)" }}>Email Address</label>
            <input name="email" type="email" placeholder="admin@dercytech.com"
              value={form.email} onChange={setF} className="input"
              onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color:"var(--muted)" }}>Password</label>
            <div style={{ position:"relative" }}>
              <input name="password" type={showPwd ? "text" : "password"} placeholder="••••••••••"
                value={form.password} onChange={setF} className="input" style={{ paddingRight:"3rem" }}
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
              <button onClick={() => setShowPwd(!showPwd)} type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                style={{ color:"var(--muted)", position:"absolute", top:"50%", right:"0.75rem", transform:"translateY(-50%)" }}>
                {showPwd ? <IcEyeOff size={18} /> : <IcEye size={18} />}
              </button>
            </div>
          </div>

          <button onClick={handleLogin} disabled={loading} className="btn btn-primary btn-full btn-lg">
            {loading ? <Spinner size={18} /> : "Sign In"}
          </button>
        </div>

        <div className="text-center mt-6 space-y-2">
          <p className="text-sm" style={{ color:"var(--muted)" }}>
            Need access? <Link to="/contact" style={{ color:"var(--primary)", fontWeight:600 }}>Contact us</Link>
          </p>
          <Link to="/" className="block text-sm" style={{ color:"var(--muted)" }}>← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}