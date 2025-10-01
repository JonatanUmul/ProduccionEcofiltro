import React, { useEffect, useState } from "react";
// import Detalle from "./botonOT/Detalle";
import Detalle from "../ordenesTrabajo/botonOT/Detalle";
import { formatFecha } from "../utilidades/FormatearFecta";
import BotonOT from "./botonOT/BotonOT";
import CrearOT from "./botonOT/Crear_OT";
import CrearAS from './botonOT/Crear_OT';
import { useAbility } from "../AbilityContext";
import { Divider, Row, Col } from "antd";
import CambioAHomogenización from "./botonOT/CambioAHomogenización";
// import EstadoProceso from "./botonOT/EstadoProceso";
import EstadoProceso from "../ordenesTrabajo/botonOT/EstadoProc";
import EstadoProcesoAserrin from "./botonOT/EstadoProcesoAserrin";
import Get_OT_mezclado_aserrin from "../../services/Get_OT_mezclado_aserrin";
import Get_TablaProcesoDeFormulacion from "../../services/Get_TablaProcesoDeFormulacion";
import Table from "../UI/Table";
import PaginasAserrin from "../UI/PaginasAserrin";
import { useLocation } from "react-router-dom";
const TablaBarro = () => {
  const [datosApi, setdatosApi] = useState([]);
  const [id_creador, setid_creador] = useState("");
  const location=useLocation()
  const materiaPrim= 'Aserrin'
console.log('materiaPrim',materiaPrim)
  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador"));
  }, []);

 
  const lotesAprobados = async () => {
 
    try {
      const response =await Get_TablaProcesoDeFormulacion({materiaPrim});
      console.log(response.data)
      setdatosApi(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    lotesAprobados();
  },[]);

  const Tabla = "ot_mezclado_aserrin";
  
  const encabezadosTab = [
    "Detalle",
    "Fecha",
    "Correlativo",
    "Orden",
    "Área",
    "Crear Registro",
    "Estado de la orden",

  ];

  const nameSelector="Aprobar paso a pulverización"
  const valueSelector=4
  const bodyRows =Array.isArray(datosApi)&&datosApi.map((rows) => [
    <Detalle encabezado='otfm' datosApi={rows} />,
    formatFecha(rows.fecha_creacion) || "",
    rows.correlativo,
    rows.encabezado+'-'+rows.id || "",
    rows.EncName || "",
    <CrearOT  datosApi={rows}/>,
    <EstadoProceso id={rows.id} encabezado='otfm'/>
  ]);

  const pagina = "3";

  return (
    <div style={{ width: "100%", height: "100vh", padding: "1rem" }}>
      <Row style={{ height: "100%" }}>
        <Col span={3} style={{ borderRight: "1px solid #f0f0f0" }}>
          {materiaPrim==='Barro'?  <Divider orientation="left" style={{ color: "blue" }}>
          Etapas del Barro
          </Divider>:
           <Divider orientation="left" style={{ color: "blue" }}>
           Etapas del Aserrin
           </Divider>}
         
          <PaginasAserrin activeTabKey={pagina} />
        </Col>
        <Col span={20} style={{ paddingLeft: "2rem" }}>
        {materiaPrim==='Barro'? 
          <Divider orientation="left" style={{ color: "#f5222d" }}>
            Muestras de Barro Aprobados
          </Divider>
          :
          <Divider orientation="left" style={{ color: "#f5222d" }}>
          Lotes de Aserrín
        </Divider>
          }
         
          <CrearOT datosApi='OTFM'  encabezados='OTFM' />,
          
          <div style={{ marginTop: "1rem" }}>
            <Table encabezadosTab={encabezadosTab} datosTab={bodyRows} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TablaBarro;
