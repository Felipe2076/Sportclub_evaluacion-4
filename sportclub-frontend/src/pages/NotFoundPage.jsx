import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b0b0d",
      color: "#ffffff",
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "24px",
    }}>
      <div style={{
        width: "100px",
        height: "100px",
        borderRadius: "28px",
        background: "linear-gradient(135deg,#ffb000,#ff6500)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "42px",
        fontWeight: 1000,
        color: "#070707",
        marginBottom: "32px",
        boxShadow: "0 20px 50px rgba(255,122,0,0.28)",
      }}>
        SC
      </div>
      <h1 style={{
        fontSize: "clamp(80px, 15vw, 140px)",
        fontWeight: 1000,
        lineHeight: 0.85,
        letterSpacing: "-4px",
        margin: 0,
        background: "linear-gradient(135deg,#ffb000,#ff6500)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        404
      </h1>
      <p style={{
        marginTop: "12px",
        fontSize: "18px",
        color: "rgba(255,255,255,0.55)",
        fontWeight: 600,
        maxWidth: "400px",
        lineHeight: 1.6,
      }}>
        La página que buscas no existe o fue movida.
      </p>
      <Link to="/" style={{
        marginTop: "32px",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "999px",
        border: "0",
        background: "linear-gradient(135deg,#ffb000,#ff6500)",
        color: "#080808",
        padding: "14px 28px",
        fontWeight: 950,
        cursor: "pointer",
        boxShadow: "0 14px 28px rgba(255,122,0,0.28)",
        fontSize: "14px",
        textDecoration: "none",
        transition: "transform 0.2s",
      }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
