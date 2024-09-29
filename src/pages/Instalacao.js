import React, { useState, useEffect } from 'react';
import { fetchWithToken } from '../fetchUtils'; // Importe a função corretamente
import '../styles/common-form.css'; // Certifique-se de que o arquivo CSS está corretamente importado
import voltar from '../images/voltar.png';
import { useNavigate } from 'react-router-dom';

const Instalacao = () => {
  const [memberId, setMemberId] = useState('');
  const [instalacaoTitulos, setInstalacaoTitulos] = useState([{ titulo: '', date: '', descricao: '' }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTituloChange = (index, key, value) => {
    const newTitulos = [...instalacaoTitulos];
    newTitulos[index][key] = value;
    setInstalacaoTitulos(newTitulos);
  };

  const handleAddTitulo = () => {
    setInstalacaoTitulos([...instalacaoTitulos, { titulo: '', date: '', descricao: '' }]);
  };

  const handleRemoveTitulo = (index) => {
    const newTitulos = instalacaoTitulos.filter((_, i) => i !== index);
    setInstalacaoTitulos(newTitulos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const validTitulos = instalacaoTitulos.filter(titulo => titulo.titulo && titulo.date && titulo.descricao);
      if (validTitulos.length === 0) {
        throw new Error('Por favor, preencha todos os campos.');
      }
  
      const formattedTitulos = validTitulos.map(titulo => {
        const [ano, mes, dia] = titulo.date.split('-');
        const utcDate = new Date(Date.UTC(ano, mes - 1, dia));
  
        return {
          titulo: titulo.titulo,
          data: utcDate.toISOString().split('T')[0],
          descricao: titulo.descricao
        };
      });
  
      // Usando fetchWithToken, que já faz o response.json()
      const responseData = await fetchWithToken('https://detras.onrender.com/api/instalacao', {
      //const responseData = await fetchWithToken('http://localhost:5000/api/instalacao', {
        method: 'POST',
        body: JSON.stringify({ cim: memberId, titulos_instalacao: formattedTitulos })
      });
  
      setInstalacaoTitulos([{ titulo: '', date: '', descricao: '' }]);
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
        onClick={() => navigate('/inicial')} 
        style={{ cursor: 'pointer', position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px' }}
      />

      <h2>Instalação Maçônica</h2>
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

        {instalacaoTitulos.map((titulo, index) => (
          <div key={`instalacao-${index}`} className="form-group">
            <label>Título</label>
            <select
              value={titulo.titulo}
              onChange={(e) => handleTituloChange(index, 'titulo', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Mestre Instalado">Mestre Instalado</option>
              <option value="Past Master">Past Master</option>
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

export default Instalacao;

