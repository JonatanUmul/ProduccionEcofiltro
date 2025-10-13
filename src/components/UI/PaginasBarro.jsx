import React, { useEffect, useState } from "react";
import {
  FileSearchOutlined,
  ClusterOutlined,
  CloudSyncOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const PaginasBarro = ({ materiaPrima }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    if (location.pathname.includes("TablaRecepcionBarro")) setActiveKey("1");
    else if (location.pathname.includes("TablaLotesAprobados")) setActiveKey("2");
    else if (location.pathname.includes("TablaPulverizado")) setActiveKey("3");
    else if (location.pathname.includes("TablaProduccion")) setActiveKey("4");
  }, [location.pathname]);

  const handleTabChange = (key) => {
    setActiveKey(key);
    if (key === "1") navigate("/Home/TablaRecepcionBarro");
    if (key === "2") navigate("/Home/TablaLotesAprobados", { state: { materiaPrima } });
    if (key === "3") navigate("/Home/TablaPulverizado");
    if (key === "4") navigate("/Home/TablaProduccion");
  };

  const itemsTabs = [
    { key: "1", label: "Recepción de barro", icon: <FileSearchOutlined /> },
    { key: "2", label: "Lotes Aprobados", icon: <SafetyCertificateOutlined /> },
    { key: "3", label: "Pulverizado", icon: <ClusterOutlined /> },
    { key: "4", label: "Producción", icon: <CloudSyncOutlined /> },
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
          activeKey={activeKey}
          tabPosition="left"
          items={itemsTabs}
          onChange={handleTabChange}
          style={{
            flexGrow: 1,
            paddingLeft: 2,
            paddingRight: 2,
          }}
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
