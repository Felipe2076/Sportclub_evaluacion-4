import { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const dayNames = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };

export default function AvailableClasses() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await api.get('/member/classes');
    setItems(res.data.data || []);
  };

  useEffect(() => { load(); }, []);

  const handleReserve = async (scheduleId) => {
    try {
      await api.post('/reservations', { class_schedule_id: scheduleId });
      Swal.fire({ icon: 'success', title: 'Reserva creada', text: 'Tu clase ha sido reservada exitosamente', timer: 2000, showConfirmButton: false });
    } catch { /* handled */ }
  };

  return (
    <div>
      <h1>Clases Disponibles</h1>
      {items.length === 0 ? (
        <p>No hay clases disponibles en este momento.</p>
      ) : (
        <div className="table-container">
          <table>
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
                    <button className="btn btn-primary btn-sm" onClick={() => handleReserve(item.id)}>
                      Reservar
                    </button>
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
