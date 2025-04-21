import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, Divider, Checkbox, message } from 'antd';
import { formatFecha } from '../../utilidades/FormatearFecta';
import axios from 'axios';

const { TextArea } = Input;

const OTAserrinSecoLaUnion = ({ onClose }) => {
  const URL = process.env.REACT_APP_URL;
  const [produccion, setProduccion] = useState(0);
  const [consumido, setConsumido] = useState(0);
  const [fechaProduccion] = useState(formatFecha(new Date() + 1));
  const [comentario, setComentario] = useState('');
  const [resultado, setResultado] = useState([]);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [creador, setid_creador] = useState('');

  useEffect(() => {
    setid_creador(localStorage.getItem('nombre'));
  }, []);

  const fetchData = async () => {
    const payload = {
      StartDate: fechaProduccion,
      ItemNo: "MP100027",
      PlannedQuantity: produccion,
      Series: "81",
      Remarks: `${comentario} | Creado por: ${creador}`,
      ProductionOrderLines: [
        {
          StageID: 1,
          PlannedQuantity: consumido,
          ItemNo: "MP100028",
          ProductionOrderIssueType: "im_Manual",
          Warehouse: "Bodega01"
        }
      ],
      ProductionOrdersSalesOrderLines: [],
      ProductionOrdersStages: [
        {
          DocEntry: 28764,
          StageID: 1,
          SequenceNumber: 1,
          StageEntry: 1,
          Name: "MATERIALES"
        }
      ]
    };

    try {
      const response = await axios.post(`${URL}/OtpSAP`, { payload });
      setResultado(response.data.value || []);
      message.success('Orden de producción enviada con éxito');
      setComponentDisabled(false);

      if (onClose) {
        onClose(); // Cierra el modal
      }
      
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      message.error('Error al enviar los datos');
      setResultado([]);
    }
  };

  const handleSubmit = () => {
    fetchData();
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
        style={{ marginBottom: 20 }}
      >
        Formulario deshabilitado
      </Checkbox>

      <Form layout="vertical" onFinish={handleSubmit} disabled={componentDisabled}>
        <Divider orientation="left" orientationMargin={30} style={{ borderColor: '#7cb305' }}>
         Aserrín Pino Tamizado
        </Divider>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Fecha de producción">
              <Input value={fechaProduccion} disabled size="small" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Cantidad Planificada (lb)"
              name="cantidadPlanificada"
              rules={[{ required: true, message: 'Por favor ingrese una cantidad' }]}
            >
              <Input
                placeholder="Cantidad en libras"
                size="small"
                type="number"
                onChange={(e) => setProduccion(Number(e.target.value) || 0)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left" orientationMargin={30} style={{ borderColor: '#7cb305' }}>
          DAPT
        </Divider>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="MP100028 Aserrin Pino Grueso"
              name="sacosconsumido"
              rules={[{ required: true, message: 'Por favor ingrese una cantidad' }]}
            >
              <Input
                placeholder="Cantidad requerida"
                size="small"
                type="number"
                onChange={(e) => setConsumido(Number(e.target.value))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24}>
            <Form.Item
              label="Comentario"
              name="comentario"
              rules={[{ required: true, message: 'El comentario es obligatorio' }]}
            >
              <TextArea
                rows={2}
                placeholder="Ingrese un comentario"
                onChange={(e) => setComentario(e.target.value)}
              />
            </Form.Item>
          </Col>
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

export default OTAserrinSecoLaUnion;
