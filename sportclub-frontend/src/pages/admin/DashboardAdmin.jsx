import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function DashboardAdmin() {
  const [stats, setStats] = useState({ users: 0, sports: 0, rooms: 0, reservations: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/users'),
      api.get('/sports'),
      api.get('/rooms'),
      api.get('/reservations'),
    ]).then(([u, s, r, res]) => {
      setStats({
        users: u.data.data?.length || 0,
        sports: s.data.data?.length || 0,
        rooms: r.data.data?.length || 0,
        reservations: res.data.data?.length || 0,
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Usuarios', value: stats.users, color: '#a3e635' },
    { label: 'Deportes', value: stats.sports, color: '#84cc16' },
    { label: 'Salas', value: stats.rooms, color: '#65a30d' },
    { label: 'Reservas', value: stats.reservations, color: '#a3e635' },
  ];

  return (
    <div>
      <h1>Panel de Administración</h1>
      <div className="stats-grid">
        {cards.map((c) => (
          <div key={c.label} className="stat-card" style={{ borderLeft: `4px solid ${c.color}` }}>
            <div className="stat-label">{c.label}</div>
            <div className="stat-value">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
