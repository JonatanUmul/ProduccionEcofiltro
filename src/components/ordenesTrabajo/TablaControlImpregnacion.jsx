import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useForm } from "react-hook-form";
import Input from "../UI/NumberInput";
import axios from "axios";
import Button from "../UI/Button";
import GetSeriesAprobados from "../../services/GetSeriesAprobados";
import Update_SerieEcofiltroCrudos from "../../services/Update_SerieEcofiltroCrudos";
import Update_SerieEcofiltroTasa from "../../services/Update_SerieEcofiltroTasaFiltracion";
import Table from "../UI/Table";
import Selects from "../UI/Select";
import { useNavigate, useLocation } from "react-router-dom";
import CrearOT from "./botonOT/Crear_OT"
const URL = process.env.REACT_APP_URL;

const TablaMermasCrudos = () => {
  const datos = useLocation();
  const { handleSubmit, register, watch } = useForm();
  const [serie_buscar, setSerie_buscar] = useState("");
  const [seriesDeOrdenes, setSeriesDeOrdenes] = useState([]);
  const [estadosPorSerie, setEstadosPorSerie] = useState({});
  const [estadosPorSerieTasa, setEstadosPorSerieTasa] = useState({});
  const datosOrden = datos.state?.OTDats;
  const id_dtp =0;
  const id_proceso = 12;
console.log('seriesDeOrdenes', estadosPorSerie)
  const [NuevoEstadoSerir, setnuevoEstadoSerir] = useState([]);
  const [NuevoEstadoSerirTasa, setnuevoEstadoSerirTasa] = useState([]);
  const navigate = useNavigate();
  const [modelos, setModelos] = useState([]);
  const id_modelo=watch('id_ufmodelo')
  const [error, setError] = useState("");



  const Solicitudes = () => {
    Promise.all([
      axios.get(`${URL}/ModelosUF`)
    ])
      .then(
        ([
          ModelosufResponse,
        ]) => {
          setModelos(ModelosufResponse.data);
        }
      )
      .catch((error) => {
        setError("Error al obtener los datos", error);
      });
  };

  useEffect(() => {
    Solicitudes();
  }, []);

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
  console.log('resultadosContador',resultadosContador)
  const orden = ["OK", "Rajado", "Ovalado", "Bajo", "Alto", "Quemado"];

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
    const response = await GetSeriesAprobados({ id_proceso, id_modelo });
    const series = response?.data?.response || [];
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
  }, [id_modelo]);

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

  const handleEstadoChange = (serie, id_proceso) => (e) => {
    setEstadosPorSerie((prev) => ({
      ...prev,
      [serie]: e.target.value,
    }));
    setnuevoEstadoSerir([serie, id_proceso, e.target.value]);
  };

  // BUGFIX: aquí debe actualizar estadosPorSerieTasa (antes actualizaba estadosPorSerie)
  const handleEstadoChangeTasa = (serie, id_proceso) => (e) => {
    setEstadosPorSerieTasa((prev) => ({
      ...prev,
      [serie]: e.target.value,
    }));
    setnuevoEstadoSerirTasa([serie, id_proceso, e.target.value]);
  };

  useEffect(() => {
    ActualizarEstadoSerir();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NuevoEstadoSerir]);

  useEffect(() => {
    ActualizarEstadoSerirTasa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NuevoEstadoSerirTasa]);

  const encabezado = ["Serie", "Estado"];

  const seriesFiltradas = serie_buscar
    ? seriesDeOrdenes.filter((p) =>
        p.serie.toLowerCase().includes(serie_buscar.toLowerCase())
      )
    : seriesDeOrdenes;

  const bodyRows = seriesFiltradas.map((row) => [
    row.serie,
    <Selects
      key={`estado-${row.serie}`}
      className="form-select form-select-sm"
      value={estadosPorSerie[row.serie] ?? row.estado ?? ""}
      onChange={handleEstadoChange(row.serie, row.id_proceso)}
    >
      <option value="OK">OK</option>
      <option value="Rajado">Rajado</option>
      <option value="Ovalado">Ovalado</option>
      <option value="Bajo">Bajo</option>
      <option value="Alto">Alto</option>
      <option value="Quemado">Quemado</option>
    </Selects>,

  ]);

  const volverAtras = () => navigate("/Home/TablaOT");
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
              <div className="progress" style={{ maxWidth: 640 }}>
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
 
   <div className="col-md-6">
                <label htmlFor="aserradero" className="form-label">
                  Modelo
                </label>
                <select
                  className="form-select"
                  id="id_ufmodelo"
                  {...register("id_ufmodelo")}
                  required
                >
                  <option value="" disabled selected>
                    Seleccione...
                  </option>
                  {Array.isArray(modelos.rows) &&
                    modelos.rows.length > 0 &&
                    modelos.rows.map((modelo) => (
                      <option key={modelo.id_mod} value={modelo.id_mod}>
                        {modelo.nombre_modelo}
                      </option>
                    ))}
                </select>
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
                {/* <CrearOT encabezado='cthh' datosOrden={datosOrden}  datosTab={seriesFiltradas} TodasLasSeries={seriesDeOrdenes} resultadosContador={resultadosContador}/> */}
      </Form>
    </Formik>
  );
};

export default TablaMermasCrudos;
