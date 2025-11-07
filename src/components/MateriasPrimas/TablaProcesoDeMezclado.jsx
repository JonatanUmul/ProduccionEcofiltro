import React, { useEffect, useState } from "react";
import Detalle from "./botonOT/Detalle";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearOT from "./botonOT/Crear_OT";
import CrearAS from "./botonOT/Crear_OT";
import { Divider } from "antd";
import EstadoProceso from "./botonOT/EstadoProceso";
import EstadoProcesoAserrin from "./botonOT/EstadoProcesoAserrin";
import Get_OT_mezclado_aserrin from "../../services/Get_OT_mezclado_aserrin";
import Table from "../UI/Table";
import PaginasAserrin from "../UI/PaginasAserrin";
import { useLocation } from "react-router-dom";
import { useAbility } from "../AbilityContext";
const TablaAserrinMezclado = () => {
  const ability=useAbility()
  const [datosApi, setdatosApi] = useState([]);
  const [id_creador, setid_creador] = useState("");
  const location = useLocation();
  const materiaPrim = location?.state?.materiaPrima;

  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador"));
  }, []);

  const lotesAprobados = async () => {
    try {
      const response = await Get_OT_mezclado_aserrin();
      setdatosApi(response || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    lotesAprobados();
  }, []);

  const encabezadosTab = [
    "Detalle",
    "Fecha.        ",
    "Correlativo",
   // "Mezclado",
    "Lb.mezclado",
    "Lb.formulado",
    "Lb.disponible",
   // "     Área     ",
    "Estado",
    "Datos del Aserrín ",
    "Crear registro de sacos",
    "Estado mezclado",
    "Estado de la orden",
    
  ];
console.log('datosApi',datosApi)
  const bodyRows =
    Array.isArray(datosApi) &&
    datosApi.map((rows) => [
      <Detalle datosApi={rows} />,
      formatFecha(rows.fecha_creacion) || "",
      rows.oscorrelativo || "",
      // rows.sacos || "",
       rows.libras_aserrin || "",
       rows.fm_lib || "",
       rows.lb_disponible || "",
    //  rows.EncName || "",
     rows.aprobado || "",
      ((ability && (ability.can('create', 'Laboratorio')|| ability.can('create', 'Supervisor'))) ? (
      <CrearAS encabezados="Datos_Aserrin" datosApi={rows} type="button">
        Crear Registro
      </CrearAS>
        ):<button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
                  Laboratorio
                </button>),
      ((ability && (ability.can('create', 'BotonOT') || ability.can('create', 'Supervisor'))) ? (
      <CrearOT datosApi={rows} Tabla="dot_mezclado_aserrin" />
      ):<button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
                  Sin Permiso
        </button>),
      ((ability && (ability.can('create', 'Laboratorio')|| ability.can('create', 'Supervisor'))) ? (
      <EstadoProcesoAserrin
        telefono={rows.telefono}
        aprobado={rows.aprobado}
        correlativo={rows.oscorrelativo}
        EncName={rows.EncName}
        id={rows.id}
        Tabla="EstadoProcesoMezclaAserrin"
      />):<button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
                  Laboratorio
        </button>),
      ((ability && ( ability.can('manage', 'Supervisor'))) ? (
      <EstadoProceso id={rows.id} encabezado="ProcesoMezclado" />
       ) : <button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
       Sin Permiso
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
          flexShrink: 0,
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
          <PaginasAserrin activeTabKey={pagina} />
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div
        style={{
          flexGrow: 1,
          padding: "32px",
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
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
            : "Lotes de Aserrín Mezclado"}
        </Divider>

        <div style={{ marginBottom: "1rem" }}>
          <CrearOT
            datosApi="dot_mezclado_aserrin"
            encabezados="dot_mezclado_aserrin"
          />
        </div>

        {/* CONTENEDOR RESPONSIVO */}
        <div
          style={{
            width: "100%",
            overflowX: "auto", 
            overflowY: "hidden",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              minWidth: "950px", 
            }}
          >
            <Table encabezadosTab={encabezadosTab} datosTab={bodyRows} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaAserrinMezclado;
