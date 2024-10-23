  import React, {useState } from 'react';
  import { useForm } from 'react-hook-form';
  import axios from 'axios';
  const URL = process.env.REACT_APP_URL;

  const CrearEstMaq = () => {
    const { handleSubmit, register } = useForm();

    const [estMaq, setEstMaq]= useState({estado: '', descripcion: ''});
    const [errorMessage, setErrorMessage] = useState('');


    const onSubmit = async (formData) => {
      try {
        // Actualizar el estado 'datos' con los valores del formulario
       
      if(formData.estado==='' || formData.descripcion==='' || formData.id_creador===''){
        setErrorMessage('No puede enviar Datos Vacios')
      }else{
        // Realizar la solicitud POST al servidor con los datos del formulario
        setErrorMessage('')
        setEstMaq({
           estado: formData.estado,
          descripcion: formData.descripcion,
          id_creador: formData.id_creador
                 });
        const response = await axios.post( `${URL}/EstadosMaq`, formData);
        console.log('Respuesta del servidor:', response.data);
        // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito al usuario, por ejemplo
        window.location.href = '/Home/TablaEstadosMaq';
      }
    console.log(estMaq.descripcion)
    console.log(estMaq.estado)
        

      } catch (error) {
        console.error('Error al enviar los datos:', error);
        // Aquí podrías manejar el error, mostrar un mensaje al usuario, etc.
      }
    };
  
    
 
    return (

      <div>
        <div className="card-body">
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="rol" className="form-label">Estado</label>
              <input type="text" className="form-control" id="estado" {...register('estado')} />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripcion</label>
              <input type="text" className="form-control" id="descripcion" {...register('descripcion')}  />
            </div>
            
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">Guardar</button>
       
       </div>
          </form>
        </div>
        
      </div>
 
    
    

    );
  };

  export default CrearEstMaq;
