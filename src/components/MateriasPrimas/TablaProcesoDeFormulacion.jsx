import React, { useEffect, useState } from "react";
import Detalle from "../ordenesTrabajo/botonOT/Detalle";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearOT from "./botonOT/Crear_OT";
import EstadoProceso from "../ordenesTrabajo/botonOT/EstadoProc";
import Get_TablaProcesoDeFormulacion from "../../services/Get_TablaProcesoDeFormulacion";
import Table from "../UI/Table";
import PaginasAserrin from "../UI/PaginasAserrin";
import { Divider } from "antd";

const TablaFormulacionAserrin = () => {
  const [datosApi, setdatosApi] = useState([]);
  const [id_creador, setid_creador] = useState("");
  const materiaPrim = "Aserrin";
console.log('datosApi',datosApi)
  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador"));
  }, []);

  const lotesAprobados = async () => {
    try {
      const response = await Get_TablaProcesoDeFormulacion({ materiaPrim });
      console.log("formulacion:", response.data);
      //  Aquí estaba el error
      setdatosApi(response || []); // <-- no guardes el response entero
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    lotesAprobados();
  }, []);

  const encabezadosTab = [
    "Detalle",
    "Fecha",
    "Correlativo",
    "Orden",
    "Área",
    "Crear Registro",
    "Estado de la orden",
  ];

  const bodyRows =
    Array.isArray(datosApi) &&
    datosApi.map((rows) => [
      <Detalle encabezado="otfm" datosApi={rows} />,
      formatFecha(rows.fecha_creacion) || "",
      rows.correlativo || "",
      `${rows.encabezado}-${rows.id}` || "",
      rows.EncName || "",
      <CrearOT datosApi={rows} />,
      <EstadoProceso id={rows.id} encabezado="otfm" />,
    ]);

  const pagina = "3";

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
          Etapas del Aserrín
        </Divider>
        <div style={{ flexGrow: 1, overflowY: "auto" }}>
          <PaginasAserrin activeTabKey={pagina} />
        </div>
      </div>

      {/* Contenido principal */}
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
          Lotes de Aserrín - Formulación
        </Divider>

        <div style={{ marginBottom: "1rem" }}>
          <CrearOT datosApi="OTFM" encabezados="OTFM" />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <Table encabezadosTab={encabezadosTab} datosTab={bodyRows} />
        </div>
      </div>
    </div>
  );
};

export default TablaFormulacionAserrin;
