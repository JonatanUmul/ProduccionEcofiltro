import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import Get_etapas_barro from "../../services/Get_etapas_barro";
import Table from "../UI/Table";
import { formatFecha } from "../utilidades/FormatearFecta";
import EstadoProc from "./botonOT/EstadoProceso";
import PaginasBarro from "../UI/PaginasBarro";

const TablaBarro = () => {
  const [datosApi, setdatosApi] = useState([]);
  const id_fase_aprobacion = 5;
  const estado_proceso = 2;

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await Get_etapas_barro({
          id_fase_aprobacion,
          estado_proceso,
        });
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
    "Cerrar Orden",
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
    <EstadoProc id={row.ID_muestra} encabezado="registroMuestra" />,
  ]);

  const pagina = "4";

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "calc(100vh - 120px)",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      {/* Panel lateral */}
      <div
        style={{
          minWidth: "230px",
          maxWidth: "230px",
          borderRight: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
          padding: "16px 8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Divider
          orientation="left"
          style={{
            color: "blue",
            margin: "0 0 8px 16px",
            fontWeight: "bold",
          }}
        >
          Etapas del Barro
        </Divider>
        <div style={{ flexGrow: 1, overflowY: "auto" }}>
          <PaginasBarro activeTabKey={pagina} />
        </div>
      </div>

      {/* Contenido principal */}
      <div
        style={{
          flexGrow: 1,
          padding: "24px 32px",
          overflowY: "auto",
          backgroundColor: "#fff",
        }}
      >
        <Divider
          orientation="left"
          style={{ color: "#f5222d", fontWeight: "bold" }}
        >
          Lotes Para Producción
        </Divider>

        <div style={{ marginTop: "1rem" }}>
          <Table encabezadosTab={encabezadosTab} datosTab={bodyRows} />
        </div>
      </div>
    </div>
  );
};

export default TablaBarro;
