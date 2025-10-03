import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
// import Input from "../UI/NumberInput";
import Button from "../../UI/Button";
import GetSeriesPorOrdenDeProduccion from "../../../services/GetSeriesPorOrdenDeProduccion";
import Update_SerieEcofiltroCrudos from "../../../services/Update_SerieEcofiltroCrudos";
import Update_SerieEcofiltroTasa from "../../../services/Update_SerieEcofiltroTasaFiltracion";
import Update_SerieEcofiltroTasaPunto from "../../../services/Update_SerieEcofiltroTasaPunto";

import Table from "../../UI/Table";
import Selects from "../../UI/Select";
import ExcelSeriesTasaDeFiltracion from "../../reporteS/ControlProcesos/Excel/ExcelSeriesTasaDeFiltracion"
import { useNavigate, useLocation } from "react-router-dom";

// import CrearOT from "../../botonOT/Crear_OT"

const TablaMermasCrudos = () => {
  const datos = useLocation();
  const [serie_buscar, setSerie_buscar] = useState("");
  const [seriesDeOrdenes, setSeriesDeOrdenes] = useState([]);
  console.log('seriesDeOrdenesEN REPORTE',seriesDeOrdenes)
  const [estadosPorSerie, setEstadosPorSerie] = useState({});
  const [estadosPorSerieTasa, setEstadosPorSerieTasa] = useState({})
  const [estadosPorSeriePunto, setnuevoEstadoSerirPunto] = useState({});
  const datosOrden = datos.state?.fila;
  const id_dtp = datosOrden?.id;
  const id_proceso = 10;
  const [NuevoEstadoSerir, setnuevoEstadoSerir] = useState([]);
  const [NuevoEstadoSerirTasa, setnuevoEstadoSerirTasa] = useState([]);
  const navigate = useNavigate();

  // convertir el objeto de estados a arreglo de valores y contarlos
  const segundaLinea = Object.values(estadosPorSerie);
  const contarElemento = (datos) => {
    const contador = {};
    for (const dato of datos) {
      contador[dato] = (contador[dato] || 0) + 1;
    }
    return contador;
  };
  const resultadosContador = contarElemento(segundaLinea);
  const orden = [
    "OK",
  "Bajo", 
  "Alto",
  "Reasignado", 
  "Rajado",
  "Desportillado", 
  "Ahumado", 
  "Desperfecto_de_produccion" ,
  "Ovalado", 
  "Quemado",
  "sin_tasa",
  "Rajado_Horno",
  "Desportillado_Horno",
  "Ahumado_Horno",
  "Quemado_Horno"];

  const totalEstados = Object.values(resultadosContador).reduce(
    (a, b) => a + b,
    0
  );

  const colorBadge = (k) =>
    ({
      OK: "success",
      Rajado: "danger",
      Ovalado: "warning",
      Bajo: "info",
      Alto: "primary",
    }[k] || "secondary");

  const obtenerSeries = async () => {
    const response = await GetSeriesPorOrdenDeProduccion({ id_dtp, id_proceso });
    const series = response.data.response || [];
    setSeriesDeOrdenes(series);

    const inicial = {};
    series.forEach((s) => {
      inicial[s.serie] = s.estado;
    });
    setEstadosPorSerie(inicial);

    const inicialTasa = {};
    series.forEach((s) => {
      inicialTasa[s.serie] = s.tasa;
    });
    setEstadosPorSerieTasa(inicialTasa);
  };

  useEffect(() => {
    obtenerSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ActualizarEstadoSerir = async () => {
    if (!NuevoEstadoSerir.length) return;
    const response = await Update_SerieEcofiltroCrudos({ NuevoEstadoSerir });
    console.log(response);
  };
  const ActualizarEstadoSerirTasa = async () => {
    if (!NuevoEstadoSerirTasa.length) return;
    const response = await Update_SerieEcofiltroTasa({ NuevoEstadoSerirTasa });
    console.log(response);
  };

  const ActualizarEstadoSerirPunto = async () => {
    if (!estadosPorSeriePunto.length) return;
    const response = await Update_SerieEcofiltroTasaPunto({ estadosPorSeriePunto });
    console.log(response);
  };

  const handleEstadoChange = (serie, id_proceso) => (e) => {
    setEstadosPorSerie((prev) => ({
      ...prev,
      [serie]: e.target.value,
    }));
    setnuevoEstadoSerir([serie, id_proceso, e.target.value]);
  };

  // BUGFIX: aquí debe actualizar estadosPorSerieTasa (antes actualizaba estadosPorSerie)
  const handleEstadoChangeTasa = (serie, id_proceso, id_ufmodelo) => (e) => {
    setEstadosPorSerieTasa((prev) => ({
      ...prev,
      [serie]: e.target.value,
    }));
    setnuevoEstadoSerirTasa([serie, id_proceso, e.target.value, id_ufmodelo]);
  };

  const handleEstadoChangePunto = (serie, id_proceso) => (e) => {
    const isChecked = e.target.checked;
  
    setnuevoEstadoSerirPunto((prev) => ({
      ...prev,
      [serie]: isChecked,
    }));
  
    Update_SerieEcofiltroTasaPunto({
      estadosPorSeriePunto: [serie, id_proceso, isChecked ? 1 : 0],
    });
  };

  useEffect(() => {
    ActualizarEstadoSerir();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NuevoEstadoSerir]);

  useEffect(() => {
    ActualizarEstadoSerirTasa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NuevoEstadoSerirTasa]);

  
  useEffect(() => {
    ActualizarEstadoSerirPunto();

  }, [estadosPorSeriePunto]);


  const encabezado = ["Serie", "Punto", "Tasa", "Estado"];

  const seriesFiltradas = serie_buscar
    ? seriesDeOrdenes.filter((p) =>
        p.serie.toLowerCase().includes(serie_buscar.toLowerCase())
      )
    : seriesDeOrdenes;

    const bodyRows = seriesFiltradas.map((row) => [

      row.serie,
    //   <input
    //   type="text"
    //   // value={estadosPorSerieTasa[row.serie] ?? row.tasa ?? ""}
    //   onChange={handleEstadoChangeTasa(row.serie, row.id_proceso)}
    //   onClick={obtenerSeries}
    //   maxLength={2}
    //   pattern="\d*"
    // />,
  
      <div className="form-check d-flex justify-content-center text-center">
  <input
  disabled
    className="form-check-input"
    type="checkbox"
    checked={!!(estadosPorSeriePunto[row.serie] ?? Number(row.estado_punto))}
    onChange={handleEstadoChangePunto(row.serie, row.id_proceso)}
    onClick={obtenerSeries}
  />
  
  
  </div>,
      <input
      disabled
    type="text"
    value={estadosPorSerieTasa[row.serie] ?? row.tasa ?? ""}
    onChange={handleEstadoChangeTasa(row.serie, row.id_proceso, row.id_ufmodelo)}
    onClick={obtenerSeries}
    maxLength={2}
    pattern="\d*"
  />,
  
  
      <Selects
      disabled
        key={`estado-${row.serie}`}
        className="form-select form-select-sm"
        value={estadosPorSerie[row.serie] ?? row.estado ?? ""}
        onChange={handleEstadoChange(row.serie, row.id_proceso)}
        onClick={obtenerSeries}
      >
        <option value="OK">OK</option> 
        <option value="Bajo">Bajo</option>
        <option value="Alto">Alto</option>
        <option value="Rajado">Rajado</option>
        <option value="Desportillado">Desportillado</option>
        <option value="Ahumado">Ahumado</option>
        <option value="Desperfecto_de_produccion">Desperfecto de producción</option>
        <option value="Quemado">Quemado</option>
        <option value="Ovalado">Ovalado</option>
        <option value="sin_tasa">Sin Tasa</option>
        <option value="Reasignado">Reasignado</option>
        
        <option value="Rajado_Horno">Rajado Horno</option>
        <option value="Desportillado_Horno">Desportillado Horno</option>
        <option value="Ahumado_Horno">Ahumado_Horno</option>
        <option value="Quemado_Horno">Quemado Horno</option>
      </Selects>
  
  
    ]);

  const volverAtras = () => navigate("/Home/TablaReportesOT");
  const GuaradarDatos=()=>{
    console.log('Guradar Datos 123')
  }
  return (
    <Formik
    initialValues={{ numeroDeSerie: "" }}
    onSubmit={(values) => {
      setSerie_buscar(values.numeroDeSerie);
    }}
  >
    <Form>
      <div className="container-fluid py-3">
        {/* Header + acción */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <div>
            <h5 className="mb-0">Mermas – Orden {id_dtp ?? ""}</h5>
            <ExcelSeriesTasaDeFiltracion dats={seriesDeOrdenes}/>
            <small className="text-muted">
          
              Series cargadas: {seriesDeOrdenes.length}
            </small>
          </div>
      
          <div className="d-flex gap-2">
            {/* Si quieres usar el buscador, descomenta Input y botón submit */}
            {/* <Input name="numeroDeSerie" placeholder="Buscar por serie" />
            <Button type="submit" className="btn btn-primary btn-sm">
              Buscar
            </Button> */}
            <Button onClick={volverAtras} className="btn btn-danger btn-sm">
              Regresar
            </Button>
          </div>
        </div>

        {/* Resumen en tarjeta */}
        <div className="card shadow-sm mb-3">
          <div className="card-body">
            <div className="d-flex flex-wrap gap-2 mb-2">
              {orden.map((k) => (
                <span
                  key={k}
                  className={`badge text-bg-${colorBadge(k)} p-2`}
                  title={`${k}: ${resultadosContador?.[k] ?? 0}`}
                >
                  <strong className="me-1">{k}:</strong>
                  {resultadosContador?.[k] ?? 0}
                </span>
              ))}
            </div>

            {/* Barra de progreso por distribución */}
            <div 
className="progress" 
style={{ 
  width: "100%",       // ocupa el 100% del contenedor
  height: "2rem"       // más alta y visible
}}
>
{orden.map((k) => {
  const val = resultadosContador?.[k] ?? 0;
  const pct = totalEstados
    ? Math.round((val / totalEstados) * 100)
    : 0;
  return (
    <div
      key={`pb-${k}`}
      className={`progress-bar bg-${colorBadge(k)}`}
      role="progressbar"
      style={{ width: `${pct}%` }}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      title={`${k}: ${val} (${pct}%)`}
    >
      {pct ? `${pct}%` : ""}
    </div>
  );
})}
</div>

          </div>
        </div>

        {/* Tabla */}
        <div className="card shadow-sm">
          <div className="card-body p-2">
            <div className="table-responsive">
              <Table encabezadosTab={encabezado} datosTab={bodyRows} />
            </div>
          </div>
        </div>
      </div>
    </Form>
  </Formik>
  );
};

export default TablaMermasCrudos;
