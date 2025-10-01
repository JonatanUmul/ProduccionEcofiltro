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
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';

const URL = process.env.REACT_APP_URL;
const DTHH = () => {
  
  const { handleSubmit, register, watch, setValue } = useForm();
  const [modelos, setModelos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serie1, setSerie] = useState([]);
 
  const [highlighted, setHighlighted] = useState([]);
  const modeloSeleccionado = watch("id_modelo");
  const id_proceso = modeloSeleccionado==1 ? 12:14
  const codigoInicio = watch("codigoInicio");
  const codigoFin = watch("codigoFin");
  const [id_dtp, setId_dtp] = useState();
  console.log('id_dtp',id_dtp)
  const maquinaria = "Horno";
  const id_area = 3;
  const [id_creador, setIdCreador] = useState("");
  const location=useLocation().state
  const [plata, setPlata]=useState([])
  const [plata2, setplata2]=useState(false)
  const fecha_creacion=location.fecha_creacion
  const id=location.id
  const EncName=location.EncName
console.log(id)
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

  const insumo='Plata' 
  useEffect(() => {
    setIdCreador(localStorage.getItem("id_creador") || "");

    Promise.all([
  
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/Insumos/${insumo}`)
    ])
      .then(([ ModelosRes, insumoResponse]) => {

        setModelos(ModelosRes.data);
        setPlata(insumoResponse.data)
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
    setValue("impregnados", resumenEstados.OK || 0);
    setValue("mermas", sumaNoOK || 0);
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
      const tabla='dtip'
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
      const res = await axios.post(`${URL}/DTIP`, {
        id_OTIP: id,
        TipoPlata:formData.TipoPlata,
        TipoPlata2:formData.TipoPlata2,
        // fecha_real:formatFecha(fecha_creacion),
        id_modelo: formData.id_modelo,
        codigoInicio: formData.codigoInicio.replace(/\s+/g, ''),
        codigoFinal: formData.codigoFin.replace(/\s+/g, ''),
        impregnados: formData.impregnados,
        mermas: formData.mermas,
        id_creador:id_creador
      });
  
      //  1. Enviar series OK para producción
      const seriesOkUnicas = [...new Set(seriesOK.map((row) => row.serie))];
  console.log('okok',seriesOkUnicas)
      if (seriesOkUnicas.length > 0) {
        await PostSeriesProduccion({
          serialProduccion: seriesOkUnicas,
          id_modelo: formData.id_modelo,
          id_proceso: modeloSeleccionado==1? 15:17,
          id_dtp,
        });
      }

      if (seriesTOdos.length > 0) {
        await PutSeriesProduccion({
          serialProduccion: TodasSeriesSelect,
          id_modelo: formData.id_modelo,
          id_proceso:  modeloSeleccionado==1? 12:14,
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
    <div className="card mb-3">
      <div className="card-body py-2">
        <div className="row g-2 align-items-center text-secondary small">
          <div className="col">
            <strong>Orden:</strong> {EncName}
          </div>
          <div className="col-auto">
            <strong>Fecha:</strong> {formatFecha(fecha_creacion)}
          </div>
        </div>
      </div>
    </div>
  
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Loading */}
      {loading && (
        <div className="mb-3">
          <Space direction="vertical" style={{ width: "100%" }} size={12}>
            <p className="small mb-0">Guardando datos...</p>
            <Skeleton active size="small" />
          </Space>
        </div>
      )}
  
      {/* Filtros */}
      <div className="card mb-3">
        <div className="card-header py-2">
          <strong className="small">Filtros</strong>
        </div>
        <div className="card-body">
          <div className="row g-2">
            <div className="col-12 col-md-3">
              <label className="form-label form-label-sm">Modelo</label>
              <select
                className="form-select form-select-sm"
                {...register("id_modelo", { required: true })}
                defaultValue=""
              >
                <option value="">Modelo...</option>
                {modelos.rows?.map((m) => (
                  <option key={m.id_mod} value={m.id_mod}>
                    {m.nombre_modelo}
                  </option>
                ))}
              </select>
            </div>
  
            <div className="col-12 col-md-4">
              <label htmlFor="TipoPlata" className="form-label form-label-sm">
                Tipo de Plata
              </label>
              <div className="d-flex gap-2">
                <select
                  id="TipoPlata"
                  className="form-select form-select-sm"
                  {...register("TipoPlata", { required: true })}
                  defaultValue=""
                >
                  <option value="">Seleccione...</option>
                  {Array.isArray(plata.rows) &&
                    plata.rows.length > 0 &&
                    plata.rows.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.insumo}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setplata2(true)}
                  title="Agregar otro tipo"
                >
                  <PlusCircleOutlined />
                </button>
              </div>
            </div>
  
            {plata2 && (
              <div className="col-12 col-md-4">
                <label htmlFor="TipoPlata2" className="form-label form-label-sm">
                  Tipo de Plata 2
                </label>
                <div className="d-flex gap-2">
                  <select
                    id="TipoPlata2"
                    className="form-select form-select-sm"
                    {...register("TipoPlata2", { required: true })}
                    defaultValue=""
                  >
                    <option value="">Seleccione...</option>
                    {Array.isArray(plata.rows) &&
                      plata.rows.length > 0 &&
                      plata.rows.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.insumo}
                        </option>
                      ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setplata2(false)}
                    title="Quitar"
                  >
                    <CloseOutlined />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  
      {/* Datos de producción */}
      <div className="card mb-3">
        <div className="card-header py-2">
          <strong className="small">Datos de producción</strong>
        </div>
        <div className="card-body">
          <div className="row g-2">
            <div className="col-6 col-sm-3">
              <label className="form-label form-label-sm">Impregnados</label>
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Impregnados"
                {...register("impregnados", { required: true })}
              />
            </div>
  
            <div className="col-6 col-sm-3">
              <label className="form-label form-label-sm">Mermas</label>
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Mermas"
                {...register("mermas", { required: true })}
              />
            </div>
  
            <div className="col-6 col-sm-3">
              <label className="form-label form-label-sm">Código Inicio</label>
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
              <label className="form-label form-label-sm">Código Final</label>
              <input
                autoComplete="off"
                style={{ textTransform: "uppercase" }}
                placeholder="Código Final"
                type="text"
                className="form-control form-control-sm"
                {...register("codigoFin")}
              />
            </div>
          </div>
        </div>
      </div>
  
      {/* Series */}
      <div className="card mb-3">
        <div className="card-header py-2">
          <strong className="small">Series</strong>
        </div>
        <div className="card-body">
          <Table encabezadosTab={encabezado} datosTab={bodyRows} />
        </div>
      </div>
  
      {/* Resumen */}
      <div className="card mb-3">
        <div className="card-header py-2">
          <strong className="small">Resumen de estados</strong>
        </div>
        <div className="card-body">
          {Object.entries(resumenEstados).length === 0 ? (
            <div className="text-muted small">Sin selección</div>
          ) : (
            Object.entries(resumenEstados).map(([estado, cantidad]) => (
              <div key={estado} className="small">
                {estado}: {cantidad}
              </div>
            ))
          )}
          <div className="mt-1">
            <strong>Total:</strong> {highlighted.length}
          </div>
        </div>
      </div>
  
      {/* Error */}
      {error && (
        <div className="alert alert-danger w-100">{error}</div>
      )}
  
      {/* Acciones */}
      <div className="d-flex justify-content-end gap-2">
        <button
          type="submit"
          className="btn btn-sm btn-primary"
          disabled={loading || seriesOK.length === 0}
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default DTHH;
