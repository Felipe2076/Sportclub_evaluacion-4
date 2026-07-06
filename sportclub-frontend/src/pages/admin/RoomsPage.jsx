import { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const emptyForm = { name: '', description: '', capacity: 10, location: '', observation: '', image_url: '', status: true };

export default function RoomsPage() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await api.get('/rooms');
    setItems(res.data.data || []);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowModal(true); };

  const openEdit = (item) => {
    setForm({ name: item.name, description: item.description, capacity: item.capacity, location: item.location || '', observation: item.observation || '', image_url: item.image_url || '', status: item.status });
    setEditing(item.id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/rooms/${editing}`, form);
      } else {
        await api.post('/rooms', form);
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
      await api.delete(`/rooms/${id}`);
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false });
      load();
    } catch { /* handled */ }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Salas</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Nueva Sala</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Capacidad</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.capacity}</td>
                <td>{item.location || '-'}</td>
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
            <h2>{editing ? 'Editar Sala' : 'Nueva Sala'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Capacidad</label>
                  <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: +e.target.value })} required min={1} />
                </div>
                <div className="form-group">
                  <label>Ubicación</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                </div>
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
