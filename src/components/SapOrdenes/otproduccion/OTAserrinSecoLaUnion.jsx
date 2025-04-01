import React, { useState,useEffect } from 'react';
import { Button, Form, Input, Row, Col, DatePicker, Divider, Select, Space, message, Checkbox  } from 'antd';
import { formatFecha } from '../../utilidades/FormatearFecta';
import axios from 'axios';

const { TextArea } = Input;
const OTAserrinSecoLaUnion = () => {

  const [produccion, setProduccion] = useState(0) //valor solicitados al usuario
  const [sacos, setSacos]=useState(0)
  const [fechaProduccion] = useState(formatFecha(new Date())) //valor solicitados al usuario
  const [sessionId, setSessionId] = useState('');
  const [connected, setConnected] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState('');
  const [comentario, setComentario]= useState('') //valor solicitados al usuario 
  const [componentDisabled, setComponentDisabled] = useState(true)
  const URL = process.env.REACT_APP_URL;

  const fetchData = async () => {
    const username = 'manager';
    const password = '2023**.';
    const payload = {
      "StartDate" : fechaProduccion,
      "ItemNo": "MP100018",
      "PlannedQuantity": produccion,
      "Series": "33",
      "Remarks": comentario,
      "ProductionOrderLines": [
          {       
               "StageID": 1,
              "PlannedQuantity": sacos,
              "ItemNo": "MP100001",
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
    Promise.all([
      axios.post(`${URL}/OtpSAP`, { payload })
    ])
      .then(([ordenesRes]) => {
        setResultado(ordenesRes.data.value || []);
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
        setResultado([]);
      });
  }
  
  const handleSubmit = () => {
   
      fetchData();
    
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
        Aserrín seco la Unión
        </Divider>
        <Col xs={24} sm={20} md={12}>
            <Form.Item label="Fecha de producción" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input disabled placeholder="Input Product Code" value={fechaProduccion} size="small"  required/>
            </Form.Item>
          </Col>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Código de Producto" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input disabled placeholder="Input Product Code" value='MP100018' size="small"  required/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Nombre de Producto" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input disabled placeholder="Input Product Name" value='Aserrin Seco La Union' size="small"  />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Almacen" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input disabled placeholder="Input Warehouse" value='Bodega01' size="small" required />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Producto" required tooltip="This is a required field">
              <Input disabled placeholder="Input Product" value='33' size="small" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
        
          <Form.Item label="Cantidad Planificada" required tooltip="This is a required field" name="cantidadPlanificada" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input placeholder="Cantidad en Sacos" size="small" type='number'   onChange={(e)=>{setProduccion(Number(e.target.value)||0)}}/>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12}>
        
          <Form.Item label="MP100001 Aserrin Humedo" required tooltip="This is a required field" name="sacosconsumido" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              {/* <Input  placeholder="Sacos" size="small" value={sacos} readOnly   /> */}
              <Input placeholder="Sacos usados" size="small" onChange={(e)=>{setSacos(Number(e.target.value))}} />

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

export default ()=><OTAserrinSecoLaUnion/>;
