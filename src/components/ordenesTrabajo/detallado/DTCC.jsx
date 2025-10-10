import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { formatFecha } from "../../utilidades/FormatearFecta";
import { Space } from "antd";
import PostSeriesProduccion from "../../../services/PostSeriesProduccion";
import PutSeriesProduccion from "../../../services/PutSeriesProduccion";

const URL = process.env.REACT_APP_URL;

const DTHP = ({
  datosOrden,
  TodasLasSeries,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      aprobados: 0,
      reasignado:0,
      altos: 0,
      bajos: 0,
      mermas_hornos: 0,
      rajadosCC: 0,
      crudoCC: 0,
      quemados: 0,
      ahumados: 0,
      sin_tasa: 0,
   
      fecha_real: "",
      id_operarioCC: "",
      id_auditor: "",
      turnoCC: "",
      modelo: "",
      id_horno: "",
      codigoInicio: "",
      codigoFin: "",
      fechaHorneado: "",
      turnoHorneado: "",
    },
  });
console.log('Valor de reasignado en consola'
  ,watch('reasignado'))
  const [operario, setOperario] = useState([]);
  const [modelo, setModelo] = useState([]);
  const [turno, setTurno] = useState([]);
  const [hornos, setTHornos] = useState([]);
  const [id_creador, setid_creador] = useState("");
  const [loading, setLoading] = useState(false);
  const [suma, setSuma] = useState(0);
  const [error, setError] = useState("");
  const id_area = 4;
  const id_area2 = 9;
  const maquinaria = "Horno";
  const horneado=datosOrden.horneado
  const id_dthh=datosOrden.id
  const id_modelo=datosOrden.id_modelo
  const id_horno=datosOrden.id_horno
  const fechaHorneado=formatFecha(datosOrden.fechaHorneado)
  const id_turno=datosOrden.id_turno
  const ProcesoID= id_modelo==1?12:14
  console.log('proceso',ProcesoID)
console.log('id_dthh',datosOrden)
  // --------- carga de catálogos ---------
  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador") || "");

    const fetchData = async () => {
      try {
        const [OperariosResponse, ufModeloResponse, HornosResponse, turnoResponse] =
          await Promise.all([
            axios.get(`${URL}/Operarios/${id_area}/${id_area2}`),
            axios.get(`${URL}/ModelosUF`),
            axios.get(`${URL}/maquinaria/${maquinaria}`),
            axios.get(`${URL}/Turnos`),
          ]);
        setOperario(OperariosResponse.data);
        setModelo(ufModeloResponse.data);
        setTHornos(HornosResponse.data);
        setTurno(turnoResponse.data);
      } catch (err) {
        setError(err?.message || "Error al cargar catálogos");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const showSkeleton = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  // --------- normalizador + conteo robusto ---------
  const normalizeEstado = (v) => {
    if (v == null) return "SIN_ESTADO";
    return String(v)
      .trim()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita tildes
      .toUpperCase(); // OK, RAJADO, OVALADO, BAJO, ALTO, ...
  };

  const contarPorEstado = (arr = []) =>
    arr.reduce((acc, { estado }) => {
      const key = normalizeEstado(estado);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  // clave basada en contenido para disparar el efecto aunque no cambie la referencia del array
  const seriesKey = useMemo(() => {
    const a = Array.isArray(TodasLasSeries) ? TodasLasSeries : [];
    return a
      .map((x) => `${x.serie ?? ""}|${normalizeEstado(x.estado)}`)
      .join("§");
  }, [TodasLasSeries]);


  // lista de series con estado OK
  // const seriesOK = (TodasLasSeries ?? [])
  // .filter(x => String(x.estado).trim().toUpperCase() === 'OK')
  // .map(x => x.serie);

  const seriesOK = (TodasLasSeries ?? [])
  .filter(x => {
    const estado = String(x.estado).trim().toUpperCase();
    return estado === 'OK' || estado === 'REASIGNADO';
  })
  .map(x => x.serie);


  console.log('series ok y reasignado',seriesOK)


  const TodasSeriesSelect = (TodasLasSeries ?? [])
  .filter(x => String(x.estado).trim().toUpperCase())
  .map(x => x.serie);


  // lista de todas las series con mermas
// const estadosYSeries = TodasLasSeries.map(({ estado, serie }) => ({serie }));
//   console.log('estadosYSeries',estadosYSeries);

  // --------- rellena el form cuando cambian las series (por contenido) ---------
  useEffect(() => {
    const c = contarPorEstado(TodasLasSeries ?? []);
    console.log('datos en el c de series',c)

    // Si quieres preservar campos ya llenados por el usuario:
    const actuales = getValues();
    reset(
      {
        ...actuales,
        // Ajusta mapeo según tu negocio
        aprobados:     Number(c.OK ?? 0),
        reasignado: Number(c.REASIGNADO ?? 0),
        altos:         Number(c.ALTO ?? 0),
        bajos:         Number(c.BAJO ?? 0),
        rajadosCC:     Number(c.RAJADO ?? 0),
        rajados_horno:     Number(c.RAJADO_HORNO ?? 0),
        desportillado:     Number(c.DESPORTILLADO ?? 0),
        desportillado_horno:     Number(c.DESPORTILLADO_HORNO ?? 0),
        sin_tasa:     Number(c.SIN_TASA ?? 0),
        // Regla de mermas_hornos: ahora = OVALADO
        // Si prefieres (RAJADO + OVALADO + BAJO + ALTO) usa la línea comentada debajo
        ovalado: Number(c.OVALADO ?? 0),
        // mermas_hornos: Number((c.RAJADO ?? 0) + (c.OVALADO ?? 0) + (c.BAJO ?? 0) + (c.ALTO ?? 0)),
        crudoCC:       Number(c.CRUDO ?? 0),
        quemados:      Number(c.QUEMADO ?? 0),
        quemados_horno:Number(c.QUEMADO_HORNO ?? 0),
        ahumados:      Number(c.AHUMADO ?? 0),
        Desperfecto_de_produccion: Number(c.DESPERFECTO_DE_PRODUCCION ?? 0),
        ahumados_horno:Number(c.AHUMADO_HORNO ?? 0)
        
      },
      { keepDirty: false, keepTouched: true }
    );

    // Si prefieres setValue campo por campo en lugar de reset:
    // Object.entries({
    //   aprobados: c.OK ?? 0, altos: c.ALTO ?? 0, bajos: c.BAJO ?? 0, rajadosCC: c.RAJADO ?? 0,
    //   mermas_hornos: c.OVALADO ?? 0, crudoCC: c.CRUDO ?? 0, quemados: c.QUEMADO ?? 0, ahumados: c.AHUMADO ?? 0,
    // }).forEach(([name, val]) =>
    //   setValue(name, Number(val) || 0, { shouldDirty: true, shouldValidate: true, shouldTouch: true })
    // );
  }, [seriesKey, reset, getValues]); // depende del contenido, no de la referencia

  // --------- suma automática ---------
  const formValues = watch([
    "aprobados",
    "reasignado",
    "altos",
    "bajos",
    "mermas_hornos",
    "rajadosCC",
    "rajados_horno",
    "crudoCC",
    "quemados",
    "sin_tasa",
    "quemados_horno",
    "ahumados",
    "ahumados_horno",
    "desportillado",
    "desportillado_horno",
    "Desperfecto_de_produccion",
    "ovalado"
  ]);

  useEffect(() => {
    const sumaCampos = formValues.reduce(
      (acc, v) => acc + (Number.isFinite(v) ? v : parseInt(v) || 0),
      0
    );
    setSuma(sumaCampos);
  }, [formValues]);

  // --------- submit ---------
  const onSubmit = async (formData) => {
    if (suma !== horneado) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La suma de los campos no puede ser menor ni mayor que lo Horneado, verifica tus datos",
      });
      return;
    }

    try {
      await axios.post(`${URL}/DTCC`, {
        id_dthh: id_dthh,
        fecha_real: formData.fecha_real,
        horneado,
        codigoInicio: formData.codigoInicio,
        codigoFin: formData.codigoFin,
        id_operarioCC: formData.id_operarioCC,
        id_auditor: formData.id_auditor,
        modelo: id_modelo,
        id_horno: id_horno,
        turnoCC: formData.turnoCC,
        fechaHorneado: fechaHorneado,
        turnoHorneado: id_turno,
        aprobados: formData.aprobados,
        altos: formData.altos,
        bajos: formData.bajos,
        rajadosCC: formData.rajadosCC,
        crudoCC: formData.crudoCC,
        quemados: formData.quemados,
        sin_tasa: formData.sin_tasa,
        ahumados: formData.ahumados,
        Desperfecto_de_produccion:formData.Desperfecto_de_produccion,
        rajados_horno:formData.rajados_horno,
        desportillado:formData.desportillado,
        desportillado_horno:formData.desportillado_horno,
        ovalado:formData.ovalado,
        quemados_horno:formData.quemados_horno,
        ahumados_horno:formData.ahumados_horno,
        reasignado:formData.reasignado,
        id_creador,
      });

      window.location.href = "/Home/TablaOT";
      
      if (seriesOK.length > 0) {
        await PostSeriesProduccion({
          serialProduccion: seriesOK,
          id_modelo: id_modelo,
          id_proceso: ProcesoID,
          id_dtp:id_dthh
        });
      }

      if (TodasSeriesSelect.length > 0) {
        await PutSeriesProduccion({
          serialProduccion: TodasSeriesSelect,
          id_modelo: id_modelo,
          id_proceso: 10,
          disponibilidad:"Indisponible",
        });
      }

      Swal.fire({
        icon: "success",
        title: "Guardado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        setLoading(false);
        window.location.href = "/Home/TablaOT";
      }, 1500);
    } catch (err) {
      setLoading(false);
      console.error("Error al enviar los datos:", err);
      setError(err?.message || "Error al enviar");
    }

    showSkeleton();
  };

  return (
    <div className="mt-4">
      <h4 style={{ textAlign: "center", color: "gray" }}>Control de Calidad</h4>

      <div
  className="border rounded-3 shadow-sm bg-body-tertiary px-2 py-1 small d-flex flex-wrap align-items-center gap-2"
  style={{ lineHeight: 1.1 }}
>
  {[
    { k: 'Hornero',   v: datosOrden?.Hornero ?? '-',   cls: 'text-bg-light' },
    { k: 'Modelo',    v: datosOrden?.ModeloEco ?? '-', cls: 'text-bg-light' },
    { k: 'Código',    v: `${datosOrden?.codigoInicio ?? '-'} – ${datosOrden?.codigoFin ?? '-'}`, cls: 'text-bg-light' },
    { k: 'Horneado',  v: horneado ?? 0,                cls: 'bg-primary-subtle text-primary-emphasis' },
    { k: 'Suma',      v: suma ?? 0,                    cls: 'bg-success-subtle text-success-emphasis' },
  ].map((item, i, arr) => (
    <React.Fragment key={item.k}>
      <span className={`badge rounded-pill ${item.cls} text-truncate`} style={{ maxWidth: 280 }}>
        {item.k}: <b className="ms-1">{item.v}</b>
      </span>
      {i < arr.length - 1 && <span className="text-muted">•</span>}
    </React.Fragment>
  ))}
</div>


      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">
        {loading ? (
          <Space direction="vertical" style={{ width: "100%" }} size={16}>
            <img
              src="/images/laptop.gif"
              alt="Cargando"
              style={{
                width: "300px",
                display: "block",
                margin: "0 auto",
                filter: "brightness(1.2) contrast(1.2)",
              }}
            />
          </Space>
        ) : (
          <>
            <div className="col-md-6">
              <label className="form-label">Responsable de CC</label>
              <select className="form-select" id="id_operarioCC" {...register("id_operarioCC")} required>
                <option value="" disabled>Seleccione...</option>
                {operario.rows &&
                  Array.isArray(operario.rows) &&
                  operario.rows
                    .filter((o) => o.id_area === 4)
                    .map((o) => (
                      <option key={o.id} value={o.id}>{o.Nombre}</option>
                    ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Auditor de Procesos</label>
              <select className="form-select" id="id_auditor" {...register("id_auditor")} required>
                <option value="" disabled>Seleccione...</option>
                {operario.rows &&
                  Array.isArray(operario.rows) &&
                  operario.rows
                    .filter((o) => o.id_area === 9)
                    .map((o) => (
                      <option key={o.id} value={o.id}>{o.Nombre}</option>
                    ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Turno de CC</label>
              <select className="form-select" id="turnoCC" {...register("turnoCC")} required>
                <option value="" disabled>Seleccione...</option>
                {Array.isArray(turno.rows) &&
                  turno.rows.length > 0 &&
                  turno.rows.map((t) => (
                    <option key={t.id} value={t.id}>{t.turno}</option>
                  ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Control de calidad</label>
              <input type="date" className="form-control" id="fecha_real" {...register("fecha_real")} required />
            </div>

            {/* Campos numéricos (valueAsNumber para que sean números reales) */}
            <div className="col-md-6">
              <label className="form-label">Aprobados</label>
              <input type="number" className="form-control" id="aprobados" {...register("aprobados", { valueAsNumber: true })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Reasignado</label>
              <input type="number" className="form-control" id="reasignado" {...register("reasignado", { valueAsNumber: true })} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Altos</label>
              <input type="number" className="form-control" id="altos" {...register("altos", { valueAsNumber: true })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Sin Tasa</label>
              <input type="number" className="form-control" id="sin_tasa" {...register("sin_tasa", { valueAsNumber: true })} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Bajos</label>
              <input type="number" className="form-control" id="bajos" {...register("bajos", { valueAsNumber: true })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Ovalado</label>
              <input type="number" className="form-control" id="ovalado" {...register("ovalado", { valueAsNumber: true })} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Quemado en C.c</label>
              <input type="number" className="form-control" id="quemados" {...register("quemados", { valueAsNumber: true })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Quemado de hornos</label>
              <input type="number" className="form-control" id="quemados_horno" {...register("quemados_horno", { valueAsNumber: true })} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Rajado de hornos</label>
              <input type="number" className="form-control" id="rajados_horno" {...register("rajados_horno", { valueAsNumber: true })} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Rajados de C.C</label>
              <input type="number" className="form-control" id="rajadosCC" {...register("rajadosCC", { valueAsNumber: true })} required />
            </div>

            {/* <div className="col-md-6">
              <label className="form-label">Crudos de C.C</label>
              <input type="number" className="form-control" id="crudoCC" {...register("crudoCC", { valueAsNumber: true })} required />
            </div> */}


            <div className="col-md-6">
              <label className="form-label">Ahumados</label>
              <input type="number" className="form-control" id="ahumados" {...register("ahumados", { valueAsNumber: true })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Desportillados</label>
              <input type="number" className="form-control" id="ahumados_horno" {...register("ahumados_horno", { valueAsNumber: true })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Desportillados de Hornos</label>
              <input type="number" className="form-control" id="desportillado" {...register("desportillado", { valueAsNumber: true })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Ahumados de Hornos</label>
              <input type="number" className="form-control" id="desportillado_horno" {...register("desportillado_horno", { valueAsNumber: true })} required />
            </div>
             <div className="col-md-6">
              <label className="form-label">Desperfecto de Producción</label>
              <input type="number" className="form-control" id="Desperfecto_de_produccion" {...register("Desperfecto_de_produccion", { valueAsNumber: true })} required />
            </div>

           

            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default DTHP;
