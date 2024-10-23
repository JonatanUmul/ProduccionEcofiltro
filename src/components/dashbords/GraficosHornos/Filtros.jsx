import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { formatFecha } from "../../utilidades/FormatearFecta";

const URL = process.env.REACT_APP_URL;

const Filtros = ({ onChange }) => {
  const [turn, setTurn] = useState(() => {
    const storageTurn = localStorage.getItem('turn');
    return storageTurn ? JSON.parse(storageTurn) : '';
  });
  const [turnos, setTurnos] = useState([]);
  const [hornos, setHornos] = useState([]);

  const [horno, setHorno] = useState(() => {
    const storedHornos = localStorage.getItem('horno');
    return storedHornos ? JSON.parse(storedHornos) : '';
  });

  const [fecha_creacion_inicio, setFecha] = useState(() => {
    const storedFecha = localStorage.getItem('fecha_creacion_inicio');
    return storedFecha ? JSON.parse(storedFecha) : formatFecha(new Date());
  });

  const [fecha_creacion_fin, setFecha2] = useState(() => {
    const storedFecha2 = localStorage.getItem('fecha_creacion_fin');
    return storedFecha2 ? JSON.parse(storedFecha2) : formatFecha(new Date());
  });

  const [id_ufmodelo, setmodelosUF] = useState(() => {
    const storedUfmodelo = localStorage.getItem('id_ufmodelo');
    return storedUfmodelo ? JSON.parse(storedUfmodelo) : 1;
  });

  const [modeloUF, setModelos] = useState([]);

  // Effect to fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hornosResponse, turnosResponse, modelosUFResponse] = await Promise.all([
          axios.get(`${URL}/maquinaria/Horno`),
          axios.get(`${URL}/Turnos`),
          axios.get(`${URL}/ModelosUF`),
        ]);

        setHornos(hornosResponse.data.rows);
        setTurnos(turnosResponse.data.rows);
        setModelos(modelosUFResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };

    fetchData();
  }, []);

  // Effect to update localStorage and call onChange when state changes
  useEffect(() => {
    localStorage.setItem('turn', JSON.stringify(turn));
    onChange({ turn, horno, fecha_creacion_inicio, fecha_creacion_fin, id_ufmodelo });
  }, [turn]);

  useEffect(() => {
    localStorage.setItem('horno', JSON.stringify(horno));
    onChange({ turn, horno, fecha_creacion_inicio, fecha_creacion_fin, id_ufmodelo });
  }, [horno]);

  useEffect(() => {
    localStorage.setItem('fecha_creacion_inicio', JSON.stringify(fecha_creacion_inicio));
    onChange({ turn, horno, fecha_creacion_inicio, fecha_creacion_fin, id_ufmodelo });
  }, [fecha_creacion_inicio]);

  useEffect(() => {
    localStorage.setItem('fecha_creacion_fin', JSON.stringify(fecha_creacion_fin));
    onChange({ turn, horno, fecha_creacion_inicio, fecha_creacion_fin, id_ufmodelo });
  }, [fecha_creacion_fin]);

  useEffect(() => {
    localStorage.setItem('id_ufmodelo', JSON.stringify(id_ufmodelo));
    onChange({ turn, horno, fecha_creacion_inicio, fecha_creacion_fin, id_ufmodelo });
  }, [id_ufmodelo]);

  const handleTurnChange = (e) => {
    setTurn(e.target.value);
  };

  const handleHornoChange = (e) => {
    setHorno(e.target.value);
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    setFecha2(e.target.value);
  };

  const handleUfmodeloChange = (e) => {
    setmodelosUF(e.target.value);
  };

  return (
    <div className="filtros-container">
      <div className="filtro-item">
        <label htmlFor="fecha" className="form-label small-label">Fecha 1</label>
        <input
          className="form-control small-select"
          type="date"
          value={fecha_creacion_inicio}
          onChange={handleFechaChange}
        />
      </div>
      <div className="filtro-item">
        <label htmlFor="fecha" className="form-label small-label">Fecha 2</label>
        <input
          className="form-control small-select"
          type="date"
          value={fecha_creacion_fin}
          onChange={handleFechaFinChange}
        />
      </div>
      <div className="filtro-item">
        <label htmlFor="id_turno" className="form-label small-label">Turno de Horneado</label>
        <select
          className="form-select"
          id="id_turno"
          value={turn}
          onChange={handleTurnChange}
        >
          <option value="" disabled>Seleccione...</option>
          {Array.isArray(turnos) && turnos.length > 0 && turnos.map((turno) => (
            <option key={turno.id} value={turno.id}>
              {turno.turno}
            </option>
          ))}
        </select>
      </div>
      <div className="filtro-item">
        <label htmlFor="horno" className="form-label small-label">Horno</label>
        <select
          className="form-select"
          id="horno"
          value={horno}
          onChange={handleHornoChange}
        >
          <option value="" disabled>Seleccione...</option>
          {Array.isArray(hornos) && hornos.length > 0 && hornos.map((horno) => (
            <option key={horno.id_maq} value={horno.id_maq}>
              {horno.nombre_maq}
            </option>
          ))}
        </select>
      </div>
      <div className="filtro-item">
        <label htmlFor="modelo" className="form-label small-label">Modelo:</label>
        <select
          className="form-select"
          name="UFmodelo"
          value={id_ufmodelo}
          onChange={handleUfmodeloChange}
        >
          <option value="" disabled>Seleccione...</option>
          {Array.isArray(modeloUF.rows) && modeloUF.rows.map((item) => (
            <option key={item.id_mod} value={item.id_mod}>{item.nombre_modelo}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filtros;
