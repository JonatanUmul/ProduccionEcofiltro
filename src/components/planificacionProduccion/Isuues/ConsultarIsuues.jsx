import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import axios from 'axios';

const URL = process.env.REACT_APP_URL;

const App = ({ Issue }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsuueResponse, setIsuueResponse] = useState([]);
  
  const id = Issue.id;

  // Función para mostrar el modal
  const showModal = () => setIsModalOpen(true);
  
  // Funciones para manejar el modal
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  // Efecto para obtener los datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/Creacionissues/${id}`);
        setIsuueResponse(response.data.rows || []); // Asegúrate de acceder a rows si existe
      } catch (error) {
        console.log("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [id]); // Agrega id como dependencia

  return (
    <>
      <Button 
        onClick={showModal} 
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          zIndex: 1,
          border: null
        }}
      >
        <FolderOpenOutlined />
      </Button>

      <Modal 
        title="Detalles del Issue" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
      >
        <div>
          {Array.isArray(IsuueResponse) && IsuueResponse.length > 0 ? (
            IsuueResponse.map((datos, index) => (
              
              <p key={index}>{datos.issue}</p>
            ))
          ) : (
            <p>No hay datos disponibles.</p> // Mensaje si no hay datos
          )}
        </div>
      </Modal>
    </>
  );
};

export default App;
