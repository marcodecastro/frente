/*import React, { useState, useEffect } from 'react';
import { fetchWithToken } from '../fetchUtils';
import '../styles/common-form.css'; 

const Simbolicos = ({ simbolicosId }) => {
  const [memberId, setMemberId] = useState('');
  const [symbolicDegrees, setSymbolicDegrees] = useState([{ degree: '', date: '', descricao: '' }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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
  
      const formattedDegrees = validDegrees.map(degree => ({
        grau: degree.degree,
        data: degree.date,
        descricao: degree.descricao
      }));
  
      const payload = {
        cim: memberId,
        graus_simbolicos: formattedDegrees
      };
  
      console.log('Payload enviado:', JSON.stringify(payload));
  
      const response = await fetchWithToken('http://localhost:5000/api/simbolicos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      const responseData = await response.json();
      setLoading(false);
  
      console.log('Mensagem recebida do servidor:', responseData.message);
  
      if (response.ok) {
        setSymbolicDegrees([{ degree: '', date: '', descricao: '' }]);
        let formattedMessage = responseData.message.replace(/[{}]/g, '').trim();
        console.log('Mensagem formatada:', formattedMessage);
        setSuccessMessage(formattedMessage);
        setError(null);
      } else {
        setError(responseData.errors ? responseData.errors.map(err => err.msg).join(', ') : 'Erro ao enviar dados para o servidor');
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
              placeholder='Digite o Nome da Loja'
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

      {error && (
        <div className="error-message">
          {Array.isArray(error) ? error.map((err, idx) => <p key={idx}>{err.msg}</p>) : <p>{error}</p>}
        </div>
      )}

      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Simbolicos; */









/*import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fetchWithToken } from '../fetchUtils';
import '../styles/common-form.css'; 

const Simbolicos = ({ simbolicosId }) => {
  const [memberId, setMemberId] = useState('');
  const [symbolicDegrees, setSymbolicDegrees] = useState([{ degree: '', date: '', descricao: '' }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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

      const response = await fetchWithToken('http://localhost:5000/api/simbolicos', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (response) {
        setSymbolicDegrees([{ degree: '', date: '', descricao: '' }]);
        setSuccessMessage(response.message || 'Dados enviados com sucesso!');
        setError(null);
      } else {
        throw new Error('Erro ao enviar dados para o servidor');
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

export default Simbolicos; */






import React, { useState, useEffect } from 'react';
//import { fetchWithToken } from '../fetchUtils';
import '../styles/common-form.css'; 
import voltar from '../images/voltar.png';
import { useNavigate } from 'react-router-dom';

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

      //const response = await fetch('https://localhost:5000/api/simbolicos', {
      const response = await fetch('https://detras.onrender.com/api/simbolicos', {
        method: simbolicosId ? 'PUT' : 'POST', 
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();

      if (response.ok) {
        setSymbolicDegrees([{ degree: '', date: '', descricao: '' }]);
        setSuccessMessage(responseData.message);
        setError(null);
      } else {
        throw new Error(responseData.message || 'Erro ao enviar dados para o servidor');
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

      {/* Ícone de voltar */}
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


