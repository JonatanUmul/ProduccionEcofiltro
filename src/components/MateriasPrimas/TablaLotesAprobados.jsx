import React, { useEffect, useState } from "react";
import Detalle from "./botonOT/Detalle";
import { formatFecha } from "../utilidades/FormatearFecta";
import BotonOT from "./botonOT/BotonOT";
import CrearOT from "./botonOT/Crear_OT";
import { useAbility } from "../AbilityContext";
import { Divider } from "antd";
import CambioAHomogenización from "./botonOT/CambioAHomogenización";
import Get_etapas_barro from "../../services/Get_etapas_barro";
import Table from "../UI/Table";
import PaginasBarro from "../UI/PaginasBarro";
import PaginasAserrin from "../UI/PaginasAserrin";
import { useLocation } from "react-router-dom";

const TablaBarro = () => {
    const ability = useAbility();
  const [datosApi, setdatosApi] = useState([]);
  const [id_creador, setid_creador] = useState("");
  const location = useLocation();
  const materiaPrim = location?.state?.materiaPrima;

  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador"));
  }, []);

  const lotesAprobados = async () => {
    const id_fase_aprobacion = materiaPrim === "Barro" ? 2 : 6;
    const estado_proceso = 2;
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

  useEffect(() => {
    lotesAprobados();
  }, [materiaPrim]);

  const Tabla = "muestrasAserrin";

  const encabezadosTab = [
    "Código Lote",
    "Fecha de la muestra",
    "Limite Líquido",
    "Limite Plástico",
    "Índice Plástico",
    "% Arcilla",
    "% Arena",
    "% Limo",
    "Estado",
  ];

  const nameSelector = "Aprobar paso a pulverización";
  const valueSelector = 4;

  const bodyRows =
    Array.isArray(datosApi) &&
    datosApi.map((rows) => [
      rows.codigo_lote || "",
      formatFecha(rows.fecha) || "",
      rows.limite_liquido || "",
      rows.limite_plastico || "",
      rows.indice_plastico || "",
      rows.arcilla || "",
      rows.arena || "",
      rows.limo || "",
       ((ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (

      <CambioAHomogenización
        datosApi={rows}
        id_creador={id_creador}
        nameSelector={nameSelector}
        valueSelector={valueSelector}
      />):<button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
                  Sin Permisos
                </button>)
    ]);

  const pagina = "2";

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
      {/* PANEL LATERAL */}
      <div
        style={{
          minWidth: 230,
          maxWidth: 230,
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
            fontWeight: "bold",
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          {materiaPrim === "Barro" ? "Etapas del Barro" : "Etapas del Aserrín"}
        </Divider>

        <div style={{ flexGrow: 1, overflowY: "auto" }}>
          {materiaPrim === "Barro" ? (
            <PaginasBarro activeTabKey={pagina} />
          ) : (
            <PaginasAserrin activeTabKey={pagina} />
          )}
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div
        style={{
          flexGrow: 1,
          padding: "32px",
          overflowY: "auto",
        }}
      >
        <Divider
          orientation="left"
          style={{
            color: "#f5222d",
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          {materiaPrim === "Barro"
            ? "Muestras de Barro Aprobadas"
            : "Lotes de Aserrín"}
        </Divider>

        <div style={{ marginTop: "1rem" }}>
          <Table encabezadosTab={encabezadosTab} datosTab={bodyRows} />
        </div>
      </div>
    </div>
  );
};

export default TablaBarro;
