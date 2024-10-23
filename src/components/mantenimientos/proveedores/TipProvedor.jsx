  import React, {useState } from 'react';
  import { useForm } from 'react-hook-form';
  import axios from 'axios';
  const URL = process.env.REACT_APP_URL;

  const CreateTipProv = () => {
    const { handleSubmit, register } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const [tipProv, setTipProv]= useState({
      nombre: '', 
      descripcion: '',});


    const onSubmit = async (formData) => {
      try {
        // Actualizar el estado 'datos' con los valores del formulario

        if(formData.nombre==='' && formData.descripcion===''){
          setErrorMessage('Uno o varios datos estan vacios')
        }else{
          setErrorMessage('')

          setTipProv('nombre', formData.nombre);
        setTipProv('descripcion', formData.descripcion);
      
    console.log(tipProv)
    
    
        // Realizar la solicitud POST al servidor con los datos del formulario
        const response = await axios.post(`${URL}/TipoProv`, formData);
        console.log('Respuesta del servidor:', response.data);
        // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito al usuario, por ejemplo
        window.location.href = '/TablaTipProv';

        }
        

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
              <label htmlFor="descripcion" className="form-label">Descripcion</label>
              <input type="text" className="form-control" id="descripcion" {...register('descripcion')} required  />
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

  export default CreateTipProv;
