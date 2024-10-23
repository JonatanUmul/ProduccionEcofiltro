// import React, { useEffect, useState } from 'react';
// import { Button, Modal } from 'antd';
// import { BsArrowRight } from "react-icons/bs";
// import axios from 'axios';
// import { formatFecha } from '../../../utilidades/FormatearFecta';
// const URL = process.env.REACT_APP_URL

// const DatosProduccion= ({datos}) => {
// console.log('datos', datos[0].id)
// const [isModalOpen, setIsModalOpen] = useState(false);
// const [data, setData]=useState([])
// const[fecha_creacion_inicio]=useState(formatFecha(datos[0].fecha_creacion))
// const[fecha_creacion_fin]=useState(formatFecha(datos[0].fecha_creacion))
// const [codigo]=useState('')
// console.log('datosPorCodigo',data)
// const id=datos[0].id;
//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   useEffect(()=>{

 
//         const url = `${URL}/TablaPorCodigos/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${ 'null'}/${ id || 'null'}`;

//         axios.get(url)
//         .then((response)=>{
//         setData(response.data);
//         console.log(data)
//         })
//         .catch((error) => {
//           console.error('Error al obtener los datos:', error);
//         });
//     }, [fecha_creacion_inicio,fecha_creacion_fin,codigo]);
    

//   return (
//     <>
//       <Button className='btn' onClick={showModal}>
//       <BsArrowRight />
//       </Button>
//       <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//       </Modal>
//     </>
//   );
// };

// export default DatosProduccion;