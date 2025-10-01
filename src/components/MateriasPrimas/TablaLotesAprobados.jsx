import React, { useEffect, useState } from "react";
import Detalle from "./botonOT/Detalle";
import { formatFecha } from "../utilidades/FormatearFecta";
import BotonOT from "./botonOT/BotonOT";
import CrearOT from "./botonOT/Crear_OT";
import { useAbility } from "../AbilityContext";
import { Divider, Row, Col } from "antd";
import CambioAHomogenización from "./botonOT/CambioAHomogenización";
import Get_etapas_barro from "../../services/Get_etapas_barro";
import Table from "../UI/Table";
import PaginasBarro from "../UI/PaginasBarro";
import PaginasAserrin from "../UI/PaginasAserrin";
import { useLocation } from "react-router-dom";
const TablaBarro = () => {
  const [datosApi, setdatosApi] = useState([]);
  const [id_creador, setid_creador] = useState("");
  const location=useLocation()
  const materiaPrim= location?.state?.materiaPrima
console.log('materiaPrim',materiaPrim)
  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador"));
  }, []);

  const lotesAprobados = async () => {
    const id_fase_aprobacion= materiaPrim==='Barro' ? 2 : 6
    const estado_proceso=2
    try {
      const response = await Get_etapas_barro({id_fase_aprobacion,estado_proceso});
      setdatosApi(response.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    lotesAprobados();
  }, []);

  const Tabla = "muestrasAserrin";

  const encabezadosTab = [
    "Código Lote",
    "Fecha de la muestra",
    "Limite Liquido",
    "Limite Plastico",
    "Indice Plastico",
    "%Arcilla",
    "%Arena",
    "%Limo",
    // "Crear OT",
    // "Aserrín",
    "Estado",
  ];

  const nameSelector="Aprobar paso a pulverización"
  const valueSelector=4
  const bodyRows =Array.isArray(datosApi)&&datosApi.map((rows) => [
    rows.codigo_lote || "",
    formatFecha(rows.fecha) || "",
    rows.limite_liquido || "",
    rows.limite_plastico || "",
    rows.indice_plastico || "",
    rows.arcilla || "",
    rows.arena || "",
    rows.arena || "",
    // <CrearOT datosApi={rows} Tabla={Tabla} />,
    <CambioAHomogenización datosApi={rows} id_creador={id_creador} nameSelector={nameSelector} valueSelector={valueSelector} />,
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
         
           {materiaPrim=='Barro' ? <PaginasBarro activeTabKey={pagina} />: <PaginasAserrin activeTabKey={pagina} />}  
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
          
          <div style={{ marginTop: "1rem" }}>
            <Table encabezadosTab={encabezadosTab} datosTab={bodyRows} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TablaBarro;
