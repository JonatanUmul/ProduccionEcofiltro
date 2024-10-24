import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTComponent = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    console.log('API Key:', process.env.REACT_APP_OPENAI_API_KEY); // Verifica que la clave API se está cargando correctamente

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: inputText }],
          max_tokens: 500,  // Aumenta el número de tokens
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Usa la variable de entorno para la clave API
          },
        }
      );

      setResponseText(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
      if (error.response) {
        setErrorMessage(`Error: Por favor, solicita acceso al administrador para continuar.`);
      } else {
        setErrorMessage('Error de conexión o clave API inválida.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu pregunta"
        />
        <button  type="submit">Enviar</button>
      </form>

      {errorMessage && (
        <div style={{ color: 'red' }}>
          <p>{errorMessage}</p>
        </div>
      )}

      {responseText && (
        <div>
          {/* <h5>Respuesta:</h5> */}
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
};

export default ChatGPTComponent;
