import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="header">
      <div className="header-title">
        <h2>SportClub</h2>
      </div>
      <div className="header-user">
        <span className="header-avatar">{user?.full_name?.charAt(0)?.toUpperCase()}</span>
        <div className="header-user-info">
          <strong>{user?.full_name}</strong>
          <small>{user?.role}</small>
        </div>
        <button className="btn btn-logout" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
}
