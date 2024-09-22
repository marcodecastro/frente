/*import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const withAdminProtection = (Component) => {
  return (props) => {
    const { user, loading } = useContext(UserContext);

    // Se o estado do usuário ainda está carregando, mostra uma mensagem de carregamento
    if (loading) return <div>Carregando...</div>;

    // Redireciona para a página inicial se o usuário não for admin
    if (!user || !user.is_admin) {
      return <Navigate to="/" replace />;
    }

    // Renderiza o componente se o usuário for admin
    return <Component {...props} />;
  };
};

export default withAdminProtection; */







import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const withAdminProtection = (Component) => {
  return (props) => {
    const { user, loading } = useContext(UserContext);

    console.log('Loading status (Admin Protection):', loading); // Verificar o estado de carregamento
    console.log('User status (Admin Protection):', user); // Verificar o estado do usuário

    if (loading) return <div>Carregando...</div>;

    if (!user || !user.is_admin) {
      console.log('Acesso negado: usuário não é administrador');
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };
};

export default withAdminProtection;

