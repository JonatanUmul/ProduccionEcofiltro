  import React, {useState } from 'react';
  import { useForm } from 'react-hook-form';
  import axios from 'axios';
  import './roles.css'
  const URL = process.env.REACT_APP_URL;

  const Roles = () => {
    const { handleSubmit, register } = useForm();

    const [roles, setRoles]= useState({rol:'', descripcion:'',});
    const [errorMessage, setErrorMessage] = useState('');
    const [succesMessage, setSuccesMessage] = useState('');

    const onSubmit = async (formData) => {
      try {
        if(formData.rol==='' && formData.descripcion==='' ){
          setErrorMessage('Datos vacios')
        }
        else{
          setErrorMessage('')
          // Actualizar el estado 'datos' con los valores del formulario
          setRoles({
            rol: formData.rol,
            descripcion: formData.descripcion
          })
              // Realizar la solicitud POST al servidor con los datos del formulario
              const response = await axios.post(`${URL}/Rolrouter`, formData);
              setSuccesMessage('Datos Guardados');
              // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito al usuario, por ejemplo
              window.location.href = '/Home/TablaRoles';
        }
        
console.log(roles)
      


      } catch (error) {
        console.error('Error al enviar los datos:', error);
        // Aquí podrías manejar el error, mostrar un mensaje al usuario, etc.
      }
    };
   
    
 
    return (

      <div className=" mt-1">
        <div className="card-body">
          {/* <h2 className="titulo card-title text-center mb-4">Crear nuevo Rol</h2> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="rol" className="form-label">Rol</label>
              <input type="text" className="form-control" id="rol" {...register('rol')} />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripcion</label>
              <input type="text" className="form-control" id="descripcion" {...register('descripcion')}  />
            </div>
             {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
             {succesMessage && <div className="alert alert-success" role="success">{succesMessage}</div>}
            <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">Guardar</button>
       </div>
          </form>
        </div>
        
      </div>
 
    
    

    );
  };

  export default Roles;
