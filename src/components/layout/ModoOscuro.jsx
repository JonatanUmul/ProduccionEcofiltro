import React, { useState, useEffect } from 'react';
import './Modooscuro.css';

function ModoOscuro() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{darkMode ? "Modo Oscuro" : "Modo Claro"}</h1>
        <button onClick={toggleDarkMode}>
          Cambiar a {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </header>
    </div>
  );
}

export default ModoOscuro;
