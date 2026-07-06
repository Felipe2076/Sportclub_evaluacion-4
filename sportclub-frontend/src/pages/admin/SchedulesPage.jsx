import { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const dayNames = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };
const emptyForm = { sport_room_id: '', day_of_week: 1, start_time: '08:00', end_time: '09:00', status: true };

export default function SchedulesPage() {
  const [items, setItems] = useState([]);
  const [sportRooms, setSportRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const [res, sr] = await Promise.all([
      api.get('/class-schedules'),
      api.get('/sport-rooms'),
    ]);
    setItems(res.data.data || []);
    setSportRooms(sr.data.data || []);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowModal(true); };
  const openEdit = (item) => {
    setForm({ sport_room_id: item.sport_room_id, day_of_week: item.day_of_week, start_time: item.start_time?.substring(0, 5), end_time: item.end_time?.substring(0, 5), status: item.status });
    setEditing(item.id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, start_time: form.start_time + ':00', end_time: form.end_time + ':00' };
      if (editing) {
        await api.put(`/class-schedules/${editing}`, payload);
      } else {
        await api.post('/class-schedules', payload);
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
      await api.delete(`/class-schedules/${id}`);
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false });
      load();
    } catch { /* handled */ }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Horarios</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Nuevo Horario</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Asignación ID</th>
              <th>Día</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.sport_room_id}</td>
                <td>{dayNames[item.day_of_week] || item.day_of_week}</td>
                <td>{item.start_time?.substring(0, 5)}</td>
                <td>{item.end_time?.substring(0, 5)}</td>
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
            <h2>{editing ? 'Editar Horario' : 'Nuevo Horario'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Asignación (SportRoom ID)</label>
                <input type="number" value={form.sport_room_id} onChange={(e) => setForm({ ...form, sport_room_id: +e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Día de la semana</label>
                <select value={form.day_of_week} onChange={(e) => setForm({ ...form, day_of_week: +e.target.value })}>
                  {Object.entries(dayNames).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Inicio</label>
                  <input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Fin</label>
                  <input type="time" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} required />
                </div>
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
