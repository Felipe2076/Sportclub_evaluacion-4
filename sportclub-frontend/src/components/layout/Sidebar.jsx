import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const coachLinks = [
  { to: '/coach/dashboard', label: 'Panel', icon: '📊' },
  { to: '/coach/classes', label: 'Mis Clases', icon: '⚽' },
  { to: '/coach/schedules', label: 'Mis Horarios', icon: '🕐' },
  { to: '/coach/rooms', label: 'Mis Salas', icon: '🏠' },
];

const userLinks = [
  { to: '/user/dashboard', label: 'Panel', icon: '📊' },
  { to: '/user/classes', label: 'Clases Disponibles', icon: '⚽' },
  { to: '/user/reservations', label: 'Mis Reservas', icon: '📅' },
  { to: '/user/profile', label: 'Mi Perfil', icon: '👤' },
];

export default function Sidebar() {
  const { user } = useAuth();

  const links = user?.role === 'coach' ? coachLinks : userLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo.png" className="sidebar-logo-img" alt="SportClub" />
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/coach/dashboard' || link.to === '/user/dashboard'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
