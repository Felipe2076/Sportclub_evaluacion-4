import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

const demoUsers = [
  { label: "Admin", email: "admin1@demo.cl", password: "12345678", color: "#ffb000" },
  { label: "Coach", email: "coach1@demo.cl", password: "12345678", color: "#60a5fa" },
  { label: "User", email: "user1@demo.cl", password: "12345678", color: "#86efac" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const fillDemo = (e) => {
    setEmail(e.email);
    setPassword(e.password);
    setFieldErrors({});
  };

  const validate = () => {
    const err = {};
    if (!email.trim()) err.email = "Ingresa tu correo electrónico";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) err.email = "Correo no válido";
    if (!password) err.password = "Ingresa tu contraseña";
    else if (password.length < 6) err.password = "Mínimo 6 caracteres";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    setLoading(true);
    try {
      const user = await login(email.trim(), password);
      const route = user.role === 'admin' ? '/dashboard'
        : user.role === 'coach' ? '/coach/dashboard'
        : '/user/dashboard';
      navigate(route);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Credenciales inválidas";
      Swal.fire({ icon: "error", title: "Error de acceso", text: msg, confirmButtonColor: "#ffb000" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0d", color: "#fff", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "radial-gradient(circle at top left,rgba(255,176,0,0.22),transparent 35%),radial-gradient(circle at bottom right,rgba(59,130,246,0.18),transparent 35%)" }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "440px" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "13px", fontWeight: 700, marginBottom: "16px", transition: "color .2s" }}
          onMouseEnter={(e) => e.target.style.color = "#ffb000"}
          onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>
          ← Volver al inicio
        </Link>

        <div style={{ borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(2,6,23,0.8)", backdropFilter: "blur(12px)", padding: "36px", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <img src="/logo.png" style={{ margin: "0 auto 14px", width: "60px", height: "60px", borderRadius: "18px", objectFit: "cover", display: "block", boxShadow: "0 8px 24px rgba(255,176,0,0.25)" }} alt="SportClub" />
            <h1 style={{ fontSize: "24px", fontWeight: 1000, letterSpacing: "-0.5px", margin: 0 }}>Iniciar sesión</h1>
            <p style={{ marginTop: "6px", fontSize: "14px", color: "rgba(148,163,184,0.8)" }}>
              Accede a tu cuenta de SportClub
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 700, color: "rgba(203,213,225,0.9)" }}>Correo electrónico</label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: fieldErrors.email ? "#ff8585" : "rgba(100,116,139,0.8)", pointerEvents: "none" }} />
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: "" })); }}
                  placeholder="tu@correo.cl" required
                  style={{ width: "100%", height: "48px", borderRadius: "14px", border: `1px solid ${fieldErrors.email ? "#ff8585" : "rgba(255,255,255,0.12)"}`,
                    background: "rgba(255,255,255,0.05)", padding: "0 14px 0 44px", fontSize: "14px", outline: "none", color: "#fff", boxSizing: "border-box", transition: "border .2s" }}
                  onFocus={(e) => { e.target.style.borderColor = "#ffb000"; e.target.style.boxShadow = "0 0 0 2px rgba(255,176,0,0.2)"; }}
                  onBlur={(e) => { e.target.style.borderColor = fieldErrors.email ? "#ff8585" : "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }} />
              </div>
              {fieldErrors.email && <span style={{ color: "#ff8585", fontSize: "12px", fontWeight: 700, marginTop: "4px", display: "block" }}>{fieldErrors.email}</span>}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 700, color: "rgba(203,213,225,0.9)" }}>Contraseña</label>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: fieldErrors.password ? "#ff8585" : "rgba(100,116,139,0.8)", pointerEvents: "none" }} />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: "" })); }}
                  placeholder="Ingresa tu contraseña" required
                  style={{ width: "100%", height: "48px", borderRadius: "14px", border: `1px solid ${fieldErrors.password ? "#ff8585" : "rgba(255,255,255,0.12)"}`,
                    background: "rgba(255,255,255,0.05)", padding: "0 44px 0 44px", fontSize: "14px", outline: "none", color: "#fff", boxSizing: "border-box", transition: "border .2s" }}
                  onFocus={(e) => { e.target.style.borderColor = "#ffb000"; e.target.style.boxShadow = "0 0 0 2px rgba(255,176,0,0.2)"; }}
                  onBlur={(e) => { e.target.style.borderColor = fieldErrors.password ? "#ff8585" : "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.7)", padding: "4px", display: "flex" }}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {fieldErrors.password && <span style={{ color: "#ff8585", fontSize: "12px", fontWeight: 700, marginTop: "4px", display: "block" }}>{fieldErrors.password}</span>}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", fontSize: "13px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(203,213,225,0.8)", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: "#ffb000", width: "15px", height: "15px" }} />
                Recordarme
              </label>
              <a href="#" style={{ fontWeight: 700, color: "#ffb000", textDecoration: "none", fontSize: "13px" }}
                onClick={(e) => { e.preventDefault(); Swal.fire({ icon: "info", title: "¿Olvidaste tu contraseña?", text: "Contacta al administrador del club para restablecer tu acceso.", confirmButtonColor: "#ffb000" }); }}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button type="submit" disabled={loading}
              style={{ width: "100%", height: "50px", borderRadius: "14px", border: "none", background: loading ? "rgba(255,176,0,0.6)" : "linear-gradient(135deg,#ffb000,#ff6500)",
                color: "#080808", fontSize: "16px", fontWeight: 1000, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all .2s", boxShadow: "0 8px 24px rgba(255,176,0,0.3)" }}>
              {loading ? "Ingresando..." : "Entrar a SportClub"} {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div style={{ margin: "20px 0", display: "flex", alignItems: "center", gap: "12px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px", color: "rgba(100,116,139,0.8)" }}>
            <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.08)" }} />
            Acceso rápido demo
            <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.08)" }} />
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {demoUsers.map((d) => (
              <button key={d.label} type="button" onClick={() => fillDemo(d)}
                style={{ flex: 1, minWidth: "80px", borderRadius: "12px", border: `1px solid ${d.color}44`, background: `${d.color}11`, padding: "10px 8px", color: d.color, fontWeight: 850, cursor: "pointer", fontSize: "13px", textAlign: "center", transition: "all .2s", fontFamily: "inherit" }}
                onMouseEnter={(e) => { e.target.style.background = `${d.color}22`; e.target.style.borderColor = d.color; }}
                onMouseLeave={(e) => { e.target.style.background = `${d.color}11`; e.target.style.borderColor = `${d.color}44`; }}>
                {d.label}
              </button>
            ))}
          </div>
          <p style={{ margin: "10px 0 0", textAlign: "center", fontSize: "11px", color: "rgba(148,163,184,0.6)" }}>
            Haz clic en un rol para autocompletar credenciales
          </p>

          <p style={{ marginTop: "22px", textAlign: "center", fontSize: "14px", color: "rgba(148,163,184,0.8)" }}>
            ¿No tienes cuenta?{" "}
            <Link to="/register" style={{ fontWeight: 900, color: "#ffb000", textDecoration: "none" }}>
              Regístrate gratis
            </Link>
          </p>

          <div style={{ marginTop: "16px", display: "flex", alignItems: "flex-start", gap: "10px", borderRadius: "14px", border: "1px solid rgba(255,176,0,0.2)", background: "rgba(255,176,0,0.06)", padding: "12px", fontSize: "12px", color: "rgba(203,213,225,0.7)" }}>
            <ShieldCheck size={18} style={{ color: "#ffb000", flexShrink: 0, marginTop: "1px" }} />
            <div>
              <strong style={{ color: "#ffb000", fontSize: "12px" }}>Usuarios demo:</strong><br />
              <span style={{ lineHeight: 1.6 }}>
                <strong style={{ color: "#ffb000" }}>Admin:</strong> admin1@demo.cl · 12345678 &nbsp;|&nbsp;
                <strong style={{ color: "#60a5fa" }}>Coach:</strong> coach1@demo.cl · 12345678 &nbsp;|&nbsp;
                <strong style={{ color: "#86efac" }}>User:</strong> user1@demo.cl · 12345678
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}