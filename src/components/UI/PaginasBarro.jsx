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
  console.log('activeTabKey',activeTabKey)
  const navigate = useNavigate();
  const [tabPosition, setTabPosition] = useState("left");

  const handleTabChange = (key) => {
    if (key === "1") navigate("/Home/TablaRecepcionBarro");
    if (key === "2") navigate("/Home/TablaLotesAprobados",{state:{materiaPrima}});
    if (key === "3") navigate("/Home/TablaPulverizado");
    if (key === "4") navigate("/Home/TablaProduccion");
    // if (key === "5") navigate("/Home/EtapaTamizado");
    // if (key === "6") navigate("/Home/EtapaLlenadoSacos");
  };

  const itemsTabs = [
    {
      key: "1",
      label: "Recepción de barro",
      icon: <FileSearchOutlined />,
    },
    {
      key: "2",
      label: "Lotes Aprobados",
      icon: <SafetyCertificateOutlined />,
    },
    {
      key: "3",
      label: "Pulverizado",
      icon: <ClusterOutlined />,
    },
    {
      key: "4",
      label: "TablaProduccion",
      icon: <CloudSyncOutlined />,
    }
   
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
