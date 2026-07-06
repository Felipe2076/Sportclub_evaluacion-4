import { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const emptyForm = { sport_id: '', room_id: '', coach_id: '', observation: '', status: true };

export default function SportRoomsPage() {
  const [items, setItems] = useState([]);
  const [sports, setSports] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const [res, s, r, c] = await Promise.all([
      api.get('/sport-rooms'),
      api.get('/sports'),
      api.get('/rooms'),
      api.get('/users?role=coach'),
    ]);
    setItems(res.data.data || []);
    setSports(s.data.data || []);
    setRooms(r.data.data || []);
    setCoaches(c.data.data || []);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowModal(true); };

  const openEdit = (item) => {
    setForm({ sport_id: item.sport_id, room_id: item.room_id, coach_id: item.coach_id, observation: item.observation || '', status: item.status });
    setEditing(item.id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/sport-rooms/${editing}`, form);
      } else {
        await api.post('/sport-rooms', form);
      }
      setShowModal(false);
      Swal.fire({ icon: 'success', title: 'Éxito', timer: 1500, showConfirmButton: false });
      load();
    } catch { /* handled */ }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({ title: '¿Eliminar?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonText: 'Cancelar', confirmButtonText: 'Eliminar' });
    if (!result.isConfirmed) return;
    try {
      await api.delete(`/sport-rooms/${id}`);
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false });
      load();
    } catch { /* handled */ }
  };

  const getSportName = (id) => sports.find((s) => s.id === id)?.name || id;
  const getRoomName = (id) => rooms.find((r) => r.id === id)?.name || id;
  const getCoachName = (id) => coaches.find((c) => c.id === id)?.full_name || id;

  return (
    <div>
      <div className="page-header">
        <h1>Asignaciones (Deporte - Sala - Coach)</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Nueva Asignación</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Deporte</th>
              <th>Sala</th>
              <th>Coach</th>
              <th>Observación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{getSportName(item.sport_id)}</td>
                <td>{getRoomName(item.room_id)}</td>
                <td>{getCoachName(item.coach_id)}</td>
                <td>{item.observation || '-'}</td>
                <td><span className={`badge ${item.status ? 'badge-active' : 'badge-inactive'}`}>{item.status ? 'Activo' : 'Inactivo'}</span></td>
                <td className="actions">
                  <button className="btn btn-sm btn-edit" onClick={() => openEdit(item)}>Editar</button>
                  <button className="btn btn-sm btn-delete" onClick={() => handleDelete(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Editar Asignación' : 'Nueva Asignación'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Deporte</label>
                <select value={form.sport_id} onChange={(e) => setForm({ ...form, sport_id: +e.target.value })} required>
                  <option value="">Seleccionar...</option>
                  {sports.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Sala</label>
                <select value={form.room_id} onChange={(e) => setForm({ ...form, room_id: +e.target.value })} required>
                  <option value="">Seleccionar...</option>
                  {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Coach</label>
                <select value={form.coach_id} onChange={(e) => setForm({ ...form, coach_id: +e.target.value })} required>
                  <option value="">Seleccionar...</option>
                  {coaches.map((c) => <option key={c.id} value={c.id}>{c.full_name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Observación</label>
                <textarea value={form.observation} onChange={(e) => setForm({ ...form, observation: e.target.value })} />
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" checked={form.status} onChange={(e) => setForm({ ...form, status: e.target.checked })} />
                  {' '}Activo
                </label>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">{editing ? 'Actualizar' : 'Crear'}</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
