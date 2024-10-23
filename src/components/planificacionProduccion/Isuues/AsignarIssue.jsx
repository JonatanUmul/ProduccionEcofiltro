import React, { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';
import Swal from 'sweetalert2'; // Importar SweetAlert
import {  Skeleton, Space } from 'antd';
import { useForm } from "react-hook-form";
import axios from "axios";

const App = ({Issuees}) => {
  const URL = process.env.REACT_APP_URL

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText]=useState('')
  const { handleSubmit, register } = useForm();
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })

  const [loading, setLoading] = useState(false);
  
  const showSkeleton = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  console.log(text)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { TextArea } = Input;

  const textoIssue=(e)=>{
    setText(e.target.value)
  }

  const id_planDiario=Issuees.id;
  
    const onSubmit = async () => {
    try {
      setLoading(false)
      const response = await axios.post(`${URL}/Creacionissues`, {
        id_planDiario,text, id_creador
      });
      setLoading(false)
       // Mostrar SweetAlert de éxito
       Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });

      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/AsignarIsuue";
      }, 1500);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setLoading(false)
    }
  };
  return (
    <>
   <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          width: '60%',
          backgroundColor: '#007bff', // Color primario
          borderColor: '#007bff',
          borderRadius: '5px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = '#0056b3'; // Color al pasar el mouse
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = '#007bff'; // Color original
        }}
      >
        Asignar Issue
      </Button>
      <Modal
        title="Detalles del Issue"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{
          borderRadius: '10px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        }}
        bodyStyle={{
          backgroundColor: '#f8f9fa', // Fondo claro
          borderRadius: '10px',
        }}
        footerStyle={{
          borderTop: '1px solid #dee2e6',
        }}
      >
         {loading ? (
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
          size={16}
        >
        <img 
        src="/images/laptop.gif" 
        alt="Logo" 
        style={{
          width: '300px', 
          display: 'block', 
          margin: '0 auto', 
          filter: 'brightness(1.2) contrast(1.2)'  // Ajusta el brillo y contraste
        }} 
      />
        </Space>
      ) :
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">
      <TextArea rows={4} onChange={textoIssue} required/>
      <button className='btn-primary' style={{width:'20%'}} type='submit'>Guardar</button>
      </form>
    }
      </Modal>
    </>
    </>
  );
};
export default App;