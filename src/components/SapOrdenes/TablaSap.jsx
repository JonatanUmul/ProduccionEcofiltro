import React, { useEffect, useState } from "react";
import BotonOT from "./botonOT/BotonOT";
import ButtnEst from "./botonOT/EstadoProc";
import axios from "axios";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearOT from "./botonOT/Crear_OT";
import Detalle from "./botonOT/Detalle";

import ReactPaginate from "react-paginate";
import { Divider, message } from "antd";
const URL = process.env.REACT_APP_URL;

const TablaOT = ({ darkMode }) => {
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [nombreRol, setNombrerol] = useState("");
  const [loginSL, setLoginSL]=useState([])
  const [resultado, setResultado] = useState([]);
console.log('Login SL',loginSL)
  
  const IDSesion=loginSL.sessionId
localStorage.setItem('SesionSL',IDSesion)

  

  useEffect(() => {
    const username = 'manager';
    const password = '2023**.';
  
    Promise.all([
      axios.post(`${URL}/LoginSAP`, { username, password }),
      axios.get(`${URL}/OrdenesSap`)
    ])
      .then(([loginRes, ordenesRes]) => {
        setLoginSL(loginRes.data);
        setResultado(ordenesRes.data.value || []);
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
        setResultado([]);
      });
  }, [URL]);
  


  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };



  const offset = currentPage * itemsPerPage;
  const currentPageData = resultado.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(resultado.length / itemsPerPage);

  return (
    <div className={`table-container ${darkMode ? "dark-mode" : ""}`}>
      <Divider style={{ color: "#f5222d" }}>Ordenes de Trabajo</Divider>
      <BotonOT/>
      <div style={{ overflowX: "auto" }} className="table-responsive-sm mb-4 text-center">
        {error && <p className="text-danger">{error}</p>}
        <table className={`table table-striped table-hover text-center ${darkMode ? "table-dark" : ""}`}>
          <thead>
            <tr>
              <th scope="col" style={{ width: "1%" }}>Fecha</th>
              <th scope="col" style={{ width: "1%" }}>Estado</th>
              <th scope="col" style={{ width: "1%" }}>Cantidad Planificada</th>
              <th scope="col" style={{ width: "1%" }}>Numero de Orden</th>
              <th scope="col" style={{ width: "1%" }}>Producto</th>
              <th scope="col" style={{ width: "1%" }}>Mano de Obra</th>
              <th scope="col" style={{ width: "1%" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((OTDats, index) => (
              <tr key={index}>
                <td>{formatFecha(OTDats.CreationDate)}</td>
                <td>{OTDats.ProductionOrderStatus !== "boposPlanned" ? "Liberado" : "Planificado"}</td>
                <td>{OTDats.PlannedQuantity}</td>
                <td>{OTDats.ProductDescription}</td>
                <td>{OTDats.DocumentNumber}</td>
                <td>
                  <CrearOT resultado={OTDats.DocumentNumber} />
                </td>
                <td>
                  <ButtnEst darkMode={darkMode} handleClickButton={(id, encabezado) => console.log(id, encabezado)} id={OTDats.id} encabezado={OTDats.encabezado} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default TablaOT;
