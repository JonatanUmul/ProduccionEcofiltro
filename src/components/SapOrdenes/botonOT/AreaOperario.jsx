import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = process.env.REACT_APP_URL;

const AreaOperario = ({ area }) => {
    console.log('Área actual:', area.Area);

    const [datos, setDatos] = useState([]);
    const [nuevaArea, setNuevaArea] = useState(area.Area); 

    console.log('Nueva Área seleccionada:', nuevaArea);
    console.log('Lista de Áreas:', datos);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/area`);
                setDatos(response.data.rows);
            } catch (error) {
                console.log("No se obtuvieron datos", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
          try {
            //   const response = await axios.put(`${URL}/Operarios/${}/${}`);
            const response = await axios.put(`${URL}/Operarios`);

              setDatos(response.data.rows);
          } catch (error) {
              console.log("No se obtuvieron datos", error);
          }
      };

      fetchData();
  }, []);

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
                        <option key={areas.id} value={areas.Area}>
                            {areas.Area}
                        </option>
                    ))}
            </select>
        </div>
    );
};

export default AreaOperario;
