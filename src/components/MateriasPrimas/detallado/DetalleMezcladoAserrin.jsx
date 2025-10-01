import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from "sweetalert2";
import Detalle from "../botonOT/Detalle";

const URL = process.env.REACT_APP_URL;

const DTHP = ({ encabezado, EncName, fecha_creacion, id, datosApi }) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [aserradero, setAserradero] = useState([]);
  const [patio, setPatio] = useState([]);
  const [matPrim, setMatPrim] = useState([]);
  const [id_creador, setid_creador] = useState("");
  const [lotesLiberados, setLotesLiberados] = useState([]);
  const [loteSelect, setLoteSelect] = useState("");
  const [idSelect, setIdSelect] = useState("");
  const [inventarioBarro, setInventarioBarro] = useState([]);
  const id_camionada_aserrin= watch('id_camionada_aserrin')
  console.log('inventarioBarro',loteSelect)
  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador"));
  }, []);

  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/Aserradero`),
      axios.get(`${URL}/Patios`),
      axios.get(`${URL}/MateriaPrima`),
      axios.get(`${URL}/etapas_barro_aprobados`,{params:{id_fase_aprobacion:6}}),

    ])
      .then(([AserraderoResponse, PatiosResponse, MatprimaResponse, etapas_materiaPrima]) => {
        setAserradero(AserraderoResponse.data);
        setPatio(PatiosResponse.data);
        setMatPrim(MatprimaResponse.data);
        setLotesLiberados(etapas_materiaPrima.data)
      })
      .catch((error) => {
        // Si estas cargas iniciales fallan, también lo mostramos
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "No se pudieron cargar datos iniciales.";
        Swal.fire({
          icon: "error",
          title: "Error al cargar datos",
          text: msg,
        });
      });
  }, []);

  
 

  const onSubmit = async (formData) => {
    try {
      // Asegura tipos numéricos
      const payload = {
        id_ot_mezclado_aserrin: String(datosApi.id),
        sacos: Number(formData.sacos),
        tiempo_mezclado: Number(formData.tiempo_mezclado),
        id_creador: id_creador,
        id_camionada_aserrin: formData.id_camionada_aserrin
      };

      const response = await axios.post(`${URL}/DT_mezclado_aserrin`, payload);

      Swal.fire({
        icon: "success",
        title: "Guardado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.href = "/Home/TablaProcesoDeMezclado";
      }, 1500);
    } catch (error) {
      // ------ AQUÍ MOSTRAMOS EL ERROR DEL ENVÍO ------
      // Preferimos el mensaje que venga de la API; si no, usamos el genérico
      const status = error?.response?.status;
      const apiMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Ocurrió un error al enviar los datos.";

      Swal.fire({
        icon: "error",
        title: "No se pudo guardar",
        html: `<p><b>Detalle:</b> ${apiMsg}</p>${
          status ? `<p><small>Código: ${status}</small></p>` : ""
        }`,
        confirmButtonText: "Entendido",
      });
      // Opcional: console extra para depurar
      console.error("Error al enviar los datos:", error);
    }
  };

  const SelectLote = (event) => {
    console.log('evente',event.target.value)
    setLoteSelect(event.target.value);

    const LotesID = Object.fromEntries(
      Array.isArray(lotesLiberados.rows) &&
        lotesLiberados.rows.map((lote) => [lote.id, lote])
    );

    const IdSelect = LotesID[event.target.value];
    setIdSelect(IdSelect?.muestra_id);
  };

  const Inventario = async () => {
    await axios
      .get(`${URL}/AserrinInventario/${loteSelect}`)
      .then((res) => setInventarioBarro(res.data.rows))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    Inventario();
  }, [loteSelect]);

  const Disponible =
  Array.isArray(inventarioBarro) &&
  inventarioBarro.map((inv) => {
    return inv.SacosDisponibles;
  });

  return (
    <div className="mt-4">
      <h4 style={{ textAlign: "center", color: "gray" }}>Toma de datos</h4>

      

      <div className="card">
        <div className="card-body">
          <label htmlFor="materiaPrima" className="form-label">
            Orden
          </label>
          <p id="materiaPrima" className="form-control-static">
            {datosApi?.EncName} - {datosApi?.id}
          </p>

          <label htmlFor="fecha" className="form-label">
            Fecha de Creación
          </label>
          <p id="fecha" className="form-control-static">
            {datosApi?.fecha_creacion ? formatFecha(datosApi.fecha_creacion) : "—"}
          </p>
        </div>
      </div>

   
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3" noValidate>

      <div className="col-md-6">
            <label htmlFor="aserradero" className="form-label">
            Camionada de aserrín
            </label>
            <select
              className="form-select"
              id="id_camionada_aserrin"
              {...register("id_camionada_aserrin")}
             value={loteSelect}
              onChange={SelectLote}
              required
            >
              <option value="" disabled selected>
                Seleccione...
              </option>
              {Array.isArray(lotesLiberados.rows) &&
                lotesLiberados.rows.length > 0 &&
                lotesLiberados.rows.map((lote) => (
                  <option key={lote.muestra_id} value={lote.muestra_id}>
                    {lote.codigo_lote}
                  </option>
                ))}
            </select>

          </div>

          <div
              style={{
                // backgroundColor: '#f8d7da',
                color: "#721c24",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #f5c6cb",
                marginTop: "10px",
              }}
            >
            Sacos disponibles:{" "}
              <strong>{Disponible} Sacos</strong>
            </div>
            
{Disponible==0?
<div
              style={{
                // backgroundColor: '#f8d7da',
                color: "#721c24",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #f5c6cb",
                marginTop: "10px",
              }}
            >
            La cantidad de sacos no es suficiente:{" "}
              <strong>{Disponible} Sacos</strong>
            </div>
            :
            <>
        <div className="col-md-6">
          <label htmlFor="sacos" className="form-label">
            Cantidad de Sacos
          </label>
          <input
            type="number"
            className={`form-control ${errors.sacos ? "is-invalid" : ""}`}
            id="sacos"
            {...register("sacos", {
              required: "La cantidad de sacos es obligatoria",
              valueAsNumber: true,
              min: { value: 1, message: "Debe ser al menos 1" },
            })}
          />
          {errors.sacos && (
            <div className="invalid-feedback">{errors.sacos.message}</div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="tiempo_mezclado" className="form-label">
            Tiempo de mezclado (minutos)
          </label>
          <input
            type="number"
            className={`form-control ${errors.tiempo_mezclado ? "is-invalid" : ""}`}
            id="tiempo_mezclado"
            {...register("tiempo_mezclado", {
              required: "El tiempo de mezclado es obligatorio",
              valueAsNumber: true,
              min: { value: 1, message: "Debe ser al menos 1 minuto" },
            })}
          />
          {errors.tiempo_mezclado && (
            <div className="invalid-feedback">{errors.tiempo_mezclado.message}</div>
          )}
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </div>
        </>
}
      </form>
    </div>
  );
};

export default DTHP;
