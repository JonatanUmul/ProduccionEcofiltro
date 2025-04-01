import React, { useEffect, useState } from "react";
import BotonOT from "./botonOT/BotonOT";
import ButtnEst from "./botonOT/EstadoProc";
import axios from "axios";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearOT from "./botonOT/Crear_OT";
import Detalle from "./botonOT/Detalle";

import ReactPaginate from "react-paginate";
import { Divider, message } from "antd";

const TablaOT = ({ darkMode }) => {
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [nombreRol, setNombrerol] = useState("");

  const [resultado, setResultado] = useState([]);

  console.log("Datos de Odata", resultado);

  useEffect(() => {
    setNombrerol(localStorage.getItem("rol"));
  }, []);

  const connectSL = async () => {
    
    let serv = "https://sapsl.eco-aplicaciones.com:50000";
    const companyDB = "SBO_ECOFILTRO_RIQRA";
    const userName = "manager";
    const password = "2023**.";

    const jData = { UserName: userName, Password: password, CompanyDB: companyDB };

    try {
      const response = await axios.post(`${serv}/b1s/v1/Login`, jData);
      console.log("Respuesta del servidor", response);

      const sessionId = response.data.SessionId;
      setSessionId(sessionId);
      setConnected(true);

      return sessionId; // Retorna el SessionId para usarlo en fetchData()
    } catch (error) {
      setError("Failed to connect");
      console.error("Error al conectar con SAP:", error);
      message.error("No se pudo conectar con SAP.");
      return null;
    }
  };

  const fetchData = async (sessionId) => {
    if (!sessionId) {
      setError("No hay sesión activa en SAP.");
      return;
    }

    let serv = "https://sapsl.eco-aplicaciones.com:50000";
    try {
      const response = await axios.get(
        `${serv}/b1s/v1/ProductionOrders?$filter=(ProductionOrderStatus eq 'boposPlanned' or ProductionOrderStatus eq 'boposReleased') and (substringof('PP500', ItemNo) or substringof('MP1000', ItemNo))`,
        {
          headers: {
            "Content-Type": "application/json",
            "Cookie": `B1SESSION=${sessionId}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
          // withCredentials: true,
        }
      );

      setResultado(response.data.value);
      message.success("Datos obtenidos de SAP.");
    } catch (error) {
      setError("Error al hacer la solicitud");
      console.error("Error en fetchData:", error);
      message.error("Error al obtener datos de SAP.");
    }
  };

  useEffect(() => {
    const iniciarConexion = async () => {
      const session = await connectSL();
      if (session) fetchData(session);
    };

    iniciarConexion();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = resultado.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(resultado.length / itemsPerPage);

  return (
    <div className={`table-container ${darkMode ? "dark-mode" : ""}`}>
      <Divider style={{ color: "#f5222d" }}>Ordenes de Trabajo</Divider>
      <BotonOT />
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
