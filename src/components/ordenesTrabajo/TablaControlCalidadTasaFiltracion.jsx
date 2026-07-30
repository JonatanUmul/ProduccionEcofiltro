import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { Formik, Form } from "formik";
import Button from "../UI/Button";
import GetSeriesPorOrdenDeProduccion from "../../services/GetSeriesPorOrdenDeProduccion";
import Update_SerieEcofiltroCrudos from "../../services/Update_SerieEcofiltroCrudos";
import Update_SerieEcofiltroTasa from "../../services/Update_SerieEcofiltroTasaFiltracion";
import Update_SerieEcofiltroTasaPunto from "../../services/Update_SerieEcofiltroTasaPunto";
import Table from "../UI/Table";
import Selects from "../UI/Select";
import { useNavigate, useLocation } from "react-router-dom";
import CrearOT from "./botonOT/Crear_OT";
import ExcelSeriesTasaDeFiltracion from "../reporteS/ControlProcesos/Excel/ExcelSeriesTasaDeFiltracion";

const TablaMermasCrudos = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const datosOrden = location.state?.OTDats;
  const id_dtp = datosOrden?.id;
  const id_proceso = 10;

  const [serieBuscar, setSerieBuscar] = useState("");
  const [seriesDeOrdenes, setSeriesDeOrdenes] = useState([]);
  const [estadosPorSerie, setEstadosPorSerie] = useState({});
  const [estadosPorSerieTasa, setEstadosPorSerieTasa] = useState({});
  const [estadosPorSeriePunto, setEstadosPorSeriePunto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [guardandoSerie, setGuardandoSerie] = useState({});

  const orden = useMemo(
    () => [
      "OK",
      "Bajo",
      "Alto",
      "Reasignado",
      "Rajado",
      "Desportillado",
      "Ahumado",
      "Desperfecto_de_produccion",
      "Ovalado",
      "Quemado",
      "sin_tasa",
      "Rajado_Horno",
      "Desportillado_Horno",
      "Ahumado_Horno",
      "Quemado_Horno"
    ],
    []
  );

  const colorBadge = useCallback(
    (estado) =>
      ({
        OK: "success",
        Rajado: "danger",
        Ovalado: "warning",
        Bajo: "info",
        Alto: "primary"
      }[estado] || "secondary"),
    []
  );

  const obtenerSeries = useCallback(async () => {
    if (!id_dtp) return;

    try {
      setCargando(true);

      const response = await GetSeriesPorOrdenDeProduccion({
        id_dtp,
        id_proceso
      });

      const series = response?.data?.response || [];

      const estadosIniciales = {};
      const tasasIniciales = {};
      const puntosIniciales = {};

      for (const serie of series) {
        estadosIniciales[serie.serie] = serie.estado;
        tasasIniciales[serie.serie] = serie.tasa ?? "";
        puntosIniciales[serie.serie] = Number(serie.estado_punto) === 1;
      }

      setSeriesDeOrdenes(series);
      setEstadosPorSerie(estadosIniciales);
      setEstadosPorSerieTasa(tasasIniciales);
      setEstadosPorSeriePunto(puntosIniciales);
    } catch (error) {
      console.error("Error al obtener las series:", error);
    } finally {
      setCargando(false);
    }
  }, [id_dtp, id_proceso]);

  useEffect(() => {
    obtenerSeries();
  }, [obtenerSeries]);

  const marcarGuardando = useCallback((serie, tipo, estado) => {
    const clave = `${serie}-${tipo}`;

    setGuardandoSerie((prev) => ({
      ...prev,
      [clave]: estado
    }));
  }, []);

  const actualizarEstado = useCallback(
    async (serie, proceso, nuevoEstado) => {
      setEstadosPorSerie((prev) => ({
        ...prev,
        [serie]: nuevoEstado
      }));

      marcarGuardando(serie, "estado", true);

      try {
        await Update_SerieEcofiltroCrudos({
          NuevoEstadoSerir: [serie, proceso, nuevoEstado]
        });

        setSeriesDeOrdenes((prev) =>
          prev.map((item) =>
            item.serie === serie
              ? { ...item, estado: nuevoEstado }
              : item
          )
        );
      } catch (error) {
        console.error(`Error al actualizar el estado de ${serie}:`, error);

        const estadoAnterior =
          seriesDeOrdenes.find((item) => item.serie === serie)?.estado ?? "";

        setEstadosPorSerie((prev) => ({
          ...prev,
          [serie]: estadoAnterior
        }));
      } finally {
        marcarGuardando(serie, "estado", false);
      }
    },
    [marcarGuardando, seriesDeOrdenes]
  );

  const handleEstadoChange = useCallback(
    (serie, proceso) => (event) => {
      actualizarEstado(serie, proceso, event.target.value);
    },
    [actualizarEstado]
  );

  const handleTasaChange = useCallback(
    (serie) => (event) => {
      const valor = event.target.value.replace(/\D/g, "").slice(0, 2);

      setEstadosPorSerieTasa((prev) => ({
        ...prev,
        [serie]: valor
      }));
    },
    []
  );

  const guardarTasa = useCallback(
    async (serie, proceso, idUfModelo) => {
      const nuevaTasa = estadosPorSerieTasa[serie] ?? "";
      const tasaAnterior =
        seriesDeOrdenes.find((item) => item.serie === serie)?.tasa ?? "";

      if (String(nuevaTasa) === String(tasaAnterior ?? "")) {
        return;
      }

      marcarGuardando(serie, "tasa", true);

      try {
        await Update_SerieEcofiltroTasa({
          NuevoEstadoSerirTasa: [
            serie,
            proceso,
            nuevaTasa,
            idUfModelo
          ]
        });

        setSeriesDeOrdenes((prev) =>
          prev.map((item) =>
            item.serie === serie
              ? { ...item, tasa: nuevaTasa }
              : item
          )
        );
      } catch (error) {
        console.error(`Error al actualizar la tasa de ${serie}:`, error);

        setEstadosPorSerieTasa((prev) => ({
          ...prev,
          [serie]: tasaAnterior
        }));
      } finally {
        marcarGuardando(serie, "tasa", false);
      }
    },
    [
      estadosPorSerieTasa,
      marcarGuardando,
      seriesDeOrdenes
    ]
  );

  const handlePuntoChange = useCallback(
    (serie, proceso) => async (event) => {
      const nuevoValor = event.target.checked;
      const valorAnterior = estadosPorSeriePunto[serie] ?? false;

      setEstadosPorSeriePunto((prev) => ({
        ...prev,
        [serie]: nuevoValor
      }));

      marcarGuardando(serie, "punto", true);

      try {
        await Update_SerieEcofiltroTasaPunto({
          estadosPorSeriePunto: [
            serie,
            proceso,
            nuevoValor ? 1 : 0
          ]
        });

        setSeriesDeOrdenes((prev) =>
          prev.map((item) =>
            item.serie === serie
              ? {
                  ...item,
                  estado_punto: nuevoValor ? 1 : 0
                }
              : item
          )
        );
      } catch (error) {
        console.error(
          `Error al actualizar el punto de ${serie}:`,
          error
        );

        setEstadosPorSeriePunto((prev) => ({
          ...prev,
          [serie]: valorAnterior
        }));
      } finally {
        marcarGuardando(serie, "punto", false);
      }
    },
    [
      estadosPorSeriePunto,
      marcarGuardando
    ]
  );

  const resultadosContador = useMemo(() => {
    const contador = {};

    for (const estado of Object.values(estadosPorSerie)) {
      contador[estado] = (contador[estado] || 0) + 1;
    }

    return contador;
  }, [estadosPorSerie]);

  const totalEstados = useMemo(
    () =>
      Object.values(resultadosContador).reduce(
        (total, cantidad) => total + cantidad,
        0
      ),
    [resultadosContador]
  );

  const seriesFiltradas = useMemo(() => {
    const texto = serieBuscar.trim().toLowerCase();

    if (!texto) {
      return seriesDeOrdenes;
    }

    return seriesDeOrdenes.filter((item) =>
      String(item.serie || "")
        .toLowerCase()
        .includes(texto)
    );
  }, [serieBuscar, seriesDeOrdenes]);

  const encabezado = useMemo(
    () => ["Serie", "Punto", "Tasa", "Estado"],
    []
  );

  const bodyRows = useMemo(
    () =>
      seriesFiltradas.map((row) => {
        const guardandoPunto =
          !!guardandoSerie[`${row.serie}-punto`];
        const guardandoTasa =
          !!guardandoSerie[`${row.serie}-tasa`];
        const guardandoEstado =
          !!guardandoSerie[`${row.serie}-estado`];

        return [
          row.serie,

          <div
            key={`punto-${row.serie}`}
            className="form-check d-flex justify-content-center text-center"
          >
            <input
              className="form-check-input"
              type="checkbox"
              checked={
                !!(
                  estadosPorSeriePunto[row.serie] ??
                  Number(row.estado_punto)
                )
              }
              disabled={guardandoPunto}
              onChange={handlePuntoChange(
                row.serie,
                row.id_proceso
              )}
            />
          </div>,

          <input
            key={`tasa-${row.serie}`}
            type="text"
            className="form-control form-control-sm"
            value={
              estadosPorSerieTasa[row.serie] ??
              row.tasa ??
              ""
            }
            disabled={guardandoTasa}
            onChange={handleTasaChange(row.serie)}
            onBlur={() =>
              guardarTasa(
                row.serie,
                row.id_proceso,
                row.id_ufmodelo
              )
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                event.currentTarget.blur();
              }
            }}
            maxLength={2}
            inputMode="numeric"
            pattern="[0-9]*"
          />,

          <Selects
            key={`estado-${row.serie}`}
            className="form-select form-select-sm"
            value={
              estadosPorSerie[row.serie] ??
              row.estado ??
              ""
            }
            disabled={guardandoEstado}
            onChange={handleEstadoChange(
              row.serie,
              row.id_proceso
            )}
          >
            <option value="OK">OK</option>
            <option value="Bajo">Bajo</option>
            <option value="Alto">Alto</option>
            <option value="Rajado">Rajado</option>
            <option value="Desportillado">
              Desportillado
            </option>
            <option value="Ahumado">Ahumado</option>
            <option value="Desperfecto_de_produccion">
              Desperfecto de producción
            </option>
            <option value="Quemado">Quemado</option>
            <option value="Ovalado">Ovalado</option>
            <option value="sin_tasa">Sin Tasa</option>
            <option value="Reasignado">Reasignado</option>
            <option value="Rajado_Horno">
              Rajado Horno
            </option>
            <option value="Desportillado_Horno">
              Desportillado Horno
            </option>
            <option value="Ahumado_Horno">
              Ahumado Horno
            </option>
            <option value="Quemado_Horno">
              Quemado Horno
            </option>
          </Selects>
        ];
      }),
    [
      seriesFiltradas,
      guardandoSerie,
      estadosPorSerie,
      estadosPorSerieTasa,
      estadosPorSeriePunto,
      handleEstadoChange,
      handlePuntoChange,
      handleTasaChange,
      guardarTasa
    ]
  );

  const volverAtras = useCallback(() => {
    navigate("/Home/TablaOT");
  }, [navigate]);

  return (
    <Formik
      initialValues={{ numeroDeSerie: "" }}
      onSubmit={(values) => {
        setSerieBuscar(values.numeroDeSerie || "");
      }}
    >
      <Form>
        <div className="container-fluid py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <div>
              <h5 className="mb-0">
                Mermas – Orden {id_dtp ?? ""}
              </h5>

              <ExcelSeriesTasaDeFiltracion
                dats={seriesDeOrdenes}
              />

              <small className="text-muted">
                {cargando
                  ? "Cargando series..."
                  : `Series cargadas: ${seriesDeOrdenes.length}`}
              </small>
            </div>

            <div className="d-flex gap-2">
              <Button
                type="button"
                onClick={volverAtras}
                className="btn btn-danger btn-sm"
              >
                Regresar
              </Button>
            </div>
          </div>

          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2 mb-2">
                {orden.map((estado) => (
                  <span
                    key={estado}
                    className={`badge text-bg-${colorBadge(
                      estado
                    )} p-2`}
                    title={`${estado}: ${
                      resultadosContador?.[estado] ?? 0
                    }`}
                  >
                    <strong className="me-1">
                      {estado}:
                    </strong>

                    {resultadosContador?.[estado] ?? 0}
                  </span>
                ))}
              </div>

              <div
                className="progress"
                style={{
                  width: "100%",
                  height: "2rem"
                }}
              >
                {orden.map((estado) => {
                  const cantidad =
                    resultadosContador?.[estado] ?? 0;

                  const porcentaje = totalEstados
                    ? Math.round(
                        (cantidad / totalEstados) * 100
                      )
                    : 0;

                  return (
                    <div
                      key={`pb-${estado}`}
                      className={`progress-bar bg-${colorBadge(
                        estado
                      )}`}
                      role="progressbar"
                      style={{
                        width: `${porcentaje}%`
                      }}
                      aria-valuenow={porcentaje}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      title={`${estado}: ${cantidad} (${porcentaje}%)`}
                    >
                      {porcentaje
                        ? `${porcentaje}%`
                        : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body p-2">
              <div className="table-responsive">
                <Table
                  encabezadosTab={encabezado}
                  datosTab={bodyRows}
                />
              </div>
            </div>
          </div>
        </div>

        <CrearOT
          encabezado="cthh"
          datosOrden={datosOrden}
          datosTab={seriesFiltradas}
          TodasLasSeries={seriesDeOrdenes}
          resultadosContador={resultadosContador}
        />
      </Form>
    </Formik>
  );
};

export default TablaMermasCrudos;