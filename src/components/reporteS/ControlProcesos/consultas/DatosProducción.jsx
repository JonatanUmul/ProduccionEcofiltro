import React, { useState, useEffect } from 'react';
import { Button, Drawer, Space } from 'antd';
import { BsArrowRight } from "react-icons/bs";
import axios from 'axios';
import TasaFiltracion from './TasaFiltracion';
import TablaCodigos from './tablaCodigos'
import { formatFecha } from '../../../utilidades/FormatearFecta';
const URL = process.env.REACT_APP_URL;

const DatosProduccion = ({ datos }) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [CodigoInicio] = useState(datos.codigoInicio);
  const [CodigoFIN] = useState(datos.codigoFinal);
  const [modelo] = useState(datos.nombre_ufmodelo);

  const showLargeDrawer = () => {
    setSize('large');
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  console.log('datos', datos.id);
  const [data, setData] = useState([]);
  const id = datos.id;

  useEffect(() => {
    const url = `${URL}/TablaPorCodigos/${'null'}/${'null'}/${'null'}/${id || 'null'}`;

    axios.get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [id]);

  const [produccion, setProduccion] = useState(0);
  const [aprobados, setAprobados] = useState(0);
  const [altos, setAltos] = useState(0);
  const [Bajos, setBajos] = useState(0);
  const [rajado, setRajado] = useState(0);
  const [ahumado, setAhumado] = useState(0);
  const [porcentageAprobado, setPorcentageAprobados] = useState(0);
  const [rajadoCrudo, setRajadoCrudo] = useState(0);

  useEffect(() => {
    setProduccion(data.filter(dato => dato.estadouf).length);
    setAprobados(data.filter(dato => dato.estadouf === 'OK').length);
    setBajos(data.filter(dato => dato.estadouf === 'Bajo').length);
    setAltos(data.filter(dato => dato.estadouf === 'Alto').length);
    setRajado(data.filter(dato => dato.estadouf === 'Rajado').length);
    setAhumado(data.filter(dato => dato.estadouf === 'Ahumado').length);
    setRajadoCrudo(data.filter(dato => dato.estadoCrudo === 'Rajado').length);
    setPorcentageAprobados((aprobados / produccion) * 100);
  }, [data, aprobados, produccion]);

  // const horneados=datos[0].fechaHorneado.length;

  return (
    <>
      <Space>
        <a onClick={showLargeDrawer}>
          <BsArrowRight />
        </a>
      </Space>
      <Drawer
        title={`Producción`}
        placement="right"
        size={size}
        onClose={onClose}
        maskClosable={false}  // Esto desactiva el cierre al hacer clic fuera
        open={open}
        style={{ backgroundColor: '#000', color: '#fff' }}
        bodyStyle={{ backgroundColor: '#333', color: '#fff' }}
        headerStyle={{ backgroundColor: '#000', color: '#fff' }}
        extra={
          <Button onClick={onClose} style={{ color: '#fff' }}>
            Cerrar
          </Button>
        }
      >
        <div className="alert alert-dismissible fade show" role="alert">
          <p className="mb-1 fs-6">Codigos: <strong>{CodigoInicio} / {CodigoFIN}</strong></p>
          <p className="mb-1 fs-6">Modelo: <strong>{modelo}</strong></p>
          <p className="mb-0 fs-6">Turno: <strong>{datos.nombre_turno}</strong></p>
        </div>

        <div className="mb-4">
          <table className="table table-dark table-sm text-center fs-6">
            <thead>
              <tr>
                <th scope="col">Producido</th>
                <th scope="col">Aserradero</th>
                <th scope="col">Libras</th>
                <th scope="col">Cernido</th>
                <th scope="col">Formulas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{datos.producido}</td>
                <td>{datos.aserradero1}{datos.aserradero2 ? `/${datos.aserradero2}` : ''}</td>
                <td>{datos.librasAserrin}{datos.librasAserrin2 ? `/${datos.librasAserrin2}` : ''}</td>
                <td>{datos.cernidodetalle}{datos.cernidodetalle2 ? `/${datos.cernidodetalle2}` : ''}</td>
                <td>{datos.formulas}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col">
              <ul className="list-group dark fs-6">
                <h5>Barro</h5>
                <li className="list-group-item">Indice Plastico: <strong>{data.length > 0 && data[0].iplastico != null ? data[0].iplastico : 'Sin Datos'}</strong></li>
                <li className="list-group-item">Cantidad Arcilla: <strong>{data.length > 0 && data[0].carcilla != null ? data[0].carcilla : 'Sin Datos'}</strong></li>
                <li className="list-group-item">Cantidad de Limo: <strong>{data.length > 0 && data[0].climo != null ? data[0].climo : 'Sin Datos'}</strong></li>
                <li className="list-group-item">Cantidad de Arena: <strong>{data.length > 0 && data[0].carena != null ? data[0].carena : 'Sin Datos'}</strong></li>
                <li className="list-group-item">Humedad de Barro: <strong>{data.length > 0 && data[0].hbarro != null ? data[0].hbarro : 'Sin Datos'}</strong></li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-group dark fs-6">
                <h5>Aserrín</h5>
                <li className="list-group-item">Libras de aserrin: <strong>{data.length > 0 && data[0].lbaserrin != null ? data[0].iplastico : 'Sin Datos'}</strong></li>
                <li className="list-group-item">Libras de aserrin 2: <strong>{data.length > 0 && data[0].lbaserrin2 != null ? data[0].carcilla : 'Sin Datos'}</strong></li>
                <li className="list-group-item">Granulometria: <strong>{data.length > 0 && data[0].granulometria != null ? data[0].granulometria : 'Sin Datos'}</strong></li>              </ul>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <table className="table table-dark table-sm text-center fs-6">
            <thead>
              <tr>
                <th scope="col">Producido</th>
                <th scope="col">Rajado Crudo</th>
                <th scope="col">Aprobados</th>
                <th scope="col">Altos</th>
                <th scope="col">Bajos</th>
                <th scope="col">Rajados</th>
                <th scope="col">Ahumado</th>
                <th scope="col">%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{produccion}</td>
                <td>{rajadoCrudo}</td>
                <td>{aprobados}</td>
                <td>{altos}</td>
                <td>{Bajos}</td>
                <td>{rajado}</td>
                <td>{ahumado}</td>
                <td>{porcentageAprobado}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
  
        <TablaCodigos datos={data}/>

          <TasaFiltracion data={data} />
        </div>
      </Drawer>
    </>
  );
};

export default DatosProduccion;
