import { responsiveArray } from 'antd/es/_util/responsiveObserver';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ManoOTP = ({ resultadoItem }) => {
  console.log('Resultados',resultadoItem.ItemNo, resultadoItem.DocumentNumber)
  const [respon, setResponse]=useState([])
  const URL = process.env.REACT_APP_URL;
  const fecha=resultadoItem.CreationDate
  const ItemNo= resultadoItem.ItemNo
  const OrderManoObra=resultadoItem.DocumentNumber
console.log(respon)

 
const fetchData = () => {
  axios.get(`${URL}/ManoObraParaSap`, {
    params: {
      fecha,
      ItemNo
    }
  })
  .then(response => {
    setResponse(response.data.data  );
  })
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });
};


  
// const EnviarManoObraSap = () => {
//   for(let a of respon){
//     const payload=
//     {
//       "Code": "30001929-MO000001",
//        "POFB1Collection": [
//           {
//               "Code": `${OrderManoObra}-MO000001`,
//               "LineId": 1,
//               "U_EmpId": respon.U_empID,
//               "U_Horas": respon.horas_trabajadas,
//               "U_CostoXHora": respon.precioHora
//           },
//                           ]
// }

//     axios.get(`${URL}/ManoObraOrders`, {
//       payload    })
//     .then(response => {
//       setResponse(response.data.data  );
//     })
//     .catch(error => {
//       console.error('Error al obtener datos:', error);
//     });

//   }
 
// };

const EnviarManoObraSap = () => {
  for (let a of respon) {
    const payload = {
      "Code": `${OrderManoObra}-MO000001`, 
      "POFB1Collection": [
        {
          "Code": `${OrderManoObra}-MO000001`,
          "LineId": 1,
          "U_EmpId": a.U_empID,
          "U_Horas": a.horas_trabajadas,
          "U_CostoXHora": a.precioHora
        }
      ]
    };

    axios.post(`${URL}/ManoObraOrders`, payload) 
      .then(response => {
        console.log('Mano de obra enviada:', response.data);
      })
      .catch(error => {
        console.error('Error al enviar datos:', error.response?.data || error.message);
      });
  }
};





  useEffect(()=>{
    fetchData()
},[fecha,ItemNo])


  return (
    <div>
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Código Artículo</th>
            <th scope="col">Cantidad Planificada</th>
            <th scope="col">Orden</th>
            <th scope="col">Comentario</th>
          </tr>
        </thead>
        <tbody>
              <tr >
               <td>{resultadoItem.CreationDate}</td>
               <td>{resultadoItem.ItemNo}</td>
               <td>{resultadoItem.PlannedQuantity}</td>
               <td>{resultadoItem.ProductDescription}</td>
               <td>{resultadoItem.Remarks}</td>
              </tr>
        </tbody>
      </table>

      <table className="table text-center">
        <thead>
          <tr>
          <th scope="col">#</th>
          <th scope="col">ID empleado</th>
            <th scope="col">Operasio</th>
            <th scope="col">Horas normales</th>
            <th scope="col">Costo por hora</th>
            <th scope="col">Total</th>
            
          
          </tr>
        </thead>
        <tbody>
        {Array.isArray(respon)&&respon.map((res, index)=>(
 <tr key={index}>
  <td>{index+1}</td>
  <td>{res.U_empID}</td>
 <td>{res.Nombre}</td>
 <td>{res.horas_trabajadas}</td>
 <td>{res.precioHora}</td>
 <td>{res.precioHora*res.horas_trabajadas}</td>


</tr>
))}
             
        </tbody>
      </table>
      <button type="button" onClick={EnviarManoObraSap}>Enviar</button>


    </div>
  );
};

export default ManoOTP;
