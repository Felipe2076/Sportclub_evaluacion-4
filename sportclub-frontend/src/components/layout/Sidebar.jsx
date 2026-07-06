import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const adminLinks = [
  { to: '/dashboard', label: 'Panel', icon: '📊' },
  { to: '/dashboard/users', label: 'Usuarios', icon: '👥' },
  { to: '/dashboard/sports', label: 'Deportes', icon: '⚽' },
  { to: '/dashboard/rooms', label: 'Salas', icon: '🏠' },
  { to: '/dashboard/sport-rooms', label: 'Asignaciones', icon: '🔗' },
  { to: '/dashboard/schedules', label: 'Horarios', icon: '🕐' },
  { to: '/dashboard/reservations', label: 'Reservas', icon: '📅' },
];

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

  const links = user?.role === 'admin' ? adminLinks
    : user?.role === 'coach' ? coachLinks
    : userLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>SportClub</h2>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/dashboard' || link.to === '/coach/dashboard' || link.to === '/user/dashboard'}
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
