import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import voltar from '../images/voltar.png';
import '../styles/common-form.css';
import { fetchWithToken } from '../fetchUtils';

const Condecoracoes = () => {
  const [memberId, setMemberId] = useState('');
  const [condecoracoes, setCondecoracoes] = useState([{ titulo: '', data: '', descricao: '' }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCondecoracaoChange = (index, key, value) => {
    const newCondecoracoes = [...condecoracoes];
    newCondecoracoes[index][key] = value;
    setCondecoracoes(newCondecoracoes);
  };

  const handleAddCondecoration = () => {
    setCondecoracoes([...condecoracoes, { titulo: '', data: '', descricao: '' }]);
  };

  const handleRemoveCondecoration = (index) => {
    const newCondecoracoes = condecoracoes.filter((_, i) => i !== index);
    setCondecoracoes(newCondecoracoes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const validCondecoracoes = condecoracoes.filter(condec => condec.titulo && condec.data && condec.descricao);
      if (validCondecoracoes.length === 0) {
        throw new Error('Por favor, preencha todos os campos.');
      }
  
      const formattedCondecoracoes = validCondecoracoes.map(condec => {
        const [ano, mes, dia] = condec.data.split('-');
        const utcDate = new Date(Date.UTC(ano, mes - 1, dia));
  
        return {
          titulo: condec.titulo,
          data: utcDate.toISOString().split('T')[0], // Formato 'yyyy-MM-dd'
          descricao: condec.descricao
        };
      });
  
      // Usando fetchWithToken, que já faz o response.json()
      const responseData = await fetchWithToken('https://detras.onrender.com/api/condecoracoes', {
      //const responseData = await fetchWithToken('http://localhost:5000/api/condecoracoes', {
        method: 'POST',
        body: JSON.stringify({ cim: memberId, condecoracoes: formattedCondecoracoes }),
      });
  
      setCondecoracoes([{ titulo: '', data: '', descricao: '' }]);
      setSuccessMessage(responseData.message || 'Dados enviados com sucesso.');
      setError(null);
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return (
    <div className="common-form">
      <img 
        src={voltar} 
        alt="Voltar" 
        onClick={() => navigate('/inicial')} 
        style={{ cursor: 'pointer', position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px' }}
      />

      <h2>Condecorações Maçônicas</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>ID do Membro</label>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder='Digite o CIM do membro'
          />
        </div>

        {condecoracoes.map((condec, index) => (
          <div key={`condecoracao-${index}`} className="form-group">
            <div>
              <label>Título</label>
              <select
                value={condec.titulo}
                onChange={(e) => handleCondecoracaoChange(index, 'titulo', e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="Benemérito da Ordem">Benemérito da Ordem</option>
                <option value="Grande Benemérito da Ordem">Grande Benemérito da Ordem</option>
                <option value="Estrela da Distinção Maçônica">Estrela da Distinção Maçônica</option>
                <option value="Cruz da Perfeição Maçônica">Cruz da Perfeição Maçônica</option>
                <option value="Comenda da Ordem do Mérito de D. Pedro I">Comenda da Ordem do Mérito de D. Pedro I</option>
              </select>
            </div>
            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                value={condec.data}
                onChange={(e) => handleCondecoracaoChange(index, 'data', e.target.value)}
                placeholder='Selecione a data'
              />
            </div>

            <div>
              <label>Descrição</label>
              <textarea
                value={condec.descricao}
                onChange={(e) => handleCondecoracaoChange(index, 'descricao', e.target.value)}
              />
            </div>

            {index !== 0 && (
               <button type="button" onClick={() => handleRemoveCondecoration(index)}>Remover</button>
            )}
          </div>
        ))}

        <div className="form-group">
          <button type="button" onClick={handleAddCondecoration}>Adicionar Condecoração</button>
        </div>

        <div className="form-group">
          <button type="submit" disabled={loading}>Enviar</button>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      {loading && <div className="loading">Carregando...</div>}
    </div>
  );
}

export default Condecoracoes;

