import React, { useState } from "react";
import {
  FileSearchOutlined,
  ClusterOutlined,
  CloudSyncOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

const PaginasBarro = ({ activeTabKey, materiaPrima }) => {
  console.log(materiaPrima)
  console.log('activeTabKey',activeTabKey)
  const navigate = useNavigate();
  const [tabPosition, setTabPosition] = useState("left");


  const handleTabChange = (key) => {
 
    if (key === "1") navigate("/Home/TablaRecepcionAserrin");
    if (key === "2") navigate("/Home/TablaProcesoDeMezclado");
    if (key === "3") navigate("/Home/TablaProcesoDeFormulacion");
    if (key === "4") navigate("/Home/TablaFormulasProduccion");

  };

  const itemsTabs = [
    {
      key: "1",
      label: "Recepción de Aserrín",
      icon: <FileSearchOutlined />,
    },
    {
      key: "2",
      label: "Proceso de Mezclado",
      icon: <SafetyCertificateOutlined />,
    },
    {
      key: "3",
      label: "Creación de formulas",
      icon: <SafetyCertificateOutlined />,
    },
    {
      key: "4",
      label: "Tabla Producción",
      icon: <SafetyCertificateOutlined />,
    },
    // {
    //   key: "3",
    //   label: "Formulación",
    //   icon: <ClusterOutlined />,
    // },
    // {
    //   key: "4",
    //   label: "TablaProduccion",
    //   icon: <CloudSyncOutlined />,
    // }
   
  ];

  return (
     <div
      style={{
        display: "flex",
        width: "100%",
        height: "calc(100vh - 150px)",
        backgroundColor: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* Panel lateral de Tabs */}
      <div
        style={{
          minWidth: 200,
          backgroundColor: "#f8f9fc",
          borderRight: "1px solid #e0e0e0",
          padding: "10px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
      <Tabs
        activeKey={activeTabKey}
        tabPosition={tabPosition}
        items={itemsTabs}
        onChange={handleTabChange}
      />

 </div>

      {/* Contenido principal */}
      <div
        style={{
          flexGrow: 1,
          background: "#fff",
          padding: "5px",
          overflow: "auto",
        }}
      >
        {/* Aquí va la tabla o el contenido del tab */}
      </div>
    </div>
  );
};

export default PaginasBarro;
