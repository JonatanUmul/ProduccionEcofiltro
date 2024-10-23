import React, {useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
const URL = process.env.REACT_APP_URL;

const CreatProv = () => {
  const { handleSubmit, register } = useForm();
  const [tipoPV, setTipoProv]= useState([]);

  const [prov, setProv]= useState({
    nombre: '',
    telefono: '', 
    correo: '',
    sitio_web: '', 
    id_creador: '',
    id_tip: ''
  });
  console.log(prov)

  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/TipoProv`),
    ])
    .then(([TipsProvResponse]) => {
      setTipoProv(TipsProvResponse.data);
      console.log('Datos de Tipo de Proveedores:', TipsProvResponse.data);
   
    })
    .catch(error => {
      console.log('Error al obtener los datos:', error);
    });
  }, []);

  const onSubmit = async (formData) => {
    try {

      // Actualizar el estado 'datos' con los valores del formulario
      setProv({
        id_tip : formData.id,
        nombre: formData.nombre,
        telefono: formData.telefono,
        correo: formData.correo,
        web: formData.web,
        id_creador: formData.id_creador
        
    });

    
     
    
  console.log(prov.correo)
  
  
      // Realizar la solicitud POST al servidor con los datos del formulario
      const response = await axios.post(`${URL}/Provedores`, formData);
      console.log('Respuesta del servidor:', response.data);
      // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito al usuario, por ejemplo
      window.location.href = '/Home/TabProvedores';

    } catch (error) {
      console.error('Error al enviar los datos:', error);
      // Aquí podrías manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  

  return (
    
    <div >
      <div className="card-body">

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="nombre" {...register('nombre')} required />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Teléfono</label>
            <input type="text" className="form-control" id="telefono" {...register('telefono')} required  />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Correo</label>
            <input type="text" className="form-control" id="correo" {...register('correo')} required  />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Sitio Web</label>
            <input type="text" className="form-control" id="web" {...register('web')} required  />
          </div>
          <label htmlFor="rol" className="form-label">Tipo de Proveedor</label>
              <select className="select form-select" id="id" {...register('id')}>
                {Array.isArray(tipoPV.rows) && tipoPV.rows.length > 0 && tipoPV.rows.map(tipos => (
                  <option key={tipos.id} value={tipos.id}>{tipos.nombre}</option>
                ))}
              </select>
              <div className="d-flex justify-content-between mt-5">
      <button type="submit" className="btn btn-primary">Guardar</button>
    
     </div>
        </form>
      </div>
     
    </div>

  
  

  );
};

export default CreatProv;
