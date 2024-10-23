
// ContentMenu.js
import React, {useEffect, useState} from "react";
import { Breadcrumb, Layout } from "antd";
import { useLocation } from "react-router-dom";
import { renderContent } from "./renderContent";
import '../layout/estiloContent.css'


const { Content } = Layout;

const ContentMenu = () => {
  const location = useLocation();
  const [nombreUser, setNombreUser]=useState('')
const [id_creador, setCreador]=useState('')
  useEffect(() => {
    setCreador(localStorage.getItem('id_creador'))
    setNombreUser(localStorage.getItem('nombre')) 
  }, [])
  console.log('dato capturado', nombreUser, id_creador)
  



  return (
    <Content style={{ margin: "0 16px" }}>
     <Breadcrumb style={{ margin: "16px 0" }} separator=">">
  <Breadcrumb.Item>User</Breadcrumb.Item>
  <Breadcrumb.Item>{nombreUser}</Breadcrumb.Item>
</Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "#fff",
          borderRadius: "8px",
          // maxWidth: "1500px", // Ajusta el ancho máximo según tus necesidades
          // margin: "0 auto" // Centra el contenido horizontalmente
          
        }}
      >
        {/* Renderizar contenido dinámico según la ruta */}
        {renderContent(location.pathname)}
       
      </div>
    </Content>
  );
};



export default ContentMenu;

