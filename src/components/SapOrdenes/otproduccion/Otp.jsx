import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Divider,
  Select,
  Space,
  message,
  Checkbox,
} from "antd";

import axios from "axios";
const options = [
  { value: "MP100016", label: "Aserrin la Union 2" },
  { value: "MP100019", label: "Aserrin la Union 1" },
  { value: "MP100015", label: "Aserrin Jordan 2" },
  { value: "MP100014", label: "Aserrin Jordan 1" },
];

const modelo = [
  { value: "PP500000", label: "UF. Crudo 20 Lts." },
  { value: "PP500001", label: "UF. Crudo 18 Lts." },
  { value: "PP500002", label: "UF. Crudo Mini" },
];
const URL = process.env.REACT_APP_URL;

const { TextArea } = Input;
const Otp = ({ onClose }) => {
  const sesionID = localStorage.getItem("SesionSL");
  const [producción, setProduccion] = useState(""); //valor solicitados al usuario
  const [fechaProduccion, setfechaProduccion] = useState(""); //valor solicitados al usuario
  const [formulas, setFormulas] = useState(0); //valor solicitados al usuario
  const [librasA1, setLibrasA1] = useState(0); //valor solicitados al usuario
  const [librasA2, setLibrasA2] = useState(0); //valor solicitados al usuario
  const [librasBarro, setLibrasBarro] = useState(0); //valor solicitados al usuario
  const [sessionId, setSessionId] = useState("");
  const [connected, setConnected] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState("");
  const [comentario, setComentario] = useState(""); //valor solicitados al usuario
  const [SelectAserrin1, setSelectAserrin1] = useState(); //Seleccion Tipo aserrin
  const [SelectAserrin2, setSelectAserrin2] = useState(); //Seleccion Tipo aserrin
  const [bolsas, setBolsas] = useState(0);
  const [esponjas, setEsponjas] = useState(0);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [login, setLoginSL] = useState([]);
  const BarroPlanificado = formulas * librasBarro;
  const AserrinPlinificado1 = formulas * librasA1;
  const AserrinPlinificado2 = formulas * librasA2;
  const [modeloreq, setSelectModelo] = useState("");
  const [creador, setid_creador] = useState('');

  useEffect(() => {
    setid_creador(localStorage.getItem('nombre'));
  }, []);


  const fetchData = async () => {
    const username = "manager";
    const password = "2023**.";
    // const payload = {
    //   StartDate: fechaProduccion,
    //   // "ItemNo": "PP500000",
    //   ItemNo: modeloreq,
    //   PlannedQuantity: producción,
    //   Series: "83",
    //   Remarks: comentario,

    // };
    const payload = {
    
      "Series": 83,
      "ItemNo": modeloreq,
      "ProductionOrderType": "bopotStandard",
      "PlannedQuantity": producción,
      "CompletedQuantity": 0.0,
      "RejectedQuantity": 0.0,
      "ProductionOrderOrigin": "bopooManual",
      "UserSignature": 1,
      "Remarks": `${comentario} | Creado por: ${creador}`,
      "Warehouse": "Bodega03",
      "JournalRemarks": "Orden fabricación: PP500300",
      "StartDate": "2025-05-06",
      "Priority": 100,
      "RoutingDateCalculation": "raOnStartDate",
      "UpdateAllocation": "bouaCalculated",
      "SAPPassport": null
}
    

    Promise.all([axios.post(`${URL}/OtpSAP`, { payload })])
      .then(([ordenesRes]) => {
        setResultado(ordenesRes.data.value || []);
        if (onClose) {
          onClose(); // Cierra el modal
        }
        message.success("Orden de producción enviada con éxito");
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setResultado([]);
      });
  };

  const handleSubmit = () => {
    fetchData();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Formulario deshabilitado
      </Checkbox>

      <Form
        layout="vertical"
        onFinish={handleSubmit}
        disabled={componentDisabled}
        style={{
          maxWidth: 600,
        }}
      >
        <Divider
          orientation="left"
          orientationMargin={50}
          style={{ borderColor: "#7cb305" }}
        >
          OTP
        </Divider>
        <Col xs={24} sm={12} md={10}>
          <Form.Item label="Modelo UF" name="modelo">
            <Space.Compact style={{ width: "100%" }}>
              <Select
                options={modelo}
                style={{ width: "70%" }}
                onChange={(value) => {
                  setSelectModelo(value);
                }}
                rules={[{ required: true, message: "Modelo" }]}
              />
              {/* <Input placeholder="Additional Info" style={{ width: '30%' }} size="small" value={AserrinPlinificado1}  /> */}
            </Space.Compact>
          </Form.Item>
        </Col>
        <Row gutter={16}>
          {/* <Col xs={24} sm={12} md={8}>
            <Form.Item label="Código de Producto" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input placeholder="Input Product Code" value='PP500100' size="small"  required/>
            </Form.Item>
          </Col> */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Nombre de Producto"
              required
              tooltip="This is a required field"
              rules={[
                { required: true, message: "Por favor ingrese una cantidad!" },
              ]}
            >
              <Input
                placeholder="Input Product Name"
                value={modeloreq}
                size="small"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Almacen"
              required
              tooltip="This is a required field"
              rules={[
                { required: true, message: "Por favor ingrese una cantidad!" },
              ]}
            >
              <Input
                placeholder="Input Warehouse"
                value="Bodega02"
                size="small"
                required
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Producto"
              required
              tooltip="This is a required field"
            >
              <Input placeholder="Input Product" value="83" size="small" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Cantidad Planificada"
              required
              tooltip="This is a required field"
              name="cantidadPlanificada"
              rules={[
                { required: true, message: "Por favor ingrese una cantidad!" },
              ]}
            >
              <Input
                placeholder="Cantidad Planificada"
                size="small"
                onChange={(e) => {
                  setProduccion(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Fecha de producción"
              name="datePicker"
              rules={[
                { required: true, message: "Por favor selecciona una fecha!" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                size="small"
                onChange={(date) => {
                  setfechaProduccion(date ? date.format("YYYY-MM-DD") : "");
                }}
              />
            </Form.Item>
          </Col>

          <Form.Item
            label="Comentario"
            name="comentario"
            required
            rules={[
              { required: true, message: "El comentario es obligatorio!" },
            ]}
          >
            <TextArea
              rows={1}
              placeholder="Comentario"
              onChange={(e) => {
                setComentario(e.target.value);
              }}
            />
          </Form.Item>
        </Row>
        <Divider
          orientation="left"
          orientationMargin={50}
          style={{ borderColor: "#7cb305" }}
        >
          DTP
        </Divider>

        <Row gutter={16}>
          <Col xs={12} sm={6} md={6}>
            <Form.Item
              label="Formulas"
              name="formulas"
              required
              tooltip="This is a required field"
              rules={[
                { required: true, message: "Por favor ingrese una cantidad!" },
              ]}
            >
              <Input
                type="number"
                placeholder="Formulas"
                size="small"
                onChange={(e) => {
                  setFormulas(e.target.value);
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={20} sm={6} md={6}>
            <Form.Item
              label="Aserrín 1"
              name="aserrin1lb"
              required
              tooltip="This is a required field"
              rules={[
                { required: true, message: "Por favor ingrese una cantidad!" },
              ]}
            >
              <Input
                type="number"
                placeholder="Lb. Aserrin 1"
                size="small"
                onChange={(e) => {
                  setLibrasA1(e.target.value);
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={20} sm={6} md={6}>
            <Form.Item
              label="Aserrín 2"
              name="aserrin2lb"
              required
              tooltip="This is a required field"
              rules={[
                { required: true, message: "Por favor ingrese una cantidad!" },
              ]}
            >
              <Input
                type="number"
                placeholder="Lb. Aserrin 2"
                size="small"
                onChange={(e) => {
                  setLibrasA2(e.target.value);
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={20} sm={6} md={6}>
            <Form.Item
              label="Barro"
              name="lbbarro"
              required
              tooltip="This is a required field"
              rules={[
                { required: true, message: "Por favor ingrese una cantidad!" },
              ]}
            >
              <Input
                type="number"
                placeholder="Lb. Barro"
                size="small"
                onChange={(e) => {
                  setLibrasBarro(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={10}>
            <Form.Item label="Select Aserrín 1" name="selectAserrin1">
              <Space.Compact style={{ width: "100%" }}>
                <Select
                  options={options}
                  style={{ width: "70%" }}
                  onChange={(value) => {
                    setSelectAserrin1(value);
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Por favor seleccione Aserrín 1!",
                    },
                  ]}
                />
                <Input
                  placeholder="Additional Info"
                  style={{ width: "30%" }}
                  size="small"
                  value={AserrinPlinificado1}
                />
              </Space.Compact>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={10}>
            <Form.Item label="Select Aserrín 2" name="selectAserrin2">
              <Space.Compact style={{ width: "100%" }}>
                <Select
                  options={options}
                  style={{ width: "70%" }}
                  onChange={(value) => {
                    setSelectAserrin2(value);
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Por favor seleccione Aserrín 2!",
                    },
                  ]}
                />
                <Input
                  placeholder="Additional Info"
                  style={{ width: "30%" }}
                  size="small"
                  value={AserrinPlinificado2}
                />
              </Space.Compact>
            </Form.Item>
          </Col>

          <Col xs={12} sm={6} md={6}>
            <Form.Item
              label="Barro"
              rules={[
                { required: true, message: "Por favor ingrese una cantidad!" },
              ]}
            >
              <Input
                placeholder="Barro Planificado"
                size="small"
                value={BarroPlanificado}
              />
            </Form.Item>
          </Col>

          <Col xs={12} sm={6} md={6}>
            <Form.Item
              label="Bolsas"
              name="bolsas"
              rules={[
                { required: true, message: "Por favor ingrese una cantidad!" },
              ]}
            >
              <Input
                placeholder="Bolsas"
                size="small"
                onChange={(e) => {
                  setBolsas(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={6}>
            <Form.Item
              label="Esponjas"
              name="esponjas"
              rules={[
                { required: true, message: "Por favor ingrese una cantidad!" },
              ]}
            >
              <Input
                placeholder="Esponjas"
                size="small"
                onChange={(e) => {
                  setEsponjas(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Otp;
