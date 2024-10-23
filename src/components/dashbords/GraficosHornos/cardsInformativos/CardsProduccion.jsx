import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatFecha } from "../../../utilidades/FormatearFecta";
import 'bootstrap/dist/css/bootstrap.min.css';

const URL = process.env.REACT_APP_URL;

const CardsInformacion = ({ filtros2 = {} }) => {
  const [datos, setDatos] = useState([]);
  const [modeloUF, setModelos] = useState([]);
  const [id_ufmodelo, setmodelosUF] = useState('');
  const [grupoProduccion, setGrupodetrabajo] = useState([]);
  const [id_grupoproduccion, setGrupoP] = useState('');
  const [turno, setTurno] = useState([]);
  const [turn, setTurn] = useState('');
  const [fecha_creacion_inicio, setFecha] = useState('');
  const [fecha_creacion_fin, setFecha2] = useState('');

  useEffect(() => {
    setFecha(filtros2.fecha_creacion_inicio ? filtros2.fecha_creacion_inicio : formatFecha(new Date()));
    setFecha2(filtros2.fecha_creacion_fin ? filtros2.fecha_creacion_fin : formatFecha(new Date()));
  }, [filtros2]);


  useEffect(() => {
    axios.all([
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/GrupodeTrabajo`),
      axios.get(`${URL}/Turnos`),
    ])
    .then(axios.spread((ModelosufResponse, GrupodeTrabajoResponse, TurnosResponse) => {
      setModelos(ModelosufResponse.data);
      setGrupodetrabajo(GrupodeTrabajoResponse.data);
      setTurno(TurnosResponse.data);
    }))
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
    });
  }, []);

  useEffect(() => {
    if (fecha_creacion_inicio && fecha_creacion_fin) {
      const url = `${URL}/DTP/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${'null'}/${'null'}`;

      axios.get(url)
        .then((response) => {
          setDatos(response.data);
          // console.log('datos consulta', response.data);
        })
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
    }
  }, [id_ufmodelo, id_grupoproduccion, fecha_creacion_inicio, fecha_creacion_fin]);

  const totalProducido = (turno) => {
    return datos
      .filter(d => d.nombre_turno === turno)
      .reduce((acc, curr) => acc + (curr.producido || 0), 0);
  };

  const producidoDia = totalProducido("Día");
  const producidoNoche = totalProducido("Noche");

  return (
    <div className="d-flex justify-content-center" style={{ margin: '0 -10px' }}>
      <div className="card text-white bg-success mb-3" style={{ maxWidth: '20rem', borderRadius: '10px', margin: '10px' }}>
        <div className="card-header text-center" style={{ borderRadius: '10px 10px 0 0', fontSize: '1.25rem' }}>Producido</div>
        <div className="card-body">
          {datos.length ? (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="turno-label" style={{ fontSize: '1rem' }}>Turno Día:</div>
                <div className="produccion" style={{ fontSize: '1rem' }}>{producidoDia}</div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="turno-label" style={{ fontSize: '1rem' }}>Turno Noche:</div>
                <div className="produccion" style={{ fontSize: '1rem' }}>{producidoNoche}</div>
              </div>
            </div>
          ) : (
            <div className="text-center" style={{ fontSize: '1rem' }}>Sin datos...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardsInformacion;
