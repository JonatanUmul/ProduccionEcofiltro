import React, { useEffect, useState } from 'react';
import { Progress, Space } from 'antd';
import axios from 'axios';

const URL = process.env.REACT_APP_URL;

const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};


const DasAserrin = () => {
  const [humedad, setHumedad] = useState(0);

 
// Ajusta la solicitud HTTP en el componente de React para incluir la fecha en la URL
useEffect(() => {
  const fecha = today();
  axios.get(`${URL}/DTHP/${fecha}`)
    .then((response) => {
      // Asegúrate de acceder correctamente a los datos en la respuesta
      console.log("Data de respuesta:", response.data);
      if (response.data && response.data.rows && response.data.rows.length > 0) {
        setHumedad(response.data.rows[0].promedio_general);
      } else {
        console.log("No se encontraron datos de humedad para la fecha especificada");
      }
    })
    .catch((error) => {
      console.log("Error al obtener los datos:", error);
    });
}, []);



  // Resto del código...
console.log(humedad)

  return (
    <>
      <p>Humedad Aserrín</p>
      <Space wrap>
        <Progress strokeLinecap="butt" type="circle" percent={humedad} />
      </Space>
    </>
  );
};

export default DasAserrin;
