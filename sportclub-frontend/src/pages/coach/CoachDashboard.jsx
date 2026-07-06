import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function CoachDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/coach/dashboard').then((res) => setData(res.data.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1>Panel del Coach</h1>
      {data ? (
        <div className="stats-grid">
          <div className="stat-card" style={{ borderLeft: '4px solid #4e73df' }}>
            <div className="stat-label">Mis Clases</div>
            <div className="stat-value">{data.classes || data.myClasses || 0}</div>
          </div>
          <div className="stat-card" style={{ borderLeft: '4px solid #1cc88a' }}>
            <div className="stat-label">Horarios</div>
            <div className="stat-value">{data.schedules || data.mySchedules || 0}</div>
          </div>
          <div className="stat-card" style={{ borderLeft: '4px solid #36b9cc' }}>
            <div className="stat-label">Salas</div>
            <div className="stat-value">{data.rooms || data.myRooms || 0}</div>
          </div>
        </div>
      ) : (
        <p>Cargando datos del dashboard...</p>
      )}
    </div>
  );
}
