import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { updateProfile, changePassword } from '../../services/authService';
import Swal from 'sweetalert2';

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b0b0d",
    color: "#ffffff",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "grid",
    gridTemplateColumns: "270px 1fr",
  },
  sidebar: {
    position: "sticky",
    top: 0,
    height: "100vh",
    background: "#050505",
    borderRight: "1px solid rgba(255,255,255,.10)",
    padding: "24px",
    boxSizing: "border-box",
    overflowY: "auto",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "26px",
  },
  logo: {
    width: "44px",
    height: "44px",
    borderRadius: "15px",
    objectFit: "cover",
    boxShadow: "0 12px 28px rgba(255,122,0,.28)",
  },
  brandTitle: {
    margin: 0,
    fontSize: "17px",
    fontWeight: 1000,
    letterSpacing: ".5px",
  },
  brandSub: {
    margin: "3px 0 0",
    fontSize: "12px",
    color: "rgba(255,255,255,.50)",
  },
  coachCard: {
    borderRadius: "22px",
    padding: "18px",
    background: "linear-gradient(145deg,rgba(255,176,0,.18),rgba(255,101,0,.08),rgba(255,255,255,.04))",
    border: "1px solid rgba(255,176,0,.22)",
    marginBottom: "24px",
  },
  avatar: {
    width: "58px",
    height: "58px",
    borderRadius: "20px",
    display: "grid",
    placeItems: "center",
    background: "rgba(255,255,255,.12)",
    border: "1px solid rgba(255,255,255,.14)",
    fontSize: "28px",
    marginBottom: "12px",
  },
  navLabel: {
    margin: "22px 0 10px",
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,.42)",
    fontWeight: 900,
  },
  navButton: {
    width: "100%",
    border: "1px solid transparent",
    borderRadius: "16px",
    padding: "13px 14px",
    background: "transparent",
    color: "rgba(255,255,255,.70)",
    display: "flex",
    alignItems: "center",
    gap: "11px",
    cursor: "pointer",
    fontWeight: 850,
    marginBottom: "8px",
    textAlign: "left",
  },
  navButtonActive: {
    background: "linear-gradient(135deg,rgba(255,176,0,.20),rgba(255,101,0,.10))",
    borderColor: "rgba(255,176,0,.30)",
    color: "#ffb000",
  },
  main: {
    minWidth: 0,
    padding: "28px",
    boxSizing: "border-box",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  title: {
    margin: 0,
    fontSize: "34px",
    lineHeight: 1,
    fontWeight: 1000,
    letterSpacing: "-1.4px",
  },
  muted: {
    color: "rgba(255,255,255,.58)",
    lineHeight: 1.6,
    fontSize: "14px",
  },
  search: {
    width: "min(360px,100%)",
    height: "46px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.06)",
    color: "#fff",
    padding: "0 18px",
    outline: "none",
    boxSizing: "border-box",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
    gap: "16px",
    marginBottom: "22px",
  },
  statCard: {
    borderRadius: "24px",
    padding: "20px",
    background: "linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.035))",
    border: "1px solid rgba(255,255,255,.10)",
    boxShadow: "0 18px 50px rgba(0,0,0,.20)",
  },
  statIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "15px",
    display: "grid",
    placeItems: "center",
    background: "rgba(255,176,0,.16)",
    border: "1px solid rgba(255,176,0,.22)",
    marginBottom: "14px",
    fontSize: "20px",
  },
  statValue: {
    margin: 0,
    fontSize: "30px",
    fontWeight: 1000,
  },
  statLabel: {
    margin: "5px 0 0",
    color: "rgba(255,255,255,.55)",
    fontSize: "13px",
    fontWeight: 750,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.2fr .8fr",
    gap: "18px",
  },
  panel: {
    borderRadius: "26px",
    background: "#111114",
    border: "1px solid rgba(255,255,255,.10)",
    boxShadow: "0 22px 60px rgba(0,0,0,.22)",
    overflow: "hidden",
  },
  panelHeader: {
    padding: "20px 22px",
    borderBottom: "1px solid rgba(255,255,255,.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
  },
  panelTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 1000,
  },
  panelBody: {
    padding: "22px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "16px",
  },
  itemCard: {
    borderRadius: "22px",
    background: "rgba(255,255,255,.055)",
    border: "1px solid rgba(255,255,255,.09)",
    overflow: "hidden",
  },
  cardTop: {
    minHeight: "110px",
    padding: "18px",
    background: "radial-gradient(circle at 20% 10%,rgba(255,176,0,.38),transparent 34%),linear-gradient(135deg,rgba(255,176,0,.20),rgba(255,101,0,.08),rgba(255,255,255,.045))",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
    boxSizing: "border-box",
  },
  sportIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "18px",
    display: "grid",
    placeItems: "center",
    background: "rgba(0,0,0,.35)",
    border: "1px solid rgba(255,255,255,.16)",
    fontSize: "26px",
  },
  itemBody: {
    padding: "16px",
  },
  badge: {
    display: "inline-block",
    borderRadius: "999px",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: 900,
    color: "#ffd27a",
    background: "rgba(255,176,0,.14)",
    border: "1px solid rgba(255,176,0,.24)",
  },
  successBadge: {
    display: "inline-block",
    borderRadius: "999px",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: 900,
    color: "#86efac",
    background: "rgba(34,197,94,.12)",
    border: "1px solid rgba(34,197,94,.22)",
  },
  warningBadge: {
    display: "inline-block",
    borderRadius: "999px",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: 900,
    color: "#fdba74",
    background: "rgba(249,115,22,.12)",
    border: "1px solid rgba(249,115,22,.22)",
  },
  primaryBtn: {
    border: "0",
    borderRadius: "14px",
    background: "linear-gradient(135deg,#ffb000,#ff6500)",
    color: "#080808",
    padding: "11px 14px",
    fontWeight: 1000,
    cursor: "pointer",
    boxShadow: "0 12px 26px rgba(255,122,0,.24)",
  },
  secondaryBtn: {
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: "14px",
    background: "rgba(255,255,255,.06)",
    color: "#fff",
    padding: "10px 13px",
    fontWeight: 850,
    cursor: "pointer",
  },
  dangerBtn: {
    border: "1px solid rgba(255,99,99,.24)",
    borderRadius: "14px",
    background: "rgba(255,99,99,.10)",
    color: "#ff8b8b",
    padding: "10px 13px",
    fontWeight: 850,
    cursor: "pointer",
  },
  list: {
    display: "grid",
    gap: "12px",
  },
  listItem: {
    borderRadius: "18px",
    padding: "15px",
    background: "rgba(255,255,255,.055)",
    border: "1px solid rgba(255,255,255,.08)",
  },
  tableWrap: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "720px",
  },
  th: {
    textAlign: "left",
    color: "rgba(255,255,255,.45)",
    fontSize: "12px",
    padding: "0 12px 12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  td: {
    padding: "14px 12px",
    borderTop: "1px solid rgba(255,255,255,.08)",
    fontSize: "14px",
    verticalAlign: "middle",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "14px",
  },
  formGroup: {
    display: "grid",
    gap: "7px",
  },
  label: {
    fontSize: "13px",
    color: "rgba(255,255,255,.76)",
    fontWeight: 850,
  },
  input: {
    width: "100%",
    height: "46px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.065)",
    color: "#fff",
    padding: "0 14px",
    outline: "none",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    height: "46px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.14)",
    background: "#17171a",
    color: "#fff",
    padding: "0 14px",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "96px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.065)",
    color: "#fff",
    padding: "12px 14px",
    outline: "none",
    boxSizing: "border-box",
    resize: "vertical",
  },
  error: {
    color: "#ff8585",
    fontSize: "12px",
    fontWeight: 750,
  },
};

const menuItems = [
  { id: "inicio", label: "Inicio" },
  { id: "clases", label: "Mis clases" },
  { id: "horarios", label: "Horarios" },
  { id: "salas", label: "Salas" },
  { id: "perfil", label: "Perfil" },
];

const dayNames = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };

function normalize(text) {
  return String(text).toLowerCase().trim();
}

function badgeStyle(status) {
  if (status === "Publicada" || status === "Publicado" || status === "Activa" || status === "Activo") return styles.successBadge;
  if (status === "Observación" || status === "Borrador") return styles.warningBadge;
  return styles.badge;
}

export default function CoachDashboard() {
  const navigate = useNavigate();
  const { user, loadUser } = useAuth();
  const [activeSection, setActiveSection] = useState("inicio");
  const [search, setSearch] = useState("");
  const [classes, setClasses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [profileForm, setProfileForm] = useState({
    full_name: '',
    email: '',
    birth_date: '',
  });
  const [passForm, setPassForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const loadData = async () => {
    try {
      const [classesRes, schedulesRes, roomsRes] = await Promise.all([
        api.get('/coach/my-classes'),
        api.get('/coach/my-schedules'),
        api.get('/coach/my-rooms'),
      ]);
      setClasses(classesRes.data.data || []);
      setSchedules(schedulesRes.data.data || []);
      setRooms(roomsRes.data.data || []);
    } catch {
      /* handled by interceptor */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setProfileForm({
        full_name: user.full_name || '',
        email: user.email || '',
        birth_date: user.birth_date || '',
      });
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, []);

  const filteredClasses = useMemo(() => {
    const q = normalize(search);
    return classes.filter((c) => {
      const name = c.Sport?.name || c.sport?.name || '';
      const room = c.Room?.name || c.room?.name || '';
      return normalize(`${name} ${room} ${c.observation || ''}`).includes(q);
    });
  }, [classes, search]);

  const filteredSchedules = useMemo(() => {
    const q = normalize(search);
    return schedules.filter((s) => {
      const day = dayNames[s.day_of_week] || '';
      return normalize(`${day} ${s.start_time || ''} ${s.end_time || ''}`).includes(q);
    });
  }, [schedules, search]);

  const filteredRooms = useMemo(() => {
    const q = normalize(search);
    return rooms.filter((r) => normalize(`${r.name} ${r.description || ''} ${r.location || ''}`).includes(q));
  }, [rooms, search]);

  const stats = [
    { value: classes.length, label: "Clases asignadas" },
    { value: schedules.length, label: "Horarios" },
    { value: rooms.length, label: "Salas asignadas" },
    { value: user?.full_name?.split(' ')[0] || 'Coach', label: "Bienvenido" },
  ];

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      await loadUser();
      Swal.fire({ icon: 'success', title: 'Perfil actualizado', timer: 1500, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar el perfil' });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passForm.new_password !== passForm.confirm_password) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Las contraseñas no coinciden' });
      return;
    }
    try {
      await changePassword(passForm.current_password, passForm.new_password, passForm.confirm_password);
      Swal.fire({ icon: 'success', title: 'Contraseña actualizada', timer: 1500, showConfirmButton: false });
      setPassForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cambiar la contraseña' });
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0b0b0d', display: 'grid', placeItems: 'center', color: '#ffb000', fontSize: '24px', fontWeight: 1000 }}>
        Cargando...
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <img src="/logo.png" style={styles.logo} alt="SportClub" />
          <div>
            <h1 style={styles.brandTitle}>SportClub</h1>
            <p style={styles.brandSub}>Panel de coach</p>
          </div>
        </div>

        <div style={styles.coachCard}>
          <div style={styles.avatar}>👤</div>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 1000 }}>{user?.full_name || 'Coach'}</h2>
          <p style={{ ...styles.muted, margin: "5px 0 0" }}>{user?.email || ''}</p>
          <div style={{ marginTop: "12px" }}>
            <span style={styles.badge}>{user?.role || 'coach'}</span>
          </div>
        </div>

        <p style={styles.navLabel}>Menú</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveSection(item.id)}
            style={{ ...styles.navButton, ...(activeSection === item.id ? styles.navButtonActive : {}) }}
          >
            <span>{item.label}</span>
          </button>
        ))}
        <button type="button" onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/login'); }}
          style={{ width: '100%', border: '1px solid rgba(255,99,99,.2)', borderRadius: '16px', padding: '13px 14px', background: 'rgba(255,99,99,.08)', color: '#ff8b8b', display: 'flex', alignItems: 'center', gap: '11px', cursor: 'pointer', fontWeight: 850, marginTop: '16px', textAlign: 'left', fontSize: '13px' }}>
          <span>Cerrar sesión</span>
        </button>
      </aside>

      <main style={styles.main}>
        <header style={styles.topbar}>
          <div>
            <h2 style={styles.title}>Dashboard Coach</h2>
            <p style={{ ...styles.muted, margin: "8px 0 0" }}>
              Administra tus clases, horarios, salas y rendimiento.
            </p>
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
            placeholder="Buscar clases, horarios o salas..."
          />
        </header>

        <section style={styles.statsGrid}>
          {stats.map((stat) => (
            <article key={stat.label} style={styles.statCard}>
              <h3 style={styles.statValue}>{stat.value}</h3>
              <p style={styles.statLabel}>{stat.label}</p>
            </article>
          ))}
        </section>

        {activeSection === "inicio" && (
          <section style={styles.grid}>
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h3 style={styles.panelTitle}>Tus clases</h3>
              </div>
              <div style={styles.panelBody}>
                {filteredClasses.length === 0 ? (
                  <p style={styles.muted}>No tienes clases asignadas.</p>
                ) : (
                  <div style={styles.cardGrid}>
                    {filteredClasses.slice(0, 3).map((c) => <ClassCard key={c.id} item={c} />)}
                  </div>
                )}
              </div>
            </div>

            <div style={styles.panel}>
              <div style={styles.panelHeader}><h3 style={styles.panelTitle}>Resumen</h3></div>
              <div style={styles.panelBody}>
                <div style={styles.list}>
                  <div style={styles.listItem}>Tienes <strong>{classes.length}</strong> clase(s) asignada(s).</div>
                  <div style={styles.listItem}><strong>{schedules.length}</strong> horario(s) programado(s).</div>
                  <div style={styles.listItem}><strong>{rooms.length}</strong> sala(s) asignada(s).</div>
                  <div style={styles.listItem}>Sigue así, coach.</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "clases" && (
          <section style={styles.panel}>
            <div style={styles.panelHeader}>
              <div>
                <h3 style={styles.panelTitle}>Mis clases</h3>
                <p style={{ ...styles.muted, margin: "6px 0 0" }}>Clases deportivas que tienes asignadas.</p>
              </div>
            </div>
            <div style={styles.panelBody}>
              {filteredClasses.length === 0 ? (
                <p style={styles.muted}>No tienes clases asignadas.</p>
              ) : (
                <div style={styles.cardGrid}>
                  {filteredClasses.map((c) => <ClassCard key={c.id} item={c} />)}
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === "horarios" && (
          <section style={styles.panel}>
            <div style={styles.panelHeader}>
              <h3 style={styles.panelTitle}>Mis horarios</h3>
              <span style={styles.badge}>{filteredSchedules.length} horario(s)</span>
            </div>
            <div style={styles.panelBody}>
              {filteredSchedules.length === 0 ? (
                <p style={styles.muted}>No tienes horarios asignados.</p>
              ) : (
                <div style={styles.tableWrap}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Día</th>
                        <th style={styles.th}>Inicio</th>
                        <th style={styles.th}>Fin</th>
                        <th style={styles.th}>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSchedules.map((s) => (
                        <tr key={s.id}>
                          <td style={styles.td}>{s.id}</td>
                          <td style={styles.td}>{dayNames[s.day_of_week] || s.day_of_week}</td>
                          <td style={styles.td}>{s.start_time?.substring(0, 5) || '-'}</td>
                          <td style={styles.td}>{s.end_time?.substring(0, 5) || '-'}</td>
                          <td style={styles.td}>
                            <span style={s.status ? styles.successBadge : styles.warningBadge}>
                              {s.status ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === "salas" && (
          <section style={styles.panel}>
            <div style={styles.panelHeader}>
              <h3 style={styles.panelTitle}>Mis salas</h3>
              <span style={styles.badge}>{filteredRooms.length} sala(s)</span>
            </div>
            <div style={styles.panelBody}>
              {filteredRooms.length === 0 ? (
                <p style={styles.muted}>No tienes salas asignadas.</p>
              ) : (
                <div style={styles.tableWrap}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Nombre</th>
                        <th style={styles.th}>Descripción</th>
                        <th style={styles.th}>Capacidad</th>
                        <th style={styles.th}>Ubicación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRooms.map((r) => (
                        <tr key={r.id}>
                          <td style={styles.td}>{r.id}</td>
                          <td style={styles.td}>{r.name}</td>
                          <td style={styles.td}>{r.description || '-'}</td>
                          <td style={styles.td}>{r.capacity}</td>
                          <td style={styles.td}>{r.location || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === "perfil" && (
          <section style={styles.panel}>
            <div style={styles.panelHeader}>
              <h3 style={styles.panelTitle}>Perfil del coach</h3>
              <span style={styles.successBadge}>Coach activo</span>
            </div>
            <div style={styles.panelBody}>
              <form onSubmit={handleProfileUpdate}>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="full_name">Nombre completo</label>
                    <input
                      id="full_name"
                      name="full_name"
                      value={profileForm.full_name}
                      onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="email">Correo</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="birth_date">Fecha de nacimiento</label>
                    <input
                      id="birth_date"
                      name="birth_date"
                      type="date"
                      value={profileForm.birth_date || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, birth_date: e.target.value })}
                      style={styles.input}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <button type="submit" style={styles.primaryBtn}>Guardar cambios</button>
                </div>
              </form>

              <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <h4 style={{ fontSize: '18px', fontWeight: 1000, margin: '0 0 14px' }}>Cambiar contraseña</h4>
                <form onSubmit={handlePasswordChange}>
                  <div style={styles.formGrid}>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="current_password">Contraseña actual</label>
                      <input
                        id="current_password"
                        name="current_password"
                        type="password"
                        value={passForm.current_password}
                        onChange={(e) => setPassForm({ ...passForm, current_password: e.target.value })}
                        style={styles.input}
                        required
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="new_password">Nueva contraseña</label>
                      <input
                        id="new_password"
                        name="new_password"
                        type="password"
                        value={passForm.new_password}
                        onChange={(e) => setPassForm({ ...passForm, new_password: e.target.value })}
                        style={styles.input}
                        required
                        minLength={8}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="confirm_password">Confirmar contraseña</label>
                      <input
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        value={passForm.confirm_password}
                        onChange={(e) => setPassForm({ ...passForm, confirm_password: e.target.value })}
                        style={styles.input}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <button type="submit" style={styles.secondaryBtn}>Cambiar contraseña</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function ClassCard({ item }) {
  const sportName = item.Sport?.name || item.sport?.name || 'Deporte';
  const roomName = item.Room?.name || item.room?.name || 'Sala';
  return (
    <article style={styles.itemCard}>
      <div style={styles.cardTop}>
        <div style={styles.sportIcon}></div>
        <span style={item.status ? styles.successBadge : styles.warningBadge}>
          {item.status ? 'Activa' : 'Inactiva'}
        </span>
      </div>
      <div style={styles.itemBody}>
        <h4 style={{ margin: "0 0 8px", fontSize: "18px", lineHeight: 1.15 }}>{sportName}</h4>
        <p style={{ ...styles.muted, margin: 0 }}>Sala: {roomName}</p>
        <p style={{ ...styles.muted, margin: "4px 0 0" }}>ID: {item.id}</p>
        <p style={{ ...styles.muted, margin: "4px 0 0" }}>{item.observation || ''}</p>
      </div>
    </article>
  );
}


