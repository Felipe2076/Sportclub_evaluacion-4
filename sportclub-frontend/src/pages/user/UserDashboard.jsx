import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { updateProfile, changePassword } from '../../services/authService';
import Swal from 'sweetalert2';

const styles = {
  page: { minHeight: "100vh", background: "#0b0b0d", color: "#ffffff", fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", display: "grid", gridTemplateColumns: "270px 1fr" },
  sidebar: { position: "sticky", top: 0, height: "100vh", background: "#050505", borderRight: "1px solid rgba(255,255,255,.10)", padding: "24px", boxSizing: "border-box", overflowY: "auto" },
  brand: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "26px" },
  logo: { width: "44px", height: "44px", borderRadius: "15px", objectFit: "cover", boxShadow: "0 12px 28px rgba(255,122,0,.28)" },
  brandTitle: { margin: 0, fontSize: "17px", fontWeight: 1000, letterSpacing: ".5px" },
  brandSub: { margin: "3px 0 0", fontSize: "12px", color: "rgba(255,255,255,.50)" },
  profileCard: { borderRadius: "22px", padding: "18px", background: "linear-gradient(145deg,rgba(255,176,0,.18),rgba(255,101,0,.08),rgba(255,255,255,.04))", border: "1px solid rgba(255,176,0,.22)", marginBottom: "24px" },
  avatar: { width: "58px", height: "58px", borderRadius: "20px", display: "grid", placeItems: "center", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.14)", fontSize: "28px", marginBottom: "12px" },
  navLabel: { margin: "22px 0 10px", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,.42)", fontWeight: 900 },
  navButton: { width: "100%", border: "1px solid transparent", borderRadius: "16px", padding: "13px 14px", background: "transparent", color: "rgba(255,255,255,.70)", display: "flex", alignItems: "center", gap: "11px", cursor: "pointer", fontWeight: 850, marginBottom: "8px", textAlign: "left", fontSize: "13px" },
  navButtonActive: { background: "linear-gradient(135deg,rgba(255,176,0,.20),rgba(255,101,0,.10))", borderColor: "rgba(255,176,0,.30)", color: "#ffb000" },
  main: { minWidth: 0, padding: "28px", boxSizing: "border-box" },
  topbar: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "18px", marginBottom: "24px", flexWrap: "wrap" },
  title: { margin: 0, fontSize: "34px", lineHeight: 1, fontWeight: 1000, letterSpacing: "-1.4px" },
  muted: { color: "rgba(255,255,255,.58)", lineHeight: 1.6, fontSize: "14px" },
  search: { width: "min(360px,100%)", height: "46px", borderRadius: "999px", border: "1px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.06)", color: "#fff", padding: "0 18px", outline: "none", boxSizing: "border-box" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "16px", marginBottom: "22px" },
  statCard: { borderRadius: "24px", padding: "20px", background: "linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.035))", border: "1px solid rgba(255,255,255,.10)", boxShadow: "0 18px 50px rgba(0,0,0,.20)" },
  statIcon: { width: "42px", height: "42px", borderRadius: "15px", display: "grid", placeItems: "center", background: "rgba(255,176,0,.16)", border: "1px solid rgba(255,176,0,.22)", marginBottom: "14px", fontSize: "20px" },
  statValue: { margin: 0, fontSize: "30px", fontWeight: 1000 },
  statLabel: { margin: "5px 0 0", color: "rgba(255,255,255,.55)", fontSize: "13px", fontWeight: 750 },
  grid: { display: "grid", gridTemplateColumns: "1.25fr .75fr", gap: "18px" },
  panel: { borderRadius: "26px", background: "#111114", border: "1px solid rgba(255,255,255,.10)", boxShadow: "0 22px 60px rgba(0,0,0,.22)", overflow: "hidden" },
  panelHeader: { padding: "20px 22px", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" },
  panelTitle: { margin: 0, fontSize: "20px", fontWeight: 1000 },
  panelBody: { padding: "22px" },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "16px" },
  itemCard: { borderRadius: "22px", background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.09)", overflow: "hidden" },
  itemBody: { padding: "16px" },
  badge: { display: "inline-block", borderRadius: "999px", padding: "6px 10px", fontSize: "12px", fontWeight: 900, color: "#ffd27a", background: "rgba(255,176,0,.14)", border: "1px solid rgba(255,176,0,.24)" },
  successBadge: { display: "inline-block", borderRadius: "999px", padding: "6px 10px", fontSize: "12px", fontWeight: 900, color: "#86efac", background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.22)" },
  warningBadge: { display: "inline-block", borderRadius: "999px", padding: "6px 10px", fontSize: "12px", fontWeight: 900, color: "#fdba74", background: "rgba(249,115,22,.12)", border: "1px solid rgba(249,115,22,.22)" },
  primaryBtn: { border: "0", borderRadius: "14px", background: "linear-gradient(135deg,#ffb000,#ff6500)", color: "#080808", padding: "11px 14px", fontWeight: 1000, cursor: "pointer", boxShadow: "0 12px 26px rgba(255,122,0,.24)", fontSize: "13px" },
  secondaryBtn: { border: "1px solid rgba(255,255,255,.15)", borderRadius: "14px", background: "rgba(255,255,255,.06)", color: "#fff", padding: "10px 13px", fontWeight: 850, cursor: "pointer", fontSize: "12px" },
  dangerBtn: { border: "1px solid rgba(255,99,99,.24)", borderRadius: "14px", background: "rgba(255,99,99,.10)", color: "#ff8b8b", padding: "10px 13px", fontWeight: 850, cursor: "pointer", fontSize: "12px" },
  list: { display: "grid", gap: "12px" },
  listItem: { borderRadius: "18px", padding: "15px", background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.08)" },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "600px" },
  th: { textAlign: "left", color: "rgba(255,255,255,.45)", fontSize: "12px", padding: "0 12px 12px", textTransform: "uppercase", letterSpacing: "1px" },
  td: { padding: "14px 12px", borderTop: "1px solid rgba(255,255,255,.08)", fontSize: "14px", verticalAlign: "middle" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "14px" },
  formGroup: { display: "grid", gap: "7px" },
  label: { fontSize: "13px", color: "rgba(255,255,255,.76)", fontWeight: 850 },
  input: { width: "100%", height: "46px", borderRadius: "15px", border: "1px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.065)", color: "#fff", padding: "0 14px", outline: "none", boxSizing: "border-box" },
  select: { width: "100%", height: "46px", borderRadius: "15px", border: "1px solid rgba(255,255,255,.14)", background: "#17171a", color: "#fff", padding: "0 14px", outline: "none", boxSizing: "border-box" },
};

const menuItems = [
  { id: "inicio", label: "Inicio" },
  { id: "clases", label: "Clases disponibles" },
  { id: "deportes", label: "Deportes" },
  { id: "salas", label: "Salas" },
  { id: "reservas", label: "Mis reservas" },
  { id: "perfil", label: "Perfil" },
];

const dayNames = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };

function normalize(text) { return String(text).toLowerCase().trim(); }

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("inicio");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [sports, setSports] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [myReservations, setMyReservations] = useState([]);
  const [profileForm, setProfileForm] = useState({ full_name: '', email: '', birth_date: '' });
  const [passForm, setPassForm] = useState({ current_password: '', new_password: '', confirm_password: '' });

  const loadData = async () => {
    try {
      const [c, sp, r, res] = await Promise.all([
        api.get('/member/classes'),
        api.get('/member/sports'),
        api.get('/member/rooms'),
        api.get('/reservations/my-reservations'),
      ]);
      setClasses(c.data.data || []);
      setSports(sp.data.data || []);
      setRooms(r.data.data || []);
      setMyReservations(res.data.data || []);
    } catch { /* handled */ } finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);
  useEffect(() => {
    if (user) setProfileForm({ full_name: user.full_name || '', email: user.email || '', birth_date: user.birth_date || '' });
  }, [user]);

  const activeReservations = myReservations.filter((r) => r.status === 'active');
  const q = search.trim().toLowerCase();
  const filteredClasses = useMemo(() => classes.filter((c) => {
    const sn = c.SportRoom?.sport?.name || c.sport_room?.sport?.name || '';
    const rn = c.SportRoom?.room?.name || c.sport_room?.room?.name || '';
    const cn = c.SportRoom?.coach?.full_name || c.sport_room?.coach?.full_name || '';
    return normalize(`${sn} ${rn} ${cn}`).includes(q);
  }), [classes, q]);

  const filteredSports = useMemo(() => sports.filter((s) => normalize(`${s.name} ${s.objective}`).includes(q)), [sports, q]);
  const filteredRooms = useMemo(() => rooms.filter((r) => normalize(`${r.name} ${r.description} ${r.location||''}`).includes(q)), [rooms, q]);
  const filteredRes = useMemo(() => myReservations.filter((r) => `${r.id} ${r.status}`.includes(q)), [myReservations, q]);

  const handleReserve = async (classScheduleId) => {
    try {
      await api.post('/reservations', { class_schedule_id: classScheduleId });
      Swal.fire({ icon: 'success', title: 'Reserva creada', text: 'Tu clase ha sido reservada', timer: 2000, showConfirmButton: false });
      loadData();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || 'Error al crear reserva' });
    }
  };

  const handleCancelReservation = async (id) => {
    const result = await Swal.fire({ title: '¿Cancelar reserva?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonText: 'No', confirmButtonText: 'Sí, cancelar' });
    if (!result.isConfirmed) return;
    try {
      await api.patch(`/reservations/${id}/cancel`);
      Swal.fire({ icon: 'success', title: 'Reserva cancelada', timer: 1500, showConfirmButton: false });
      loadData();
    } catch { Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cancelar la reserva' }); }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try { await updateProfile(profileForm); Swal.fire({ icon: 'success', title: 'Perfil actualizado', timer: 1500, showConfirmButton: false }); } catch { Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar el perfil' }); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passForm.new_password !== passForm.confirm_password) { Swal.fire({ icon: 'error', title: 'Error', text: 'Las contraseñas no coinciden' }); return; }
    try {
      await changePassword(passForm.current_password, passForm.new_password, passForm.confirm_password);
      Swal.fire({ icon: 'success', title: 'Contraseña actualizada', timer: 1500, showConfirmButton: false });
      setPassForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch { Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cambiar la contraseña' }); }
  };

  if (loading) return <div style={{ minHeight: '100vh', background: '#0b0b0d', display: 'grid', placeItems: 'center', color: '#ffb000', fontSize: '24px', fontWeight: 1000 }}>Cargando...</div>;

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <img src="/logo.png" style={styles.logo} alt="SportClub" />
          <div><h1 style={styles.brandTitle}>SportClub</h1><p style={styles.brandSub}>Panel de usuario</p></div>
        </div>
        <div style={styles.profileCard}>
          <div style={styles.avatar}>👤</div>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 1000 }}>{user?.full_name || 'Usuario'}</h2>
          <p style={{ ...styles.muted, margin: "5px 0 0" }}>{user?.email || ''}</p>
          <div style={{ marginTop: "12px" }}><span style={styles.badge}>{user?.role || 'user'}</span></div>
        </div>
        <p style={styles.navLabel}>Menú</p>
        {menuItems.map((item) => (
          <button key={item.id} type="button" onClick={() => { setActiveSection(item.id); setSearch(''); }}
            style={{ ...styles.navButton, ...(activeSection === item.id ? styles.navButtonActive : {}) }}>
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
            <h2 style={styles.title}>Dashboard Usuario</h2>
            <p style={{ ...styles.muted, margin: "8px 0 0" }}>Explora clases, deportes, salas y gestiona tus reservas.</p>
          </div>
          {activeSection !== 'inicio' && activeSection !== 'perfil' && (
            <input value={search} onChange={(e) => setSearch(e.target.value)} style={styles.search} placeholder="Buscar..." />
          )}
        </header>

        {activeSection === "inicio" && (
          <>
            <section style={styles.statsGrid}>
              {[
                { value: classes.length, label: "Clases disponibles" },
                { value: sports.length, label: "Deportes" },
                { value: rooms.length, label: "Salas" },
                { value: activeReservations.length, label: "Reservas activas" },
              ].map((stat) => (
                <article key={stat.label} style={styles.statCard}>
                  <h3 style={styles.statValue}>{stat.value}</h3>
                  <p style={styles.statLabel}>{stat.label}</p>
                </article>
              ))}
            </section>
            <section style={styles.grid}>
              <div style={styles.panel}>
                <div style={styles.panelHeader}><h3 style={styles.panelTitle}>Próximas actividades</h3><span style={styles.badge}>Hoy</span></div>
                <div style={styles.panelBody}>
                  {filteredClasses.slice(0, 3).length === 0 ? <p style={styles.muted}>No hay clases disponibles.</p> : (
                    <div style={styles.cardGrid}>
                      {filteredClasses.slice(0, 3).map((c) => <ClassCard key={c.id} item={c} onReserve={handleReserve} isBooked={myReservations.some((r) => r.class_schedule_id === c.id && r.status === 'active')} />)}
                    </div>
                  )}
                </div>
              </div>
              <div style={styles.panel}>
                <div style={styles.panelHeader}><h3 style={styles.panelTitle}>Resumen rápido</h3></div>
                <div style={styles.panelBody}>
                  <div style={styles.list}>
                    <div style={styles.listItem}><strong>{activeReservations.length}</strong> reserva(s) activa(s).</div>
                    <div style={styles.listItem}><strong>{sports.length}</strong> deporte(s) disponible(s).</div>
                    <div style={styles.listItem}><strong>{rooms.length}</strong> sala(s) disponible(s).</div>
                    <div style={styles.listItem}><strong>{classes.length}</strong> clase(s) para elegir.</div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === "clases" && (
          <section style={styles.panel}>
            <div style={styles.panelHeader}>
              <h3 style={styles.panelTitle}>Clases disponibles</h3>
              <span style={styles.badge}>{filteredClasses.length} clase(s)</span>
            </div>
            <div style={styles.panelBody}>
              {filteredClasses.length === 0 ? <p style={styles.muted}>No hay clases disponibles.</p> : (
                <div style={styles.cardGrid}>
                  {filteredClasses.map((c) => <ClassCard key={c.id} item={c} onReserve={handleReserve} isBooked={myReservations.some((r) => r.class_schedule_id === c.id && r.status === 'active')} />)}
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === "deportes" && (
          <section style={styles.panel}>
            <div style={styles.panelHeader}>
              <h3 style={styles.panelTitle}>Deportes disponibles</h3>
              <span style={styles.badge}>{filteredSports.length} deporte(s)</span>
            </div>
            <div style={styles.panelBody}>
              {filteredSports.length === 0 ? <p style={styles.muted}>No hay deportes registrados.</p> : (
                <div style={styles.cardGrid}>
                  {filteredSports.map((s) => (
                    <article key={s.id} style={styles.itemCard}>
                      <div style={styles.itemBody}>
                        <span style={s.status ? styles.successBadge : styles.warningBadge}>{s.status ? 'Activo' : 'Inactivo'}</span>
                        <h4 style={{ margin: "12px 0 6px", fontSize: "18px" }}>{s.name}</h4>
                        <p style={{ ...styles.muted, margin: 0 }}>{s.objective || ''}</p>
                        <p style={{ ...styles.muted, margin: "4px 0 0" }}>Duración: {s.duration} min</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === "salas" && (
          <section style={styles.panel}>
            <div style={styles.panelHeader}>
              <h3 style={styles.panelTitle}>Salas disponibles</h3>
              <span style={styles.badge}>{filteredRooms.length} sala(s)</span>
            </div>
            <div style={styles.panelBody}>
              {filteredRooms.length === 0 ? <p style={styles.muted}>No hay salas disponibles.</p> : (
                <div style={styles.cardGrid}>
                  {filteredRooms.map((r) => (
                    <article key={r.id} style={styles.itemCard}>
                      <div style={styles.itemBody}>
                        <span style={r.status ? styles.successBadge : styles.warningBadge}>{r.status ? 'Disponible' : 'No disponible'}</span>
                        <h4 style={{ margin: "12px 0 6px", fontSize: "18px" }}>{r.name}</h4>
                        <p style={{ ...styles.muted, margin: 0 }}>{r.description || ''}</p>
                        <p style={{ ...styles.muted, margin: "4px 0" }}>Capacidad: {r.capacity} personas</p>
                        <p style={{ ...styles.muted, margin: 0 }}>{r.location || ''}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === "reservas" && (
          <section style={styles.panel}>
            <div style={styles.panelHeader}>
              <h3 style={styles.panelTitle}>Mis reservas</h3>
              <span style={styles.successBadge}>{activeReservations.length} activa(s)</span>
            </div>
            <div style={styles.panelBody}>
              {filteredRes.length === 0 ? <p style={styles.muted}>No tienes reservas.</p> : (
                <div style={styles.tableWrap}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Horario ID</th>
                        <th style={styles.th}>Estado</th>
                        <th style={styles.th}>Observación</th>
                        <th style={styles.th}>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRes.map((res) => (
                        <tr key={res.id}>
                          <td style={styles.td}>{res.id}</td>
                          <td style={styles.td}>{res.class_schedule_id}</td>
                          <td style={styles.td}><span style={res.status === 'active' ? styles.successBadge : styles.warningBadge}>{res.status}</span></td>
                          <td style={styles.td}>{res.observation || '-'}</td>
                          <td style={styles.td}>
                            {res.status === 'active' && <button type="button" style={styles.dangerBtn} onClick={() => handleCancelReservation(res.id)}>Cancelar</button>}
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

        {activeSection === "perfil" && (
          <section style={styles.panel}>
            <div style={styles.panelHeader}><h3 style={styles.panelTitle}>Mi perfil</h3><span style={styles.successBadge}>Activo</span></div>
            <div style={styles.panelBody}>
              <form onSubmit={handleProfileUpdate}>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="full_name">Nombre completo</label>
                    <input id="full_name" name="full_name" value={profileForm.full_name} onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="email">Correo</label>
                    <input id="email" name="email" type="email" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="birth_date">Fecha de nacimiento</label>
                    <input id="birth_date" name="birth_date" type="date" value={profileForm.birth_date || ''} onChange={(e) => setProfileForm({ ...profileForm, birth_date: e.target.value })} style={styles.input} />
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}><button type="submit" style={styles.primaryBtn}>Guardar cambios</button></div>
              </form>
              <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <h4 style={{ fontSize: '18px', fontWeight: 1000, margin: '0 0 14px' }}>Cambiar contraseña</h4>
                <form onSubmit={handlePasswordChange}>
                  <div style={styles.formGrid}>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="current_password">Contraseña actual</label>
                      <input id="current_password" name="current_password" type="password" value={passForm.current_password} onChange={(e) => setPassForm({ ...passForm, current_password: e.target.value })} style={styles.input} required />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="new_password">Nueva contraseña</label>
                      <input id="new_password" name="new_password" type="password" value={passForm.new_password} onChange={(e) => setPassForm({ ...passForm, new_password: e.target.value })} style={styles.input} required minLength={8} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="confirm_password">Confirmar contraseña</label>
                      <input id="confirm_password" name="confirm_password" type="password" value={passForm.confirm_password} onChange={(e) => setPassForm({ ...passForm, confirm_password: e.target.value })} style={styles.input} required />
                    </div>
                  </div>
                  <div style={{ marginTop: "14px" }}><button type="submit" style={styles.secondaryBtn}>Cambiar contraseña</button></div>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function ClassCard({ item, onReserve, isBooked }) {
  const sportName = item.SportRoom?.sport?.name || item.sport_room?.sport?.name || 'Deporte';
  const roomName = item.SportRoom?.room?.name || item.sport_room?.room?.name || 'Sala';
  const coachName = item.SportRoom?.coach?.full_name || item.sport_room?.coach?.full_name || 'Coach';
  const day = dayNames[item.day_of_week] || item.day_of_week;
  const time = `${item.start_time?.substring(0, 5) || ''} - ${item.end_time?.substring(0, 5) || ''}`;
  return (
    <article style={styles.itemCard}>
      <div style={styles.itemBody}>
        <span style={isBooked ? styles.successBadge : styles.badge}>{isBooked ? 'Reservado' : 'Disponible'}</span>
        <h4 style={{ margin: "12px 0 6px", fontSize: "18px" }}>{sportName}</h4>
        <p style={{ ...styles.muted, margin: 0 }}>Coach: {coachName}</p>
        <p style={{ ...styles.muted, margin: "4px 0" }}>Sala: {roomName}</p>
        <p style={{ ...styles.muted, margin: "4px 0 14px" }}>{day} · {time}</p>
        {isBooked ? (
          <span style={styles.secondaryBtn}>Reservado</span>
        ) : (
          <button type="button" style={styles.primaryBtn} onClick={() => onReserve(item.id)}>Reservar</button>
        )}
      </div>
    </article>
  );
}
