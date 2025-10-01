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
    <div style={{ width: "100%" }}>
      <Tabs
        activeKey={activeTabKey}
        tabPosition={tabPosition}
        items={itemsTabs}
        onChange={handleTabChange}
      />
    </div>
  );
};

export default PaginasBarro;
