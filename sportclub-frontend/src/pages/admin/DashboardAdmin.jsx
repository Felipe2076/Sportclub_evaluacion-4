import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Swal from "sweetalert2";

const S = {
  page: { minHeight: "100vh", background: "#0b0b0d", color: "#fff", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", display: "grid", gridTemplateColumns: "270px 1fr" },
  sidebar: { position: "sticky", top: 0, height: "100vh", background: "#050505", borderRight: "1px solid rgba(255,255,255,.10)", padding: "24px", boxSizing: "border-box", overflowY: "auto" },
  brand: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "26px" },
  logo: { width: "44px", height: "44px", borderRadius: "15px", display: "grid", placeItems: "center", fontWeight: 1000, color: "#070707", background: "linear-gradient(135deg,#ffb000,#ff6500)", boxShadow: "0 12px 28px rgba(255,122,0,.28)" },
  brandTitle: { margin: 0, fontSize: "17px", fontWeight: 1000, letterSpacing: ".5px" },
  brandSub: { margin: "3px 0 0", fontSize: "12px", color: "rgba(255,255,255,.50)" },
  navLabel: { margin: "22px 0 10px", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,.42)", fontWeight: 900 },
  navBtn: { width: "100%", border: "1px solid transparent", borderRadius: "16px", padding: "13px 14px", background: "transparent", color: "rgba(255,255,255,.70)", display: "flex", alignItems: "center", gap: "11px", cursor: "pointer", fontWeight: 850, marginBottom: "6px", textAlign: "left", fontSize: "13px" },
  navBtnAct: { background: "linear-gradient(135deg,rgba(255,176,0,.20),rgba(255,101,0,.10))", borderColor: "rgba(255,176,0,.30)", color: "#ffb000" },
  main: { minWidth: 0, padding: "28px", boxSizing: "border-box" },
  topbar: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px", marginBottom: "24px", flexWrap: "wrap" },
  title: { margin: 0, fontSize: "28px", fontWeight: 1000, letterSpacing: "-1px" },
  muted: { color: "rgba(255,255,255,.55)", lineHeight: 1.6, fontSize: "14px" },
  search: { width: "min(320px, 100%)", height: "44px", borderRadius: "999px", border: "1px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.06)", color: "#fff", padding: "0 18px", outline: "none", boxSizing: "border-box" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "22px" },
  statCard: { borderRadius: "20px", padding: "18px", background: "linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.03))", border: "1px solid rgba(255,255,255,.10)" },
  statIcon: { width: "38px", height: "38px", borderRadius: "12px", display: "grid", placeItems: "center", background: "rgba(255,176,0,.15)", border: "1px solid rgba(255,176,0,.2)", marginBottom: "12px", fontSize: "18px" },
  statValue: { margin: 0, fontSize: "26px", fontWeight: 1000 },
  statLabel: { margin: "4px 0 0", color: "rgba(255,255,255,.55)", fontSize: "13px", fontWeight: 750 },
  panel: { borderRadius: "24px", background: "#111114", border: "1px solid rgba(255,255,255,.10)", boxShadow: "0 22px 60px rgba(0,0,0,.22)", overflow: "hidden", marginBottom: "20px" },
  panelHeader: { padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" },
  panelTitle: { margin: 0, fontSize: "18px", fontWeight: 1000 },
  panelBody: { padding: "20px" },
  primaryBtn: { border: "0", borderRadius: "12px", background: "linear-gradient(135deg,#ffb000,#ff6500)", color: "#080808", padding: "11px 16px", fontWeight: 1000, cursor: "pointer", fontSize: "13px" },
  secondaryBtn: { border: "1px solid rgba(255,255,255,.15)", borderRadius: "12px", background: "rgba(255,255,255,.06)", color: "#fff", padding: "10px 14px", fontWeight: 850, cursor: "pointer", fontSize: "12px" },
  dangerBtn: { border: "1px solid rgba(255,99,99,.24)", borderRadius: "12px", background: "rgba(255,99,99,.10)", color: "#ff8b8b", padding: "10px 14px", fontWeight: 850, cursor: "pointer", fontSize: "12px" },
  logoutBtn: { width: "100%", border: "1px solid rgba(255,99,99,.2)", borderRadius: "16px", padding: "13px 14px", background: "rgba(255,99,99,.08)", color: "#ff8b8b", display: "flex", alignItems: "center", gap: "11px", cursor: "pointer", fontWeight: 850, marginTop: "16px", textAlign: "left", fontSize: "13px" },
  tableWrap: { overflowX: "auto" },
  th: { textAlign: "left", color: "rgba(255,255,255,.45)", fontSize: "11px", padding: "0 10px 10px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 800 },
  td: { padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,.06)", fontSize: "13px", verticalAlign: "middle" },
  badge: { display: "inline-block", borderRadius: "999px", padding: "5px 9px", fontSize: "11px", fontWeight: 900 },
  modalBackdrop: { position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,.72)", display: "grid", placeItems: "center", padding: "18px" },
  modal: { width: "min(640px, 100%)", borderRadius: "24px", background: "#111114", border: "1px solid rgba(255,255,255,.12)", boxShadow: "0 26px 90px rgba(0,0,0,.50)", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" },
  formGroup: { display: "grid", gap: "6px" },
  label: { fontSize: "12px", color: "rgba(255,255,255,.76)", fontWeight: 850 },
  input: { width: "100%", height: "42px", borderRadius: "12px", border: "1px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.065)", color: "#fff", padding: "0 12px", outline: "none", boxSizing: "border-box", fontSize: "13px" },
  select: { width: "100%", height: "42px", borderRadius: "12px", border: "1px solid rgba(255,255,255,.14)", background: "#17171a", color: "#fff", padding: "0 12px", outline: "none", boxSizing: "border-box", fontSize: "13px" },
};

const dayNames = { 1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves", 5: "Viernes", 6: "Sábado", 7: "Domingo" };

function badgeStyle(value) {
  const b = { ...S.badge };
  if (value === "admin") return { ...b, color: "#ffb000", background: "rgba(255,176,0,.14)", border: "1px solid rgba(255,176,0,.24)" };
  if (value === "coach") return { ...b, color: "#93c5fd", background: "rgba(59,130,246,.14)", border: "1px solid rgba(59,130,246,.22)" };
  if (value === "user") return { ...b, color: "#86efac", background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.22)" };
  if (value === true || value === "active" || value === "Activo" || value === "Published") return { ...b, color: "#86efac", background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.22)" };
  if (value === false || value === "inactive" || value === "Inactivo" || value === "cancelled") return { ...b, color: "#fdba74", background: "rgba(249,115,22,.12)", border: "1px solid rgba(249,115,22,.22)" };
  return { ...b, color: "#ddd", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)" };
};

const sections = [
  { id: "overview", icon: "📊", label: "Resumen" },
  { id: "users", icon: "👥", label: "Usuarios" },
  { id: "sports", icon: "⚽", label: "Deportes" },
  { id: "rooms", icon: "🏠", label: "Salas" },
  { id: "sportrooms", icon: "🔗", label: "Asignaciones" },
  { id: "schedules", icon: "🕐", label: "Horarios" },
  { id: "reservations", icon: "📅", label: "Reservas" },
];

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [section, setSection] = useState("overview");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [users, setUsers] = useState([]);
  const [sports, setSports] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [sportrooms, setSportRooms] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const loadAll = useCallback(async () => {
    try {
      const [u, sp, r, co, sr, sc, re] = await Promise.all([
        api.get("/users"), api.get("/sports"), api.get("/rooms"),
        api.get("/users?role=coach"), api.get("/sport-rooms"),
        api.get("/class-schedules"), api.get("/reservations"),
      ]);
      setUsers(u.data.data || []);
      setSports(sp.data.data || []);
      setRooms(r.data.data || []);
      setCoaches(co.data.data || []);
      setSportRooms(sr.data.data || []);
      setSchedules(sc.data.data || []);
      setReservations(re.data.data || []);
    } catch {}
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2600); };

  const stats = useMemo(() => [
    { icon: "👥", value: users.length, label: "Usuarios" },
    { icon: "⚽", value: sports.length, label: "Deportes" },
    { icon: "🏠", value: rooms.length, label: "Salas" },
    { icon: "🔗", value: sportrooms.length, label: "Asignaciones" },
    { icon: "🕐", value: schedules.length, label: "Horarios" },
    { icon: "📅", value: reservations.filter((r) => r.status === "active").length, label: "Reservas activas" },
  ], [users, sports, rooms, sportrooms, schedules, reservations]);

  const q = search.trim().toLowerCase();
  const filteredUsers = useMemo(() => users.filter((u) => `${u.full_name} ${u.email} ${u.role}`.toLowerCase().includes(q)), [users, q]);
  const filteredSports = useMemo(() => sports.filter((s) => `${s.name} ${s.objective}`.toLowerCase().includes(q)), [sports, q]);
  const filteredRooms = useMemo(() => rooms.filter((r) => `${r.name} ${r.description} ${r.location||""}`.toLowerCase().includes(q)), [rooms, q]);
  const filteredSR = useMemo(() => sportrooms.filter((s) => `${s.sport_id} ${s.room_id} ${s.coach_id}`.includes(q)), [sportrooms, q]);
  const filteredSC = useMemo(() => schedules.filter((s) => `${s.sport_room_id} ${s.day_of_week}`.includes(q)), [schedules, q]);
  const filteredRes = useMemo(() => reservations.filter((r) => `${r.id} ${r.user_id} ${r.status}`.includes(q)), [reservations, q]);

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditing(item);
    setErrors({});
    if (!item) {
      if (type === "user") setForm({ full_name: "", email: "", password: "", role: "user", birth_date: "" });
      else if (type === "sport") setForm({ name: "", objective: "", duration: 60, status: true });
      else if (type === "room") setForm({ name: "", description: "", capacity: 10, location: "", observation: "", image_url: "", status: true });
      else if (type === "sportroom") setForm({ sport_id: "", room_id: "", coach_id: "", observation: "", status: true });
      else if (type === "schedule") setForm({ sport_room_id: "", day_of_week: 1, start_time: "08:00", end_time: "09:00", status: true });
    } else {
      if (type === "user") setForm({ full_name: item.full_name, email: item.email, password: "", role: item.role, birth_date: item.birth_date || "" });
      else if (type === "sport") setForm({ name: item.name, objective: item.objective, duration: item.duration, status: item.status });
      else if (type === "room") setForm({ name: item.name, description: item.description, capacity: item.capacity, location: item.location||"", observation: item.observation||"", image_url: item.image_url||"", status: item.status });
      else if (type === "sportroom") setForm({ sport_id: item.sport_id, room_id: item.room_id, coach_id: item.coach_id, observation: item.observation||"", status: item.status });
      else if (type === "schedule") setForm({ sport_room_id: item.sport_room_id, day_of_week: item.day_of_week, start_time: item.start_time?.substring(0,5), end_time: item.end_time?.substring(0,5), status: item.status });
    }
  };

  const closeModal = () => { setModalType(null); setEditing(null); setForm({}); setErrors({}); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : type === "number" ? +value : value;
    setForm((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const err = {};
    if (modalType === "user") { if (!form.full_name?.trim()) err.full_name = "Requerido"; if (!form.email?.trim()) err.email = "Requerido"; }
    if (modalType === "sport") { if (!form.name?.trim()) err.name = "Requerido"; if (!form.objective?.trim()) err.objective = "Requerido"; }
    if (modalType === "room") { if (!form.name?.trim()) err.name = "Requerido"; if (!form.description?.trim()) err.description = "Requerido"; }
    if (modalType === "sportroom") { if (!form.sport_id) err.sport_id = "Selecciona un deporte"; if (!form.room_id) err.room_id = "Selecciona una sala"; if (!form.coach_id) err.coach_id = "Selecciona un coach"; }
    if (modalType === "schedule") { if (!form.sport_room_id) err.sport_room_id = "Requerido"; }
    return err;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    try {
      if (modalType === "user") {
        const payload = { ...form };
        if (editing && !payload.password) delete payload.password;
        if (editing) await api.put(`/users/${editing.id}`, payload); else await api.post("/users", payload);
        showToast(editing ? "Usuario actualizado" : "Usuario creado");
      } else if (modalType === "sport") {
        if (editing) await api.put(`/sports/${editing.id}`, form); else await api.post("/sports", form);
        showToast(editing ? "Deporte actualizado" : "Deporte creado");
      } else if (modalType === "room") {
        if (editing) await api.put(`/rooms/${editing.id}`, form); else await api.post("/rooms", form);
        showToast(editing ? "Sala actualizada" : "Sala creada");
      } else if (modalType === "sportroom") {
        if (editing) await api.put(`/sport-rooms/${editing.id}`, form); else await api.post("/sport-rooms", form);
        showToast(editing ? "Asignación actualizada" : "Asignación creada");
      } else if (modalType === "schedule") {
        const payload = { ...form, start_time: form.start_time + ":00", end_time: form.end_time + ":00" };
        if (editing) await api.put(`/class-schedules/${editing.id}`, payload); else await api.post("/class-schedules", payload);
        showToast(editing ? "Horario actualizado" : "Horario creado");
      }
      closeModal();
      loadAll();
    } catch { /* handled */ }
  };

  const handleDelete = async (type, id, name = "") => {
    const result = await Swal.fire({
      title: `¿Eliminar ${name || type}?`,
      icon: "warning", showCancelButton: true, confirmButtonColor: "#d33",
      cancelButtonText: "No", confirmButtonText: "Sí, eliminar",
    });
    if (!result.isConfirmed) return;
    try {
      if (type === "user") await api.delete(`/users/${id}`);
      else if (type === "sport") await api.delete(`/sports/${id}`);
      else if (type === "room") await api.delete(`/rooms/${id}`);
      else if (type === "sportroom") await api.delete(`/sport-rooms/${id}`);
      else if (type === "schedule") await api.delete(`/class-schedules/${id}`);
      showToast("Registro eliminado");
      loadAll();
    } catch { Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar" }); }
  };

  const handleCancelReservation = async (id) => {
    const result = await Swal.fire({ title: "¿Cancelar esta reserva?", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", cancelButtonText: "No", confirmButtonText: "Sí, cancelar" });
    if (!result.isConfirmed) return;
    try { await api.patch(`/reservations/${id}/cancel`); showToast("Reserva cancelada"); loadAll(); } catch { Swal.fire({ icon: "error", title: "Error", text: "No se pudo cancelar" }); }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const sectionTitle = sections.find((s) => s.id === section)?.label || "";

  return (
    <div style={S.page}>
      <aside style={S.sidebar}>
        <div style={S.brand}>
          <div style={S.logo}>SC</div>
          <div><h1 style={S.brandTitle}>SportClub</h1><p style={S.brandSub}>Admin panel</p></div>
        </div>
        <p style={S.navLabel}>Administración</p>
        {sections.map((item) => (
          <button key={item.id} type="button" onClick={() => { setSection(item.id); setSearch(""); }}
            style={{ ...S.navBtn, ...(section === item.id ? S.navBtnAct : {}) }}>
            <span>{item.icon}</span><span>{item.label}</span>
          </button>
        ))}
        <button type="button" onClick={handleLogout} style={S.logoutBtn}>
          <span>🚪</span><span>Cerrar sesión</span>
        </button>
      </aside>

      <main style={S.main}>
        <header style={S.topbar}>
          <div>
            <h2 style={S.title}>{sectionTitle}</h2>
            <p style={{ ...S.muted, margin: "6px 0 0" }}>Panel de administración de SportClub</p>
          </div>
          {section !== "overview" && (
            <input value={search} onChange={(e) => setSearch(e.target.value)} style={S.search} placeholder="Buscar..." />
          )}
        </header>

        {toast && <div style={{ marginBottom: "16px", borderRadius: "16px", padding: "12px 16px", background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.26)", color: "#86efac", fontWeight: 900, fontSize: "14px" }}>✅ {toast}</div>}

        {section === "overview" && (
          <>
            <div style={S.statsGrid}>
              {stats.map((s) => (
                <article key={s.label} style={S.statCard}>
                  <div style={S.statIcon}>{s.icon}</div><h3 style={S.statValue}>{s.value}</h3><p style={S.statLabel}>{s.label}</p>
                </article>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.25fr .75fr", gap: "18px" }}>
              <div style={S.panel}>
                <div style={S.panelHeader}><h3 style={S.panelTitle}>Actividad reciente</h3><span style={badgeStyle("admin")}>Admin</span></div>
                <div style={S.panelBody}>
                  <div style={{ display: "grid", gap: "10px" }}>
                    <div style={{ borderRadius: "16px", padding: "14px", background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.08)" }}>👥 {users.length} usuarios registrados</div>
                    <div style={{ borderRadius: "16px", padding: "14px", background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.08)" }}>⚽ {sports.length} deportes disponibles</div>
                    <div style={{ borderRadius: "16px", padding: "14px", background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.08)" }}>🏠 {rooms.length} salas equipadas</div>
                    <div style={{ borderRadius: "16px", padding: "14px", background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.08)" }}>🕐 {schedules.length} horarios de clases</div>
                    <div style={{ borderRadius: "16px", padding: "14px", background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.08)" }}>📅 {reservations.filter((r) => r.status === "active").length} reservas activas</div>
                  </div>
                </div>
              </div>
              <div style={S.panel}>
                <div style={S.panelHeader}><h3 style={S.panelTitle}>Acceso rápido</h3></div>
                <div style={S.panelBody}>
                  <div style={{ display: "grid", gap: "8px" }}>
                    {sections.filter((s) => s.id !== "overview").map((s) => (
                      <button key={s.id} type="button" onClick={() => setSection(s.id)} style={{ ...S.secondaryBtn, textAlign: "left", width: "100%" }}>
                        {s.icon} {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {section === "users" && (
          <CRUDTable title="Usuarios" data={filteredUsers} onCreate={() => openModal("user")} columns={["Nombre", "Email", "Rol", "Fecha Nac.", "Acciones"]} renderRow={(u) => <tr key={u.id}>
            <td style={S.td}>{u.full_name}</td><td style={S.td}>{u.email}</td>
            <td style={S.td}><span style={badgeStyle(u.role)}>{u.role}</span></td><td style={S.td}>{u.birth_date || "-"}</td>
            <td style={S.td}><Actions onEdit={() => openModal("user", u)} onDelete={() => handleDelete("user", u.id, u.full_name)} /></td>
          </tr>} />
        )}

        {section === "sports" && (
          <CRUDTable title="Deportes" data={filteredSports} onCreate={() => openModal("sport")} columns={["Nombre", "Objetivo", "Duración", "Estado", "Acciones"]} renderRow={(s) => <tr key={s.id}>
            <td style={S.td}>{s.name}</td><td style={S.td}>{s.objective}</td><td style={S.td}>{s.duration} min</td>
            <td style={S.td}><span style={badgeStyle(s.status)}>{s.status ? "Activo" : "Inactivo"}</span></td>
            <td style={S.td}><Actions onEdit={() => openModal("sport", s)} onDelete={() => handleDelete("sport", s.id, s.name)} /></td>
          </tr>} />
        )}

        {section === "rooms" && (
          <CRUDTable title="Salas" data={filteredRooms} onCreate={() => openModal("room")} columns={["Nombre", "Descripción", "Capacidad", "Ubicación", "Estado", "Acciones"]} renderRow={(r) => <tr key={r.id}>
            <td style={S.td}>{r.name}</td><td style={S.td}>{r.description}</td><td style={S.td}>{r.capacity}</td>
            <td style={S.td}>{r.location || "-"}</td><td style={S.td}><span style={badgeStyle(r.status)}>{r.status ? "Activo" : "Inactivo"}</span></td>
            <td style={S.td}><Actions onEdit={() => openModal("room", r)} onDelete={() => handleDelete("room", r.id, r.name)} /></td>
          </tr>} />
        )}

        {section === "sportrooms" && (
          <CRUDTable title="Asignaciones (Deporte-Sala-Coach)" data={filteredSR} onCreate={() => openModal("sportroom")} columns={["Deporte", "Sala", "Coach", "Observación", "Estado", "Acciones"]} renderRow={(sr) => <tr key={sr.id}>
            <td style={S.td}>{sports.find((s) => s.id === sr.sport_id)?.name || sr.sport_id}</td>
            <td style={S.td}>{rooms.find((r) => r.id === sr.room_id)?.name || sr.room_id}</td>
            <td style={S.td}>{coaches.find((c) => c.id === sr.coach_id)?.full_name || sr.coach_id}</td>
            <td style={S.td}>{sr.observation || "-"}</td>
            <td style={S.td}><span style={badgeStyle(sr.status)}>{sr.status ? "Activo" : "Inactivo"}</span></td>
            <td style={S.td}><Actions onEdit={() => openModal("sportroom", sr)} onDelete={() => handleDelete("sportroom", sr.id)} /></td>
          </tr>} />
        )}

        {section === "schedules" && (
          <CRUDTable title="Horarios" data={filteredSC} onCreate={() => openModal("schedule")} columns={["SportRoom ID", "Día", "Inicio", "Fin", "Estado", "Acciones"]} renderRow={(sc) => <tr key={sc.id}>
            <td style={S.td}>{sc.sport_room_id}</td><td style={S.td}>{dayNames[sc.day_of_week] || sc.day_of_week}</td>
            <td style={S.td}>{sc.start_time?.substring(0,5)}</td><td style={S.td}>{sc.end_time?.substring(0,5)}</td>
            <td style={S.td}><span style={badgeStyle(sc.status)}>{sc.status ? "Activo" : "Inactivo"}</span></td>
            <td style={S.td}><Actions onEdit={() => openModal("schedule", sc)} onDelete={() => handleDelete("schedule", sc.id)} /></td>
          </tr>} />
        )}

        {section === "reservations" && (
          <CRUDTable title="Reservas" data={filteredRes} onCreate={null} columns={["ID", "Usuario ID", "Horario ID", "Estado", "Observación", "Acción"]} renderRow={(res) => <tr key={res.id}>
            <td style={S.td}>{res.id}</td><td style={S.td}>{res.user_id}</td><td style={S.td}>{res.class_schedule_id}</td>
            <td style={S.td}><span style={badgeStyle(res.status)}>{res.status}</span></td><td style={S.td}>{res.observation || "-"}</td>
            <td style={S.td}>{res.status === "active" && <button type="button" style={S.dangerBtn} onClick={() => handleCancelReservation(res.id)}>Cancelar</button>}</td>
          </tr>} />
        )}

        {modalType && (
          <div style={S.modalBackdrop} onClick={closeModal}>
            <div style={S.modal} onClick={(e) => e.stopPropagation()}>
              <div style={S.panelHeader}>
                <h3 style={S.panelTitle}>{editing ? "Editar" : "Crear"} {modalType === "user" ? "usuario" : modalType === "sport" ? "deporte" : modalType === "room" ? "sala" : modalType === "sportroom" ? "asignación" : "horario"}</h3>
                <button type="button" style={S.secondaryBtn} onClick={closeModal}>Cerrar</button>
              </div>
              <form onSubmit={handleSave} style={S.panelBody} noValidate>
                <div style={S.formGrid}>
                  {modalType === "user" && (<>
                    <FG label="Nombre" error={errors.full_name}><input name="full_name" value={form.full_name||""} onChange={handleChange} style={S.input} /></FG>
                    <FG label="Email" error={errors.email}><input name="email" type="email" value={form.email||""} onChange={handleChange} style={S.input} /></FG>
                    <FG label="Contraseña"><input name="password" type="password" value={form.password||""} onChange={handleChange} style={S.input} placeholder={editing?"(dejar vacío)":""} /></FG>
                    <FG label="Rol"><select name="role" value={form.role||"user"} onChange={handleChange} style={S.select}><option value="user">Usuario</option><option value="coach">Coach</option><option value="admin">Admin</option></select></FG>
                    <FG label="Fecha nac."><input name="birth_date" type="date" value={form.birth_date||""} onChange={handleChange} style={S.input} /></FG>
                  </>)}
                  {modalType === "sport" && (<>
                    <FG label="Nombre" error={errors.name}><input name="name" value={form.name||""} onChange={handleChange} style={S.input} /></FG>
                    <FG label="Objetivo" error={errors.objective}><textarea name="objective" value={form.objective||""} onChange={handleChange} style={{...S.input, minHeight:"80px", padding:"10px 12px", resize:"vertical"}} /></FG>
                    <FG label="Duración (min)"><input name="duration" type="number" value={form.duration||60} onChange={handleChange} style={S.input} min={1} /></FG>
                    <FG label="Activo"><label style={{display:"flex", alignItems:"center", gap:"8px", color:"rgba(255,255,255,.7)", fontSize:"14px"}}><input name="status" type="checkbox" checked={!!form.status} onChange={handleChange} style={{accentColor:"#ffb000"}} /> Activo</label></FG>
                  </>)}
                  {modalType === "room" && (<>
                    <FG label="Nombre" error={errors.name}><input name="name" value={form.name||""} onChange={handleChange} style={S.input} /></FG>
                    <FG label="Descripción" error={errors.description}><textarea name="description" value={form.description||""} onChange={handleChange} style={{...S.input, minHeight:"60px", padding:"10px 12px", resize:"vertical"}} /></FG>
                    <FG label="Capacidad"><input name="capacity" type="number" value={form.capacity||10} onChange={handleChange} style={S.input} min={1} /></FG>
                    <FG label="Ubicación"><input name="location" value={form.location||""} onChange={handleChange} style={S.input} /></FG>
                    <FG label="Observación"><input name="observation" value={form.observation||""} onChange={handleChange} style={S.input} /></FG>
                    <FG label="Activo"><label style={{display:"flex", alignItems:"center", gap:"8px", color:"rgba(255,255,255,.7)", fontSize:"14px"}}><input name="status" type="checkbox" checked={!!form.status} onChange={handleChange} style={{accentColor:"#ffb000"}} /> Activo</label></FG>
                  </>)}
                  {modalType === "sportroom" && (<>
                    <FG label="Deporte" error={errors.sport_id}>
                      <select name="sport_id" value={form.sport_id||""} onChange={handleChange} style={S.select}>
                        <option value="">Seleccionar deporte...</option>
                        {sports.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </FG>
                    <FG label="Sala" error={errors.room_id}>
                      <select name="room_id" value={form.room_id||""} onChange={handleChange} style={S.select}>
                        <option value="">Seleccionar sala...</option>
                        {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                      </select>
                    </FG>
                    <FG label="Coach" error={errors.coach_id}>
                      <select name="coach_id" value={form.coach_id||""} onChange={handleChange} style={S.select}>
                        <option value="">Seleccionar coach...</option>
                        {coaches.map((c) => <option key={c.id} value={c.id}>{c.full_name}</option>)}
                      </select>
                    </FG>
                    <FG label="Observación"><input name="observation" value={form.observation||""} onChange={handleChange} style={S.input} /></FG>
                    <FG label="Activo"><label style={{display:"flex", alignItems:"center", gap:"8px", color:"rgba(255,255,255,.7)", fontSize:"14px"}}><input name="status" type="checkbox" checked={!!form.status} onChange={handleChange} style={{accentColor:"#ffb000"}} /> Activo</label></FG>
                  </>)}
                  {modalType === "schedule" && (<>
                    <FG label="SportRoom ID" error={errors.sport_room_id}><input name="sport_room_id" type="number" value={form.sport_room_id||""} onChange={handleChange} style={S.input} /></FG>
                    <FG label="Día"><select name="day_of_week" value={form.day_of_week||1} onChange={handleChange} style={S.select}>{Object.entries(dayNames).map(([k,v]) => <option key={k} value={k}>{v}</option>)}</select></FG>
                    <FG label="Inicio"><input name="start_time" type="time" value={form.start_time||"08:00"} onChange={handleChange} style={S.input} /></FG>
                    <FG label="Fin"><input name="end_time" type="time" value={form.end_time||"09:00"} onChange={handleChange} style={S.input} /></FG>
                    <FG label="Activo"><label style={{display:"flex", alignItems:"center", gap:"8px", color:"rgba(255,255,255,.7)", fontSize:"14px"}}><input name="status" type="checkbox" checked={!!form.status} onChange={handleChange} style={{accentColor:"#ffb000"}} /> Activo</label></FG>
                  </>)}
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "20px", justifyContent: "flex-end", flexWrap: "wrap" }}>
                  <button type="button" style={S.secondaryBtn} onClick={closeModal}>Cancelar</button>
                  <button type="submit" style={S.primaryBtn}>Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Actions({ onEdit, onDelete }) {
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {onEdit && <button type="button" style={S.secondaryBtn} onClick={onEdit}>Editar</button>}
      {onDelete && <button type="button" style={S.dangerBtn} onClick={onDelete}>Eliminar</button>}
    </div>
  );
}

function CRUDTable({ title, data, onCreate, columns, renderRow }) {
  return (
    <div style={S.panel}>
      <div style={S.panelHeader}>
        <div><h3 style={S.panelTitle}>CRUD de {title.toLowerCase()}</h3><p style={{ ...S.muted, margin: "4px 0 0", fontSize: "13px" }}>{data.length} registro(s)</p></div>
        {onCreate && <button type="button" style={S.primaryBtn} onClick={onCreate}>+ Nuevo</button>}
      </div>
      <div style={S.panelBody}>
        {data.length === 0 ? <p style={S.muted}>No hay registros.</p> : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead><tr>{columns.map((col, i) => <th key={i} style={S.th}>{col}</th>)}</tr></thead>
              <tbody>{data.map((item) => renderRow(item))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function FG({ label, error, children }) {
  return (
    <div style={S.formGroup}>
      <label style={S.label}>{label}</label>
      {children}
      {error && <span style={{color:"#ff8585",fontSize:"11px",fontWeight:700}}>{error}</span>}
    </div>
  );
}
