import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common-form.css';
import { UserContext } from '../UserContext';
import {  fetchWithToken } from '../fetchUtils';

const Membro = () => {
  const [memberName, setMemberName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [memberId, setMemberId] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, loading: userLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && (!user || !user.is_admin)) {
      navigate('/inicial'); 
    }
  }, [user, userLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);

    try {
      const data = await fetchWithToken('http://localhost:5000/api/membro', {
        method: 'POST',
        body: JSON.stringify({
          nome: memberName,
          data_nascimento: birthDate,
          cim: memberId,
          email: memberEmail,
          celular,
          senha,
        }),
      });

      console.log('Dados enviados com sucesso:', data);
      // Limpar os campos do formulário
      setMemberName('');
      setBirthDate('');
      setMemberId('');
      setMemberEmail('');
      setCelular('');
      setSenha('');
      setError(null);
      setSuccessMessage(data.message);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setError('Erro ao enviar dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="common-form">
      <h2>Dados Pessoais</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Membro</label>
          <input
            type="text"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="Nome Completo"
          />
        </div>
        <div className="form-group">
          <label>ID do Membro</label>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="CIM do Membro"
          />
        </div>
        <div className="form-group">
          <label>Data de Nascimento</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="Data de Aniversário"
          />
        </div>
        <div className="form-group">
          <label>Email do Membro</label>
          <input
            type="text"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
            placeholder="Email do Membro"
          />
        </div>
        <div className="form-group">
          <label>Celular</label>
          <input
            type="text"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            placeholder="Celular do Membro"
          />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input
            type="text"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Alterar Senha"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
      </form>
    </div>
  );
};

export default Membro;





