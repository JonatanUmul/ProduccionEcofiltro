import React from 'react';
import { Layout, Button } from 'antd';
import SideMenu from './SideMenu';
import HeaderMenu from './HeaderMenu';
import ContentMenu from './ContenteMenu';
import FooterMenu from './FooterMenu';

const { Content } = Layout;

const MainLayout = ({ toggleDarkMode, darkMode }) => {
  return (
    <Layout className={`min-vh-100 ${darkMode ? 'dark-mode' : ''}`}>
      <SideMenu darkMode={darkMode} />
      <Layout>
        <HeaderMenu darkMode={darkMode} />
        <Content className={`p-3 ${darkMode ? 'dark-mode' : ''}`}>
          <Button onClick={toggleDarkMode} style={{ marginBottom: '16px' }}>
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </Button>
          <ContentMenu darkMode={darkMode} />
        </Content>
        <FooterMenu darkMode={darkMode} />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
