import { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const emptyForm = { name: '', objective: '', duration: 60, status: true };

export default function SportsPage() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await api.get('/sports');
    setItems(res.data.data || []);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowModal(true); };

  const openEdit = (item) => {
    setForm({ name: item.name, objective: item.objective, duration: item.duration, status: item.status });
    setEditing(item.id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/sports/${editing}`, form);
      } else {
        await api.post('/sports', form);
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
      await api.delete(`/sports/${id}`);
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false });
      load();
    } catch { /* handled */ }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Deportes</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Nuevo Deporte</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Objetivo</th>
              <th>Duración (min)</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.objective}</td>
                <td>{item.duration}</td>
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
            <h2>{editing ? 'Editar Deporte' : 'Nuevo Deporte'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Objetivo</label>
                <textarea value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Duración (minutos)</label>
                <input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: +e.target.value })} required min={1} />
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
