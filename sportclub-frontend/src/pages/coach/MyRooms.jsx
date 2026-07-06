import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function MyRooms() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/coach/my-rooms').then((res) => setItems(res.data.data || [])).catch(() => {});
  }, []);

  return (
    <div>
      <h1>Mis Salas</h1>
      {items.length === 0 ? (
        <p>No tienes salas asignadas.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Capacidad</th>
                <th>Ubicación</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
