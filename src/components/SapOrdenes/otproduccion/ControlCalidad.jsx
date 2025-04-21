import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Divider,
  Select,
  Space,
  Checkbox,
} from "antd";

import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";

const { TextArea } = Input;
const Horneados = ({ onClose }) => {
  const URL = process.env.REACT_APP_URL;
  const sesionID = localStorage.getItem("SesionSL");
  const [aprobados, setAprobados] = useState(""); //valor solicitados al usuario
  const [fechaControl] = useState(formatFecha(new Date())); //valor solicitados al usuario
  const [horneados, setHorneados] = useState(0); //valor solicitados al usuario
  const [gas, setGas] = useState(0); //valor solicitados al usuario

  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState("");
  const [comentario, setComentario] = useState(""); //valor solicitados al usuario
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [modeloreq, setSelectModelo] = useState("");
  const [creador, setid_creador] = useState("");

  const modelo = [
    { value: "PP500200", label: "UF. Aprobada 20 Lts." },
    { value: "PP500201", label: "UF. Aprobada 18 Lts." },
    { value: "PP500202", label: "UF. Aprobada Mini" },
  ];
  
  const modeloSalida={
    PP500200: "PP500100",
    PP500201: "PP500101",
    PP500202: "PP500102"
  };
  
  const etiquetas = {
    PP500200: "UF Horneado 20 LTS",
    PP500201: "UF Horneado 18 LTS",
    PP500202: "UF Horneado Mini",
  };

  useEffect(() => {
    setid_creador(localStorage.getItem("nombre"));
  });

  const fetchData = async () => {
    const username = "manager";
    const password = "2023**.";
    const payload = {
      StartDate: fechaControl,
      ItemNo: modeloreq,
      PlannedQuantity: aprobados,
      Series: "85",
      Remarks: `${comentario} | Creado por: ${creador}`,
      ProductionOrderLines: [
        {
          StageID: 1,
          PlannedQuantity: horneados,
          ItemNo: modeloSalida[modeloreq],
          ProductionOrderIssueType: "im_Manual",
          Warehouse: "Bodega02",
        },
     
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
          Control de Calidad
        </Divider>
        <Col xs={24} sm={24} md={14}>
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
           
            </Space.Compact>
          </Form.Item>
        </Col>
        <Row gutter={16}>
        
          <Form.Item
            label="Cantidad planificada"
            name="Planificado"
            required
            rules={[{ required: true, message: "La cantidad es obligatorio!" }]}
          >
            <Input
              type="number"
              placeholder="Planificado"
              onChange={(e) => {
                setAprobados(e.target.value);
              }}
            />
          </Form.Item>
        </Row>
        <Divider
          orientation="left"
          orientationMargin={50}
          style={{ borderColor: "#7cb305" }}
        >
          Detalle Control de Calidad
        </Divider>

        <Row gutter={16}>
          <Col xs={12} sm={12} md={12}>
            <Form.Item
              label={etiquetas[modeloreq] || "Cantidad requerida"}
              name="horneados"
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
                  setHorneados(e.target.value);
                }}
              />
            </Form.Item>
          </Col>

        
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
