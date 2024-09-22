import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Inicial from './pages/Inicial';
import Admin from './pages/Admin';
import Comemoracoes from './pages/Comemoracoes';
import Membro from './pages/Membro';
import Esposa from './pages/Esposa';
import Filhos from './pages/Filhos';
import Filosoficos from './pages/Filosoficos';

import './styles/reset.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas privadas para qualquer usuário autenticado */}
          <Route element={<ProtectedRoute />}>
            <Route path="/inicial" element={<Inicial />} />
            <Route path="/esposa" element={<Esposa />} />
            <Route path="/filhos" element={<Filhos />} />
            <Route path="/filosoficos" element={<Filosoficos />} />
          </Route>

          {/* Rotas exclusivas para administradores */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/membro" element={<Membro />} />
            <Route path="/comemoracoes" element={<Comemoracoes />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
