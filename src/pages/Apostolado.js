import React, { useState, useEffect } from 'react';
import { fetchWithToken } from '../fetchUtils'; // Certifique-se de que a função fetchWithToken está importada
import '../styles/common-form.css'; 

const Apostolado = () => {
  const [memberId, setMemberId] = useState('');
  const [apostoladoDegrees, setApostoladoDegrees] = useState([{ degree: '', date: '', descricao: '' }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDegreeChange = (index, key, value) => {
    const newDegrees = [...apostoladoDegrees];
    newDegrees[index][key] = value;
    setApostoladoDegrees(newDegrees);
  };

  const handleAddDegree = () => {
    setApostoladoDegrees([...apostoladoDegrees, { degree: '', date: '', descricao: '' }]);
  };

  const handleRemoveDegree = (index) => {
    const newDegrees = apostoladoDegrees.filter((_, i) => i !== index);
    setApostoladoDegrees(newDegrees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const validDegrees = apostoladoDegrees.filter(degree => degree.degree && degree.date && degree.descricao);
      if (validDegrees.length === 0) {
        throw new Error('Por favor, preencha todos os campos.');
      }
      const formattedDegrees = validDegrees.map(degree => {
        const [ano, mes, dia] = degree.date.split('-');
        const utcDate = new Date(Date.UTC(ano, mes - 1, dia));
  
        return {
          grau: degree.degree,
          data: utcDate.toISOString().split('T')[0], // Formato 'yyyy-MM-dd'
          descricao: degree.descricao
        };
      });
  
      //const response = await fetchWithToken('http://localhost:5000/api/apostolado', {
      const response = await fetchWithToken('http://localhost:5000/api/apostolado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cim: memberId, graus_apostolado: formattedDegrees })
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.errors?.[0]?.msg || 'Erro ao enviar dados.');
      }
  
      setApostoladoDegrees([{ degree: '', date: '', descricao: '' }]);
      setSuccessMessage(result.message); // Atualizar a mensagem de sucesso
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
      <h2>Graus de Apostolado</h2>
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

        {apostoladoDegrees.map((degree, index) => (
          <div key={`apostolado-${index}`} className="form-group">
            <label>Grau</label>
            <select
              value={degree.degree}
              onChange={(e) => handleDegreeChange(index, 'degree', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Recruta">Recruta</option>
              <option value="Cavaleiro de Santa Cruz">Cavaleiro de Santa Cruz</option>
            </select>

            <label>Data</label>
            <input
              type="date"
              value={degree.date}
              onChange={(e) => handleDegreeChange(index, 'date', e.target.value)}
              placeholder='Selecione a data'
            />

            <label>Descrição</label>
            <textarea
              value={degree.descricao}
              onChange={(e) => handleDegreeChange(index, 'descricao', e.target.value)}
            />

            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveDegree(index)} className="remove-button">Remover</button>
            )}
          </div>
        ))}

        <div className="form-group">
          <button type="button" onClick={handleAddDegree} className="add-button">Adicionar Grau</button>
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

export default Apostolado;
