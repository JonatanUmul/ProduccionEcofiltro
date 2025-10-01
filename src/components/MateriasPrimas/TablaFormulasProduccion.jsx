import React, { useEffect, useState } from "react";
// import Detalle from "./botonOT/Detalle";
import Detalle from "../ordenesTrabajo/botonOT/Detalle";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearOT from "./botonOT/Crear_OT";
import { useAbility } from "../AbilityContext";
import { Divider, Row, Col } from "antd";
// import EstadoProceso from "./botonOT/EstadoProceso";
import EstadoProceso from "../ordenesTrabajo/botonOT/EstadoProc";
import EstadoProcesoAserrin from "./botonOT/EstadoProcesoAserrin";
import Get_TablaProcesoDeFormulacion from "../../services/Get_TablaProcesoDeFormulacion";
import Table from "../UI/Table";
import PaginasAserrin from "../UI/PaginasAserrin";
const TablaBarro = () => {
  const [datosApi, setdatosApi] = useState([]);
  const [id_creador, setid_creador] = useState("");
  const materiaPrim= 'InventarioOtfmProduccion'
console.log('datosApi',datosApi)
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
    "Bolsas: Total | Disponible",
     "Disponible(lb) | Total consumido(lb)",
    "Estado",

  ];

  const nameSelector="Aprobar paso a pulverización"
  const valueSelector=4
  const bodyRows =Array.isArray(datosApi)&&datosApi.map((rows) => [
    <Detalle encabezado='otfm' datosApi={rows} />,
    formatFecha(rows.fecha_creacion) || "",
    rows.correlativo,
    rows.encabezado+'-'+rows.id || "",
  rows.total_bolsas +' | '+ rows.bolsas_disponibles,
  rows.LibrasDisponibles+"(lb)" + ' | '+  rows.total_libras+"(lb)",
    // <CrearOT  datosApi={rows}/>,
    <EstadoProceso id={rows.id} encabezado='TablaFormulasProduccion'/>
  ]);

  const pagina = "4";

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
