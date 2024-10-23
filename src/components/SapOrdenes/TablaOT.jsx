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
import TablaControlC from './TablaControlC';
import { Divider, Button } from 'antd';
const URL = process.env.REACT_APP_URL;

const TablaOT = ({ darkMode }) => {
  const ability = useAbility();
  const [estOT, setEstot] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [nombreRol, setNombrerol] = useState(localStorage.getItem('id_rol') || '');
  
  useEffect(() => {
    if (!nombreRol) {
      setNombrerol(localStorage.getItem('id_rol'));
    }
  }, [nombreRol]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get(`${URL}/TablaOT`);
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
    <div className={`table-container ${darkMode ? 'dark-mode' : ''}`}>
      <Divider style={{ color: '#f5222d' }}>Órdenes de Trabajo</Divider>
      <div className="mb-3">
      {(ability && ability.can('manage', 'all')|| ability.can('manage', 'Supervisor'))?(

        <BotonOT darkMode={darkMode} />
      ):<Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
      Crear OT
    </Button>}
      </div>

      <div style={{ overflowX: "auto" }} className="table-responsive-sm">
        {error && <p>{error}</p>}
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th scope="col" style={{ width: "0%" }}></th>
              <th scope="col" style={{ width: "1%" }}>
                <i className="bi bi-calendar"></i>
              </th>
              <th scope="col" style={{ width: "1%" }}>
                Orden
              </th>
              <th scope="col" style={{ width: "1%" }}>
                Área
              </th>
              <th scope="col" style={{ width: "0%" }}>
                Crear OT
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
                    darkMode={darkMode}
                    encabezado={OTDats.encabezado}
                    EncName={OTDats.EncName}
                    fecha_creacion={OTDats.fecha_creacion}
                    id={OTDats.id}
                  />
                </th>
                <td>{formatFecha(OTDats.fecha_creacion)}</td>
                <td>{`${OTDats.encabezado}-${OTDats.id}`}</td>
                <td>{OTDats.EncName}</td>
                <td>
                {(ability && (ability.can('create', 'BotonOT') || ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (

                  <CrearOT
                    darkMode={darkMode}
                    encabezado={OTDats.encabezado}
                    EncName={OTDats.EncName}
                    fecha_creacion={OTDats.fecha_creacion}
                    id={OTDats.id}
                  />
                  ):<Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
                  OT
                </Button>}
                </td>
                <td>
                  
  {(ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (
    <ButtnEst
    disabled
      darkMode={darkMode}
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
      <Divider style={{ color: '#f5222d' }}>Horneados</Divider>
      <TablaControlC darkMode={darkMode} />
    </div>
  );
};

export default TablaOT;
