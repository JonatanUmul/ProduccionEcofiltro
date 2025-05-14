import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { formatFecha } from "../../../utilidades/FormatearFecta";
import PdfRDTTT from '../pdfECO/PdfRDTTT'
import ExcelROTHP from '../Excel/ExcelRothp'
const URL = process.env.REACT_APP_URL

const maquinaria = "Tunel";

const ROTHP = ({ id, nombretabla, codigoInicio, codigoFinal, cantidad }) => {
  const [datos, setDatos] = useState([]);
  const [fecha_creacion_inicio, setFecha] = useState('');
  const [fecha_creacion_fin, setFecha2] = useState('');
  const [modeloUF, setModeloUf] = useState([]);
  const [turno, setTurno] = useState([])
  const [turnoProd, setTurnoProd] = useState('')
  const [ufmodelo, setUfmodelo] = useState('')
  const [tunel, setTunel] = useState([]);
  const [tunelNum, setTunelNUm] = useState('')
console.log('datos en dtt', id, nombretabla, codigoInicio, codigoFinal, cantidad)
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
      setTunel(TunelResponse.data)
    }))
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
    });
  }, []);

  useEffect(() => {
    // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
    const url = `${URL}/DTT/${id || 'null'}/${ufmodelo || 'null'}/${turnoProd || 'null'}/${tunelNum || 'null'}/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}`;
    // const url = `${URL}/DTT/${id || 'null'}/${ufmodelo || 'null'}/${turnoProd || 'null'}/${tunelNum || 'null'}/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}`;

    axios.get(url)
      .then((response) => {
        setDatos(response.data);
        console.log('datos consulta', response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [fecha_creacion_inicio, fecha_creacion_fin, ufmodelo, turnoProd, tunelNum]);

  const limpiarInputs = () => {
    setUfmodelo('')
    setFecha('')
    setFecha2('')
    setTurnoProd('')
    setTunelNUm('')
  };

  return (
    
    <div className="" >
    <div className="row mb-3">
    <div className="col-sm-12 col-md-12 col-lg-12">
    <strong >
  <div className="card shadow-sm bg-light" style={{ fontSize: 'smaller', alignItems: 'center' }}>
    <div className="card-body">
      <h5 className="card-title">Datos:</h5>
      <ul className="list-group list-group-flush" style={{ display: 'flex', flexDirection: 'row', listStyle: 'none', padding: 0 }}>
        <li className="list-group-item" style={{ marginRight: '10px', textAlign:'center'}}>Código Inicio: {codigoInicio}</li>
        <li className="list-group-item" style={{ marginRight: '10px' ,textAlign:'center'}}>Código Fin: {codigoFinal}</li>
        <li className="list-group-item" style={{ marginRight: '10px' ,textAlign:'center'}}>Cantidad: {cantidad}</li>
      </ul>
    </div>
  </div>
</strong>

  <div className="col-md-3 d-flex align-items-center justify-content-center">
  <PdfRDTTT datos={datos} />
  <ExcelROTHP datos={datos} />
</div>
  
 
    </div>
  </div>
  <div class="container text-center">    {/* <div className="col-sm-12 col-md-12 col-lg-12"> */}
  <div class="row">
  <div class="col">
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

        <div class="col">
         <label htmlFor="id_tunel" className="form-label">
            Tunel
          </label>
          <select
            className="form-select"
            id="id_tunel"
            value={tunelNum}
            onChange={(e) => setTunelNUm(e.target.value)}
          >
            <option value="" disabled>
              Seleccione...
            </option>
            {Array.isArray(tunel.rows) &&
              tunel.rows.map((tunel) => (
                <option key={tunel.id_maq} value={tunel.id_maq}>
                  {tunel.nombre_maq}
                </option>
              ))}
          </select>
        </div>

        <div class="col">
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

    <div class="col">
    <button className="btn btn-primary ms-2" onClick={limpiarInputs}>
        Limpiar
      </button>
    {/* </div> */}


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
 