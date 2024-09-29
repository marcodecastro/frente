import React, { useState, useEffect } from 'react';
import { fetchWithToken } from '../fetchUtils';
import '../styles/common-form.css'; 
import { useNavigate } from 'react-router-dom';
import voltar from '../images/voltar.png';


const Simbolicos = ({ simbolicosId }) => {
  const [memberId, setMemberId] = useState('');
  const [symbolicDegrees, setSymbolicDegrees] = useState([{ degree: '', date: '', descricao: '' }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleDegreeChange = (index, key, value) => {
    const newDegrees = [...symbolicDegrees];
    newDegrees[index][key] = value;
    setSymbolicDegrees(newDegrees);
  };

  const handleAddDegree = () => {
    setSymbolicDegrees([...symbolicDegrees, { degree: '', date: '', descricao: '' }]);
  };

  const handleRemoveDegree = (index) => {
    const newDegrees = symbolicDegrees.filter((_, i) => i !== index);
    setSymbolicDegrees(newDegrees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const validDegrees = symbolicDegrees.filter(degree => degree.degree && degree.date && degree.descricao);
      if (validDegrees.length === 0) {
        throw new Error('Por favor, preencha todos os campos.');
      }
  
      const formattedDegrees = validDegrees.map(degree => {
        return {
          grau: degree.degree,
          data: degree.date, // A data já está no formato 'yyyy-MM-dd' devido ao input type 'date'
          descricao: degree.descricao
        };
      });
  
      const payload = {
        cim: memberId,
        graus_simbolicos: formattedDegrees
      };
  
      console.log('Payload enviado:', JSON.stringify(payload));
  
      const responseData = await fetchWithToken('https://detras.onrender.com/api/simbolicos', {
      //const responseData = await fetchWithToken('http://localhost:5000/api/simbolicos', {
        method: simbolicosId ? 'PUT' : 'POST', // Utiliza PUT para atualização, se o ID existir
        body: JSON.stringify(payload)
      });
  
      // O fetchWithToken já faz o parse da resposta, não precisamos chamar response.json() aqui
      setSymbolicDegrees([{ degree: '', date: '', descricao: '' }]);
      setSuccessMessage(responseData.message);
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
      
      <img 
        src={voltar} 
        alt="Voltar" 
        onClick={() => navigate('/inicial')} // Redireciona para a página inicial
        style={{ cursor: 'pointer', position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px' }}
      />

      <h2>{simbolicosId ? 'Atualizar Graus Simbólicos' : 'Cadastrar Graus Simbólicos'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID do Membro</label>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder='Digite o CIM do membro'
            disabled={!!simbolicosId}
          />
        </div>

        {symbolicDegrees.map((degree, index) => (
          <div key={`symbolic-${index}`} className="form-group">
            <label>Grau</label>
            <select
              value={degree.degree}
              onChange={(e) => handleDegreeChange(index, 'degree', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Aprendiz Maçom">Aprendiz Maçom</option>
              <option value="Companheiro Maçom">Companheiro Maçom</option>
              <option value="Mestre Maçom">Mestre Maçom</option>
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
      {error && <div className="error-message">{Array.isArray(error) ? error.map((err, idx) => <p key={idx}>{err.msg}</p>) : <p>{error}</p>}</div>}
      {successMessage && <div className="success-message"><p>{successMessage}</p></div>}
    </div>
  );
}

export default Simbolicos;

