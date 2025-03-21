import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, DatePicker, Divider, Select, Space, message, Checkbox } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const OrdenProduccion = ({ config }) => {
    console.log(config)
  const [formData, setFormData] = useState({
    producción: 0,
    fechaProduccion: new Date().toISOString().split('T')[0],
    comentario: '',
    sacos: 0,
    bolsas: 0,
    esponjas: 0,
  });

  const [sessionId, setSessionId] = useState('');
  const [connected, setConnected] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);

  useEffect(() => {
    connectSL();
  }, []);

  const connectSL = async () => {
    let serv = 'https://sapsl.eco-aplicaciones.com:50000/';
    const jData = {
      UserName: localStorage.getItem('user'),
      Password: localStorage.getItem('pass'),
      CompanyDB: 'SBO_ECOFILTRO_LIVE_FACT',
    };

    try {
      const response = await axios.post(`${serv}/b1s/v1/Login`, jData);
      setSessionId(response.data.SessionId);
      setConnected(true);
      message.success("Conectado a SAP");
    } catch (error) {
      message.error("Error al conectar con SAP");
      console.error("Error de conexión:", error);
    }
  };

  const fetchData = async () => {
    const payload = {
      StartDate: formData.fechaProduccion,
      ItemNo: config.itemNo,
      PlannedQuantity: formData.producción,
      Series: config.series,
      Remarks: formData.comentario,
      ProductionOrderLines: config.materiales.map(mat => ({
        StageID: mat.StageID,
        PlannedQuantity: mat.calculaSacos ? formData.sacos : formData[mat.campo],
        ItemNo: mat.ItemNo,
        ProductionOrderIssueType: "im_Manual",
        Warehouse: mat.Warehouse,
      })),
    };

    try {
      const response = await axios.post(`https://sapsl.eco-aplicaciones.com:50000/b1s/v1/ProductionOrders`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `B1SESSION=${sessionId}`,
        },
        withCredentials: true,
      });
      message.success("Orden enviada correctamente");
    } catch (error) {
      message.error("Error al enviar la orden");
      console.error("Error:", error);
    }
  };

  const handleSubmit = () => {
    if (connected && sessionId) {
      fetchData();
    } else {
      message.error("No estamos conectados a SAP");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)}>
        Formulario deshabilitado
      </Checkbox>

      <Form layout="vertical" onFinish={handleSubmit} disabled={componentDisabled}>
        <Divider>{config.titulo}</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Fecha de producción">
              <Input disabled value={formData.fechaProduccion} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Código de Producto">
              <Input disabled value={config.itemNo} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Cantidad Planificada">
              <Input type="number" onChange={(e) => setFormData({ ...formData, producción: e.target.value })} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Comentario">
              <TextArea rows={1} onChange={(e) => setFormData({ ...formData, comentario: e.target.value })} />
            </Form.Item>
          </Col>
          {config.camposAdicionales?.map((campo) => (
            <Col span={12} key={campo.nombre}>
              <Form.Item label={campo.label}>
                <Input
                  type="number"
                  onChange={(e) => setFormData({ ...formData, [campo.nombre]: e.target.value })}
                />
              </Form.Item>
            </Col>
          ))}
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar Orden
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrdenProduccion;
