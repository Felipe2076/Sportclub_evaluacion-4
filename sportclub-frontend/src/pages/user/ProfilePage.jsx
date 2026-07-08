import { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
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
  const [submitting, setSubmitting] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateProfile(form);
      await loadUser();
      Swal.fire({ icon: 'success', title: 'Perfil actualizado', timer: 1500, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar el perfil' });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passForm.new_password !== passForm.confirm_password) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Las contraseñas no coinciden' });
      return;
    }
    setSubmitting(true);
    try {
      await changePassword(passForm.current_password, passForm.new_password, passForm.confirm_password);
      Swal.fire({ icon: 'success', title: 'Contraseña actualizada', timer: 1500, showConfirmButton: false });
      setPassForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cambiar la contraseña' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <h1 className="text-white fw-bold mb-4">Mi Perfil</h1>

      <Card bg="dark" text="white" className="mb-4 border-secondary">
        <Card.Body>
          <Card.Title className="fw-bold mb-3 pb-2 border-bottom border-secondary">Datos Personales</Card.Title>
          <Form onSubmit={handleProfileUpdate}>
            <Form.Group className="mb-3">
              <Form.Label className="text-light fw-bold small">Nombre completo</Form.Label>
              <Form.Control className="bg-dark text-white border-secondary" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-light fw-bold small">Email</Form.Label>
              <Form.Control type="email" className="bg-dark text-white border-secondary" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-light fw-bold small">Fecha de nacimiento</Form.Label>
              <Form.Control type="date" className="bg-dark text-white border-secondary" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })} />
            </Form.Group>
            <Button type="submit" variant="warning" className="fw-bold text-dark" disabled={submitting}>
              {submitting ? 'Guardando...' : 'Actualizar Perfil'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card bg="dark" text="white" className="mb-4 border-secondary">
        <Card.Body>
          <Card.Title className="fw-bold mb-3 pb-2 border-bottom border-secondary">Cambiar Contraseña</Card.Title>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group className="mb-3">
              <Form.Label className="text-light fw-bold small">Contraseña actual</Form.Label>
              <Form.Control type="password" className="bg-dark text-white border-secondary" value={passForm.current_password} onChange={(e) => setPassForm({ ...passForm, current_password: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-light fw-bold small">Nueva contraseña</Form.Label>
              <Form.Control type="password" className="bg-dark text-white border-secondary" value={passForm.new_password} onChange={(e) => setPassForm({ ...passForm, new_password: e.target.value })} required minLength={8} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-light fw-bold small">Confirmar nueva contraseña</Form.Label>
              <Form.Control type="password" className="bg-dark text-white border-secondary" value={passForm.confirm_password} onChange={(e) => setPassForm({ ...passForm, confirm_password: e.target.value })} required />
            </Form.Group>
            <Button type="submit" variant="warning" className="fw-bold text-dark" disabled={submitting}>
              {submitting ? 'Cambiando...' : 'Cambiar Contraseña'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
