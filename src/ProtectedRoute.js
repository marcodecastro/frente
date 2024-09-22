import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, loading } = useContext(UserContext);

  console.log('Estado de carregamento (ProtectedRoute):', loading); // Verificar o estado de carregamento
  console.log('Dados do usuário (ProtectedRoute):', user); // Verificar os dados do usuário

  if (loading) return <div>Carregando...</div>;

  if (!user) {
    console.log('Usuário não autenticado, redirecionando para login');
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user.is_admin) {
    console.log('Usuário não é admin, redirecionando para home');
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute; 

