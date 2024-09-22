import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { fetchWithToken } from '../fetchUtils';
import '../styles/common-form.css';

const Casamento = ({ casamentoId }) => {
  const [casamento, setCasamento] = useState('');
  const [dataCasamento, setDataCasamento] = useState('');
  const [memberId, setMemberId] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch data if casamentoId is provided
  useEffect(() => {
    const fetchCasamentoData = async () => {
      try {
        const response = await fetchWithToken(`http://localhost:5000/api/casamento/${casamentoId}`);
        //const response = await fetchWithToken(`http://localhost:5000/api/casamento/${casamentoId}`);
        const data = await response.json();
        setCasamento(data.nome_conjuge);
        setDataCasamento(moment(data.data_casamento).format('YYYY-MM-DD'));
        setMemberId(data.cim);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error.message || 'Erro ao buscar dados. Tente novamente mais tarde.');
      }
    };

    if (casamentoId) {
      fetchCasamentoData();
    }
  }, [casamentoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate all fields are filled
    if (!casamento || !memberId || !dataCasamento) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      console.log('Enviando dados do casamento para o backend:', { memberId, casamento, dataCasamento });
      const response = await fetchWithToken('http://localhost:5000/api/casamento', {
        method: 'POST',
        body: JSON.stringify({
          nome_conjuge: casamento,
          data_casamento: moment(dataCasamento).format('YYYY-MM-DD'), // Ensure the date is formatted correctly
          cim: memberId,
        }),
      });

      setLoading(false);

      // Handle response and display appropriate messages
      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(responseData.message || 'Dados enviados com sucesso.');
        setCasamento('');
        setDataCasamento('');
        setMemberId('');
        setError(null);
      } else {
        setError('Erro inesperado na resposta.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setError('Erro ao enviar dados. Tente novamente mais tarde.');
      setLoading(false);
    }
  };

  return (
    <div className='common-form'>
      <h2>{casamentoId ? 'Atualizar Aniversário de Casamento' : 'Cadastrar Aniversário de Casamento'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID do Membro</label>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="Digite o CIM do membro"
            disabled={!!casamentoId}
          />
        </div>
        <div className="form-group">
          <label>Nome do Cônjuge</label>
          <input
            type="text"
            value={casamento}
            onChange={(e) => setCasamento(e.target.value)}
            placeholder="Digite o nome do cônjuge"
          />
        </div>
        <div className="form-group">
          <label>Data de Casamento</label>
          <input
            type="date"
            value={dataCasamento}
            onChange={(e) => setDataCasamento(e.target.value)}
            placeholder="Data de Casamento"
          />
        </div>
        <div className="form-group">
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button" disabled={loading}>Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Casamento;

