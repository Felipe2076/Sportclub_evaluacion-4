import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function UserDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/member/dashboard').then((res) => setData(res.data.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1>Panel de Usuario</h1>
      {data ? (
        <div className="stats-grid">
          <div className="stat-card" style={{ borderLeft: '4px solid #a3e635' }}>
            <div className="stat-label">Clases Disponibles</div>
            <div className="stat-value">{data.availableClasses || data.classes || 0}</div>
          </div>
          <div className="stat-card" style={{ borderLeft: '4px solid #a3e635' }}>
            <div className="stat-label">Deportes</div>
            <div className="stat-value">{data.sports || 0}</div>
          </div>
          <div className="stat-card" style={{ borderLeft: '4px solid #84cc16' }}>
            <div className="stat-label">Salas</div>
            <div className="stat-value">{data.rooms || 0}</div>
          </div>
          <div className="stat-card" style={{ borderLeft: '4px solid #65a30d' }}>
            <div className="stat-label">Mis Reservas</div>
            <div className="stat-value">{data.myReservations || 0}</div>
          </div>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}
