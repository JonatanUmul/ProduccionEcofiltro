import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatFecha } from "../../../utilidades/FormatearFecta";
import 'bootstrap/dist/css/bootstrap.min.css';

const URL = process.env.REACT_APP_URL;

const CardsInformacion = ({ filtros1 = {} }) => {
  const [datos, setDatos] = useState([]);
  const [modeloUF, setModelos] = useState('');
  const [id_ufmodelo, setmodelosUF] = useState('');
  const [grupoProduccion, setGrupodetrabajo] = useState([]);
  const [id_grupoproduccion, setGrupoP] = useState('');
  const [turno, setTurno] = useState([]);
  const [turn, setTurn] = useState('');
  const [fecha_creacion_inicio, setFecha] = useState('');
  const [fecha_creacion_fin, setFecha2] = useState('');
const[horno ,sethorno]=useState(filtros1.horno);

useEffect(() => {
    setFecha(filtros1.fecha_creacion_inicio );
    setFecha2(filtros1.fecha_creacion_fin );
  }, [filtros1]);


  // useEffect(() => {
  //   setFecha(filtros1.fecha_creacion_inicio ? filtros1.fecha_creacion_inicio : formatFecha(new Date()));
  //   setFecha2(filtros1.fecha_creacion_fin ? filtros1.fecha_creacion_fin : formatFecha(new Date()));
  // }, [filtros1]);

  useEffect(() => {
  
      const url = `${URL}/DTHH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin|| 'null'}/${modeloUF|| 'null'}/${turn ||'null'}/${horno||'null'}`;

      axios.get(url)
        .then((response) => {
          setDatos(response.data.data);
          console.log('datos consulta', response.data);
        })
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
    
  }, [id_ufmodelo, id_grupoproduccion, fecha_creacion_inicio, fecha_creacion_fin]);

  const totalProducido = (turno) => {
    return datos
      .filter(d => d.turno === turno)
      .reduce((acc, curr) => acc + (curr.horneado || 0), 0);
  };


  const horneadoDia = totalProducido('Día');
  const horneadoNoche = totalProducido('Noche');

  return (
    <div className="d-flex justify-content-center" style={{ margin: '0 -10px' }}>
      <div className="card text-white bg-danger mb-3" style={{ maxWidth: '20rem', borderRadius: '10px', margin: '10px' }}>
        <div className="card-header text-center" style={{ borderRadius: '10px 10px 0 0', fontSize: '1.25rem' }}>Horneados</div>
        <div className="card-body">
          {datos.length ? (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="turno-label" style={{ fontSize: '1rem' }}>Turno Día:</div>
                <div className="produccion" style={{ fontSize: '1rem' }}>{horneadoDia}</div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="turno-label" style={{ fontSize: '1rem' }}>Turno Noche:</div>
                <div className="produccion" style={{ fontSize: '1rem' }}>{horneadoNoche}</div>
              </div>
            </div>
          ) : (
            <div className="text-center" style={{ fontSize: '1rem' }}>Sin Datos...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardsInformacion;
