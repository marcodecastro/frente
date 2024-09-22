import React, { createContext, useState, useEffect } from 'react';
import { fetchWithToken } from './fetchUtils';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await fetchWithToken('http://localhost:5000/api/auth/validate');
        console.log('Dados do usuário carregados:', data);
        setUser(data); // Atualiza o estado do usuário com os dados retornados
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
