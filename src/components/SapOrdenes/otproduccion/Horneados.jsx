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

const { TextArea } = Input;
const Horneados = ({ onClose }) => {
  const URL = process.env.REACT_APP_URL;
  const sesionID = localStorage.getItem("SesionSL");
  const [horneados, setHorneados] = useState(""); //valor solicitados al usuario
  const [fechaHorneado, setfechaHorneado] = useState(""); //valor solicitados al usuario
  const [crudos, setCrudos] = useState(0); //valor solicitados al usuario
  const [gas, setGas] = useState(0); //valor solicitados al usuario

  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState("");
  const [comentario, setComentario] = useState(""); //valor solicitados al usuario
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [modeloreq, setSelectModelo] = useState("");
  const [creador, setid_creador] = useState("");

  const modelo = [
    { value: "PP500100", label: "Horneada 20 Lts." },
    { value: "PP500101", label: "Horneado 18 Lts." },
    { value: "PP500102", label: "Horneada Mini" },
  ];
  
  const modeloSalida={
    PP500100: "PP500000",
    PP500101: "PP500001",
    PP500102: "PP500002"
  };
  

  useEffect(() => {
    setid_creador(localStorage.getItem("nombre"));
  });

  const fetchData = async () => {
    const username = "manager";
    const password = "2023**.";
    const payload = {
      StartDate: fechaHorneado,
      ItemNo: modeloreq,
      PlannedQuantity: horneados,
      Series: "84",
      Remarks: `${comentario} | Creado por: ${creador}`,
      ProductionOrderLines: [
        {
          StageID: 1,
          PlannedQuantity: crudos,
          ItemNo: modeloSalida[modeloreq],
          ProductionOrderIssueType: "im_Manual",
          Warehouse: "Bodega02",
        },
        //     {
        //       "StageID": 1,
        //      "PlannedQuantity": gas,
        //      "ItemNo": "MP100008",
        //      "ProductionOrderIssueType": "im_Manual",
        //      "Warehouse": "Bodega02"
        //  },
      ],
      ProductionOrdersSalesOrderLines: [],
      ProductionOrdersStages: [
        {
          DocEntry: 28764,
          StageID: 1,
          SequenceNumber: 1,
          StageEntry: 1,
          Name: "MATERIALES",
        },
      ],
    };

    Promise.all([axios.post(`${URL}/OtpSAP`, { payload })])
      .then(([ordenesRes]) => {
        setResultado(ordenesRes.data.value || []);
        if (onClose) {
          onClose(); // 👈 Cierra el modal
        }
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
          Horneados
        </Divider>
        <Col xs={24} sm={24} md={10}>
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
              label="Fecha de horneado"
              name="datePicker"
              rules={[
                { required: true, message: "Por favor selecciona una fecha!" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                size="small"
                onChange={(date) => {
                  setfechaHorneado(date ? date.format("YYYY-MM-DD") : "");
                }}
              />
            </Form.Item>
          </Col>
          <Form.Item
            label="Cantidad planificada"
            name="Horneados"
            required
            rules={[{ required: true, message: "La cantidad es obligatorio!" }]}
          >
            <Input
              type="number"
              placeholder="Horneados"
              onChange={(e) => {
                setHorneados(e.target.value);
              }}
            />
          </Form.Item>
        </Row>
        <Divider
          orientation="left"
          orientationMargin={50}
          style={{ borderColor: "#7cb305" }}
        >
          DTH
        </Divider>

        <Row gutter={16}>
          <Col xs={12} sm={12} md={12}>
            <Form.Item
              label="UF. Crudo 20 Lts."
              name="crudos"
              required
              tooltip="This is a required field"
              rules={[
                { required: true, message: "Por favor ingrese una cantidad!" },
              ]}
            >
              <Input
                type="number"
                placeholder="Ctd.requerida"
                size="small"
                onChange={(e) => {
                  setCrudos(e.target.value);
                }}
              />
            </Form.Item>
          </Col>

          {/* <Col xs={20} sm={12} md={12}>
            <Form.Item label="Consumo de gas" name="gas" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]} >
              <Input type='number' placeholder="Gas Propano" size="small" onChange={(e)=>{setGas(e.target.value)}} />
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={16}></Row>
        <Form.Item
          label="Comentario"
          name="comentario"
          required
          rules={[{ required: true, message: "El comentario es obligatorio!" }]}
        >
          <TextArea
            rows={1}
            placeholder="Comentario"
            onChange={(e) => {
              setComentario(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Horneados;
