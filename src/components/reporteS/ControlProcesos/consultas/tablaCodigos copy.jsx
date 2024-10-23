import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';

const App = ({ datos }) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Codigos
        </Button>
      </Space>
      <Drawer
        title="Basic Drawer"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        maskClosable={false}  // Esto desactiva el cierre al hacer clic fuera
        key={placement}
        width={600}  // Ajusta el ancho aquí
        style={{ backgroundColor: '#000', color: '#fff' }}
        bodyStyle={{ backgroundColor: '#333', color: '#fff', overflowY: 'auto' }} // Permite el scroll vertical
        headerStyle={{ backgroundColor: '#000', color: '#fff' }}
        extra={
          <Button onClick={onClose} style={{ color: '#fff' }}>
            Cerrar
          </Button>
        }
      >
        <Button onClick={onClose} type="primary" style={{ marginBottom: '16px' }}>
          Cerrar
        </Button>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Codigo</th>
              <th scope="col">Estado Crudo</th>
              <th scope="col">Tasa</th>
              <th scope="col">Temperatura</th>
              <th scope="col">Control C.c</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(datos) && datos.map((codigo, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{codigo.codigos}</td>
                <td>{codigo.estadoCrudo}</td>
                <td>{codigo.tasa}</td>
                <td>{codigo.promedio}</td>
                <td>{codigo.estadouf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Drawer>
    </>
  );
};

export default App;
