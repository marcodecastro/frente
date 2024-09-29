import React, { useState, useEffect } from 'react';
import { fetchWithToken } from '../fetchUtils'; 
import '../styles/common-form.css'; 
import { useNavigate } from 'react-router-dom';
import voltar from '../images/voltar.png'; 

const CapituloRealArco = () => {
  const [memberId, setMemberId] = useState('');
  const [realArcoDegrees, setRealArcoDegrees] = useState([{ degree: '', date: '', descricao: '' }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDegreeChange = (index, key, value) => {
    const newDegrees = [...realArcoDegrees];
    newDegrees[index][key] = value;
    setRealArcoDegrees(newDegrees);
  };

  const handleAddDegree = () => {
    setRealArcoDegrees([...realArcoDegrees, { degree: '', date: '', descricao: '' }]);
  };

  const handleRemoveDegree = (index) => {
    const newDegrees = realArcoDegrees.filter((_, i) => i !== index);
    setRealArcoDegrees(newDegrees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validDegrees = realArcoDegrees.filter(degree => degree.degree && degree.date && degree.descricao);
      if (validDegrees.length === 0) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      const formattedDegrees = validDegrees.map(degree => {
        const [ano, mes, dia] = degree.date.split('-');
        const utcDate = new Date(Date.UTC(ano, mes - 1, dia));

        return {
          grau: degree.degree,
          data: utcDate.toISOString().split('T')[0], 
          descricao: degree.descricao
        };
      });

      //const responseData = await fetchWithToken('http://localhost:5000/api/capitulorealarco', {
      const responseData = await fetchWithToken('https://detras.onrender.com/api/capitulorealarco', {
        method: 'POST',
        body: JSON.stringify({ cim: memberId, graus_capitulorealarco: formattedDegrees })
      });

      if (!responseData.ok) {
        throw new Error(responseData.message || 'Erro ao enviar dados.');
      }

      // Limpa os campos após sucesso
      setRealArcoDegrees([{ degree: '', date: '', descricao: '' }]);
      setSuccessMessage(responseData.message || 'Dados enviados com sucesso.');
      setError(null);
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
      setError(error.message || 'Erro ao enviar dados.');
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

    <img 
        src={voltar} 
        alt="Voltar" 
        onClick={() => navigate('/inicial')} 
        style={{ cursor: 'pointer', position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px' }}
      />

      <h2>Capítulo do Real Arco</h2>
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

        {realArcoDegrees.map((degree, index) => (
          <div key={`realArco-${index}`} className="form-group">
            <label>Grau</label>
            <select
              value={degree.degree}
              onChange={(e) => handleDegreeChange(index, 'degree', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Mestre de Marca">Mestre de Marca</option>
              <option value="Past Master">Past Master</option>
              <option value="Mui Excelente Mestre">Mui Excelente Mestre</option>
              <option value="Maçom do Real Arco">Maçom do Real Arco</option>
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
          <button type="submit" className="submit-button" disabled={loading}>Enviar</button>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {loading && <div className="loading-message">Carregando...</div>}
    </div>
  );
}

export default CapituloRealArco;
