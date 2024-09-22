import React from 'react';
import { Link } from 'react-router-dom';
import membro from '../images/membro.png';
import casamento from '../images/casamento.ico';
import filhos from '../images/filhos.ico';
import esposa from '../images/esposa.ico';
import simbolicos from '../images/simbolicos.png';
import filosoficos from '../images/filosoficos.ico';
import adicionais from '../images/adicionais.ico';
import instalacao from '../images/instalacao.ico';
import reassuncao from '../images/reassuncao.ico';
import condecoracao from '../images/condecoracao.png';
import apostolado from '../images/apostolado.ico';
import capitulo from '../images/capitulo.png';
import criptico from '../images/criptico.jpg';
import comanderia from '../images/comanderia.png';
//import dashboard from '../images/dashboard.jpg';
//import portfolio from '../images/portfolio.jpg';
import '../styles/Inicial.css';

function Inicial() {
  console.log('Renderizando página inicial');

  return (
    <div>
      <div className="pagina">
        <h1>Esta é a sua página de formulários.</h1>
      </div>

      <div className="container">
        <div>
          <Link to="/dashboard">
            <button className="btn btn-black">Ir para Dashboard</button>
          </Link>
        </div>

        <div>
          <Link to="/membro/portfolio/cim">
            <button className="btn btn-black">Ir para Portfolio</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={membro} alt="Membro" className="membro" width="60" height="60" />
          </div>
          <h2>Dados do Membro</h2>
          <p>Preencha o formulário com os dados do Membro aqui.</p>
          <Link to="/membro">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={esposa} alt="Esposa" className="esposa" width="60" height="60" />
          </div>
          <h2>Nome da Esposa</h2>
          <p>Preencha o formulário com os dados da esposa aqui.</p>
          <Link to="/esposa">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={filhos} alt="Filhos" className="filhos" width="60" height="60" />
          </div>
          <h2>Nome dos Filhos</h2>
          <p>Preencha o formulário com os dados dos filhos aqui.</p>
          <Link to="/filhos">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={casamento} alt="Casamento" className="casamento" width="60" height="60" />
          </div>
          <h2>Aniversário de Casamento</h2>
          <p>Preencha o formulário com os dados do casamento aqui.</p>
          <Link to="/casamento">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={simbolicos} alt="Simbolicos" className="simbolicos" width="60" height="60" />
          </div>
          <h2>Graus Simbólicos</h2>
          <p>Preencha o formulário com os dados dos graus simbólicos aqui.</p>
          <Link to="/simbolicos">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={condecoracao} alt="Condecoracao" className="condecoracao" width="60" height="60" />
          </div>
          <h2>Condecorações</h2>
          <p>Preencha o formulário com os dados das condecorações aqui.</p>
          <Link to="/condecoracoes">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={filosoficos} alt="Filosoficos" className="filosoficos" width="60" height="60" />
          </div>
          <h2>Graus Filosóficos</h2>
          <p>Preencha o formulário com os dados dos graus filosóficos aqui.</p>
          <Link to="/filosoficos">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={adicionais} alt="Adicionais" className="adicionais" width="60" height="60" />
          </div>
          <h2>Graus Adicionais</h2>
          <p>Preencha o formulário com os dados dos graus adicionais aqui.</p>
          <Link to="/adicionais">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={instalacao} alt="Instalacao" className="instalacao" width="60" height="60" />
          </div>
          <h2>Instalação</h2>
          <p>Preencha o formulário com os dados da instalação aqui.</p>
          <Link to="/instalacao">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={reassuncao} alt="Reassuncao" className="reassuncao" width="60" height="60" />
          </div>
          <h2>Reassunção</h2>
          <p>Preencha o formulário com os dados da reassunção aqui.</p>
          <Link to="/reassuncao">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={apostolado} alt="Apostolado" className="apostolado" width="60" height="60" />
          </div>
          <h2>Apostolado</h2>
          <p>Preencha o formulário com os dados dos graus apostolados aqui.</p>
          <Link to="/apostolado">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={capitulo} alt="Capitulo" className="capitulo" width="60" height="60" />
          </div>
          <h2>Capítulo do Real Arco</h2>
          <p>Preencha o formulário com os dados dos graus aqui.</p>
          <Link to="/capitulorealarco">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={criptico} alt="Criptico" className="criptico" width="60" height="60" />
          </div>
          <h2>Conselho Críptico</h2>
          <p>Preencha o formulário com os dados dos graus aqui.</p>
          <Link to="/conselhocriptico">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">
            <img src={comanderia} alt="Comanderia" className="comanderia" width="60" height="60" />
          </div>
          <h2>Comanderia de Cavaleiros Templários</h2>
          <p>Preencha o formulário com os dados dos graus aqui.</p>
          <Link to="/comanderia">
            <button className="btn">Preencher Formulário</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Inicial;
