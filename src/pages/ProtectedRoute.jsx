import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Loading from '../components/shared/Loading';

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <Loading />;
  }

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace />;
  }

  return children;
}
