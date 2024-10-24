import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header } = Layout;

const HeaderMenu = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/'; // Redirigir al inicio de sesión
  };

  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWeatherData = async () => {
    setErrorMessage('');
    setResponseData(null);

    try {
      const response = await axios.get(
        'http://api.weatherstack.com/current',
        {
          params: {
            access_key: '1b90a7e4fd5c87f6bf24889d7a608151', // Tu clave de API
            query: '14.5365925,-90.77110859999999', // Coordenadas o nombre de ciudad
          },
        }
      );

      if (response.data && response.data.current) {
        setResponseData(response.data); // Guardamos toda la respuesta
      } else {
        setErrorMessage('No se pudo obtener el clima. Verifica la ubicación.');
      }
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
      setErrorMessage('Error de conexión o clave API inválida.');
    }
  };

  useEffect(() => {
    fetchWeatherData(); // Consulta inicial

    // Repetir la consulta cada 3600000ms (1 hora)
    const intervalId = setInterval(fetchWeatherData, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Header
      style={{
        padding: '0',
        background: '#001529', // Fondo oscuro para un buen contraste
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '64px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Sombra sutil
      }}
    >
      <div
        style={{
          display: 'flex',
          overflowX: 'auto', // Permitir desplazamiento horizontal
          whiteSpace: 'nowrap', // Mantener el contenido en una sola línea
          padding: '0 20px',
          scrollbarWidth: 'none', // Ocultar barra de desplazamiento para Firefox
          '-ms-overflow-style': 'none', // Ocultar barra de desplazamiento para Internet Explorer y Edge
        }}
      >
        {responseData && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0 10px', fontSize: '16px', color: '#fff' }}><strong>Temperatura:</strong> {responseData.current.temperature}°C</p>
            <p style={{ margin: '0 10px', fontSize: '16px', color: '#fff' }}><strong>Humedad:</strong> {responseData.current.humidity}%</p>
            <p style={{ margin: '0 10px', fontSize: '16px', color: '#fff' }}><strong>Viento:</strong> {responseData.current.wind_speed} km/h, dirección {responseData.current.wind_dir}</p>
            {/* <p style={{ margin: '0 10px', fontSize: '16px', color: '#fff' }}><strong>Presión:</strong> {responseData.current.pressure} mbar</p> */}
            <p style={{ margin: '0 10px', fontSize: '16px', color: '#fff' }}><strong>Precipitación:</strong> {responseData.current.precip} mm</p>
            <p style={{ margin: '0 10px' }}>
              <img src={responseData.current.weather_icons[0]} alt="icono del clima" style={{ width: '40px', height: '40px' }} />
            </p>
          </div>
        )}
      </div>

      <Menu style={{ flexShrink: 0, background: '', color: 'black' }} mode="horizontal">
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout} style={{ color: 'black' }}>
          <span>Cerrar sesión</span>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderMenu;
