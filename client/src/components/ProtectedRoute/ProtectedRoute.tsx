import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import AppLayout from '../../layouts/AppLayout';
import AppLayoutHeader from '../../layouts/AppLayoutHeader';

const ProtectedRoute = ({ allowedRoles, showHeader = true }: { 
  allowedRoles?: string[];
  showHeader?: boolean;
}) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" replace />;

  if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  const renderHeader = () => {
    if (!showHeader) return null;
    if (user.role === 'instrutor') return <AppLayoutHeader />;
    if (user.role === 'aluno') return <AppLayout />;
    return null;
  };

  return (
    <>
      {renderHeader()}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;