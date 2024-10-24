import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTComponent = () => {
  const [inputText, setInputText] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setResponseData(null);

    try {
      const response = await axios.get(
        'http://api.weatherstack.com/current',
        {
          params: {
            access_key: '1b90a7e4fd5c87f6bf24889d7a608151', // Tu clave de API
            query: '14.5365925,-90.77110859999999', // Puedes escribir el nombre de la ciudad o coordenadas
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe la ciudad o coordenadas (ej. 14.53,-90.77)"
        />
        <button type="submit">Enviar</button>
      </form>

      {errorMessage && (
        <div style={{ color: 'red' }}>
          <p>{errorMessage}</p>
        </div>
      )}

      {responseData && (
        <div>
          <h5>Datos completos del clima:</h5>
          <p><strong>Ubicación:</strong> {responseData.location.name}, {responseData.location.country}</p>
          <p><strong>Temperatura:</strong> {responseData.current.temperature}°C</p>
          <p><strong>Descripción:</strong> {responseData.current.weather_descriptions[0]}</p>
          <p><strong>Humedad:</strong> {responseData.current.humidity}%</p>
          <p><strong>Viento:</strong> {responseData.current.wind_speed} km/h, dirección {responseData.current.wind_dir}</p>
          <p><strong>Presión:</strong> {responseData.current.pressure} mbar</p>
          <p><strong>Índice UV:</strong> {responseData.current.uv_index}</p>
          <p><strong>Precipitación:</strong> {responseData.current.precip} mm</p>
          <p><strong>Icono:</strong> <img src={responseData.current.weather_icons[0]} alt="icono del clima" /></p>
        </div>
      )}
    </div>
  );
};

export default ChatGPTComponent;
