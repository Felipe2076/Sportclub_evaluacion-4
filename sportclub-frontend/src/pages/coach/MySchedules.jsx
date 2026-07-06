import { useState, useEffect } from 'react';
import api from '../../services/api';

const dayNames = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };

export default function MySchedules() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/coach/my-schedules').then((res) => setItems(res.data.data || [])).catch(() => {});
  }, []);

  return (
    <div>
      <h1>Mis Horarios</h1>
      {items.length === 0 ? (
        <p>No tienes horarios asignados.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Día</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{dayNames[item.day_of_week] || item.day_of_week}</td>
                  <td>{item.start_time?.substring(0, 5)}</td>
                  <td>{item.end_time?.substring(0, 5)}</td>
                  <td><span className={`badge ${item.status ? 'badge-active' : 'badge-inactive'}`}>{item.status ? 'Activo' : 'Inactivo'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
