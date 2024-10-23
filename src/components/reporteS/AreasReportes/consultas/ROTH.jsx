import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { formatFecha } from "../../../utilidades/FormatearFecta";
import PdfROTHP from '../pdfECO/PdfROTHH'
import ExcelROTHP from '../Excel/ExcelRothp'
const URL = process.env.REACT_APP_URL

const maquinaria = "Horno";

const ROTHP = ({ id}) => {
  const [datos, setDatos] = useState([]);
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
  const [modeloUF, setModeloUf] = useState([]);
  const [turno, setTurno] = useState([])
  const [turnoProd, setTurnoProd] = useState('')
  const [ufmodelo, setUfmodelo] = useState('')
  const [hornos, setHornos] = useState([]);
  const [horno, setHorno] = useState('')

  // Realizar las solicitudes para obtener datos
  useEffect(() => {
    axios.all([
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/Turnos`),
      axios.get(`${URL}/maquinaria/${maquinaria}`),
    ])
    .then(axios.spread((modeloufReponse, TurnosResponse, TunelResponse) => {
      setModeloUf(modeloufReponse.data);
      setTurno(TurnosResponse.data)
      setHornos(TunelResponse.data)
    }))
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
    });
  }, []);

  useEffect(() => {
    // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
    const url = `${URL}/DTH/${id || 'null'}/${ufmodelo || 'null'}/${turnoProd || 'null'}/${horno || 'null'}`;

    axios.get(url)
      .then((response) => {
        setDatos(response.data);
        console.log('datos consulta', response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [id, ufmodelo, turnoProd, horno]);

  const limpiarInputs = () => {
    setUfmodelo('')
    setFecha('')
    setFecha2('')
    setTurnoProd('')
    setHorno('')
  };
console.log(datos)
  return (
    
    <div className="">
    <div className="row mb-3">
    <div className="col-md-3">
  

  <div className="col-md-3 d-flex align-items-center justify-content-center">
  <PdfROTHP datos={datos} />
  <ExcelROTHP datos={datos} />
</div>
  

    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-6">
      <div className="row mb-3">
        <div className="col-sm-4">
          <label htmlFor="id_turno" className="form-label">
            Turno
          </label>
          <select
            className="form-select"
            id="id_turno"
            value={turnoProd}
            onChange={(e) => setTurnoProd(e.target.value)}
          >
            <option value="" disabled>
              Seleccione...
            </option>
            {Array.isArray(turno.rows) &&
              turno.rows.map((turno) => (
                <option key={turno.id} value={turno.turno}>
                  {turno.turno}
                </option>
              ))}
          </select>
        </div>

        <div className="col-sm-4">
          <label htmlFor="horno" className="form-label">
            Horno
          </label>
          <select
            className="form-select"
            id="horno"
            value={horno}
            onChange={(e) => setHorno(e.target.value)}
          >
            <option value="" disabled>
              Seleccione...
            </option>
            {Array.isArray(hornos.rows) &&
              hornos.rows.map((hornos) => (
                <option key={hornos.id_maq} value={hornos.id_maq}>
                  {hornos.nombre_maq}
                </option>
              ))}
          </select>
        </div>

        <div className="col-sm-4">
          <label htmlFor="id_modelo" className="form-label">
            Modelo
          </label>
          <select
            className="form-select"
            id="id_modelo"
            value={ufmodelo}
            onChange={(e) => setUfmodelo(e.target.value)}
          >
            <option value="" disabled>
              Seleccione...
            </option>
            {Array.isArray(modeloUF.rows) &&
              modeloUF.rows.map((modelo) => (
                <option key={modelo.id_mod} value={modelo.id_mod}>
                  {modelo.nombre_modelo}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>

    <div className="col-md-3 d-flex align-items-end">
      <button className="btn btn-primary ms-2" onClick={limpiarInputs}>
        Limpiar
      </button>
    </div>


  </div>



  <div className="row">
    <div className="col-md-12">
      <div className="table-responsive">
        <table className="table table-sm text-center">
       
    <colgroup>
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
    <col style={{ width: '2%' }} />
  </colgroup>
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Fecha</th>
      <th scope="col">Turno</th>
      <th scope="col">Hora Prod.</th>
      <th scope="col">Modelo</th>
      <th scope="col">Tunel</th>
      <th scope="col">Estado</th>
      <th scope="col">CD 1</th>
      <th scope="col">PD 1</th>
      <th scope="col">CD 2</th>
      <th scope="col">PD 2</th>
      <th scope="col">CD 3</th>
      <th scope="col">PI 1</th>
      <th scope="col">CI 1</th>
      <th scope="col">PI 2</th>
      <th scope="col">Prom.</th>
    </tr>
  </thead>
  <tbody>
    {Array.isArray(datos) && datos.map((fila, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{formatFecha(fila.fecha_creacion)}</td>
        <td>{fila.turnos}</td>
        <td>{fila.hora_creacion}</td>
        <td>{fila.modelo1}/{fila.modelo2}</td>
        <td>{fila.tunel}</td>
        <td>{fila.estadouf}</td>
        <td>{fila.cabezaDerecha1}</td>
        <td>{fila.pieDerecho1}</td>
        <td>{fila.cabezaDerecha2}</td>
        <td>{fila.pieDerecho2}</td>
        <td>{fila.cabezaDerecha3}</td>
        <td>{fila.pieIzquierdo1}</td>
        <td>{fila.cabezaizquierda1}</td>
        <td>{fila.pieIzquierdo2}</td>
        <td><strong style={{ color: 'red' }}>{fila.promedio}</strong></td>
      </tr>
    ))}
  </tbody>



        </table>
      </div>
    </div>
  </div>
</div>
);
};

export default ROTHP;
 