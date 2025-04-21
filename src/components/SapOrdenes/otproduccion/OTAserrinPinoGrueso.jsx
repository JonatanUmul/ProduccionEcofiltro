import React, { useState,useEffect } from 'react';
import { Button, Form, Input, Row, Col, DatePicker, Divider, Select, Space, message, Checkbox  } from 'antd';
import { formatFecha } from '../../utilidades/FormatearFecta';
import axios from 'axios';

const { TextArea } = Input;
const OTAserrinSecoLaUnion = ({onClose}) => {
  const URL = process.env.REACT_APP_URL;
  const [produccion, setProduccion] = useState(0) //valor solicitados al usuario
  const [sacos, setSacos]=useState(0)
  const [fechaProduccion] = useState(formatFecha(new Date()+1)) //valor solicitados al usuario
  const [sessionId, setSessionId] = useState('');
  const [connected, setConnected] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState('');
  const [comentario, setComentario]= useState('') //valor solicitados al usuario 
  const [componentDisabled, setComponentDisabled] = useState(true)
  const [creador, setid_creador] = useState('');

  useEffect(() => {
    setid_creador(localStorage.getItem('nombre'));
  }, []);

  const fetchData = async () => {
    const username = 'manager';
    const password = '2023**.';
    const payload = {
      "StartDate" : fechaProduccion,
      "ItemNo": "MP100028",
      "PlannedQuantity": produccion,
      "Series": "81",
      Remarks: `${comentario} | Creado por: ${creador}`,
      "ProductionOrderLines": [
          {       
               "StageID": 1,
              "PlannedQuantity": sacos,
              "ItemNo": "MP100024",
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
        if (onClose) {
          onClose(); // Cierra el modal
        }
        message.success('Orden de producción enviada con éxito');
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
        Aserrín Pino Grueso
        </Divider>
        <Col xs={24} sm={20} md={12}>
            <Form.Item label="Fecha de producción" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input disabled placeholder="Input Product Code" value={fechaProduccion} size="small"  required/>
            </Form.Item>
          </Col>
        <Row gutter={16}>
  
          <Col xs={24} sm={12} md={12}>
        
          <Form.Item label="Cantidad Planificada (lb)" required tooltip="This is a required field" name="cantidadPlanificada" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input placeholder="Cantidad planificada" size="small" type='number'   onChange={(e)=>{setProduccion(Number(e.target.value)||0)}}/>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12}>
        
          <Form.Item label="Madera Pino Para Moler (lb)" required tooltip="This is a required field" name="sacosconsumido" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              {/* <Input  placeholder="Sacos" size="small" value={sacos} readOnly   /> */}
              <Input placeholder="Ctd.requerida" size="small" onChange={(e)=>{setSacos(Number(e.target.value))}} />

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

export default OTAserrinSecoLaUnion;
