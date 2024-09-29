import React, { useState, useEffect } from 'react';
import { fetchWithToken } from '../fetchUtils'; 
import '../styles/common-form.css'; 
import { useNavigate } from 'react-router-dom';
import voltar from '../images/voltar.png';

const Comanderia = () => {
  const [memberId, setMemberId] = useState('');
  const [comanderiaDegrees, setComanderiaDegrees] = useState([{ degree: '', date: '', descricao: '' }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleDegreeChange = (index, key, value) => {
    const newDegrees = [...comanderiaDegrees];
    newDegrees[index][key] = value;
    setComanderiaDegrees(newDegrees);
  };

  const handleAddDegree = () => {
    setComanderiaDegrees([...comanderiaDegrees, { degree: '', date: '', descricao: '' }]);
  };

  const handleRemoveDegree = (index) => {
    const newDegrees = comanderiaDegrees.filter((_, i) => i !== index);
    setComanderiaDegrees(newDegrees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validDegrees = comanderiaDegrees.filter(degree => degree.degree && degree.date && degree.descricao);
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

      const responseData = await fetchWithToken('https://detras.onrender.com/api/comanderia', {
      //const responseData = await fetchWithToken('http://localhost:5000/api/comanderia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cim: memberId, graus_comanderia: formattedDegrees })
      });

      // Como o `fetchWithToken` já faz o parse da resposta, removemos `response.json()`
      setSuccessMessage(responseData.message || 'Operação bem-sucedida.');
      setError(null);

      // Limpa o formulário
      setComanderiaDegrees([{ degree: '', date: '', descricao: '' }]);
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

      <img 
        src={voltar} 
        alt="Voltar" 
        onClick={() => navigate('/inicial')} // Redireciona para a página inicial
        style={{ cursor: 'pointer', position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px' }}
      />

      <h2>Comanderia de Cavaleiros Templários</h2>
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

        {comanderiaDegrees.map((degree, index) => (
          <div key={`comanderia-${index}`} className="form-group">
            <label>Grau</label>
            <select
              value={degree.degree}
              onChange={(e) => handleDegreeChange(index, 'degree', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Ordem da Cruz Vermelha">Ordem da Cruz Vermelha</option>
              <option value="Ordem de Malta">Ordem de Malta</option>
              <option value="Ordem do Templo">Ordem do Templo</option>
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
      {error && <div className="error-message">{Array.isArray(error) ? error.map((err, idx) => <p key={idx}>{err.msg}</p>) : <p>{error}</p>}</div>}
      {successMessage && <div className="success-message"><p>{successMessage}</p></div>}
    </div>
  );
}

export default Comanderia;

