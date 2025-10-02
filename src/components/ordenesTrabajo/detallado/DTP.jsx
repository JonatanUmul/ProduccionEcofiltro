import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from "sweetalert2"; // Importar SweetAlert
import { Skeleton, Space } from "antd";
import Detalle from '../botonOT/Detalle'

const URL = process.env.REACT_APP_URL;

const maquinaria = "Mezcladora ";
const DTHP = ({ encabezado, EncName, fecha_creacion, id }) => {
 
  const { handleSubmit, register, watch, formState: { errors } } = useForm();

  const [aserradero, setAserradero] = useState([]);
  const [turno, setTurno] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [cernidoDetalle, setCernidoDetalle] = useState([]);
  const [grupodetrabajo, setGrupodetrabajo] = useState([]);
  const [error, setError] = useState("");
  const [formula2, setFormula2] = useState(false);
  const [id_creador, setid_creador] = useState("");
  const [mezcladora, setMezcladora] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lotesLiberados, setLotesLiberados] = useState([]);
  const [dtfmLiberados, setDTFMLiberados] = useState([]);
  const [loteSelect, setLoteSelect] = useState("");
  const [inventarioBarro, setInventarioBarro] = useState([]);
  const [idSelect, setIdSelect] = useState("");
  const [consultaUltimoCodigo, setConsultaUltimoCodigo] = useState([]);
  const TotalLbBarro = watch("librasBarro") * watch("formulas_usadas");
  const TotalLbAserrin = watch("librasAserrin") * watch("formulas_usadas");
  const modelo = watch("id_ufmodelo");
  const producido = watch("producido");
  const identificador = watch("identificador");

  const id_camionada_barro = watch("id_camionada_barro");
  //const otfm_correlativo = watch("otfm_correlativo");
console.log('dtfmLiberados',dtfmLiberados)
console.log('id_camionada_barro',id_camionada_barro)
//console.log('otfm_correlativo',otfm_correlativo)
  
  const Disponible =
    Array.isArray(inventarioBarro) &&
    inventarioBarro.map((inv) => {
      return inv.peso_total_libras;
    });

  const fecha_cre = new Date(fecha_creacion);
  const dia = String(fecha_cre.getDate()).padStart(2, "0");
  const mes = String(fecha_cre.getMonth() + 1).padStart(2, "0");
  const año = fecha_cre.getFullYear().toString().slice(-2);
  const fechaConcatenado=dia+mes+año
  const codigoInicio = identificador + consultaUltimoCodigo[0]?.codigoFinal+'0'+dia+mes+año;
  const CodigoInicioNumber=consultaUltimoCodigo[0]?.codigoFinal
  const codigoFinal = parseInt(consultaUltimoCodigo[0]?.codigoFinal || 0);
  const cantidadProducida = parseInt(producido || 0);
  const CodigoFinalNumber = codigoFinal + cantidadProducida-1;
  const codigoFin = identificador + CodigoFinalNumber + '0' + dia + mes + año;



  const datosParaCodigos={
    producido,
    identificador,
    CodigoInicioNumber,
    fechaConcatenado
  }
  const showSkeleton = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador"));
  });

  const Solicitudes = () => {
    Promise.all([
      axios.get(`${URL}/Turnos`),
      axios.get(`${URL}/Aserradero`),
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/CernidoDetalle`),
      axios.get(`${URL}/GrupodeTrabajo`),
      axios.get(`${URL}/maquinaria/${maquinaria}`),
      axios.get(`${URL}/etapas_barro_aprobados`,{params:{id_fase_aprobacion:4}}),
      axios.get(`${URL}/DTFM_ABIERTOS`),
    ])
      .then(
        ([
          TurnosResponse,
          AserraderoResponse,
          ModelosufResponse,
          CernidodetalleResponse,
          GrupodeTrabajoResponse,
          MezcladoraResponse,
          etapas_barro,
          DTFM_ABIERTOS
        ]) => {
          setTurno(TurnosResponse.data);
          setAserradero(AserraderoResponse.data);
          setModelos(ModelosufResponse.data);
          setCernidoDetalle(CernidodetalleResponse.data);
          setGrupodetrabajo(GrupodeTrabajoResponse.data);
          setMezcladora(MezcladoraResponse.data);
          setLotesLiberados(etapas_barro.data);
          setDTFMLiberados(DTFM_ABIERTOS.data);
        }
      )
      .catch((error) => {
        setError("Error al obtener los datos", error);
      });
  };

  const Inventario = async () => {
    await axios
      .get(`${URL}/BarroInventario/${idSelect}`)
      .then((res) => setInventarioBarro(res.data.rows))
      .catch((error) => console.log(error));
  };
  const DTPUltimoCodigo = async () => {
    await axios
      .get(`${URL}/DTPUltimoCodigo/${modelo}`)
      .then((response) => setConsultaUltimoCodigo(response.data.response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    DTPUltimoCodigo();
  }, [modelo]);

  useEffect(() => {
    Inventario();
  }, [idSelect]);
  useEffect(() => {
    Solicitudes();
  }, [modelo]);


  const onSubmit = async (formData) => {
    try {
       await axios.post(`${URL}/DTP`, {
        id_OTP: id.toString(),
        fecha_creacion:formatFecha(fecha_creacion),
        CodigoInicioNumber,
        CodigoFinalNumber,
        formData,
         otfm_correlativo:formData.otfm_correlativo,
        loteSelect:id_camionada_barro,
        id_creador: id_creador,
      }) ;
      Swal.fire({
        icon: "success",
        title: "Guardado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
    
      setTimeout(() => {
        window.location.href = "/Home/TablaOT";
      }, 1500);
      
    } catch (error) {
      setError("Error al enviar los datos:", error);
    }
    showSkeleton();
  };


  



  const llamar = () => {
    setFormula2(true);
  };

  const SelectLote = (event) => {
    console.log(event.target.value)
    setLoteSelect(event.target.value);

    const LotesID = Object.fromEntries(
      Array.isArray(lotesLiberados.rows) &&
        lotesLiberados.rows.map((lote) => [lote.id, lote])
    );

    const IdSelect = LotesID[event.target.value];
    setIdSelect(IdSelect.codigo_lote);
  };


  return (
    <div className="mt-4">
      <h4 style={{ textAlign: "center", color: "gray" }}>Producción</h4>
      <div className="card">
        <div className="card-body">
          <label htmlFor="materiaPrima" className="form-label">
            Orden
          </label>
          <p id="materiaPrima" className="form-control-static">
            {encabezado} - {EncName}
          </p>
          <label htmlFor="fecha" className="form-label">
            Fecha de Creación
          </label>
          <p id="fecha" className="form-control-static">
            {formatFecha(fecha_creacion)}
          </p>

<div className="col-md-6">
  <label htmlFor="otfm_correlativo" className="form-label">
    Lote de Aserrín
  </label>
  <select
    className="form-select"
    id="otfm_correlativo"
    {...register("otfm_correlativo", { required: "El lote de aserrín es obligatorio" })}
  >
    <option value="">Seleccione...</option>
    {Array.isArray(dtfmLiberados.rows) &&
      dtfmLiberados.rows.length > 0 &&
      dtfmLiberados.rows.map((lote) => (
        <option key={lote.id} value={lote.id}>
          {lote.correlativo}
        </option>
      ))}
  </select>


  {errors.otfm_correlativo && (
    <span style={{ color: "red", fontSize: "14px" }}>
      {errors.otfm_correlativo.message}
    </span>
  )}
</div> 

          <div className="col-md-6">
            <label htmlFor="aserradero" className="form-label">
              Lote de Barro
            </label>
            <select
              className="form-select"
              id="id_camionada_barro"
              {...register("id_camionada_barro")}
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
                  <option key={lote.id} value={lote.id}>
                    {lote.codigo_lote}
                  </option>
                ))}
            </select>

            <Detalle encabezado={'CodigosProduccion'} datosParaCodigos={datosParaCodigos} crearCodigos/>
          </div>
          {!idSelect ? (
            ""
          ) : (
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
              Libras de Barro Disponible para este lote:{" "}
              <strong>{Disponible} LB</strong>
            </div>
          )}
        </div>
      </div>

      {/*iniioc de form */}
      {!idSelect ? (
        <div
          style={{
            backgroundColor: "#fff3cd",
            color: "#856404",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ffeeba",
            marginTop: "15px",
          }}
        >
          Para continuar, seleccione un lote de barro. Esto habilitará el
          formulario completo.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">
          {loading ? (
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
              size={16}
            >
              <p>Enviando los datos... espere...</p>
              <Skeleton loading={loading}></Skeleton>
            </Space>
          ) : (
            <>
              <div className="col-md-6">
                <label htmlFor="aserradero" className="form-label">
                  Turno de Producción
                </label>
                <select
                  className="form-select"
                  id="id_turno"
                  {...register("id_turno")}
                  required
                >
                  <option value="" disabled selected>
                    Seleccione...
                  </option>
                  {Array.isArray(turno.rows) &&
                    turno.rows.length > 0 &&
                    turno.rows.map((turno) => (
                      <option key={turno.id} value={turno.id}>
                        {turno.turno}
                      </option>
                    ))}
                </select>
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

         

              <div className="col-md-6">
                <label htmlFor="aserradero" className="form-label">
                  Grupo de Producción
                </label>
                <select
                  className="form-select"
                  id="id_grupoproduccion"
                  {...register("id_grupoproduccion")}
                  required
                >
                  <option value="" disabled selected>
                    Seleccione...
                  </option>

                  {Array.isArray(grupodetrabajo.rows) &&
                    grupodetrabajo.rows.length > 0 &&
                    grupodetrabajo.rows.map((grupodetrabajo) => (
                      <option key={grupodetrabajo.id} value={grupodetrabajo.id}>
                        {grupodetrabajo.grupos}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="aserradero" className="form-label">
                  Mezcladora
                </label>
                <select
                  className="form-select"
                  id="id_mezcladora"
                  {...register("id_mezcladora")}
                >
                  <option value="" disabled selected>
                    Seleccione...
                  </option>
                  {Array.isArray(mezcladora.rows) &&
                    mezcladora.rows.length > 0 &&
                    mezcladora.rows.map((mezcladora) => (
                      <option key={mezcladora.id_maq} value={mezcladora.id_maq}>
                        {mezcladora.nombre_maq}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="esquinaSI" className="form-label">
                  Producido
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="producido"
                  {...register("producido")}
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="esquinaSD" className="form-label">
                  Identificador de lote
                </label>
                <input
                  autocomplete="on"
                  style={{ textTransform: "uppercase" }}
                  placeholder="Formato: AA"
                  type="text"
                  className="form-control"
                  id="identificador"
                  {...register("identificador")}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="esquinaSD" className="form-label">
                  Código de Inicio
                </label>
                <input
  autoComplete="off"
  style={{ textTransform: "uppercase" }}
  type="text"
  className="form-control"
  id="codigoInicio"
  placeholder={codigoInicio}
  value={CodigoInicioNumber}  
  {...register("codigoInicio")}
  required
/>

              </div>
              <div className="col-md-6">
                <label htmlFor="esquinaSD" className="form-label">
                  Código Final
                </label>
                <input
                  autocomplete="off"
                  style={{ textTransform: "uppercase" }}
   
                  type="text"
                  className="form-control"
                  id="codigoFinal"
                  placeholder={codigoFin}
                  value={CodigoFinalNumber}
                  {...register("codigoFinal")}
                  disabled
                  required
                />
              </div>

              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="librasBarro" className="form-label">
                      Lb Barro
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="librasBarro"
                      {...register("librasBarro")}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="formulas_usadas" className="form-label">
                      Fórmula
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formulas_usadas"
                      {...register("formulas_usadas")}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="formulas_usadas" className="form-label">
                      Total Lb Barro
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="total_lb_barro"
                      value={TotalLbBarro + " lb"}
                      disabled
                    />
                  </div>
                  {TotalLbBarro > Disponible ? (
                    <div
                      className="col-md-12 alert alert-danger mt-4"
                      role="alert"
                    >
                      El total de libras no puede ser mayor a lo disponible.
                      Verifique sus datos.
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* <div className="col-md-6">
                <label htmlFor="esquinaID" className="form-label">
                  Libras de Aserrin
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="librasAserrin"
                  {...register("librasAserrin")}
                  required
                />
              </div>
              <div className="col-md-4">
                    <label htmlFor="formulas_usadas" className="form-label">
                      Total Lb Barro
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="total_lb_barro"
                      value={TotalLbAserrin + " lb"}
                      disabled
                    />
                  </div> */}

              {/* {formula2 ? (
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="aserradero" className="form-label">
                        <strong>Aserradero 2</strong>
                      </label>
                      <select
                        className="form-select"
                        id="id_Aserradero2"
                        {...register("id_Aserradero2")}
                        required
                      >
                        <option value="" disabled selected>
                          Seleccione...
                        </option>

                        {Array.isArray(aserradero.rows) &&
                          aserradero.rows.length > 0 &&
                          aserradero.rows.map((aserradero) => (
                            <option key={aserradero.id} value={aserradero.id}>
                              {aserradero.nombre_aserradero}
                            </option>
                          ))}
                      </select>
                    </div>

                   
                    <div className="col-md-6">
                      <label htmlFor="esquinaID" className="form-label">
                        <strong>Libras de Aserrin 2 </strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="librasAserrin2"
                        {...register("librasAserrin2")}
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                false
              )} */}
              <div className="col-md-6">
                <label htmlFor="detalle" className="form-label">
                  Observaciòn:
                </label>
                <textarea
                  className="form-control"
                  id="observacion"
                  rows="3"
                  {...register("observacion")}
                ></textarea>
              </div>
              <div className="col-12">
                <label style={{ color: "red" }}>{error}</label>
              </div>
              {/* <div className="col-4">
                <a
                  type="button"
                  className="btn btn-danger mb-3"
                  onClick={llamar}
                >
                  Mix
                </a>
              </div> */}
     
              {/* {loteSelect >1 && TotalLbBarro < Disponible ? (
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              ) : (
                <div className="alert alert-warning" role="alert">
                  Para activar el botón de guardar, seleccione el lote de barro.
                </div>
              )} */}

<div className="col-12">
    <button type="submit" className="btn btn-primary">
      Guardar
    </button>
  </div>

 {loteSelect>0 && Number(Disponible) >= Number(TotalLbBarro) && Number(Disponible) >= 0  ?(
    <div className="col-12">
    <button type="submit" className="btn btn-primary">
      Guardar
    </button>
  </div>
):(
  <div className="alert alert-warning" role="alert">
  Para activar el botón de guardar, seleccione el lote de barro.
</div>
)} 

              
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default DTHP;
