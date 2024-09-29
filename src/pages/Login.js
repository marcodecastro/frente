import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import mail from "../images/email.png";
import lock from "../images/lock.png";
import cim from "../images/cim.png";
import profile from "../images/icon.png";
import '../styles/Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', senha: '', cim: '' });
  const [error, setError] = useState('');
  
  const { setUser, user, loading: userLoading } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && user) {
      if (user.is_admin) {
        navigate('/comemoracoes');
      } else {
        //navigate('/inicial');
        navigate('/login');
      }
    }
  }, [user, userLoading, navigate]); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Começa o loading ao submeter o formulário

    try {
      const response = await fetch('https://detras.onrender.com/api/auth/login', {
      //const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? errorData.errors.map(err => err.msg).join(', ') : errorData.error);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify({ ...data.membro, token: data.token }));
      setUser({ ...data.membro, token: data.token });

      if (data.membro.is_admin) {
        navigate('/admin');
      } else {
        navigate('/inicial');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Para o loading após a resposta da requisição
    }
  };

  if (userLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='main'>
        <div className='sub-main'>
          <div>
            <div className='imgs'>
              <div className='container-image'>
                <img src={profile} alt='profile' className='profile'/>
              </div>
            </div>
            <div>
              <h1 className='LHeader'>Login</h1>

              {isLoading ? (
                <div className="loading-spinner">Carregando...</div> // Exibe o loading enquanto está processando
              ) : (
                <>
                  <div className='input-container'>
                    <img src={mail} alt="email" className='iconlogin' />
                    <input type="email" placeholder='Digite seu Email' className='fill' onChange={handleChange} name="email"/>
                  </div>

                  <div className='input-container'>
                    <img src={lock} alt='password' className='iconlogin' />
                    <input type="password" placeholder='Digite sua Senha' className='fill' onChange={handleChange} name="senha"/>
                  </div>

                  <div className='input-container'>
                    <img src={cim} alt='cim' className='iconlogin' />
                    <input type="cim" placeholder='Digite seu CIM' className='fill' onChange={handleChange} name="cim"/>
                  </div>

                  <div className='login-btn'>
                    <button type="submit">Login</button>
                  </div>
                  <div className='reg-link'>
                    <p>Ainda não tem uma conta ?</p>
                    <Link className='link' to='/register'>
                      <li>Registre-se</li>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
