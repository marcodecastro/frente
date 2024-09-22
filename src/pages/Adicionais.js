import React, { useState, useEffect } from 'react';
import '../styles/common-form.css';
import { fetchWithToken } from '../fetchUtils';

const Adicionais = () => {
  const [memberId, setMemberId] = useState('');
  const [additionalDegrees, setAdditionalDegrees] = useState([{ degree: '', date: '', descricao: '' }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDegreeChange = (index, key, value) => {
    const newDegrees = [...additionalDegrees];
    newDegrees[index][key] = value;
    setAdditionalDegrees(newDegrees);
  };

  const handleAddDegree = () => {
    setAdditionalDegrees([...additionalDegrees, { degree: '', date: '', descricao: '' }]);
  };

  const handleRemoveDegree = (index) => {
    const newDegrees = additionalDegrees.filter((_, i) => i !== index);
    setAdditionalDegrees(newDegrees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validDegrees = additionalDegrees.filter(degree => degree.degree && degree.date && degree.descricao);
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

      //const response = await fetchWithToken('http://localhost:5000/api/adicionais', {
      const response = await fetchWithToken('http://localhost:5000/api/adicionais', {
        method: 'POST',
        body: JSON.stringify({ cim: memberId, graus_adicionais: formattedDegrees }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        setAdditionalDegrees([{ degree: '', date: '', descricao: '' }]);
        setSuccessMessage(data.message);
        setError(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.errors ? errorData.errors[0].msg : 'Erro ao enviar dados para o servidor');
      }
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
      <h2>Graus Adicionais</h2>
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

        {additionalDegrees.map((degree, index) => (
          <div key={`additional-${index}`} className="form-group">
            <label>Grau</label>
            <select
              value={degree.degree}
              onChange={(e) => handleDegreeChange(index, 'degree', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Mestre Maçom da Marca">Mestre Maçom da Marca</option>
              <option value="Nautas da Arca Real">Nautas da Arca Real</option>
              <option value="Arco Real">Arco Real</option>
              <option value="Cavaleiro Templário">Cavaleiro Templário</option>
              <option value="Cavaleiro de Malta">Cavaleiro de Malta</option>
            </select>

            <label>Data</label>
            <input
              type="date"
              value={degree.date}
              onChange={(e) => handleDegreeChange(index, 'date', e.target.value)}
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
          <button type="submit" className="submit-button" disabled={loading}>Enviar</button>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message"><p>{successMessage}</p></div>}
    </div>
  );
}

export default Adicionais;




