import React, { useState, useEffect } from 'react';
import { fetchWithToken } from '../fetchUtils'; // Certifique-se de que a função fetchWithToken está importada
import '../styles/common-form.css'; 
import voltar from '../images/voltar.png';
import { useNavigate } from 'react-router-dom';

const Reassuncao = () => {
  const [memberId, setMemberId] = useState('');
  const [reassuncaoTitulos, setReassuncaoTitulos] = useState([{ titulo: '', date: '', descricao: '' }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTituloChange = (index, key, value) => {
    const newTitulos = [...reassuncaoTitulos];
    newTitulos[index][key] = value;
    setReassuncaoTitulos(newTitulos);
  };

  const handleAddTitulo = () => {
    setReassuncaoTitulos([...reassuncaoTitulos, { titulo: '', date: '', descricao: '' }]);
  };

  const handleRemoveTitulo = (index) => {
    const newTitulos = reassuncaoTitulos.filter((_, i) => i !== index);
    setReassuncaoTitulos(newTitulos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const validTitulos = reassuncaoTitulos.filter(titulo => titulo.titulo && titulo.date && titulo.descricao);
      if (validTitulos.length === 0) {
        throw new Error('Por favor, preencha todos os campos.');
      }
  
      const formattedTitulos = validTitulos.map(titulo => {
        const [ano, mes, dia] = titulo.date.split('-');
        const utcDate = new Date(Date.UTC(ano, mes - 1, dia));
  
        return {
          titulo_distintivo: titulo.titulo,
          data_titulo_distintivo: utcDate.toISOString().split('T')[0],
          descricao: titulo.descricao
        };
      });
  
      // Usando fetchWithToken, que já faz o response.json()
      const responseData = await fetchWithToken('https://detras.onrender.com/api/reassuncao', {
      //const responseData = await fetchWithToken('http://localhost:5000/api/reassuncao', {
        method: 'POST',
        body: JSON.stringify({ cim: memberId, titulos_reassuncao: formattedTitulos })
      });
  
      // Após a resposta ser processada
      setSuccessMessage(responseData.message || 'Dados enviados com sucesso.');
      setError(null);
      setReassuncaoTitulos([{ titulo: '', date: '', descricao: '' }]);
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return (
    <div className="common-form">

      {/* Ícone de voltar */}
     <img 
        src={voltar} 
        alt="Voltar" 
        onClick={() => navigate('/inicial')} // Redireciona para a página inicial
        style={{ cursor: 'pointer', position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px' }}
      />

      <h2>Reassunção Maçônica</h2>
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

        {reassuncaoTitulos.map((titulo, index) => (
          <div key={`reassuncao-${index}`} className="form-group">
            <label>Título</label>
            <select
              value={titulo.titulo}
              onChange={(e) => handleTituloChange(index, 'titulo', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Reassunção">Reassunção</option>
            </select>

            <label>Data</label>
            <input
              type="date"
              value={titulo.date}
              onChange={(e) => handleTituloChange(index, 'date', e.target.value)}
              placeholder='Selecione a data'
            />

            <label>Descrição</label>
            <textarea
              value={titulo.descricao}
              onChange={(e) => handleTituloChange(index, 'descricao', e.target.value)}
            />

            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveTitulo(index)} className="remove-button">Remover</button>
            )}
          </div>
        ))}

        <div className="form-group">
          <button type="button" onClick={handleAddTitulo} className="add-button">Adicionar Título</button>
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button">Enviar</button>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {loading && <div className="loading-message">Carregando...</div>}
    </div>
  );
}

export default Reassuncao;
