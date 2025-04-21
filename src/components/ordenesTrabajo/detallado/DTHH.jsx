import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
import { Skeleton, Space } from 'antd';
const URL = process.env.REACT_APP_URL

const DTHH = ({ encabezado, EncName, fecha_creacion,id }) => {
  const { handleSubmit, register } = useForm();
  const [aserradero, setAserradero] = useState([]);
  const [turno, setTurno] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [hornos, setTHornos] = useState([]);
  const [hornero, setHornero] = useState([]);
  const [error, setError]= useState('');
  const [formula2, setFormula2]=useState(false);
  const [cernidoDetalle, setCernidoDetalle] = useState([]);
  const [id_creador, setid_creador] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })

  const maquinaria="Horno"; 
  const id_area=3;
  useEffect(() => {
    try {
      Promise.all([
        axios.get(`${URL}/Turnos`),
        axios.get(`${URL}/Aserradero`),
        axios.get(`${URL}/ModelosUF`),
        axios.get(`${URL}/CernidoDetalle`),
        axios.get(`${URL}/maquinaria/${maquinaria}`),
        axios.get(`${URL}/Operarios/${id_area}`)
      ])
        .then(([TurnosResponse, AserraderoResponse, ModelosufResponse, CernidodetalleResponse, HornosResponse, OperariosResponse]) => {
          setTurno(TurnosResponse.data);
          setAserradero(AserraderoResponse.data);
          setModelos(ModelosufResponse.data); 
          setCernidoDetalle(CernidodetalleResponse.data);
          setTHornos(HornosResponse.data);
          setHornero(OperariosResponse.data);
        })
        .catch((error) => {
          setError("Error al obtener los datos", error);
        });
    } catch(error) {
      setError("Error al obtener los datos", error);
    }
  }, []);

  const showSkeleton = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };


  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/DTHH` ,
      {
        id_OTHH: id.toString(),
        id_turno:formData.id_turno,
        id_aserradero: formData.id_aserradero,
        id_cernidodetalle: formData.id_cernidodetalle,
        id_modelo: formData.id_modelo,
        id_horno: formData.id_horno,
        id_hornero: formData.id_hornero,
        horneado: formData.horneado,
        mermasCrudas: formData.mermasCrudas,
        codigoInicio:formData.codigoInicio.replace(/\s+/g, ''),
        codigoFin:formData.codigoFin.replace(/\s+/g, ''),
        librasBarro:formData.librasBarro,
        librasAserrin:formData.librasAserrin,
        librasAserrin2:formData.librasAserrin2,
        id_aserradero2:formData.id_aserradero2,
        id_cernidodetalle2: formData.id_cernidodetalle2,
        id_creador:id_creador,
        id_est:2

      });
      Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
 
      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/TablaOT";
      },1500 );
    } catch (error) {
      setError("Error al enviar los datos:", error);
    }
    showSkeleton();
  };
  const llamar=()=>{
    setFormula2(true);
  }
  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Hornos</h4>
      <div className="card">
        <div className="card-body">
          <label htmlFor="materiaPrima" className="form-label">
            Orden
          </label>
          <p id="materiaPrima" className="form-control-static">{encabezado} - {EncName}</p>
          <label htmlFor="fecha" className="form-label">
            Fecha de Creación
          </label>
          <p id="fecha" className="form-control-static">{formatFecha(fecha_creacion)}</p>
        </div>
      </div>

      {/*iniioc de form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">

      {loading?(
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
          size={16}
        >
        <p>Enviando los datos... espere...</p>
          <Skeleton loading={loading}>
          
          </Skeleton>
         
        </Space>
      ):(<>
      <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
              Turno de Horneado
          </label>
          <select className="form-select" id="id_turno" {...register("id_turno")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(turno.rows)
            && turno.rows.length>0 && turno.rows.map((turno) => (
              <option key={turno.id} value={turno.id}>
                {turno.turno}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
              Aserradero
          </label>
          <select className="form-select" id="id_aserradero" {...register("id_aserradero")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(aserradero.rows)
            && aserradero.rows.length>0 && aserradero.rows.map((aserradero) => (
              <option key={aserradero.id} value={aserradero.id}>
                {aserradero.nombre_aserradero}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
        <label htmlFor="aserradero" className="form-label">
            Detalle Cernido
        </label>
        <select className="form-select" id="id_cernidodetalle" {...register("id_cernidodetalle")} required>
        <option value="" disabled selected>Seleccione...</option>
        
        {Array.isArray(cernidoDetalle.rows)
          && cernidoDetalle.rows.length>0 && cernidoDetalle.rows.map((cernidoDetalle) => (
            <option key={cernidoDetalle.id} value={cernidoDetalle.id}>
              {cernidoDetalle.detalle}
            </option>
          ))}
        </select>
      </div>
   
        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
              Modelo
          </label>
          <select className="form-select" id="id_modelo" {...register("id_modelo")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(modelos.rows)
            && modelos.rows.length>0 && modelos.rows.map((modelo) => (
              <option key={modelo.id_mod} value={modelo.id_mod}>
                {modelo.nombre_modelo}
              </option>
            ))}
          </select>
        </div>


        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
              Horno
          </label>
          <select className="form-select" id="id_horno" {...register("id_horno")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(hornos.rows)
            && hornos.rows.length>0 && hornos.rows.map((horno) => (
              <option key={horno.id_maq} value={horno.id_maq}>
                {horno.nombre_maq}
              </option>
            ))}
          </select>
        </div>
       
        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
              Hornero
          </label>
          <select className="form-select" id="id_hornero" {...register("id_hornero")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(hornero.rows)
            && hornero.rows.length>0 && hornero.rows.map((hornero) => (
              <option key={hornero.id} value={hornero.id}>
                {hornero.Nombre}
              </option>
            ))}
          </select>
        </div>
       
    
    
        <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
            Horneado
          </label>
          <input type="number" className="form-control" id="horneado" {...register("horneado")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaID" className="form-label">
           Mermas Crudas
          </label>
          <input type="number" className="form-control" id="mermasCrudas" {...register("mermasCrudas")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
            Codigo de Inicio
          </label>
          <input  autocomplete="off" style={{textTransform:'uppercase'}}  placeholder="Formato: AA00000" type="text" className="form-control" id="codigoInicio" {...register("codigoInicio")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
            Codigo Final
          </label>
          <input  autocomplete="off" style={{textTransform:'uppercase'}} placeholder="Formato: AA00000" type="text" className="form-control" id="codigoFin" {...register("codigoFin")} required />
        </div>
      
        <div className="col-md-6">
          <label htmlFor="esquinaII" className="form-label">
            Libras de Barro
          </label>
          <input type="text" className="form-control" id="librasBarro" {...register("librasBarro")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaID" className="form-label">
           Libras de Aserrin
          </label>
          <input type="text" className="form-control" id="librasAserrin" {...register("librasAserrin")} required />
        </div>
        <div className="col-12">
          <label style={{ color: 'red' }}>{error}</label>
        </div>


        
        {formula2 ? (
          <div className="row mt-3"> 
    <div className="col-md-12">
    <div className="row">
          <h5>Formula 2</h5>
          <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Aserradero 2
          </label>
          <select className="form-select" id="id_aserradero2" {...register("id_aserradero2")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(aserradero.rows)
            && aserradero.rows.length>0 && aserradero.rows.map((aserradero) => (
              <option key={aserradero.id} value={aserradero.id}>
                {aserradero.nombre_aserradero}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-md-6">
        <label htmlFor="aserradero" className="form-label">
            Detalle Cernido
        </label>
        <select className="form-select" id="id_cernidodetalle2" {...register("id_cernidodetalle2")} required>
        <option value="" disabled selected>Seleccione...</option>
        
        {Array.isArray(cernidoDetalle.rows)
          && cernidoDetalle.rows.length>0 && cernidoDetalle.rows.map((cernidoDetalle) => (
            <option key={cernidoDetalle.id} value={cernidoDetalle.id}>
              {cernidoDetalle.detalle}
            </option>
          ))}
        </select>
      </div>

            <div className="col-md-6">
              <label htmlFor="esquinaSD" className="form-label">
                Libras de Aserrin 2
              </label>
              <input type="text" className="form-control" id="librasAserrin2" {...register("librasAserrin2")} required />
            </div>
            
          </div>
          </div>
          </div>

        ) :false}
        
        <div className="col-12">
        <div className="col-4">
        <a type="button" className="btn btn-danger mb-3" onClick={llamar}>Mix</a>
        </div>

    
          <button type="submit" className="btn btn-primary" disabled={loading}>Guardar</button>
        </div>
        </>
)}
      </form>
    </div>
  );
};

export default DTHH;
