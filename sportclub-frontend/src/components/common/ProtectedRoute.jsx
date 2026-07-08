import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from './Loading';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    window.history.pushState(null, '', window.location.pathname);
    const handlePopState = () => window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    return <Navigate to={`/${user.role === 'admin' ? 'dashboard' : user.role}/dashboard`} replace />;
  }
  return children;
}
