
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
import { Skeleton, Space } from 'antd';
import { dark } from "@mui/material/styles/createPalette";
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';

const URL = process.env.REACT_APP_URL

const DTHP = ({ encabezado, EncName, fecha_creacion,id }) => {
  const { handleSubmit, register } = useForm();
  const [modelos, setModelos] = useState([]);
  const [plata, setPlata]=useState([])
  const [error, setError]= useState('')
  const [id_creador, setid_creador] = useState('');
  const [loading, setLoading] = useState(false);
  const [plata2, setplata2]=useState(false)
  const showSkeleton = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
      
  const insumo='Plata' 
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/Insumos/${insumo}`),
   
    ])
      .then(([ ModelosufResponse, insumoResponse]) => {
        setModelos(ModelosufResponse.data);
        setPlata(insumoResponse.data)
      })
      .catch((error) => {
        setError("Error al obtener los datos", error);
      });
  }, []);
  console.log('Plata',plata)
  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/DTIP` ,
      {
        id_OTIP: id.toString(),
        TipoPlata:formData.TipoPlata,
        TipoPlata2:formData.TipoPlata2,
        fecha_real:fecha_creacion,
        id_modelo: formData.id_modelo,
        codigoInicio: formData.codigoInicio.replace(/\s+/g, ''),
        codigoFinal: formData.codigoFinal.replace(/\s+/g, ''),
        impregnados: formData.impregnados,
        mermas: formData.mermas,
        id_creador:id_creador
      });Swal.fire({
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

console.log('datos props',encabezado, EncName, fecha_creacion,id)


  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Impregnación</h4>
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
              Tipo de Plata 
          </label>
          <a onClick={() => setplata2(true)} style={{ cursor: 'pointer' }}>
<PlusCircleOutlined />   
        </a>
        
                  <select className="form-select" id="TipoPlata" {...register("TipoPlata")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(plata.rows)
            && plata.rows.length>0 && plata.rows.map((plata) => (
              <option key={plata.id} value={plata.id}>
                {plata.insumo}
              </option>   
            ))}
          </select>
        </div>
{plata2 === true ? 
  <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
              Tipo de Plata 
          </label>
          <a onClick={() => setplata2(false)} style={{ cursor: 'pointer' }}>
<CloseOutlined />
        </a>
        
                  <select className="form-select" id="TipoPlata2" {...register("TipoPlata2")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(plata.rows)
            && plata.rows.length>0 && plata.rows.map((plata) => (
              <option key={plata.id} value={plata.id}>
                {plata.insumo}
              </option>   
            ))}
          </select>
        </div>
:''}
       

        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
          Código de Inicio
          </label>
          <input autocomplete="off"  style={{textTransform:'uppercase'}} placeholder="Formato: AA00000" type="text" className="form-control" id="codigoInicio" {...register("codigoInicio")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
          Código Final
          </label>
          <input autocomplete="off"  style={{textTransform:'uppercase'}} placeholder="Formato: AA00000" type="text" className="form-control" id="codigoFinal" {...register("codigoFinal")} required />
        </div>
      
  
        <div className="col-md-6">
          <label htmlFor="esquinaID" className="form-label">
           Impregnados
          </label>
          <input type="number" className="form-control" id="impregnados" {...register("impregnados")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaID" className="form-label">
           Mermas
          </label>
          <input type="number" className="form-control" id="mermas" {...register("mermas")} required />
        </div>
        <div className="col-12">
          <label style={{ color: 'red' }}>{error}</label>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
          </>)}
      </form>
    </div>
  );
};

export default DTHP;
