import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = process.env.REACT_APP_URL;

const AreaOperario = ({ area, actualizarTab }) => {
    // console.log('Área actual:', area.Area, area.id, area.id_area_sap
    // );

    const [datos, setDatos] = useState([]);
    const [areas, setAreas]=useState([])
    const [nuevaArea, setNuevaArea]=useState('')
    // console.log('Operarios',areas)
    const id= area.id
    const id_area=nuevaArea; 


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/procesos`);
             
                setDatos(response.data.rows);
              
            } catch (error) {
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
          try {
            //   const response = await axios.put(`${URL}/Operarios/${}/${}`);
            const response = await axios.put(`${URL}/Operarios/${id}/${id_area}`);

              setDatos(response.data.rows);
              if (actualizarTab) {
                actualizarTab(); 
            }
          } catch (error) {
            //   console.log("No se obtuvieron datos", error);
          }
      };

      fetchData();
  }, [id,id_area]);

    const handleChange = (e) => {
        setNuevaArea(e.target.value);
        
    };

    return (
        <div>
            <select
                name="estado"
                id="id_est"
                className="btn btn-sm btn-dark dropdown-toggle"
                onChange={handleChange}
                value={nuevaArea} // Controla el valor del select
            >
                <option value="" disabled>Seleccione...</option>
                {Array.isArray(datos) &&
                    datos.map((areas) => (
                        <option key={areas.id} value={areas.id}>
                            {areas.proceso}
                        </option>
                    ))}
            </select>
        </div>
    );
};

export default AreaOperario;
