import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatFecha } from "../../../utilidades/FormatearFecta.js";
import PdfROTHP from '../pdfECO/PdfROTHH.jsx';
import ExcelROTHP from '../Excel/ExcelRothp';
import Detalle from '../detalles/Detalle_ROTT.jsx';
import { Divider } from 'antd';
const URL = process.env.REACT_APP_URL;

const ROTHP = () => {
  const [datos, setDatos] = useState([]);
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));


  useEffect(() => {
    // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
    const url = `${URL}/CTT/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}`;

    axios.get(url)
      .then((response) => {
        setDatos(response.data);

      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [fecha_creacion_inicio, fecha_creacion_fin]);

  return (
    <div className="row mb-3">
      <div className="row mb-3">
      <Divider style={{ color: '#1d39c4'}}>Temperatura Tunel</Divider>
        <div className="col-md-3">
          <label htmlFor="fecha" className="form-label">Fecha 1</label>
          <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="fecha" className="form-label">Fecha 2</label>
          <input className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha2(e.target.value)} />
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <PdfROTHP datos={datos} />
          <ExcelROTHP datos={datos} />
        </div>
      </div>

      <table className="table text-center" style={{ lineHeight: '1.5' }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Turno</th>
            <th scope="col">Código de Inicio</th>
            <th scope="col">Código Final</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(datos) && datos.map((fila, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <th>
                <Detalle
                  nombretabla={fila.tabla}
                  id={fila.id}
                  codigoInicio={fila.codigoInicio}
                  codigoFinal={fila.codigoFinal}
                  cantidad={fila.cantidad}
                />
              </th>
              <td>{formatFecha(fila.fecha_creacion)}</td>
              <td>{fila.turnos}</td>
              <td>{fila.codigoInicio}</td>
              <td>{fila.codigoFinal}</td>
              <td>{fila.cantidad}</td>
              <td>{fila.estadoOrden}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ROTHP;
