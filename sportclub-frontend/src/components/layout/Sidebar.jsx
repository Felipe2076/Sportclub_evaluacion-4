import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const coachLinks = [
  { to: '/coach/dashboard', label: 'Panel' },
  { to: '/coach/classes', label: 'Mis Clases' },
  { to: '/coach/schedules', label: 'Mis Horarios' },
  { to: '/coach/rooms', label: 'Mis Salas' },
];

const userLinks = [
  { to: '/user/dashboard', label: 'Panel' },
  { to: '/user/classes', label: 'Clases Disponibles' },
  { to: '/user/reservations', label: 'Mis Reservas' },
  { to: '/user/profile', label: 'Mi Perfil' },
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
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
