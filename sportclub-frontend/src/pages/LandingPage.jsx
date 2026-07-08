import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#ffffff",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "30px 18px",
  },
  shell: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heroCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "28px",
    background: "#050505",
    minHeight: "580px",
    boxShadow: "0 28px 80px rgba(0,0,0,.5)",
    border: "1px solid rgba(255,255,255,.08)",
  },
  nav: {
    position: "relative",
    zIndex: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 36px",
    gap: "20px",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: 900,
    letterSpacing: "1px",
  },
  logo: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    objectFit: "cover",
  },
  menu: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    fontSize: "13px",
    fontWeight: 700,
  },
  link: {
    color: "#f5f5f5",
    textDecoration: "none",
    opacity: 0.85,
    transition: "opacity 0.2s",
  },
  heroContent: {
    position: "relative",
    zIndex: 4,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    padding: "30px 36px 40px",
    alignItems: "center",
  },
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#ffb000",
    fontSize: "13px",
    fontWeight: 900,
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    marginBottom: "16px",
  },
  title: {
    margin: 0,
    fontSize: "clamp(48px, 6.5vw, 88px)",
    lineHeight: 0.9,
    letterSpacing: "-3px",
    fontWeight: 1000,
    textTransform: "uppercase",
  },
  accent: {
    background: "linear-gradient(135deg,#ffb000,#ff6500)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    marginTop: "18px",
    maxWidth: "440px",
    color: "rgba(255,255,255,.65)",
    fontSize: "15px",
    lineHeight: 1.7,
  },
  ctaRow: {
    display: "flex",
    gap: "14px",
    marginTop: "28px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    border: "0",
    borderRadius: "999px",
    background: "linear-gradient(135deg,#ffb000,#ff6500)",
    color: "#080808",
    padding: "13px 24px",
    fontWeight: 950,
    cursor: "pointer",
    boxShadow: "0 14px 28px rgba(255,176,0,0.35)",
    fontSize: "14px",
  },
  secondaryBtn: {
    border: "1px solid rgba(255,255,255,.2)",
    borderRadius: "999px",
    background: "rgba(255,255,255,.06)",
    color: "#fff",
    padding: "13px 24px",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: "14px",
  },
  visual: {
    position: "relative",
    minHeight: "370px",
  },
  athleteImage: {
    position: "absolute",
    right: "20px",
    top: "10px",
    width: "80%",
    height: "370px",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "24px",
    filter: "contrast(1.1) saturate(1.05)",
    boxShadow: "0 28px 70px rgba(0,0,0,.55)",
  },
  imageOverlay: {
    position: "absolute",
    right: "20px",
    top: "10px",
    width: "80%",
    height: "370px",
    borderRadius: "24px",
    background: "linear-gradient(90deg,rgba(5,5,5,.8),rgba(5,5,5,.05) 50%,rgba(255,176,0,0.12))",
  },
  orangeBlock: {
    position: "absolute",
    right: "-80px",
    bottom: "-60px",
    width: "280px",
    height: "280px",
    background: "linear-gradient(135deg,#ffb000,#ff6500)",
    transform: "rotate(42deg)",
    borderRadius: "40px",
    opacity: 0.6,
  },
  lineA: {
    position: "absolute",
    right: "70px",
    top: "90px",
    width: "180px",
    height: "5px",
    background: "linear-gradient(90deg,transparent,#ffb000)",
    transform: "rotate(62deg)",
    borderRadius: "20px",
  },
  lineB: {
    position: "absolute",
    right: "12px",
    top: "200px",
    width: "160px",
    height: "5px",
    background: "#ffb000",
    transform: "rotate(-38deg)",
    borderRadius: "20px",
    opacity: 0.7,
  },
  dots: {
    position: "absolute",
    left: "0",
    bottom: "0",
    width: "170px",
    height: "100px",
    backgroundImage: "radial-gradient(rgba(255,176,0,0.4) 1.5px, transparent 1.5px)",
    backgroundSize: "14px 14px",
    opacity: 0.6,
  },
  section: {
    marginTop: "24px",
    display: "grid",
    gridTemplateColumns: "1.15fr 0.85fr",
    gap: "24px",
  },
  panel: {
    borderRadius: "24px",
    background: "#080808",
    border: "1px solid rgba(255,255,255,.1)",
    boxShadow: "0 20px 60px rgba(0,0,0,.26)",
    overflow: "hidden",
  },
  panelPad: {
    padding: "26px",
  },
  sectionTitle: {
    margin: "0 0 8px",
    fontSize: "28px",
    lineHeight: 1,
    fontWeight: 1000,
    textTransform: "uppercase",
    letterSpacing: "-1px",
  },
  muted: {
    color: "rgba(255,255,255,.58)",
    lineHeight: 1.6,
    fontSize: "14px",
  },
  sportsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginTop: "20px",
  },
  sportCard: {
    borderRadius: "18px",
    background: "linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.03))",
    border: "1px solid rgba(255,255,255,.1)",
    padding: "16px",
    minHeight: "110px",
  },
  icon: {
    fontSize: "26px",
    marginBottom: "8px",
  },
  cardTitle: {
    margin: 0,
    fontWeight: 950,
    fontSize: "15px",
  },
  cardText: {
    margin: "6px 0 0",
    color: "rgba(255,255,255,.55)",
    fontSize: "12px",
    lineHeight: 1.4,
  },
  match: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    gap: "12px",
    borderRadius: "18px",
    background: "rgba(255,255,255,.06)",
    padding: "15px",
    marginTop: "10px",
    border: "1px solid rgba(255,255,255,.07)",
  },
  score: {
    background: "linear-gradient(135deg,#ffb000,#ff6500)",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "12px",
    fontWeight: 1000,
    fontSize: "14px",
  },
  tag: {
    display: "inline-block",
    background: "rgba(255,176,0,0.15)",
    color: "#ffb000",
    border: "1px solid rgba(255,176,0,0.25)",
    borderRadius: "999px",
    padding: "5px 10px",
    fontSize: "11px",
    fontWeight: 950,
    marginBottom: "10px",
  },
  tagGreen: {
    background: "rgba(255,176,0,0.15)",
    color: "#ffb000",
    border: "1px solid rgba(255,176,0,0.25)",
  },
  sectionAlt: {
    marginTop: "24px",
    borderRadius: "24px",
    background: "#080808",
    border: "1px solid rgba(255,255,255,.1)",
    padding: "26px",
    boxShadow: "0 20px 60px rgba(0,0,0,.26)",
  },
  filterRow: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    paddingBottom: "8px",
    marginTop: "18px",
  },
  filterBtn: {
    flex: "0 0 auto",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: "999px",
    padding: "9px 14px",
    background: "rgba(255,255,255,.06)",
    color: "#fff",
    fontWeight: 850,
    cursor: "pointer",
    fontSize: "12px",
  },
  filterBtnActive: {
    background: "linear-gradient(135deg,#ffb000,#ff6500)",
    color: "#080808",
    border: "1px solid transparent",
  },
  newsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginTop: "18px",
  },
  newsCard: {
    overflow: "hidden",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,.09)",
    background: "rgba(255,255,255,.04)",
  },
  newsImg: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    display: "block",
  },
  newsBody: {
    padding: "16px",
  },
  input: {
    width: "100%",
    maxWidth: "320px",
    height: "40px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.15)",
    background: "rgba(255,255,255,.07)",
    color: "white",
    padding: "0 16px",
    outline: "none",
    fontSize: "13px",
  },
  footer: {
    textAlign: "center",
    color: "rgba(255,255,255,.25)",
    padding: "30px 0 10px",
    fontWeight: 700,
    fontSize: "13px",
  },
  sectionCard: {
    marginTop: "24px",
    borderRadius: "24px",
    background: "#080808",
    border: "1px solid rgba(255,255,255,.1)",
    boxShadow: "0 20px 60px rgba(0,0,0,.26)",
    overflow: "hidden",
  },
  halfGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginTop: "24px",
  },
  infoCard: {
    borderRadius: "20px",
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  infoNumber: {
    fontSize: "36px",
    fontWeight: 1000,
    background: "linear-gradient(135deg,#ffb000,#ff6500)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
};

const categories = ["Todo", "Fútbol", "Yoga", "CrossFit", "Natación", "Spinning", "Pilates", "Boxeo"];

const sports = [
  { icon: "⚽", title: "Fútbol", text: "Partidos, táctica, formación y tabla de posiciones." },
  { icon: "🧘", title: "Yoga", text: "Flexibilidad, equilibrio, respiración y bienestar." },
  { icon: "💪", title: "CrossFit", text: "Fuerza, resistencia, WODs y retos diarios." },
  { icon: "🏊", title: "Natación", text: "Técnica, estilos, entrenamiento y competencias." },
  { icon: "🚴", title: "Spinning", text: "Ciclismo indoor, resistencia cardiovascular." },
  { icon: "🥊", title: "Boxeo", text: "Coordinación, golpeo, defensa y condición física." },
];

const matches = [
  { sport: "Fútbol", a: "Litoral FC", b: "Cordillera United", score: "3 - 1", time: "Final" },
  { sport: "CrossFit", a: "Team Alpha", b: "Team Omega", score: "845 pts", time: "Evento 5" },
  { sport: "Natación", a: "Delfines", b: "Tiburones", score: "1:32.4", time: "200m libres" },
  { sport: "Spinning", a: "Team RPM", b: "Team Sprint", score: "52 km", time: "45 min" },
];

const news = [
  {
    title: "Nuevo horario de Yoga para principiantes los martes y jueves",
    category: "Yoga",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "CrossFit: nuevo WOD semanal para subir tu rendimiento",
    category: "CrossFit",
    img: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Natación: técnica de crol para nadadores intermedios",
    category: "Natación",
    img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Spinning: playlist y rutina para quemar 600 calorías",
    category: "Spinning",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Pilates: ejercicios para fortalecer la zona media",
    category: "Pilates",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Boxeo: combinaciones de golpes para principiantes",
    category: "Boxeo",
    img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function LandingPage() {
  const [category, setCategory] = useState("Todo");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredNews = useMemo(() => {
    const text = query.trim().toLowerCase();
    return news.filter((item) => {
      const matchesCategory = category === "Todo" || item.category === category;
      const matchesText = !text || item.title.toLowerCase().includes(text) || item.category.toLowerCase().includes(text);
      return matchesCategory && matchesText;
    });
  }, [category, query]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <section style={styles.heroCard}>
          <div style={styles.orangeBlock} />
          <div style={styles.lineA} />
          <div style={styles.lineB} />
          <div style={styles.dots} />

          <header style={styles.nav}>
            <div style={styles.logoWrap}>
              <img src="/logo.png" style={styles.logo} alt="SportClub" />
              <span>SPORTCLUB</span>
            </div>
            <nav style={styles.menu}>
              <a style={styles.link} href="#inicio" onClick={(e) => { e.preventDefault(); scrollTo("inicio"); }}>Inicio</a>
              <a style={styles.link} href="#deportes" onClick={(e) => { e.preventDefault(); scrollTo("deportes"); }}>Deportes</a>
              <a style={styles.link} href="#resultados" onClick={(e) => { e.preventDefault(); scrollTo("resultados"); }}>Resultados</a>
              <a style={styles.link} href="#noticias" onClick={(e) => { e.preventDefault(); scrollTo("noticias"); }}>Noticias</a>
              <Link to="/login" style={{ ...styles.link, color: "#ffb000", fontWeight: 900 }}>Ingresar</Link>
              <Link to="/register" style={{
                borderRadius: "999px",
    background: "linear-gradient(135deg,#ffb000,#ff6500)",
                color: "#fff",
                padding: "8px 18px",
                fontWeight: 800,
                fontSize: "12px",
                textDecoration: "none",
              }}>Registro</Link>
            </nav>
          </header>

          <div id="inicio" style={styles.heroContent}>
            <div>
              <div style={styles.kicker}>● Centro deportivo integral</div>
              <h1 style={styles.title}>
                <span style={styles.accent}>SportClub</span>
                <br />Tu espacio
              </h1>
              <p style={styles.subtitle}>
                Un club deportivo moderno con instalaciones de primer nivel, coaches certificados
                y una comunidad activa. Reserva tus clases, sigue tu progreso y alcanza tus metas.
              </p>
              <div style={styles.ctaRow}>
                <button style={styles.primaryBtn} onClick={() => navigate("/register")}>Únete ahora</button>
                <button style={styles.secondaryBtn} onClick={() => scrollTo("deportes")}>Explorar</button>
              </div>
            </div>

            <div style={styles.visual}>
              <img
                style={styles.athleteImage}
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop"
                alt="Personas entrenando en el club"
              />
              <div style={styles.imageOverlay} />
            </div>
          </div>
        </section>

        <section id="deportes" style={styles.section}>
          <article style={styles.panel}>
            <div style={styles.panelPad}>
              <span style={styles.tag}>DISCIPLINAS</span>
              <h2 style={styles.sectionTitle}>Deportes disponibles</h2>
              <p style={styles.muted}>
                Ofrecemos una amplia variedad de disciplinas deportivas con coaches especializados y salas equipadas.
              </p>
              <div style={styles.sportsGrid}>
                {sports.map((sport) => (
                  <div key={sport.title} style={styles.sportCard}>
                    <div style={styles.icon}>{sport.icon}</div>
                    <h3 style={styles.cardTitle}>{sport.title}</h3>
                    <p style={styles.cardText}>{sport.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside id="resultados" style={styles.panel}>
            <div style={styles.panelPad}>
              <span style={{ ...styles.tag, ...styles.tagGreen }}>EN VIVO</span>
              <h2 style={styles.sectionTitle}>Resultados</h2>
              <p style={styles.muted}>Últimos marcadores y rendimientos del club.</p>
              {matches.map((match) => (
                <div key={`${match.a}-${match.b}`} style={styles.match}>
                  <div>
                    <small style={styles.muted}>{match.sport}</small>
                    <strong style={{ display: "block", fontSize: "14px" }}>{match.a}</strong>
                  </div>
                  <div style={styles.score}>{match.score}</div>
                  <div style={{ textAlign: "right" }}>
                    <small style={styles.muted}>{match.time}</small>
                    <strong style={{ display: "block", fontSize: "14px" }}>{match.b}</strong>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section style={styles.halfGrid}>
          <div style={styles.infoCard}>
            <div style={styles.infoNumber}>50+</div>
            <h3 style={{ margin: 0, fontSize: "18px" }}>Clases semanales</h3>
            <p style={styles.muted}>Horarios flexibles desde las 7:00 hasta las 22:00, todos los días.</p>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.infoNumber}>12</div>
            <h3 style={{ margin: 0, fontSize: "18px" }}>Salas equipadas</h3>
            <p style={styles.muted}>Canchas, salas de yoga, spinning, piscina temperada y más.</p>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.infoNumber}>15+</div>
            <h3 style={{ margin: 0, fontSize: "18px" }}>Coaches certificados</h3>
            <p style={styles.muted}>Profesionales con experiencia en cada disciplina.</p>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.infoNumber}>500+</div>
            <h3 style={{ margin: 0, fontSize: "18px" }}>Miembros activos</h3>
            <p style={styles.muted}>Una comunidad que crece día a día.</p>
          </div>
        </section>

        <section id="noticias" style={styles.sectionAlt}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <span style={styles.tag}>ACTUALIDAD</span>
              <h2 style={styles.sectionTitle}>Últimas noticias</h2>
              <p style={styles.muted}>Filtra por categoría o busca una disciplina.</p>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={styles.input}
              placeholder="Buscar yoga, crossfit, spinning..."
              aria-label="Buscar noticias"
            />
          </div>

          <div style={styles.filterRow}>
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                style={{ ...styles.filterBtn, ...(category === item ? styles.filterBtnActive : {}) }}
              >
                {item}
              </button>
            ))}
          </div>

          <div style={styles.newsGrid}>
            {filteredNews.map((item) => (
              <article key={item.title} style={styles.newsCard}>
                <img style={styles.newsImg} src={item.img} alt={item.title} loading="lazy" />
                <div style={styles.newsBody}>
                  <span style={styles.tag}>{item.category}</span>
                  <h3 style={{ margin: "8px 0 10px", fontSize: "15px", lineHeight: 1.2 }}>{item.title}</h3>
                  <p style={styles.muted}>Noticia destacada de nuestras disciplinas.</p>
                </div>
              </article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <p style={{ ...styles.muted, marginTop: "20px" }}>No hay noticias para esta búsqueda.</p>
          )}
        </section>

        <section style={styles.sectionCard}>
          <div style={{ ...styles.panelPad, textAlign: "center", padding: "40px 26px" }}>
            <span style={{ ...styles.tag, ...styles.tagGreen }}>COMUNIDAD</span>
            <h2 style={{ ...styles.sectionTitle, fontSize: "36px", marginTop: "10px" }}>
              ¿Listo para entrenar?
            </h2>
            <p style={{ ...styles.muted, maxWidth: "500px", margin: "12px auto" }}>
              Regístrate gratis y accede a todas las instalaciones, horarios y reservas del club.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", marginTop: "22px", flexWrap: "wrap" }}>
              <button style={styles.primaryBtn} onClick={() => navigate("/register")}>Crear cuenta gratis</button>
              <button style={styles.secondaryBtn} onClick={() => navigate("/login")}>Iniciar sesión</button>
            </div>
          </div>
        </section>

        <footer style={styles.footer}>
          SportClub 2026 — Todos los derechos reservados
        </footer>
      </div>
    </main>
  );
}
