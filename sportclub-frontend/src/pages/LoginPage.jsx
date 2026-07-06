import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Trophy, Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      const route = user.role === 'admin' ? '/dashboard'
        : user.role === 'coach' ? '/coach/dashboard'
        : '/user/dashboard';
      navigate(route);
    } catch {
      // handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      <div style={{
        position: "fixed", inset: 0, zIndex: -10,
        background: "radial-gradient(circle at top left,rgba(163,230,53,0.22),transparent 35%),radial-gradient(circle at bottom right,rgba(59,130,246,0.18),transparent 35%)"
      }} />

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur lg:grid-cols-2">
        <section className="relative hidden min-h-[680px] overflow-hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop"
            alt="Personas practicando deportes"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #020617, rgba(2,6,23,0.65), rgba(2,6,23,0.2))" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px" }}>
            <div style={{ marginBottom: "20px", display: "inline-flex", alignItems: "center", gap: "8px", borderRadius: "999px", background: "#a3e635", padding: "8px 16px", fontSize: "13px", fontWeight: 900, color: "#020617" }}>
              <Trophy className="h-4 w-4" /> SportClub
            </div>
            <h1 style={{ fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1px", margin: 0 }}>
              Entrena. Reserva. <br />Supera tus límites.
            </h1>
            <p style={{ marginTop: "16px", maxWidth: "420px", fontSize: "16px", color: "rgba(226,232,240,0.8)", lineHeight: 1.6 }}>
              Accede a todas las instalaciones, coaches y clases del club. Gestiona tus reservas y sigue tu progreso.
            </p>
            <div style={{ marginTop: "32px", display: "grid", gap: "12px" }}>
              {[
                "Reserva clases con coaches certificados",
                "Horarios flexibles de 7:00 a 22:00 hrs",
                "Canchas, salas, piscina y más instalaciones",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px", borderRadius: "16px", background: "rgba(255,255,255,0.1)", padding: "14px", backdropFilter: "blur(4px)" }}>
                  <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: "#a3e635" }} />
                  <span style={{ fontWeight: 700, fontSize: "14px" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", maxWidth: "100%" }}>
          <div style={{ width: "100%", maxWidth: "420px", borderRadius: "2rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(2,6,23,0.7)", padding: "28px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
            <div style={{ marginBottom: "32px", textAlign: "center" }}>
              <div style={{ margin: "0 auto 16px", width: "64px", height: "64px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "24px", background: "#a3e635", color: "#020617", boxShadow: "0 8px 24px rgba(163,230,53,0.2)" }}>
                <User className="h-8 w-8" />
              </div>
              <h2 style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.5px", margin: 0 }}>Iniciar sesión</h2>
              <p style={{ marginTop: "8px", fontSize: "14px", color: "rgba(148,163,184,0.8)" }}>
                Accede a tu cuenta de SportClub.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <label style={{ display: "block" }}>
                <span style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 700, color: "rgba(203,213,225,0.9)" }}>Correo electrónico</span>
                <div style={{ position: "relative" }}>
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2" style={{ height: "18px", width: "18px", color: "rgba(100,116,139,0.8)" }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@demo.cl"
                    required
                    style={{
                      width: "100%", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)", padding: "14px 14px 14px 44px",
                      fontSize: "14px", outline: "none", color: "white", transition: "all 0.2s",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#a3e635"; e.target.style.boxShadow = "0 0 0 2px rgba(163,230,53,0.2)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              </label>

              <label style={{ display: "block" }}>
                <span style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 700, color: "rgba(203,213,225,0.9)" }}>Contraseña</span>
                <div style={{ position: "relative" }}>
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2" style={{ height: "18px", width: "18px", color: "rgba(100,116,139,0.8)" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                    style={{
                      width: "100%", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)", padding: "14px 44px 14px 44px",
                      fontSize: "14px", outline: "none", color: "white", transition: "all 0.2s",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#a3e635"; e.target.style.boxShadow = "0 0 0 2px rgba(163,230,53,0.2)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.7)", padding: 0 }}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </label>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(203,213,225,0.8)" }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: "#a3e635" }} />
                  Recordarme
                </label>
                <a href="#" style={{ fontWeight: 700, color: "#a3e635", textDecoration: "none" }}>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", borderRadius: "16px", border: "none", background: "#a3e635",
                  padding: "14px 20px", fontSize: "15px", fontWeight: 900, color: "#020617",
                  cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { if (!loading) e.target.style.background = "#bef264"; }}
                onMouseLeave={(e) => { if (!loading) e.target.style.background = "#a3e635"; }}
              >
                {loading ? "Ingresando..." : "Entrar a SportClub"} <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div style={{ margin: "24px 0", display: "flex", alignItems: "center", gap: "12px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px", color: "rgba(100,116,139,0.8)" }}>
              <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.1)" }} />
              o
              <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.1)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", padding: "12px", color: "white", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.05)"}
              >Google</button>
              <button style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", padding: "12px", color: "white", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.05)"}
              >Microsoft</button>
            </div>

            <p style={{ marginTop: "24px", textAlign: "center", fontSize: "14px", color: "rgba(148,163,184,0.8)" }}>
              ¿No tienes cuenta?{" "}
              <Link to="/register" style={{ fontWeight: 900, color: "#a3e635", textDecoration: "none" }}>
                Regístrate gratis
              </Link>
            </p>

            <div style={{ marginTop: "20px", display: "flex", alignItems: "flex-start", gap: "12px", borderRadius: "16px", border: "1px solid rgba(163,230,53,0.2)", background: "rgba(163,230,53,0.08)", padding: "14px", fontSize: "13px", color: "rgba(203,213,225,0.8)" }}>
              <ShieldCheck className="h-5 w-5 shrink-0" style={{ color: "#a3e635", marginTop: "1px" }} />
              <div>
                <strong style={{ color: "#a3e635" }}>Usuarios demo:</strong><br />
                admin1@demo.cl / 12345678 &nbsp;|&nbsp; coach1@demo.cl / 12345678 &nbsp;|&nbsp; user1@demo.cl / 12345678
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
