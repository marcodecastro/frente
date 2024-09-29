import React, { useState, useEffect } from 'react';
import '../styles/common-form.css';
import { fetchWithToken } from '../fetchUtils'; 
import { useNavigate } from 'react-router-dom';
import voltar from '../images/voltar.png';

const Filosoficos = ({ filosoficosId }) => {
  const [memberId, setMemberId] = useState('');
  const [philosophicalDegrees, setPhilosophicalDegrees] = useState([{ degree: '', date: '', descricao: '' }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleDegreeChange = (index, key, value) => {
    const newDegrees = [...philosophicalDegrees];
    newDegrees[index][key] = value;
    setPhilosophicalDegrees(newDegrees);
  };

  const handleAddDegree = () => {
    setPhilosophicalDegrees([...philosophicalDegrees, { degree: '', date: '', descricao: '' }]);
  };

  const handleRemoveDegree = (index) => {
    const newDegrees = philosophicalDegrees.filter((_, i) => i !== index);
    setPhilosophicalDegrees(newDegrees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validDegrees = philosophicalDegrees.filter(degree => degree.degree && degree.date && degree.descricao);
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

      const responseData = await fetchWithToken('https://detras.onrender.com/api/filosoficos', {
      //const responseData = await fetchWithToken('http://localhost:5000/api/filosoficos', {
        method: 'POST',
        body: JSON.stringify({ cim: memberId, graus_filosoficos: formattedDegrees }),
        headers: { 'Content-Type': 'application/json' } // Certifique-se de que o Content-Type seja especificado.
      });

      // O fetchWithToken já faz o parse da resposta, então não precisamos chamar response.json() novamente
      setPhilosophicalDegrees([{ degree: '', date: '', descricao: '' }]);
      setSuccessMessage(responseData.message || 'Operação bem-sucedida.');
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

      <h2>{filosoficosId ? 'Atualizar Graus Filosóficos' : 'Cadastrar Graus Filosóficos'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID do Membro</label>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder='Digite o CIM do membro'
            disabled={!!filosoficosId}
          />
        </div>

        {philosophicalDegrees.map((degree, index) => (
          <div key={`philosophical-${index}`} className="form-group">
            <label>Grau</label>
            <select
              value={degree.degree}
              onChange={(e) => handleDegreeChange(index, 'degree', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Grau 4 - Mestre Secreto">Grau 4 - Mestre Secreto</option>
              <option value="Grau 7 - Primeiro Eleito ou Eleito dos Nove">Grau 7 - Primeiro Eleito ou Eleito dos Nove</option>
              <option value="Grau 12 - Mestre Escocês ou Grão-Mestre Arquiteto">Grau 12 - Mestre Escocês ou Grão-Mestre Arquiteto</option>
              <option value="Grau 14 - Grande Eleito ou Perfeito e Sublime Maçom">Grau 14 - Grande Eleito ou Perfeito e Sublime Maçom</option>
              <option value="Grau 15 - Cavaleiro do Oriente, da Espada ou da Águia">Grau 15 - Cavaleiro do Oriente, da Espada ou da Águia</option>
              <option value="Grau 18 - Cavaleiro Rosa-Cruz">Grau 18 - Cavaleiro Rosa-Cruz</option>
              <option value="Grau 21 - Cavaleiro Noaquita ou Cavaleiro Prussiano">Grau 21 - Cavaleiro Noaquita ou Cavaleiro Prussiano</option>
              <option value="Grau 22 - Cavaleiro do Real Machado ou Príncipe do Líbano">Grau 22 - Cavaleiro do Real Machado ou Príncipe do Líbano</option>
              <option value="Grau 29 - Cavaleiro de Santo André">Grau 29 - Cavaleiro de Santo André</option>
              <option value="Grau 30 - Cavaleiro Kadosch">Grau 30 - Cavaleiro Kadosch</option>
              <option value="Grau 31 - Sublime Iniciado e Grande Preceptor">Grau 31 - Sublime Iniciado e Grande Preceptor</option>
              <option value="Grau 32 - Prelado Corregedor e Ouvidor Geral">Grau 32 - Prelado Corregedor e Ouvidor Geral</option>
              <option value="Grau 33 - Patriarca Inspetor-Geral">Grau 33 - Patriarca Inspetor-Geral</option>
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
    </div>
  );
}

export default Filosoficos;



