// SideMenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileDoneOutlined,AppstoreOutlined ,OpenAIOutlined, FundProjectionScreenOutlined, SettingOutlined, SnippetsOutlined, BarChartOutlined, FileExclamationOutlined, ExperimentOutlined } from '@ant-design/icons';
import { Layout, Menu} from 'antd'; // Importa Popover
const { Sider } = Layout;

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<FundProjectionScreenOutlined />}><Link to="/Home/Dashboard" style={{ textDecoration: 'none'}}>Dashboard</Link></Menu.Item>
        <Menu.SubMenu key="sub4" icon={<AppstoreOutlined />} title="Ordenes Sap">
        <Menu.Item key="17" icon={<AppstoreOutlined  />}><Link to="/Home/BoardPlanificacion" style={{ textDecoration: 'none'}}>Planificación Producción</Link></Menu.Item>
        </Menu.SubMenu>
  
        <Menu.SubMenu key="sub3" icon={<FileExclamationOutlined />} title="Planificación">
        <Menu.Item key="16" icon={<BarChartOutlined />}><Link to="/Home/BoardPlanificacion" style={{ textDecoration: 'none'}}>Planificación Producción</Link></Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" icon={<FileExclamationOutlined />} title="Reportes">
        <Menu.Item key="13" icon={<BarChartOutlined />}><Link to="/Home/TablaReportesOT" style={{ textDecoration: 'none'}}>Reportes OT</Link></Menu.Item>
        <Menu.Item key="4" icon={<BarChartOutlined />}><Link to="/Home/TablaControlProcesosOT" style={{ textDecoration: 'none'}}>Procesos</Link></Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="2" icon={<FileDoneOutlined />}><Link to="/Home/TablaOT" style={{ textDecoration: 'none'}}>Ordenes de Trabajo</Link></Menu.Item>
        <Menu.Item key="18" icon={<OpenAIOutlined />}><Link to="/Home/OpenAI" style={{ textDecoration: 'none'}}>OpenAI</Link></Menu.Item>
        <Menu.Item key="3" icon={<SnippetsOutlined />}><Link to="/Home/TablaCP" style={{ textDecoration: 'none'}}>Control de Procesos</Link></Menu.Item>
        <Menu.SubMenu key="sub" icon={<SettingOutlined />} title="Maquinaria">
        <Menu.Item key="4" icon={<SettingOutlined />}><Link to="/Home/TablaMaq" style={{ textDecoration: 'none'}}>CK Maquinaria</Link></Menu.Item>

        <Menu.Item key="12" icon={<SettingOutlined />}><Link to="/Home/TableMantenimientoMaq" style={{ textDecoration: 'none'}}>Mantenimientos</Link></Menu.Item>
        
         </Menu.SubMenu>
         <Menu.SubMenu icon={<ExperimentOutlined />} title='Laboratorio' >
         <Menu.Item key="14" icon={<ExperimentOutlined />}><Link to="/Home/TablaLab" style={{ textDecoration: 'none'}}>Laboratorio</Link></Menu.Item>
         <Menu.Item key="15" icon={<ExperimentOutlined />}><Link to="/Home/TablaPorCodigos" style={{ textDecoration: 'none'}}>Produccin</Link></Menu.Item>
         </Menu.SubMenu>

        <Menu.SubMenu key="sub1" icon={<SettingOutlined />} title="Mantenimiento">
          <Menu.Item key="5"> <Link to="/Home/TablaRoles"  style={{ textDecoration: 'none'}}>Roles</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/Home/TablaUser" style={{ textDecoration: 'none'}}>Usuarios</Link></Menu.Item>
          <Menu.Item key="7"><Link to="/Home/TablaTipProv" style={{ textDecoration: 'none'}}>Tipo de proveedor</Link></Menu.Item>
          <Menu.Item key="8"><Link to="/Home/TablaEstadosMaq" style={{ textDecoration: 'none'}}>Estados Maquinaria</Link></Menu.Item>
          <Menu.Item key="9"><Link to="/Home/TablaEstProc" style={{ textDecoration: 'none'}}>Estados Procesos</Link></Menu.Item>
          <Menu.Item key="10"><Link to="/Home/TabProvedores" style={{ textDecoration: 'none'}}>Proveedores</Link></Menu.Item>
          <Menu.Item key="11"><Link to="/Home/TablaMatPrima" style={{ textDecoration: 'none'}}>Materia Prima</Link></Menu.Item>
        </Menu.SubMenu>

      </Menu>
    </Sider>
  );
};

export default SideMenu;
