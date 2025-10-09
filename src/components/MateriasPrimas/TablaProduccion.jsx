import React, { useEffect, useState } from "react";
import { Divider, Row, Col, Tabs } from "antd";
import Get_etapas_barro from "../../services/Get_etapas_barro";
import Table from "../UI/Table";
import { formatFecha } from "../utilidades/FormatearFecta";
import EstadoProc from "./botonOT/EstadoProceso";
import PaginasBarro from "../UI/PaginasBarro";
const TablaBarro = () => {
  const [datosApi, setdatosApi] = useState([]);
console.log('barro liberado',datosApi)
  const id_fase_aprobacion=5
  const estado_proceso=2
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await  Get_etapas_barro({id_fase_aprobacion,estado_proceso});
        setdatosApi(response.data.rows);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);



  const encabezadosTab = [
    "Código Lote",
    "Fecha de la muestra",
    "Fecha de la Homogenización",
    "Limite Líquido",
    "Limite Plástico",
    "Índice Plástico",
    "% Arcilla",
    "% Arena",
    "% Limo",
    "Cerrar Orden"
  ];

  const bodyRows = datosApi.map((row) => [
    row.codigo_lote || "",
    formatFecha(row.fecha) || "",
    formatFecha(row.fechaHomogenizacion) || "",
    row.limite_liquido || "",
    row.limite_plastico || "",
    row.indice_plastico || "",
    row.arcilla || "",
    row.arena || "",
    row.limo || "", 
    <EstadoProc id={row.ID_muestra} encabezado='registroMuestra'/>
  ]);
  const pagina = "4";
  return (
    <div style={{ width: "100%", height: "100vh", padding: "1rem" }}>
      <Row style={{ height: "100%" }}>
        {/* Tabs laterales */}
      
        <Col span={3} style={{ borderRight: "1px solid #f0f0f0" }}>
        <Divider orientation="left" style={{ color: "blue" }}>
            Etapas del Barro
          </Divider>
          <PaginasBarro activeTabKey={pagina} />
        </Col>

        {/* Tabla central */}
        <Col span={20} style={{ paddingLeft: "2rem" }}>
        <Divider orientation="left" style={{ color: "#f5222d" }}>
            Lotes Para Producción
          </Divider>
          <div style={{ marginTop: "1rem" }}>
            <Table encabezadosTab={encabezadosTab} datosTab={bodyRows} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TablaBarro;






