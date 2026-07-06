import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      const route = user.role === 'admin' ? '/dashboard'
        : user.role === 'coach' ? '/coach/dashboard'
        : '/user/dashboard';
      navigate(route);
    } catch {
      // error handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>SportClub</h1>
        <p className="auth-subtitle">Inicia sesión para continuar</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="usuario@demo.cl" required />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="12345678" required />
          </div>
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p className="auth-footer">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
        <div className="auth-demo">
          <p><strong>Usuarios demo:</strong></p>
          <small>admin1@demo.cl / 12345678</small><br />
          <small>coach1@demo.cl / 12345678</small><br />
          <small>user1@demo.cl / 12345678</small>
        </div>
      </div>
    </div>
  );
}
