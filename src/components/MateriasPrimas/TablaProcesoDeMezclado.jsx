import React, { useEffect, useState } from "react";
import Detalle from "./botonOT/Detalle";
import { formatFecha } from "../utilidades/FormatearFecta";
import BotonOT from "./botonOT/BotonOT";
import CrearOT from "./botonOT/Crear_OT";
import CrearAS from './botonOT/Crear_OT';
import { useAbility } from "../AbilityContext";
import { Divider, Row, Col } from "antd";
import CambioAHomogenización from "./botonOT/CambioAHomogenización";
import EstadoProceso from "./botonOT/EstadoProceso";
import EstadoProcesoAserrin from "./botonOT/EstadoProcesoAserrin";
import Get_OT_mezclado_aserrin from "../../services/Get_OT_mezclado_aserrin";
import Table from "../UI/Table";
import PaginasAserrin from "../UI/PaginasAserrin";
import { useLocation } from "react-router-dom";
const TablaBarro = () => {
  const [datosApi, setdatosApi] = useState([]);
  const [id_creador, setid_creador] = useState("");
  const location=useLocation()
  const materiaPrim= location?.state?.materiaPrima
console.log('datosApi',datosApi)
  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador"));
  }, []);

 
  const lotesAprobados = async () => {
 
    try {
      const response =await Get_OT_mezclado_aserrin();
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
    // "Orden",
    "Correlativo",
    "Área",
    "Estado del Proceso",
    "Datos del Aserrín/Laboratorio",
    "Crear registro de sacos/Producción",
    "Estado Mezclado",
    "Estado de la orden",
 
  ];

  const nameSelector="Aprobar paso a pulverización"
  const valueSelector=4
  const bodyRows =Array.isArray(datosApi)&&datosApi.map((rows) => [
    <Detalle datosApi={rows} />,
    formatFecha(rows.fecha_creacion) || "",
    // 'Mezclado'+'-'+rows.id || "",
    rows.correlativo || "",
    rows.EncName || "",
    rows.aprobado || "",

    <CrearAS encabezados="Datos_Aserrin" datosApi={rows} type="button">Crear Registro</CrearAS>,

    <CrearOT  datosApi={rows} Tabla='dot_mezclado_aserrin' />,
    <EstadoProcesoAserrin telefono={rows.telefono} aprobado={rows.aprobado} correlativo={rows.correlativo} EncName={rows.EncName} id={rows.id} Tabla='EstadoProcesoMezclaAserrin'/>,
    <EstadoProceso id={rows.id} encabezado='ProcesoMezclado'/>
  ]);

  const pagina = "2";

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
         
          <CrearOT datosApi='dot_mezclado_aserrin'  encabezados='dot_mezclado_aserrin' />,
          
          <div style={{ marginTop: "1rem" }}>
            <Table encabezadosTab={encabezadosTab} datosTab={bodyRows} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TablaBarro;
