import React, { useState,useEffect } from 'react';
import { Button, Form, Input, Row, Col, DatePicker, Divider, Select, Space, message, Checkbox  } from 'antd';
import { formatFecha } from '../../utilidades/FormatearFecta';
import axios from 'axios';

const { TextArea } = Input;
const OTAserrinFinolaUnion = () => {

  const [produccion, setProduccion] = useState(0) //valor solicitados al usuario
  const [libras, setSacos]=useState(0)
  const [fechaProduccion] = useState(formatFecha(new Date())) //valor solicitados al usuario
  const [sessionId, setSessionId] = useState('');
  const [connected, setConnected] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState('');
  const [comentario, setComentario]= useState('') //valor solicitados al usuario 
  const [componentDisabled, setComponentDisabled] = useState(true)


  const connectSL = async () => {
    let serv = 'https://sapsl.eco-aplicaciones.com:50000/';
    const companyDB = 'SBO_ECOFILTRO_LIVE_FACT';
    const userName = localStorage.getItem('user');
    const password = localStorage.getItem('pass');
    const jData = { UserName: userName, Password: password, CompanyDB: companyDB };

    try {
      const response = await axios.post(`${serv}/b1s/v1/Login`, jData);
console.log('respuesta del servidor',response)
      const sessionId = response.data.SessionId;
      setSessionId(sessionId);
      setConnected(true);
      message.success("Conectado a Sap")
    } catch (error) {
      setError('Failed to connect');
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
    }
  };

  useEffect(() => {
    // Primero conectamos al Service Layer
    connectSL();
  }, []);

  


  const fetchData = async () => {
    console.log('libras en fetch ',libras)
    const payload = {
        "StartDate" : fechaProduccion,
        "ItemNo": "MP100021",
        "PlannedQuantity": produccion,
        "Series": "81",
        "Remarks": comentario,
        "ProductionOrderLines": [
            {       
                 "StageID": 1,
                "PlannedQuantity": libras,
                "ItemNo": "MP100020",
                "ProductionOrderIssueType": "im_Manual",
                "Warehouse": "Bodega01"
            },
      
        ],
     "ProductionOrdersSalesOrderLines": [],
     "ProductionOrdersStages": [
      {
          "DocEntry": 28764,
          "StageID": 1,
          "SequenceNumber": 1,
          "StageEntry": 1,
          "Name": "MATERIALES"
          
      },]
       
    }

    let serv = 'https://sapsl.eco-aplicaciones.com:50000/';
    try {
      const response = await axios.post(`${serv}/b1s/v1/ProductionOrders`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `B1SESSION=${sessionId}`
        },
        withCredentials: true,
      });
      setResultado([response.data]);
      message.success('Order successfully submitted');
    } catch (error) {
      setError('Error al hacer la solicitud');
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      } else {
        console.error('Error message:', error.message);
      }
      message.error('Houston, tenemos un error: no se pudo realizar el envío.');
    }
  };

  const handleSubmit = () => {
    if (connected && sessionId) {
      fetchData();
    } else {
      message.error('Houston, tenemos un error: no estamos conectados al Service Layer.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      
      >
        Formulario deshabilitado
      </Checkbox>

      <Form layout="vertical" onFinish={handleSubmit}  disabled={componentDisabled} style={{
          maxWidth: 600,
        }}>
        
        <Divider orientation="left" orientationMargin={50} style={{ borderColor: '#7cb305' }}>
        Aserrin Fino la Union 2
        </Divider>
        <Col xs={24} sm={20} md={12}>
            <Form.Item label="Fecha de producción" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input disabled placeholder="Input Product Code" value={fechaProduccion} size="small"  required/>
            </Form.Item>
          </Col>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Código de Producto" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input disabled placeholder="Input Product Code" value='MP100021' size="small"  required/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Nombre de Producto" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input disabled placeholder="Input Product Name" value='Aserrin Fino la Union 2' size="small"  />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Almacen" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input disabled placeholder="Input Warehouse" value='Bodega01' size="small" required />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Producto" required tooltip="This is a required field">
              <Input disabled placeholder="Input Product" value='81' size="small" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
        
          <Form.Item label="Cantidad Planificada" required tooltip="This is a required field" name="cantidadPlanificada" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input placeholder="Cantidad en libras" size="small" type='number'   onChange={(e)=>{setProduccion(Number(e.target.value)||0)}}/>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12}>
        
          <Form.Item label="MP100020 Aserrin Fino la Union" required tooltip="This is a required field" name="librasconsumido" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              {/* <Input  placeholder="Sacos" size="small" value={libras} readOnly   /> */}
              <Input placeholder="Libras usadas" size="small" onChange={(e)=>{setSacos(Number(e.target.value))}} />

            </Form.Item>
          </Col>

  <Form.Item label="Comentario" name="comentario" required rules={[{ required: true, message: 'El comentario es obligatorio!' }]}>
  <TextArea rows={1} placeholder="Comentario" onChange={(e)=>{setComentario(e.target.value)}} />
  </Form.Item>
        </Row>
    
    
    
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ()=><OTAserrinFinolaUnion/>;
