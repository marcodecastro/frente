import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { fetchWithToken } from '../fetchUtils';
import '../styles/common-form.css';
import voltar from '../images/voltar.png';
import { useNavigate } from 'react-router-dom';

const Filho = ({ filhoId }) => {
  const [filhoName, setFilhoName] = useState('');
  const [filhoBirthDate, setFilhoBirthDate] = useState(new Date());
  const [memberId, setMemberId] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilhoData = async () => {
      try {
        const response = await fetchWithToken(`http://localhost:5000/api/filhos/${filhoId}`);
        const data = await response.json();
        setFilhoName(data.nome);
        setFilhoBirthDate(moment(data.data_nascimento).format('YYYY-MM-DD'));
        setMemberId(data.cim);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error.message || 'Erro ao buscar dados. Tente novamente mais tarde.');
      }
    };

    if (filhoId) {
      fetchFilhoData();
    }
  }, [filhoId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!filhoName || !memberId) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetchWithToken('https://detras.onrender.com/api/filhos', {
      //const response = await fetchWithToken('http://localhost:5000/api/filhos', {
        method: 'POST',
        body: JSON.stringify({ 
          nome: filhoName, 
          data_nascimento: filhoBirthDate, 
          cim: memberId 
        })
      });

      if (response) {
        setSuccessMessage(response.message.includes('atualizado') ? 'Dados atualizados com sucesso.' : 'Dados cadastrados com sucesso.');
      } else {
        setError('Erro inesperado na resposta.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setError(error.message || 'Erro ao enviar dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='common-form'>

     <img 
        src={voltar} 
        alt="Voltar" 
        onClick={() => navigate('/inicial')} // Redireciona para a página inicial
        style={{ cursor: 'pointer', position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px' }}
      />

      <h2>{filhoId ? 'Atualizar Nome do Filho' : 'Cadastrar Nome do Filho'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID do Membro</label>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="Digite o CIM do membro"
            disabled={!!filhoId}
          />
        </div>

        <div className="form-group">
          <label>Nome do Filho</label>
          <input
            type="text"
            value={filhoName}
            onChange={(e) => setFilhoName(e.target.value)}
            placeholder="Digite o nome do filho"
          />
        </div>

        <div className="form-group">
          <label>Data de Nascimento</label>
          <input
            type="date"
            value={filhoBirthDate}
            onChange={(e) => setFilhoBirthDate(e.target.value)}
            placeholder="Selecione uma data"
          />
        </div>

        <div className="form-group">
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button" disabled={loading}>Enviar</button>
        </div>
        
      </form>
    </div>
  );
};

export default Filho;



