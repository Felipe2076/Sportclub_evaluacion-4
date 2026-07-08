import { useState, useEffect } from 'react';
import { Table, Button, Badge, Spinner, Container } from 'react-bootstrap';
import api from '../../services/api';
import Swal from 'sweetalert2';

export default function MyReservations() {
  const [items, setItems] = useState([]);
  const [cancelling, setCancelling] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/reservations/my-reservations');
      setItems(res.data.data || []);
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar las reservas' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCancel = async (id) => {
    const result = await Swal.fire({ title: '¿Cancelar reserva?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonText: 'No', confirmButtonText: 'Sí, cancelar' });
    if (!result.isConfirmed) return;
    setCancelling(id);
    try {
      await api.patch(`/reservations/${id}/cancel`);
      Swal.fire({ icon: 'success', title: 'Reserva cancelada', timer: 1500, showConfirmButton: false });
      load();
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cancelar la reserva' });
    } finally {
      setCancelling(null);
    }
  };

  if (loading) {
    return <Container className="text-center py-5"><Spinner animation="border" variant="warning" /></Container>;
  }

  return (
    <Container>
      <h1 className="text-white fw-bold mb-4">Mis Reservas</h1>
      {items.length === 0 ? (
        <p className="text-secondary">No tienes reservas.</p>
      ) : (
        <Table variant="dark" striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Horario ID</th>
              <th>Estado</th>
              <th>Observación</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.class_schedule_id}</td>
                <td><Badge bg={item.status === 'active' ? 'success' : 'secondary'}>{item.status}</Badge></td>
                <td>{item.observation || '-'}</td>
                <td>
                  {item.status === 'active' && (
                    <Button size="sm" variant="outline-danger" onClick={() => handleCancel(item.id)} disabled={cancelling === item.id}>
                      {cancelling === item.id ? 'Cancelando...' : 'Cancelar'}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
