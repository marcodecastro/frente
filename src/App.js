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
import Casamento from './pages/Casamento';
import Adicionais from './pages/Adicionais';
import Filosoficos from './pages/Filosoficos';
import Simbolicos from './pages/Simbolicos';
import Comanderia from './pages/Comanderia';
import Apostolado from './pages/Apostolado';
import CapituloRealArco from './pages/CapituloRealArco';
import Condecoracoes from './pages/Condecoracoes';
import Instalacao from './pages/Instalacao';
import Reassuncao from './pages/Reassuncao';
import Criptico from './pages/Criptico';
import './App.css';
import ControlePresencas from './pages/ControlePresencas';
import AddEventForm from './pages/AddEventForm';
import Profile from './pages/Profile';

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
            <Route path="/membro" element={<Membro />} /> 
            <Route path="/esposa" element={<Esposa />} />
            <Route path="/filhos" element={<Filhos />} />
            <Route path="/adicionais" element={<Adicionais />} />
            <Route path="/filosoficos" element={<Filosoficos />} />
            <Route path="/simbolicos" element={<Simbolicos />} /> 
            <Route path="/casamento" element={<Casamento />} /> 
            <Route path="/comanderia" element={<Comanderia />} />
            <Route path="/apostolado" element={<Apostolado />} />
            <Route path="/capitulorealarco" element={<CapituloRealArco />} />
            <Route path="/condecoracoes" element={<Condecoracoes />} />
            <Route path="/instalacao" element={<Instalacao />} />
            <Route path="reassuncao" element={<Reassuncao />} />
            <Route path="criptico" element={<Criptico />} />
            <Route path="perfil" element={<Profile />} />
          </Route>

          {/* Rotas exclusivas para administradores */}
           <Route element={<ProtectedRoute adminOnly={true} />}>
           <Route path="/admin" element={<Admin />} /> 
            <Route path="/comemoracoes" element={<Comemoracoes />} /> 
            <Route path="/frequencia" element={<ControlePresencas />} />
            <Route path="eventos" element={<AddEventForm />} />
           </Route> 
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
