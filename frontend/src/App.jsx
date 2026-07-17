import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider }  from "./context/ThemeContext";
import { CartProvider }   from "./context/CartContext";
import { AuthProvider }   from "./context/AuthContext";
import Navbar             from "./components/Navbar";
import Footer             from "./components/Footer";
import WhatsAppButton     from "./components/WhatsAppButton";
import { BackToTop }      from "./components/UI";
import ProtectedRoute     from "./components/ProtectedRoute";

// Public Pages
import Home          from "./pages/Home";
import Shop          from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart          from "./pages/Cart";
import Checkout      from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed  from "./pages/PaymentFailed";
import Consultation  from "./pages/Consultation";
import About         from "./pages/About";
import Contact       from "./pages/Contact";
import Vendors       from "./pages/Vendors";
import Login         from "./pages/Login";

// Admin Pages
import AdminLayout   from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts  from "./pages/admin/Products";
import AdminOrders    from "./pages/admin/Orders";

// Public wrapper with navbar + footer
function PublicLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "var(--bg-card)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                },
              }}
            />

            <Routes>

              {/* ── ADMIN ROUTES ── */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders"   element={<AdminOrders />} />
              </Route>

              {/* ── PUBLIC ROUTES ── */}
              <Route path="/" element={
                <PublicLayout><Home /></PublicLayout>
              } />
              <Route path="/shop" element={
                <PublicLayout><Shop /></PublicLayout>
              } />
              <Route path="/product/:id" element={
                <PublicLayout><ProductDetail /></PublicLayout>
              } />
              <Route path="/cart" element={
                <PublicLayout><Cart /></PublicLayout>
              } />
              <Route path="/checkout" element={
                <PublicLayout><Checkout /></PublicLayout>
              } />
              <Route path="/payment/success" element={
                <PublicLayout><PaymentSuccess /></PublicLayout>
              } />
              <Route path="/payment/failed" element={
                <PublicLayout><PaymentFailed /></PublicLayout>
              } />
              <Route path="/consultation" element={
                <PublicLayout><Consultation /></PublicLayout>
              } />
              <Route path="/about" element={
                <PublicLayout><About /></PublicLayout>
              } />
              <Route path="/contact" element={
                <PublicLayout><Contact /></PublicLayout>
              } />
              <Route path="/vendors" element={
                <PublicLayout><Vendors /></PublicLayout>
              } />
              <Route path="/login" element={
                <PublicLayout><Login /></PublicLayout>
              } />

              {/* 404 fallback */}
              <Route path="*" element={
                <PublicLayout>
                  <div style={{ textAlign:"center", padding:"8rem 1rem" }}>
                    <p style={{ fontSize:"5rem", marginBottom:"1rem" }}>😕</p>
                    <h1 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:700, fontSize:"2rem", color:"var(--text)", marginBottom:"1rem" }}>
                      Page Not Found
                    </h1>
                    <p style={{ color:"var(--muted)", marginBottom:"2rem" }}>
                      The page you're looking for doesn't exist.
                    </p>
                    <a href="/" className="btn btn-primary">Go Home</a>
                  </div>
                </PublicLayout>
              } />

            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}