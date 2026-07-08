import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { register } from "../services/authService";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b0b0d",
    color: "#ffffff",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "42px 18px",
    boxSizing: "border-box",
  },
  shell: {
    width: "100%",
    maxWidth: "1080px",
    margin: "0 auto",
  },
  card: {
    position: "relative",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    minHeight: "680px",
    borderRadius: "30px",
    background: "#050505",
    border: "1px solid rgba(255,255,255,.12)",
    boxShadow: "0 30px 90px rgba(0,0,0,.38)",
  },
  orangeBlock: {
    position: "absolute",
    right: "-105px",
    bottom: "-90px",
    width: "350px",
    height: "350px",
    borderRadius: "54px",
    background: "linear-gradient(135deg,#ffb000,#ff6500)",
    transform: "rotate(42deg)",
    opacity: 0.3,
  },
  lineA: {
    position: "absolute",
    right: "86px",
    top: "76px",
    width: "210px",
    height: "7px",
    borderRadius: "20px",
    background: "linear-gradient(90deg,transparent,#ffb000)",
    transform: "rotate(62deg)",
  },
  lineB: {
    position: "absolute",
    right: "20px",
    top: "210px",
    width: "190px",
    height: "7px",
    borderRadius: "20px",
    background: "#ff6500",
    transform: "rotate(-38deg)",
    opacity: 0.7,
  },
  dots: {
    position: "absolute",
    left: "0",
    bottom: "0",
    width: "190px",
    height: "110px",
    backgroundImage: "radial-gradient(rgba(255,176,0,0.4) 1.5px, transparent 1.5px)",
    backgroundSize: "14px 14px",
    opacity: 0.6,
  },
  left: {
    position: "relative",
    zIndex: 2,
    padding: "42px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "520px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: 950,
    letterSpacing: "1px",
  },
  logo: {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    objectFit: "cover",
  },
  imageWrap: {
    position: "relative",
    minHeight: "360px",
    marginTop: "32px",
    borderRadius: "28px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,.10)",
    boxShadow: "0 26px 70px rgba(0,0,0,.50)",
    background: "linear-gradient(135deg, rgba(255,176,0,.08), rgba(255,101,0,.04))",
    display: "flex",
    alignItems: "flex-end",
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg,rgba(5,5,5,.06),rgba(5,5,5,.72))",
  },
  imageText: {
    position: "absolute",
    left: "24px",
    right: "24px",
    bottom: "24px",
  },
  kicker: {
    display: "inline-block",
    marginBottom: "12px",
    color: "#ffb000",
    fontSize: "12px",
    fontWeight: 950,
    letterSpacing: "2.2px",
    textTransform: "uppercase",
  },
  heroTitle: {
    margin: 0,
    fontSize: "clamp(38px, 5vw, 62px)",
    lineHeight: 0.92,
    letterSpacing: "-2.5px",
    textTransform: "uppercase",
    fontWeight: 1000,
  },
  heroText: {
    marginTop: "16px",
    color: "rgba(255,255,255,.72)",
    lineHeight: 1.65,
    maxWidth: "430px",
    fontSize: "14px",
  },
  benefits: {
    display: "grid",
    gap: "12px",
    marginTop: "24px",
  },
  benefit: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    padding: "13px 14px",
    borderRadius: "18px",
    background: "rgba(255,255,255,.07)",
    border: "1px solid rgba(255,255,255,.08)",
    color: "rgba(255,255,255,.82)",
    fontWeight: 750,
    fontSize: "13px",
  },
  check: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#ffb000,#ff6500)",
    color: "#070707",
    display: "grid",
    placeItems: "center",
    fontWeight: 1000,
    flex: "0 0 auto",
  },
  right: {
    position: "relative",
    zIndex: 3,
    padding: "42px",
    display: "flex",
    alignItems: "center",
  },
  formPanel: {
    width: "100%",
    borderRadius: "28px",
    background: "rgba(255,255,255,.065)",
    border: "1px solid rgba(255,255,255,.12)",
    padding: "30px",
    backdropFilter: "blur(12px)",
    boxSizing: "border-box",
  },
  tag: {
    display: "inline-block",
    background: "rgba(255,176,0,0.15)",
    color: "#ffb000",
    border: "1px solid rgba(255,176,0,0.25)",
    borderRadius: "999px",
    padding: "7px 11px",
    fontSize: "11px",
    fontWeight: 950,
    marginBottom: "12px",
  },
  title: {
    margin: "0 0 8px",
    fontSize: "34px",
    lineHeight: 1,
    fontWeight: 1000,
    textTransform: "uppercase",
    letterSpacing: "-1px",
  },
  muted: {
    color: "rgba(255,255,255,.63)",
    lineHeight: 1.6,
    fontSize: "14px",
    margin: 0,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "14px",
    marginTop: "22px",
  },
  formGroup: {
    display: "grid",
    gap: "7px",
  },
  full: {
    gridColumn: "1 / -1",
  },
  label: {
    fontSize: "13px",
    color: "rgba(255,255,255,.78)",
    fontWeight: 850,
  },
  input: {
    width: "100%",
    height: "46px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.18)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    padding: "0 14px",
    outline: "none",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    height: "46px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.18)",
    background: "#151515",
    color: "white",
    padding: "0 14px",
    outline: "none",
    boxSizing: "border-box",
  },
  error: {
    color: "#ff8585",
    fontSize: "12px",
    fontWeight: 700,
  },
  passwordBox: {
    position: "relative",
  },
  eyeBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    border: 0,
    background: "rgba(255,255,255,.10)",
    color: "white",
    width: "34px",
    height: "34px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
  },
  acceptRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginTop: "16px",
    color: "rgba(255,255,255,.72)",
    fontSize: "14px",
    lineHeight: 1.45,
  },
  ctaRow: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    border: "0",
    borderRadius: "999px",
    background: "linear-gradient(135deg,#ffb000,#ff6500)",
    color: "#080808",
    padding: "14px 22px",
    fontWeight: 1000,
    cursor: "pointer",
    boxShadow: "0 14px 28px rgba(255,176,0,0.28)",
    fontSize: "14px",
  },
  secondaryBtn: {
    border: "1px solid rgba(255,255,255,.22)",
    borderRadius: "999px",
    background: "rgba(255,255,255,.06)",
    color: "#fff",
    padding: "14px 22px",
    fontWeight: 850,
    cursor: "pointer",
    fontSize: "14px",
  },
  successBox: {
    marginTop: "18px",
    borderRadius: "18px",
    background: "rgba(255,176,0,0.12)",
    border: "1px solid rgba(255,176,0,0.28)",
    color: "#ffb000",
    padding: "14px 16px",
    fontWeight: 850,
    lineHeight: 1.5,
  },
  loginText: {
    marginTop: "18px",
    color: "rgba(255,255,255,.60)",
    fontSize: "14px",
    textAlign: "center",
  },
  loginLink: {
    color: "#ffb000",
    fontWeight: 950,
    textDecoration: "none",
  },
};

const initialForm = {
  full_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  sport: "CrossFit",
  level: "Principiante",
  accept: false,
};

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [registeredUser, setRegisteredUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const passwordStrength = useMemo(() => {
    let points = 0;
    if (form.password.length >= 6) points += 1;
    if (/[A-ZÁÉÍÓÚÑ]/.test(form.password)) points += 1;
    if (/[0-9]/.test(form.password)) points += 1;
    if (/[^A-Za-zÁÉÍÓÚáéíóúÑñ0-9]/.test(form.password)) points += 1;

    if (!form.password) return { text: "Sin contraseña", color: "rgba(255,255,255,.35)", width: "0%" };
    if (points <= 1) return { text: "Débil", color: "#ff8585", width: "33%" };
    if (points <= 3) return { text: "Media", color: "#ffb000", width: "66%" };
    return { text: "Fuerte", color: "#86efac", width: "100%" };
  }, [form.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const next = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.full_name.trim().length < 3) next.full_name = "Ingresa un nombre de al menos 3 caracteres.";
    if (!emailPattern.test(form.email)) next.email = "Ingresa un correo válido.";
    if (form.password.length < 6) next.password = "Mínimo 6 caracteres.";
    if (form.password !== form.confirmPassword) next.confirmPassword = "Las contraseñas no coinciden.";
    if (!form.accept) next.accept = "Debes aceptar las condiciones.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      await register({ full_name: form.full_name, email: form.email, password: form.password });
      setRegisteredUser({ name: form.full_name, sport: form.sport, level: form.level });
      setForm(initialForm);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "No se pudo completar el registro";
      Swal.fire({ icon: "error", title: "Error", text: msg });
    } finally {
      setSubmitting(false);
    }
  };

  const clearForm = () => {
    setForm(initialForm);
    setErrors({});
    setRegisteredUser(null);
  };

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <section style={styles.card}>
          <div style={styles.orangeBlock} />
          <div style={styles.lineA} />
          <div style={styles.lineB} />
          <div style={styles.dots} />

          <aside style={styles.left}>
            <div>
              <div style={styles.logoRow}>
                <img src="/logo.png" style={styles.logo} alt="SportClub" />
                <span>SPORTCLUB</span>
              </div>

              <div style={styles.imageWrap}>
                <div style={styles.imageOverlay} />
                <div style={styles.imageText}>
                  <span style={styles.kicker}>Registro deportivo</span>
                  <h1 style={styles.heroTitle}>Crea tu cuenta</h1>
                  <p style={styles.heroText}>
                    Únete a SportClub y accede a todas las instalaciones, coaches y clases del club deportivo.
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.benefits}>
              <div style={styles.benefit}><span style={styles.check}>✓</span> Reserva clases con coaches certificados</div>
              <div style={styles.benefit}><span style={styles.check}>✓</span> Horarios flexibles de 7:00 a 22:00 hrs</div>
              <div style={styles.benefit}><span style={styles.check}>✓</span> Canchas, salas, piscina y más instalaciones</div>
            </div>
          </aside>

          <section style={styles.right}>
            <div style={styles.formPanel}>
              <span style={styles.tag}>CREA TU CUENTA</span>
              <h2 style={styles.title}>Registro</h2>
              <p style={styles.muted}>
                Completa tus datos para crear tu perfil en SportClub.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="full_name">Nombre completo</label>
                    <input id="full_name" name="full_name" value={form.full_name} onChange={handleChange} style={styles.input} placeholder="Tu nombre" autoComplete="name" />
                    {errors.full_name && <span style={styles.error}>{errors.full_name}</span>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="email">Correo</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} style={styles.input} placeholder="correo@ejemplo.com" autoComplete="email" />
                    {errors.email && <span style={styles.error}>{errors.email}</span>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="password">Contraseña</label>
                    <div style={styles.passwordBox}>
                      <input id="password" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} style={{ ...styles.input, paddingRight: "52px" }} placeholder="Mínimo 6 caracteres" autoComplete="new-password" />
                      <button type="button" style={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "🙈" : "👁"}
                      </button>
                    </div>
                    <div style={{ height: "6px", borderRadius: "999px", background: "rgba(255,255,255,.10)", overflow: "hidden" }}>
                      <div style={{ width: passwordStrength.width, height: "100%", background: passwordStrength.color, transition: "width .25s ease" }} />
                    </div>
                    <span style={{ color: passwordStrength.color, fontSize: "12px", fontWeight: 800 }}>{passwordStrength.text}</span>
                    {errors.password && <span style={styles.error}>{errors.password}</span>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="confirmPassword">Confirmar contraseña</label>
                    <div style={styles.passwordBox}>
                      <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={form.confirmPassword} onChange={handleChange} style={{ ...styles.input, paddingRight: "52px" }} placeholder="Repite tu contraseña" autoComplete="new-password" />
                      <button type="button" style={styles.eyeBtn} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? "🙈" : "👁"}
                      </button>
                    </div>
                    {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="sport">Deporte favorito</label>
                    <select id="sport" name="sport" value={form.sport} onChange={handleChange} style={styles.select}>
                      <option>CrossFit</option>
                      <option>Yoga</option>
                      <option>Spinning</option>
                      <option>Funcional</option>
                      <option>Pilates</option>
                      <option>Boxeo</option>
                      <option>Natación</option>
                      <option>Fútbol</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="level">Nivel</label>
                    <select id="level" name="level" value={form.level} onChange={handleChange} style={styles.select}>
                      <option>Principiante</option>
                      <option>Intermedio</option>
                      <option>Avanzado</option>
                    </select>
                  </div>
                </div>

                <label style={styles.acceptRow}>
                  <input name="accept" type="checkbox" checked={form.accept} onChange={handleChange} style={{ accentColor: "#ffb000", width: "16px", height: "16px", marginTop: "2px" }} />
                  <span>Acepto recibir información deportiva, novedades y recomendaciones de SportClub.</span>
                </label>
                {errors.accept && <span style={styles.error}>{errors.accept}</span>}

                <div style={styles.ctaRow}>
                  <button type="submit" style={styles.primaryBtn} disabled={submitting}>
                    {submitting ? "Creando cuenta..." : "Crear cuenta"}
                  </button>
                  <button type="button" style={styles.secondaryBtn} onClick={clearForm}>Limpiar</button>
                </div>
              </form>

              {registeredUser && (
                <div style={styles.successBox}>
                  ✅ {registeredUser.name} — Registro exitoso. Redirigiendo al inicio de sesión...
                </div>
              )}

              <p style={styles.loginText}>
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" style={styles.loginLink}>Inicia sesión</Link>
              </p>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
