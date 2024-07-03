import { Navigate } from 'react-router-dom';
import useAuth from '../lib/use-auth';

interface GuestRouteProps {
  children: JSX.Element;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default GuestRoute;
