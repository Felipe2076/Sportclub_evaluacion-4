import { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

export default function MyReservations() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await api.get('/reservations/my-reservations');
    setItems(res.data.data || []);
  };

  useEffect(() => { load(); }, []);

  const handleCancel = async (id) => {
    const result = await Swal.fire({ title: '¿Cancelar reserva?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonText: 'No', confirmButtonText: 'Sí, cancelar' });
    if (!result.isConfirmed) return;
    try {
      await api.patch(`/reservations/${id}/cancel`);
      Swal.fire({ icon: 'success', title: 'Reserva cancelada', timer: 1500, showConfirmButton: false });
      load();
    } catch { /* handled */ }
  };

  return (
    <div>
      <h1>Mis Reservas</h1>
      {items.length === 0 ? (
        <p>No tienes reservas.</p>
      ) : (
        <div className="table-container">
          <table>
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
                  <td><span className={`badge ${item.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>{item.status}</span></td>
                  <td>{item.observation || '-'}</td>
                  <td>
                    {item.status === 'active' && (
                      <button className="btn btn-sm btn-delete" onClick={() => handleCancel(item.id)}>Cancelar</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
