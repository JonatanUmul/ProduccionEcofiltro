import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from "sweetalert2";
import { Skeleton, Space } from "antd";

const URL = process.env.REACT_APP_URL;

/**
 * Componente DTHH
 * Permite registrar 1 o 2 mezclas de aserrín para la misma orden (mismo id_dtp).
 * Si el usuario pulsa "Mix", se habilita el segundo set de campos y, al enviar,
 * se crean dos registros consecutivos en la misma ruta `/DOTDMP`.
 */
const DTHH = ({ encabezado, EncName, fecha_creacion, id }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  /** Datos maestros */
  const [aserradero, setAserradero] = useState([]);
  const [cernidoDetalle, setCernidoDetalle] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  /** Otros estados */
  const [formula2, setFormula2] = useState(false);
  const [id_creador, setIdCreador] = useState("");
  const [loading, setLoading] = useState(false);

  /* Obtiene id_creador del localStorage */
  useEffect(() => {
    setIdCreador(localStorage.getItem("id_creador"));
  }, []);

  /* Carga catálogos */
  useEffect(() => {
    const maquinaria = "Horno";
    const id_area = 3;
    (async () => {
      try {
        const [AserraderoResponse, CernidoDetalleResponse] = await Promise.all([
          axios.get(`${URL}/Aserradero`),
          axios.get(`${URL}/CernidoDetalle`)
        ]);

        setAserradero(AserraderoResponse.data.rows || []);
        setCernidoDetalle(CernidoDetalleResponse.data.rows || []);
      } catch (err) {
        console.error(err);
        setErrorMsg("Error al obtener catálogos");
      }
    })();
  }, []);

  /* Muestra skeleton de envío */
  const showSkeleton = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  };

  /* Envío del formulario */
  const onSubmit = async (data) => {
    try {
      showSkeleton();

      // ----- primer registro -----
      await axios.post(`${URL}/DOTDMP`, {
        id_dtp: id.toString(),
        id_creador,
        id_aserradero: data.id_aserradero,
        id_cernidodetalle: data.id_cernidodetalle,
        lbaserrin: data.lbaserrin,
        mayor_2mm: data.mayor_2mm,
        entre_2_y_05mm: data.entre_2_y_05mm,
        menor_05mm: data.menor_05mm
      });

      // ----- segundo registro (opcional) -----
      const secondIsValid =
        formula2 &&
        data.id_aserradero2 &&
        data.id_cernidodetalle2 &&
        data.lbaserrin2 &&
        data.mayor_2mm2 &&
        data.entre_2_y_05mm2 &&
        data.menor_05mm2;

      if (secondIsValid) {
        await axios.post(`${URL}/DOTDMP`, {
          id_dtp: id.toString(),
          id_creador,
          id_aserradero: data.id_aserradero2,
          id_cernidodetalle: data.id_cernidodetalle2,
          lbaserrin: data.lbaserrin2,
          mayor_2mm: data.mayor_2mm2,
          entre_2_y_05mm: data.entre_2_y_05mm2,
          menor_05mm: data.menor_05mm2
        });
      }

      Swal.fire({
        icon: "success",
        title: "Guardado exitosamente",
        showConfirmButton: false,
        timer: 1500
      });

      setTimeout(() => {
        window.location.href = "/Home/TablaLab";
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error al enviar los datos: " + err.message);
      setLoading(false);
    }
  };

  /* Activa el segundo set de campos */
  const activarFormula2 = () => setFormula2(true);

  return (
    <div className="mt-4">
      <h4 className="text-center text-muted">Aserrín</h4>

      {/* Encabezado */}
      <div className="card">
        <div className="card-body">
          <label className="form-label">Orden</label>
          <p className="form-control-plaintext">
            {encabezado} - {EncName}
          </p>

          <label className="form-label">Fecha de creación</label>
          <p className="form-control-plaintext">{formatFecha(fecha_creacion)}</p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">
        {loading ? (
          <Space direction="vertical" style={{ width: "100%" }} size={16}>
            <p>Enviando los datos…</p>
            <Skeleton active />
          </Space>
        ) : (
          <>
            {/* --- Registro 1 --- */}
            <div className="col-md-6">
              <label className="form-label">Aserradero</label>
              <select
                className="form-select"
                {...register("id_aserradero", { required: true })}
              >
                <option value="" disabled>
                  Seleccione…
                </option>
                {aserradero.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nombre_aserradero}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Detalle Cernido</label>
              <select
                className="form-select"
                {...register("id_cernidodetalle", { required: true })}
              >
                <option value="" disabled>
                  Seleccione…
                </option>
                {cernidoDetalle.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.detalle}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">Granulometría de aserrín (%)</label>

              <div className="input-group mb-2">
                <span className="input-group-text">≥2.00 mm</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  className="form-control"
                  {...register("mayor_2mm", { required: true })}
                />
                <span className="input-group-text">%</span>
              </div>

              <div className="input-group mb-2">
                <span className="input-group-text">2.00 mm – 0.50 mm</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  className="form-control"
                  {...register("entre_2_y_05mm", { required: true })}
                />
                <span className="input-group-text">%</span>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">&lt;0.50 mm</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  className="form-control"
                  {...register("menor_05mm", { required: true })}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Cantidad de Aserrín (lb)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="form-control"
                {...register("lbaserrin", { required: true })}
              />
            </div>

            {/* --- Registro 2 (opcional) --- */}
            {formula2 && (
              <>
                <hr className="mt-4" />
                <h6 className="text-primary">Segundo Mix</h6>

                <div className="col-md-6">
                  <label className="form-label">Aserradero (Mix 2)</label>
                  <select
                    className="form-select"
                    {...register("id_aserradero2", { required: true })}
                  >
                    <option value="" disabled>
                      Seleccione…
                    </option>
                    {aserradero.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.nombre_aserradero}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Detalle Cernido (Mix 2)</label>
                  <select
                    className="form-select"
                    {...register("id_cernidodetalle2", { required: true })}
                  >
                    <option value="" disabled>
                      Seleccione…
                    </option>
                    {cernidoDetalle.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.detalle}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Granulometría de aserrín (%) – Mix 2</label>

                  <div className="input-group mb-2">
                    <span className="input-group-text">≥2.00 mm</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      className="form-control"
                      {...register("mayor_2mm2", { required: true })}
                    />
                    <span className="input-group-text">%</span>
                  </div>

                  <div className="input-group mb-2">
                    <span className="input-group-text">2.00 mm – 0.50 mm</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      className="form-control"
                      {...register("entre_2_y_05mm2", { required: true })}
                    />
                    <span className="input-group-text">%</span>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">&lt;0.50 mm</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      className="form-control"
                      {...register("menor_05mm2", { required: true })}
                    />
                    <span className="input-group-text">%</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Cantidad de Aserrín (lb) – Mix 2</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-control"
                    {...register("lbaserrin2", { required: true })}
                  />
                </div>
              </>
            )}

            {/* Botones */}
            <div className="col-12 d-flex align-items-center gap-3">
              {!formula2 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={activarFormula2}
                >
                  Mix
                </button>
              )}

              <button type="submit" className="btn btn-primary" disabled={loading}>
                Guardar
              </button>
            </div>

            {/* Mensaje de error */}
            {errorMsg && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMsg}
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default DTHH;
