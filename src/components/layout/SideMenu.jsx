import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  AppstoreAddOutlined,
  ProjectOutlined,
  FileTextOutlined,
  SafetyOutlined,
  ToolOutlined,
  FundOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">

        {/* Dashboard */}
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/Home/Dashboard" style={{ textDecoration: "none" }}>
            Dashboard
          </Link>
        </Menu.Item>

        {/* Planificación */}
        <Menu.SubMenu key="2" icon={<ProjectOutlined />} title="Planificación">
          <Menu.Item key="2-1" icon={<ProjectOutlined />}>
            <Link to="/Home/BoardPlanificacion" style={{ textDecoration: "none" }}>
              Planificación Producción
            </Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Reportes */}
        <Menu.SubMenu key="3" icon={<FileTextOutlined />} title="Reportes">
          <Menu.Item key="3-1" icon={<FileTextOutlined />}>
            <Link to="/Home/TablaReportesOT" style={{ textDecoration: "none" }}>
              Reportes OT
            </Link>
          </Menu.Item>
          <Menu.Item key="3-2" icon={<FileTextOutlined />}>
            <Link to="/Home/TablaControlProcesosOT" style={{ textDecoration: "none" }}>
              Procesos
            </Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Órdenes de Trabajo */}
        <Menu.SubMenu key="4" icon={<FundOutlined />} title='Ordenes de Trabajo' >
        <Menu.Item key="4-1" icon={<ToolOutlined />}>
          <Link to="/Home/TablaOT" style={{ textDecoration: "none" }}>
            Órdenes de Trabajo
          </Link>
        </Menu.Item>
        <Menu.Item key="4-2" icon={<ToolOutlined />}>
          <Link to="/Home/TablaReportesOT/MermasOTP" style={{ textDecoration: "none" }}>
            Mermas Crudas
          </Link>
        </Menu.Item>
        <Menu.Item key="4-3" icon={<ToolOutlined />}>
          <Link to="/Home/TablaMermasAprobados" style={{ textDecoration: "none" }}>
            Mermas Aprobados
          </Link>
        </Menu.Item>

        </Menu.SubMenu>

        {/* Control de Procesos */}
        <Menu.Item key="5" icon={<SafetyOutlined />}>
          <Link to="/Home/TablaCP" style={{ textDecoration: "none" }}>
            Control de Procesos
          </Link>
        </Menu.Item>

        {/* Materias Primas */}
        <Menu.SubMenu key="6" icon={<ToolOutlined />} title="Materias Primas">
          <Menu.Item key="6-1" icon={<ToolOutlined />}>
            <Link to="/Home/TablaRecepcionBarro" style={{ textDecoration: "none" }}>
              Barro
            </Link>
          </Menu.Item>
          <Menu.Item key="6-2" icon={<ToolOutlined />}>
            <Link to="/Home/TablaRecepcionAserrin" style={{ textDecoration: "none" }}>
              Aserrín
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="6-2" icon={<ToolOutlined />}>
            <Link to="/Home/TableMantenimientoMaq" style={{ textDecoration: "none" }}>
              Aserrín
            </Link>
          </Menu.Item> */}
        </Menu.SubMenu>

        {/* Maquinaria */}
        <Menu.SubMenu key="7" icon={<ToolOutlined />} title="Maquinaria">
          <Menu.Item key="7-1" icon={<ToolOutlined />}>
            <Link to="/Home/TablaMaq" style={{ textDecoration: "none" }}>
              CK Maquinaria
            </Link>
          </Menu.Item>
          <Menu.Item key="7-2" icon={<ToolOutlined />}>
            <Link to="/Home/TableMantenimientoMaq" style={{ textDecoration: "none" }}>
              Mantenimientos
            </Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Laboratorio */}
        {/* <Menu.SubMenu key="8" icon={<ExperimentOutlined />} title="Laboratorio">
          <Menu.Item key="8-1" icon={<ExperimentOutlined />}>
            <Link to="/Home/TablaLab" style={{ textDecoration: "none" }}>
              Formulación
            </Link>
          </Menu.Item>
          <Menu.Item key="8-2" icon={<ExperimentOutlined />}>
            <Link to="/Home/FormularioIDPB" style={{ textDecoration: "none" }}>
              Cálculo Límites
            </Link>
          </Menu.Item>
          <Menu.Item key="8-3" icon={<ExperimentOutlined />}>
            <Link to="/Home/TablaPorCodigos" style={{ textDecoration: "none" }}>
              Producción
            </Link>
          </Menu.Item>
        </Menu.SubMenu> */}

        {/* Mantenimiento */}
        <Menu.SubMenu key="9" icon={<ToolOutlined />} title="Mantenimiento">
          <Menu.Item key="9-1">
            <Link to="/Home/TablaRoles" style={{ textDecoration: "none" }}>
              Roles
            </Link>
          </Menu.Item>
          <Menu.Item key="9-2">
            <Link to="/Home/TablaUser" style={{ textDecoration: "none" }}>
              Usuarios
            </Link>
          </Menu.Item>
          <Menu.Item key="9-3">
            <Link to="/Home/TablaTipProv" style={{ textDecoration: "none" }}>
              Tipo de proveedor
            </Link>
          </Menu.Item>
          <Menu.Item key="9-4">
            <Link to="/Home/TablaEstadosMaq" style={{ textDecoration: "none" }}>
              Estados Maquinaria
            </Link>
          </Menu.Item>
          <Menu.Item key="9-5">
            <Link to="/Home/TablaEstProc" style={{ textDecoration: "none" }}>
              Estados Procesos
            </Link>
          </Menu.Item>
          <Menu.Item key="9-6">
            <Link to="/Home/TabProvedores" style={{ textDecoration: "none" }}>
              Proveedores
            </Link>
          </Menu.Item>
          <Menu.Item key="9-7">
            <Link to="/Home/TablaMatPrima" style={{ textDecoration: "none" }}>
              Materia Prima
            </Link>
          </Menu.Item>
          <Menu.Item key="9-8">
            <Link to="/Home/GestionHorasLaborales" style={{ textDecoration: "none" }}>
              Gestión Horas Laborales
            </Link>
          </Menu.Item>
        </Menu.SubMenu>

      </Menu>
    </Sider>
  );
};

export default SideMenu;
