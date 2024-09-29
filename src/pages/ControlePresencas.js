import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import withAdminProtection from '../withAdminProtection';
import '../styles/PresencaForm.css';
import voltar from '../images/voltar.png';
import { useNavigate } from 'react-router-dom';
import { fetchWithToken } from '../fetchUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

const ControlePresencas = () => {
  const [membros, setMembros] = useState([]);
  const [reunioes, setReunioes] = useState([]);
  const [selectedReuniao, setSelectedReuniao] = useState('');
  const [dataReuniao, setDataReuniao] = useState('');
  const [presencas, setPresencas] = useState({});
  const [dados, setDados] = useState([]);
  const chartRef = useRef(null);

  const navigate = useNavigate();

  // Fetch dados de membros e reuniões
  useEffect(() => {
    fetchWithToken('https://detras.onrender.com/api/presencas/membros')
    //fetchWithToken('http://localhost:5000/api/presencas/membros')
      .then(response => response.json())
      .then(data => {
        const initialPresencas = data.reduce((acc, membro) => {
          acc[membro.id] = { presente: false, falta: false };
          return acc;
        }, {});
        setMembros(data);
        setPresencas(initialPresencas);
      })
      .catch(error => console.error('Erro ao buscar membros:', error));

    fetchWithToken('https://detras.onrender.com/api/presencas/reunioes')
    //fetchWithToken('http://localhost:5000/api/presencas/reunioes')
      .then(response => response.json())
      .then(data => {
        setReunioes(data);
      })
      .catch(error => console.error('Erro ao buscar reuniões:', error));
  }, []);

  // Fetch dados de presenças para o gráfico
  useEffect(() => {
    fetchWithToken('https://detras.onrender.com/api/presencas/listar')
    //fetchWithToken('http://localhost:5000/api/presencas/listar')
      .then(response => response.json())
      .then(data => {
        setDados(data);
      })
      .catch(error => console.error('Erro ao buscar dados de presenças:', error));
  }, []);

  const handleCheckboxChange = (membroId, type) => {
    setPresencas({
      ...presencas,
      [membroId]: {
        ...presencas[membroId],
        [type]: !presencas[membroId][type],
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const presencasArray = Object.keys(presencas).map((membroId) => ({
      membro_id: membroId,
      presente: presencas[membroId].presente,
      falta: presencas[membroId].falta,
      reuniao_id: selectedReuniao,
      data_reuniao: dataReuniao,
    }));

    fetch('http://localhost:5000/api/presencas/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(presencasArray),
    })
      .then((response) => {
        if (response.ok) {
          alert('Presenças registradas com sucesso');
        } else {
          throw new Error('Erro ao registrar presenças');
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

  const calcularPresencas = (membroId) => {
    const totalReunioes = reunioes.length;
    const presencasMembro = dados.filter((dado) => dado.membro_id === membroId);
    const totalPresencas = presencasMembro.filter((dado) => dado.presente).length;
    return totalReunioes > 0 ? (totalPresencas / totalReunioes) * 100 : 0;
  };

  const membrosChart = dados.reduce((acc, cur) => {
    if (!acc.some((item) => item.membro_id === cur.membro_id)) {
      acc.push({ membro_id: cur.membro_id, nome: cur.nome, cim: cur.cim });
    }
    return acc;
  }, []);

  const dataBar = {
    labels: membrosChart.map((m) => `${m.nome} (${m.cim})`),
    datasets: [
      {
        label: 'Presenças (%)',
        data: membrosChart.map((m) => calcularPresencas(m.membro_id)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const ctx = document.getElementById('presencaChart').getContext('2d');
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new ChartJS(ctx, {
      type: 'bar',
      data: dataBar,
      options: { maintainAspectRatio: false },
    });
  }, [dados, reunioes]);

  return (
    <div>

      <img 
        src={voltar} 
        alt="Voltar" 
        onClick={() => navigate('/inicial')} // Redireciona para a página inicial
        style={{ cursor: 'pointer', position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px' }}
      />

      <h1>Controle de Presenças</h1>
      <div className="form-container">
        <h2>Registro de Presenças</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Selecione uma reunião:</label>
            <select
              value={selectedReuniao}
              onChange={(e) => setSelectedReuniao(e.target.value)}
              required
            >
              <option value="">Selecione uma reunião</option>
              {reunioes.map((reuniao) => (
                <option key={reuniao.id} value={reuniao.id}>
                  {reuniao.titulo}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Data da reunião:</label>
            <input
              type="date"
              value={dataReuniao}
              onChange={(e) => setDataReuniao(e.target.value)}
              required
            />
          </div>
          <div className="membros-list">
            <label>Membros:</label>
            {membros.map((membro) => (
              <div key={membro.id} className="membro-item">
                <label>
                  <input
                    type="checkbox"
                    checked={presencas[membro.id]?.presente}
                    onChange={() => handleCheckboxChange(membro.id, 'presente')}
                  />
                  Presente
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={presencas[membro.id]?.falta}
                    onChange={() => handleCheckboxChange(membro.id, 'falta')}
                  />
                  Falta
                </label>
                <span>
                  {membro.nome} ({membro.cim})
                </span>
              </div>
            ))}
          </div>
          <button type="submit" className="submit-btn">
            Registrar Presenças
          </button>
        </form>
      </div>
      <div>
        <canvas id="presencaChart" />
      </div>
    </div>
  );
};

export default withAdminProtection(ControlePresencas);

