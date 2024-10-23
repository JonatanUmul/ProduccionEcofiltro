import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './roles.css';
const URL = process.env.REACT_APP_URL;

const CrearMatPrim = () => {
  const { handleSubmit, register } = useForm();
  const [datsM, setDatsM] = useState({
    id_prov:'',
    nom_matPrima:'',
    id_creador:''

  });
  const [prov, setProv] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${URL}/Provedores`;
        const response = await axios.get(url);
        setProv(response.data.rows);
      } catch (error) {
        console.log('Error al obtener los datos:', error);
      }
    };
    
    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    

    try {
      setDatsM({
        id_prov: formData.id_prov,
        nom_matPrima: formData.nom_matPrima,
        id_creador: formData.id_creador
      });

      const response = await axios.post('http://localhost:3001/MateriaPrima', formData);
      console.log('Respuesta del servidor:', response.data);
      window.location.href = '/Home/TablaMatPrima';
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      // Manejo de errores: mostrar un mensaje al usuario, por ejemplo
    }
  };



  return (
    <div >
      <div className="card-body">
      
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="matPrim" className="form-label">Tipo de Materia Prima</label>
            <input type="text" className="form-control" id="matPrim" {...register('nom_matPrima')} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="id_prov" className="form-label">Proveedor</label>
            <select className="select form-select" id="id_prov" {...register('id_prov')} required>
              {prov.map((prov) => (
                <option key={prov.id_prov} value={prov.id_prov}>{prov.nombre}</option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Guardar</button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearMatPrim;
