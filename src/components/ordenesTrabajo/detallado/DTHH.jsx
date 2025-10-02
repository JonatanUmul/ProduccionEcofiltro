import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from "sweetalert2";
import { Skeleton, Space } from "antd";
import ObtenerCodigosParaHornos from "../../../services/ObtenerCodigosParaHornos";
import Table from "../../UI/Table";
import PostSeriesProduccion from "../../../services/PostSeriesProduccion";
import PutSeriesProduccion from "../../../services/PutSeriesProduccion";
import { useLocation } from "react-router-dom";
const URL = process.env.REACT_APP_URL;

const DTHH = () => {
  
  const { handleSubmit, register, watch, setValue } = useForm();
  const [turno, setTurno] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [hornos, setHornos] = useState([]);
  const [hornero, setHornero] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serie1, setSerie] = useState([]);
  console.log('serie serie',serie1)

  const [highlighted, setHighlighted] = useState([]);
  const modeloSeleccionado = watch("id_modelo");
  console.log(modeloSeleccionado)
  const codigoInicio = watch("codigoInicio");
  const codigoFin = watch("codigoFin");
  const [id_dtp, setId_dtp] = useState();
  console.log('horneados',id_dtp)
  const maquinaria = "Horno";
  const id_area = 3;
  const [id_creador, setIdCreador] = useState("");
  const location=useLocation().state
  const id_proceso =modeloSeleccionado=='1' ? 4: 6
  const fecha_creacion=location.fecha_creacion
  const id=location.id
  const EncName=location.EncName

  const ObtenerCodigosParaHo = async () => {
    try {
      const datos = await ObtenerCodigosParaHornos({ modeloSeleccionado, id_proceso });
      setSerie(datos);
    } catch (err) {
      console.error("Error al obtener series:", err);
    }
  };

  useEffect(() => {
    if (modeloSeleccionado) {
      ObtenerCodigosParaHo();
    }
  }, [modeloSeleccionado]);


  useEffect(() => {
    setIdCreador(localStorage.getItem("id_creador") || "");

    Promise.all([
      axios.get(`${URL}/Turnos`),
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/maquinaria/${maquinaria}`),
      axios.get(`${URL}/Operarios/${id_area}`),
    ])
      .then(([TurnosRes, ModelosRes, HornosRes, OperariosRes]) => {
        setTurno(TurnosRes.data);
        setModelos(ModelosRes.data);
        setHornos(HornosRes.data);
        setHornero(OperariosRes.data);
      })
      .catch((err) => {
        console.error("Error al cargar combos:", err);
        setError("Error al obtener los datos iniciales.");
      });
  }, []);

  // Mostrar skeleton al guardar
  const showSkeleton = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  //  Resaltar series según rango
  useEffect(() => {
    if (!codigoInicio && !codigoFin) {
      setHighlighted([]);
      return;
    }

    const inicio = codigoInicio ? codigoInicio.toUpperCase() : "";
    const fin = codigoFin ? codigoFin.toUpperCase() : "";

    const getNumeric = (str) => {
      const num = str.replace(/\D/g, "");
      return parseInt(num || "0", 10);
    };

    const numInicio = inicio ? getNumeric(inicio) : null;
    const numFin = fin ? getNumeric(fin) : null;

    const resaltadas = serie1
      .filter((row) => {
        const serieStr = row.serie1.toUpperCase();
        const numSerie = getNumeric(serieStr);

        if (numInicio !== null && numFin !== null) {
          return numSerie >= numInicio && numSerie <= numFin;
        }
        if (inicio) return serieStr.includes(inicio);
        if (fin) return serieStr.includes(fin);

        return false;
      })
      .map((row) => row.serie1);

      const resaltadas1 = serie1
      .filter((row) => {
        const serieStr = row.serie.toUpperCase();
        const numSerie = getNumeric(serieStr);

        if (numInicio !== null && numFin !== null) {
          return numSerie >= numInicio && numSerie <= numFin;
        }
        if (inicio) return serieStr.includes(inicio);
        if (fin) return serieStr.includes(fin);

        return false;
      })
      .map((row) => row.serie1);

    setHighlighted(resaltadas);
  }, [codigoInicio, codigoFin, serie1]);

  //  Resumen de estados
  const resumenEstados = useMemo(() => {
    const conteo = {};
    serie1.forEach((row) => {
      if (highlighted.includes(row.serie1)) {
        conteo[row.estado] = (conteo[row.estado] || 0) + 1;
      }
    });
    return conteo;
  }, [highlighted, serie1]);

  const sumaNoOK = Object.entries(resumenEstados)
    .filter(([estado]) => estado !== "OK")
    .reduce((acc, [, cantidad]) => acc + cantidad, 0);

  //  Actualizar automáticamente inputs de horneado y mermas
  useEffect(() => {
    setValue("horneado", resumenEstados.OK || 0);
    setValue("mermasCrudas", sumaNoOK || 0);
  }, [resumenEstados, sumaNoOK, setValue]);

  //  Filtrar series OK
  const seriesOK = useMemo(() => {
    return serie1.filter(
      (row) => highlighted.includes(row.serie1) && row.estado === "OK"
    );
  }, [highlighted, serie1]);

  const seriesTOdos = useMemo(() => {
    return serie1.filter(
      (row) => highlighted.includes(row.serie1)
    );
  }, [highlighted, serie1]);

  const TodasSeriesSelect= seriesTOdos.map(rows=>rows.serie)
  console.log(' TodasSeriesSelect',TodasSeriesSelect)
  //  Obtener último ID
  const ultimoIDgthh = async () => {
    try {
      const tabla='dthh'
      const response = await axios.get(`${URL}/Ultimo_id_DTHH`,{params:{tabla}});
      setId_dtp(response.data.rows[0].ultimoId + 1);
    } catch (err) {
      console.error("Error al obtener el último ID:", err);
    }
  };

  useEffect(() => {
    ultimoIDgthh();
  }, []);

  //  Enviar formulario
  const onSubmit = async (formData) => {
    console.log("Datos a enviar:", formData); // DEBUG
  
    try {
      // Guardar cabecera primero
      const res = await axios.post(`${URL}/DTHH`, {
        id_OTHH: id.toString(),
        id_turno: formData.id_turno,
        id_modelo: formData.id_modelo,
        id_horno: formData.id_horno,
        id_hornero: formData.id_hornero,
        horneado: formData.horneado,
        mermasCrudas: formData.mermasCrudas,
        codigoInicio: formData.codigoInicio?.replace(/\s+/g, "") || "",
        codigoFin: formData.codigoFin?.replace(/\s+/g, "") || "",
        id_creador: id_creador,
        id_est: 2,
      });
  window.location.href = "/Home/TablaOT";
      //  1. Enviar series OK para producción
      const seriesOkUnicas = [...new Set(seriesOK.map((row) => row.serie))];
  console.log('okok',seriesOkUnicas)
      if (seriesOkUnicas.length > 0) {
        await PostSeriesProduccion({
          serialProduccion: seriesOkUnicas,
          id_modelo: formData.id_modelo,
          id_proceso: 10,
          id_dtp,
        });
      }

      if (seriesTOdos.length > 0) {
        await PutSeriesProduccion({
          serialProduccion: TodasSeriesSelect,
          id_modelo: formData.id_modelo,
          id_proceso: 4,
          disponibilidad:"Indisponible",
        });
      }

      //  Mostrar éxito
      Swal.fire("Éxito", "Datos guardados correctamente", "success");
      window.location.href = "/Home/TablaOT";
    } catch (error) {
      console.error("Error al guardar DTHH:", error);
      Swal.fire("Error", "Ocurrió un problema al guardar los datos", "error");
    }
  };
  
  
  

  // Encabezados y filas con resaltado
  const encabezado = ["#", "Serie", "Estado"];
  const bodyRows =
    Array.isArray(serie1) &&
    serie1.map((row, index) => [
      index + 1,
      <div
        key={row.serie1}
        style={{
          backgroundColor: highlighted.includes(row.serie1) ? "#cce5ff" : "transparent",
          padding: "2px 4px",
          borderRadius: "4px",
        }}
      >
        {row.serie1}
      </div>,
      row.estado,
    ]);

  return (
    <div className="mt-2">
      {/* Cabecera */}
      <div className="card mb-2 p-2">
        <div className="d-flex justify-content-between small text-secondary">
          <span>
            <strong>Orden:</strong> {EncName}
          </span>
          <span>
            <strong>Fecha:</strong> {formatFecha(fecha_creacion)}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="row g-2">
        {loading ? (
          <Space direction="vertical" style={{ width: "100%" }} size={12}>
            <p className="small mb-0">Guardando datos...</p>
            <Skeleton active size="small" />
          </Space>
        ) : (
          <>
            {/* Filtros */}
            <div className="row g-2">
              <div className="col-12 col-md-3">
                <select className="form-select form-select-sm" {...register("id_turno")} required>
                  <option value="">Turno...</option>
                  {turno.rows?.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.turno}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-3">
                <select className="form-select form-select-sm" {...register("id_modelo")} required>
                  <option value="">Modelo...</option>
                  {modelos.rows?.map((m) => (
                    <option key={m.id_mod} value={m.id_mod}>
                      {m.nombre_modelo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-3">
                <select className="form-select form-select-sm" {...register("id_horno")} required>
                  <option value="">Horno...</option>
                  {hornos.rows?.map((h) => (
                    <option key={h.id_maq} value={h.id_maq}>
                      {h.nombre_maq}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-3">
                <select className="form-select form-select-sm" {...register("id_hornero")} required>
                  <option value="">Hornero...</option>
                  {hornero.rows?.map((ho) => (
                    <option key={ho.id} value={ho.id}>
                      {ho.Nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Inputs */}
            <div className="col-6 col-sm-3">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Horneado"
                {...register("horneado")}
                required
              />
            </div>

            <div className="col-6 col-sm-3">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Mermas Crudas"
                {...register("mermasCrudas")}
                required
              />
            </div>

            <div className="col-6 col-sm-3">
              <input
                autoComplete="off"
                style={{ textTransform: "uppercase" }}
                placeholder="Código Inicio"
                type="text"
                className="form-control form-control-sm"
                {...register("codigoInicio")}
              />
            </div>

            <div className="col-6 col-sm-3">
              <input
                autoComplete="off"
                style={{ textTransform: "uppercase" }}
                placeholder="Código Final"
                type="text"
                className="form-control form-control-sm"
                {...register("codigoFin")}
              />
            </div>

            {/* Tabla */}
            <Table encabezadosTab={encabezado} datosTab={bodyRows} />

            {/* Resumen de estados */}
            <div className="mt-2">
              <strong>Resumen Estados:</strong>
              {Object.entries(resumenEstados).length === 0 ? (
                <div>Sin selección</div>
              ) : (
                Object.entries(resumenEstados).map(([estado, cantidad]) => (
                  <div key={estado}>
                    {estado}: {cantidad}
                  </div>
                ))
              )}
              <div>
                <strong>Total:</strong> {highlighted.length}
              </div>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="alert alert-danger w-100 mt-2">{error}</div>
            )}

            <div className="col-12 d-flex justify-content-between align-items-center mt-2">
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                disabled={loading || seriesOK.length === 0}
              >
                Guardar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default DTHH;
