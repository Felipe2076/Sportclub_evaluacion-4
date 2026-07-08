import { useState, useEffect } from 'react';
import { Table, Button, Badge, Spinner, Container } from 'react-bootstrap';
import api from '../../services/api';
import Swal from 'sweetalert2';

const dayNames = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };

export default function AvailableClasses() {
  const [items, setItems] = useState([]);
  const [reserving, setReserving] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/member/classes');
      setItems(res.data.data || []);
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar las clases' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleReserve = async (scheduleId) => {
    setReserving(scheduleId);
    try {
      await api.post('/reservations', { class_schedule_id: scheduleId });
      Swal.fire({ icon: 'success', title: 'Reserva creada', text: 'Tu clase ha sido reservada exitosamente', timer: 2000, showConfirmButton: false });
      load();
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo crear la reserva' });
    } finally {
      setReserving(null);
    }
  };

  if (loading) {
    return <Container className="text-center py-5"><Spinner animation="border" variant="warning" /></Container>;
  }

  return (
    <Container>
      <h1 className="text-white fw-bold mb-4">Clases Disponibles</h1>
      {items.length === 0 ? (
        <p className="text-secondary">No hay clases disponibles en este momento.</p>
      ) : (
        <Table variant="dark" striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Deporte</th>
              <th>Sala</th>
              <th>Día</th>
              <th>Horario</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.SportRoom?.sport?.name || item.sport_room?.sport?.name || '-'}</td>
                <td>{item.SportRoom?.room?.name || item.sport_room?.room?.name || '-'}</td>
                <td>{dayNames[item.day_of_week] || item.day_of_week}</td>
                <td>{item.start_time?.substring(0, 5)} - {item.end_time?.substring(0, 5)}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleReserve(item.id)} disabled={reserving === item.id} className="fw-bold text-dark">
                    {reserving === item.id ? 'Reservando...' : 'Reservar'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
