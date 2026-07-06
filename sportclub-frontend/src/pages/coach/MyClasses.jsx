import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function MyClasses() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/coach/my-classes').then((res) => setItems(res.data.data || [])).catch(() => {});
  }, []);

  return (
    <div>
      <h1>Mis Clases</h1>
      {items.length === 0 ? (
        <p>No tienes clases asignadas.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Deporte</th>
                <th>Sala</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.Sport?.name || item.sport?.name || '-'}</td>
                  <td>{item.Room?.name || item.room?.name || '-'}</td>
                  <td>{item.observation || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
