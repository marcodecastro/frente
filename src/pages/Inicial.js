import React from 'react';
import { Link } from 'react-router-dom';
import membro from '../images/membro.png';
import casamento from '../images/casamento.ico';
import filhos from '../images/filhos.ico';
import esposa from '../images/esposa.ico';
import simbolicos from '../images/simbolicos.png';
import filosoficos from '../images/filosoficos.ico';
import adicionais from '../images/adicionais.ico';
import instalacao from '../images/instalacao.png';
import reassuncao from '../images/reassuncao.png';
import condecoracao from '../images/condecoracao.png';
import apostolado from '../images/apostolado.ico';
import capitulo from '../images/capitulo.png';
import criptico from '../images/criptico.jpg';
import comanderia from '../images/comanderia.png';
import '../styles/Inicial.css';

function Inicial() {
  return (
    <div>
        <div className="paginaInicial">
        <h1>Esta é a página que direciona para os formulários.</h1>
    </div>
        <div className="containerInicial">
            <div className="card">
            <h2>Membro</h2>
                <div className="icon">
                    <img src={membro} alt="Membro" className="membro" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/membro">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
            <h2>Nome da Esposa</h2>
                <div className="icon">
                    <img src={esposa} alt="Esposa" className="esposa" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/esposa">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
            <h2>Nome dos Filhos</h2>
                <div className="icon">
                    <img src={filhos} alt="Filhos" className="filhos" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/filhos">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
            <h2>Aniversário de Casamento</h2>
                <div className="icon">
                    <img src={casamento} alt="Casamento" className="casamento" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/casamento">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
            <h2>Graus Simbólicos</h2>
                <div className="icon">
                    <img src={simbolicos} alt="Simbolicos" className="simbolicos" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/simbolicos">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
            <h2>Condecorações</h2>
                <div className="icon">
                    <img src={condecoracao} alt="Condecoracao" className="condecoracao" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/condecoracoes">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
            <h2>Graus Filosóficos</h2>
                <div className="icon">
                    <img src={filosoficos} alt="Filosoficos" className="filosoficos" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/filosoficos">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
            <h2>Graus Adicionais</h2>
                <div className="icon">
                    <img src={adicionais} alt="Adicionais" className="adicionais" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/adicionais">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
            <h2>Instalação</h2>
                <div className="icon">
                    <img src={instalacao} alt="Instalacao" className="instalacao" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/instalacao">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
            <h2>Reassunção</h2>
                <div className="icon">
                    <img src={reassuncao} alt="Reassuncao" className="reassuncao" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/reassuncao">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
            <h2>Apostolado</h2>
                <div className="icon">
                    <img src={apostolado} alt="Apostolado" className="apostolado" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/apostolado">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
              <h2>Capítulo do Real Arco</h2>
                <div className="icon">
                    <img src={capitulo} alt="Capitulo" className="capitulo" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/capitulorealarco">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
             <h2>Conselho Críptico</h2>
                <div className="icon">
                    <img src={criptico} alt="Criptico" className="criptico" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/criptico">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>

            <div className="card">
            <h2>Comanderia</h2>
                <div className="icon">
                    <img src={comanderia} alt="Comanderia" className="comanderia" width="45" height="45" />
                </div>
                <p>Preencha o formulário com os dados do Membro aqui.</p>
                <Link to="/comanderia">
                    <button className="btn">Preencher Formulário</button>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Inicial;