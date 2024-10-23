import React, { useEffect, useState } from "react";
import BotonOT from "./botonOT/BotonOT";
import ButtnEst from "./botonOT/EstadoProc";
import axios from "axios";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearOT from "./botonOT/Crear_OT";
import Detalle from "./botonOT/Detalle";
import '../maquinaria/TablaEstilos.css';
import { useAbility } from '../AbilityContext';
import ReactPaginate from 'react-paginate';
import { Divider, Button } from 'antd';

const URL = process.env.REACT_APP_URL;

const TablaOT = () => {
  const ability = useAbility();
  const [estOT, setEstot] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [nombreRol, setNombrerol] = useState('');
console.log('Datos de lab',estOT)
  useEffect(() => {
    setNombrerol(localStorage.getItem('rol'));
  }, []);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get(`${URL}/TablaLab`);
        setEstot(response.data);
      } catch (error) {
        setError("No hay órdenes de trabajo activas en este momento.");
        console.error("Error al obtener los datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  const selectForm = (id) => {
    // Aquí puedes manejar la selección del formulario
  };

  const handleClickButton = (id, encabezado) => {
    console.log("ID:", id);
    console.log("Encabezado:", encabezado);
  };

  const puedeGestionar = ability.can('manage', 'BotonOT');

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = estOT.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(estOT.length / itemsPerPage);

  return (
    <div>
      <Divider style={{ color: '#f5222d' }}>Ordenes de trabajo formulación</Divider>
        {/* <div className="mb-3">
          <BotonOT />
        </div> */}
  
      
      <div style={{ overflowX: "auto" }} className="table-responsive-sm">
        {error && <p>{error}</p>}
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col" style={{ width: "0%" }}></th>
              <th scope="col" style={{ width: "1%" }}>
                <i className="bi bi-calendar"></i>
              </th>
              <th scope="col" style={{ width: "1%" }}>
              Modelo
            </th>
              <th scope="col" style={{ width: "1%" }}>
                Orden
              </th>
              <th scope="col" style={{ width: "1%" }}>
                Inicio
              </th>
              <th scope="col" style={{ width: "1%" }}>
              Fin
            </th>
            <th scope="col" style={{ width: "1%" }}>
            Producido
          </th>
          <th scope="col" style={{ width: "1%" }}>
          Lb Aserrín
        </th>
        <th scope="col" style={{ width: "1%" }}>
        Peso total
      </th>
        <th scope="col" style={{ width: "1%" }}>
          Aserradero
        </th>
              <th scope="col" style={{ width: "0%" }}>
                Aserrín
              </th>
              <th scope="col" style={{ width: "0%" }}>
                Barro
              </th>
              <th scope="col" style={{ width: "0%" }}>
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((OTDats, index) => (
              <tr key={index} onClick={() => selectForm(OTDats.encabezado)}>
                <th>
               <Detalle
                    encabezado={OTDats.encabezado}
                    EncName={OTDats.EncName}
                    fecha_creacion={OTDats.fecha_creacion}
                    id={OTDats.id}
                  /> 
                </th>
                <td>{formatFecha(OTDats.fecha_creacion)}</td>
                <td>{OTDats.modelo}</td>
                <td>{OTDats.encabezado}-{OTDats.id}</td>
                <td>{OTDats.codigoInicio}</td>
                <td>{OTDats.codigoFinal}</td>
                <td>{OTDats.producido}</td>

                <td>{OTDats.LibrasAserrin}/{OTDats.librasAserrin2}</td>
                <td>{OTDats.formulaTot}</td>
                <td>{OTDats.nombre_aserradero}/{OTDats.nombre_aserradero2}</td>
               
                <td>
                {(ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (
 
                  <CrearOT
                    encabezado="otdmp"
                    EncName={OTDats.EncName}
                    fecha_creacion={OTDats.fecha_creacion}
                    id={OTDats.id}
                  />
                ) : <Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
                OT
              </Button>}
              
                </td>
                <td>
                {(ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (

                  <CrearOT
                    encabezado="otdmpb"
                    EncName={OTDats.EncName}
                    fecha_creacion={OTDats.fecha_creacion}
                    id={OTDats.id}
                  />   ) : <Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
                  OT
                </Button>}
                </td>
                <td>
                {(ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (

                  <ButtnEst
                    handleClickButton={handleClickButton}
                    id={OTDats.id}
                    encabezado={OTDats.encabezado}
                  />
                ) : <Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
                Estado
              </Button>}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default TablaOT;
