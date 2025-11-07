import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import Get_etapas_barro from "../../services/Get_etapas_barro";
import Table from "../UI/Table";
import { formatFecha } from "../utilidades/FormatearFecta";
import PaginasBarro from "../UI/PaginasBarro";
import CambioAHomogenización from "./botonOT/CambioAHomogenización";
import CrearOT from "./botonOT/Crear_OT";
import { useAbility } from "../AbilityContext";
const TablaBarro = () => {
  const ability=useAbility()
  const [datosApi, setdatosApi] = useState([]);
  const [id_creador, setid_creador] = useState("");

  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador"));
  }, []);

  const id_fase_aprobacion = 4;
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
    "Fecha de Pulverizado",
    "Sacos",
    "Libras",
    "Sacos",
    "Estado",
  ];

  const nameSelector = "Liberar para producción";
  const valueSelector = 5;
  const encabezados = "Pulverizado";

  const bodyRows = datosApi.map((row) => [
    row.codigo_lote || "",
    formatFecha(row.fecha) || "",
    formatFecha(row.fechaHomogenizacion) || "",
    row.cant_sacos || "",
    row.cant_lib || "",
    ((ability && (ability.can('create', 'BotonOT') || ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (
      <CrearOT datosApi={row} encabezados={encabezados} />
    ) : <button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
      Sin Permisos
    </button>),
     ((ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (
    <CambioAHomogenización
      datosApi={row}
      id_creador={id_creador}
      nameSelector={nameSelector}
      valueSelector={valueSelector}
      encabezados={encabezados}
    />
     ) : <button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
       Sin Permisos
     </button>)
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
          padding: "32px",
          overflowY: "auto",
          backgroundColor: "#fff",
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
          Pulverizado
        </Divider>

        <div style={{ marginTop: "1rem" }}>
          <Table encabezadosTab={encabezadosTab} datosTab={bodyRows} />
        </div>
      </div>
    </div>
  );
};

export default TablaBarro;
