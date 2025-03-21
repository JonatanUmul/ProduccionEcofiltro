import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, Divider, message, Checkbox } from 'antd';
import axios from 'axios';

const ManoOTP = ({resultadoItem}) => {
  const [sessionId, setSessionId] = useState('');
  const [connected, setConnected] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState("");
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [manodeobra, setManoDeObra] = useState({ ItemName: '', costo: '' });
console.log("Resultado en mano de obra",resultado)
  const connectSL = async () => {
    let serv = 'https://sapsl.eco-aplicaciones.com:50000/';
    const companyDB = 'SBO_ECOFILTRO_LIVE_TEST';
    const userName = localStorage.getItem('user');
    const password = localStorage.getItem('pass');
    const jData = { UserName: userName, Password: password, CompanyDB: companyDB };

    try {
      const response = await axios.post(`${serv}/b1s/v1/Login`, jData);
      console.log('respuesta del servidor', response);
      const sessionId = response.data.SessionId;
      setSessionId(sessionId);
      setConnected(true);
      message.success("Conectado a SAP");
    } catch (error) {
      setError('Failed to connect');
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
    }
  };

  useEffect(() => {
    connectSL();
  }, []);
  

 
    console.log("Numero de orden", resultadoItem)

  const fetchData = async () => {
    const orden= resultadoItem;
    let serv = 'https://sapsl.eco-aplicaciones.com:50000/';
    try {
      const response = await axios.get(`${serv}/b1s/v1/PProductionOrders?$filter=DocumentNumber eq ${orden}`, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `B1SESSION=${sessionId}`
        },
        withCredentials: true,
      });
      setResultado([response.data]);
      message.success('Orden obtenida con éxito');
    } catch (error) {
      setError('Error al hacer la solicitud');
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      } else {
        console.error('Error message:', error.message);
      }
      message.error('Houston, tenemos un error: no se pudo realizar la solicitud.');
    }
  };

  const handleSubmit = () => {
    if (connected && sessionId) {
      fetchData();
    } else {
      message.error('Houston, tenemos un error: no estamos conectados al Service Layer.');
    }
  };

  useEffect(() => {
    if (resultado.length > 0) {
      const manodeobraData = resultado[0];
      if (manodeobraData.ProductionOrderLines && manodeobraData.ProductionOrderLines.length > 0) {
        setManoDeObra({
          ItemName: manodeobraData.ProductionOrderLines[0].ItemName,
          costo: manodeobraData.ProductionOrderLines[0].U_CostoXHora
        });
      }
    }
  }, [resultado]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Formulario deshabilitado
      </Checkbox>

      <Form layout="vertical" onFinish={handleSubmit} disabled={componentDisabled} style={{ maxWidth: 600 }}>
        <Divider orientation="left" orientationMargin={50} style={{ borderColor: '#7cb305' }}>
          Mano de Obra
        </Divider>

        <Row gutter={16}>
          <Col xs={12} sm={6} md={6}>
            <Form.Item label="Item de Mano de Obra" name="itemName">
              <Input value={manodeobra.ItemName} readOnly />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={12} sm={6} md={6}>
            <Form.Item label="Costo por Hora" name="costo">
              <Input value={manodeobra.costo} readOnly />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ManoOTP;
