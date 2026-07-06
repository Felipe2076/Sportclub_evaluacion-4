import { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const emptyForm = { full_name: '', email: '', password: '', role: 'user', birth_date: '' };

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await api.get('/users');
    setUsers(res.data.data || []);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (user) => {
    setForm({ full_name: user.full_name, email: user.email, role: user.role, birth_date: user.birth_date || '', password: '' });
    setEditing(user.id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await api.put(`/users/${editing}`, payload);
      } else {
        await api.post('/users', form);
      }
      setShowModal(false);
      Swal.fire({ icon: 'success', title: 'Éxito', text: editing ? 'Usuario actualizado' : 'Usuario creado', timer: 1500, showConfirmButton: false });
      load();
    } catch {
      // handled by interceptor
    }
  };

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({ title: '¿Eliminar?', text: `Se eliminará a ${name}`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonText: 'Cancelar', confirmButtonText: 'Eliminar' });
    if (!result.isConfirmed) return;
    try {
      await api.delete(`/users/${id}`);
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false });
      load();
    } catch {
      // handled by interceptor
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Usuarios</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Nuevo Usuario</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha Nac.</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.full_name}</td>
                <td>{u.email}</td>
                <td><span className={`badge badge-${u.role}`}>{u.role}</span></td>
                <td>{u.birth_date || '-'}</td>
                <td className="actions">
                  <button className="btn btn-sm btn-edit" onClick={() => openEdit(u)}>Editar</button>
                  <button className="btn btn-sm btn-delete" onClick={() => handleDelete(u.id, u.full_name)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre completo</label>
                <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Contraseña {editing && '(dejar vacío para mantener)'}</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required={!editing} minLength={editing ? 0 : 8} />
              </div>
              <div className="form-group">
                <label>Rol</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option value="user">Usuario</option>
                  <option value="coach">Coach</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fecha de nacimiento</label>
                <input type="date" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })} />
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
