import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile, changePassword } from '../../services/authService';
import Swal from 'sweetalert2';

export default function ProfilePage() {
  const { user, loadUser } = useAuth();
  const [form, setForm] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    birth_date: user?.birth_date || '',
  });
  const [passForm, setPassForm] = useState({ current_password: '', new_password: '', confirm_password: '' });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(form);
      await loadUser();
      Swal.fire({ icon: 'success', title: 'Perfil actualizado', timer: 1500, showConfirmButton: false });
    } catch { /* handled */ }
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
    } catch { /* handled */ }
  };

  return (
    <div>
      <h1>Mi Perfil</h1>
      <div className="profile-section">
        <h2>Datos Personales</h2>
        <form onSubmit={handleProfileUpdate}>
          <div className="form-group">
            <label>Nombre completo</label>
            <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <input type="date" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })} />
          </div>
          <button className="btn btn-primary">Actualizar Perfil</button>
        </form>
      </div>

      <div className="profile-section">
        <h2>Cambiar Contraseña</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label>Contraseña actual</label>
            <input type="password" value={passForm.current_password} onChange={(e) => setPassForm({ ...passForm, current_password: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Nueva contraseña</label>
            <input type="password" value={passForm.new_password} onChange={(e) => setPassForm({ ...passForm, new_password: e.target.value })} required minLength={8} />
          </div>
          <div className="form-group">
            <label>Confirmar nueva contraseña</label>
            <input type="password" value={passForm.confirm_password} onChange={(e) => setPassForm({ ...passForm, confirm_password: e.target.value })} required />
          </div>
          <button className="btn btn-primary">Cambiar Contraseña</button>
        </form>
      </div>
    </div>
  );
}
