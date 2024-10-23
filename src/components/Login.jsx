import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';

const URL = process.env.REACT_APP_URL;

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorlogin, setErrorlogin] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(`${URL}/Loginroutes`, {
        username,
        password
      });

      if (response.data.token) { // Verificar si hay un token en la respuesta
        const token = response.data.token;
        console.log(token)
        localStorage.setItem('token', token);

        const decodedToken = parseJwt(token);
        const userRoleId = decodedToken.id_rol;
        console.log('ROlNumer',userRoleId)
        localStorage.setItem('id_rol', userRoleId);
        
        const nombre= decodedToken.nombre;
        localStorage.setItem('nombre', nombre)

        const id_creador= decodedToken.id_creador;
        localStorage.setItem('id_creador', id_creador)

        const rol= decodedToken.rol;
        localStorage.setItem('rol', rol)

        navigate('/Home/Dashboard');
      } else {
        setErrorlogin('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      setErrorlogin('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login">
          <form onSubmit={handleSubmit} className="login-form">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={'/images/E.eco.png'}
                alt="Logo"
                style={{ width: '150px', padding: '15px', marginRight: '10px' }}
              />
            </div>
            <div className="form-group-input">
              <label htmlFor="username"><UserOutlined /> Usuario</label>
              <input type="text" className="form-control" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group-input">
              <label htmlFor="password"><LockOutlined /> Contraseña</label>
              <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {errorlogin && <p className="error-message">{errorlogin}</p>}

            <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
