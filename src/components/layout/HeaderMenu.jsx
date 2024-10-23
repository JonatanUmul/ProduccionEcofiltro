import React from 'react';
import { Layout, Menu, theme } from 'antd';
import LogoEco from '../utilidades/LogoEco';
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderMenu = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/'; // Redirigir al inicio de sesión
  };

  return (
    <Header
      style={{
        padding: '0 20px',
        background: colorBgContainer,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <LogoEco />

      <Menu >
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
          <span >Cerrar sesión</span>
          
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderMenu;
