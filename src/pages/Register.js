import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mail from "../images/email.png";
import lock from "../images/lock.png";
import profile from "../images/icon.png";
import cim from "../images/cim.png";
import cadastro from "../images/cadastro.png";
import '../styles/Register.css';
import { UserContext } from '../UserContext';

function Register() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmarSenha: '', cim: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (form.senha !== form.confirmarSenha) {
      setError('As senhas não correspondem!');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://detras.onrender.com/api/auth/register', {
      //const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro desconhecido');
      }

      const data = await response.json();
      const tokenExpiry = new Date().getTime() + 3600 * 1000; // 1 hora de validade
      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenExpiry', tokenExpiry);
      localStorage.setItem('userData', JSON.stringify({ nome: data.membro.nome, cim: data.membro.cim, email: data.membro.email, is_admin: data.membro.is_admin }));
      setUser({ nome: data.membro.nome, cim: data.membro.cim, email: data.membro.email, is_admin: data.membro.is_admin, token: data.token });
      navigate('/inicial');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='main'>
        <div className='sub-main'>
          <div className='imgs'>
            <div>
              <div className='container-image'>
              <img src={cadastro} alt='cadastro' className='cadastro'/>
              </div>
              <h1>Registre-se</h1>
              <div className='mail-id'>
                <img src={profile} alt="nome" className='email' />
                <input type="text" placeholder='Digite seu Nome' className='fill' value={form.nome} onChange={handleChange} name="nome"/>
              </div>
              <div className='mail-id'>
                <img src={mail} alt="email" className='email' />
                <input type="email" placeholder='Digite seu Email' className='fill' value={form.email} onChange={handleChange} name="email"/>
              </div>
              <div className='mail-id'>
                <img src={lock} alt="senha" className='email' />
                <input type="password" placeholder='Digite a Senha' className='fill' value={form.senha} onChange={handleChange} name="senha"/>
              </div>
              <div className='mail-id'>
                <img src={lock} alt="confirmarSenha" className='email' />
                <input type="password" placeholder='Confirme a Senha' className='fill' value={form.confirmarSenha} onChange={handleChange} name="confirmarSenha"/>
              </div>
              <div className='mail-id'>
                <img src={cim} alt="cim" className='email' />
                <input type="text" placeholder='Digite seu CIM' className='fill' value={form.cim} onChange={handleChange} name="cim"/>
              </div>
              <div className='login-btn'>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Registrando...' : 'Registrar'}
                </button>
              </div>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
              <div className='reg-link'>
                <p>Já tem uma conta?</p>
                <Link className='link' to='/login'>
                  Faça Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;


