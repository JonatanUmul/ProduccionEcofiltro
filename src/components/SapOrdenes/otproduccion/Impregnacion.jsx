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
  message
} from "antd";

import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";

const { TextArea } = Input;
const Horneados = ({ onClose }) => {
  const URL = process.env.REACT_APP_URL;
  const sesionID = localStorage.getItem("SesionSL");
  const [impregnados, setImpregnados] = useState("");
  const [fechaControl] = useState(formatFecha(new Date()));
  const [aprobados, setAprobados] = useState(0);
  const [gas, setGas] = useState(0);
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState("");
  const [comentario, setComentario] = useState("");
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [modeloreq, setSelectModelo] = useState("");
  const [creador, setid_creador] = useState("");
  const [insumosSeleccionados, setInsumosSeleccionados] = useState([]);
  const [cantidadesInsumos, setCantidadesInsumos] = useState({});

  const modelo = [
    { value: "PP500300", label: "UF. Impregnado 20 Lts." },
    { value: "PP500301", label: "UF. Impregnado 18 Lts." },
    { value: "PP500302", label: "UF. Impregnado Mini" },
  ];

  const modeloSalida = {
    PP500300: "PP500200",
    PP500301: "PP500201",
    PP500302: "PP500202",
  };

  const etiquetas = {
    PP500300: "UF Aprobado 20 LTS",
    PP500301: "UF Aprobado 18 LTS",
    PP500302: "UF Parobado Mini",
  };

  const insumos = [
    { label: "Plata Coloidal", value: "MP100006" },
    { label: "Nano Plata Coloidal", value: "MP100011" },
    { label: "Brocha de 2", value: "SU300008" },
  ];

  useEffect(() => {
    setid_creador(localStorage.getItem("nombre"));
  });

  const fetchData = async () => {
    const payload = {
      StartDate: fechaControl,
      ItemNo: modeloreq,
      PlannedQuantity: impregnados,
      Series: "85",
      Remarks: `${comentario} | Creado por: ${creador}`,
      ProductionOrderLines: [
        {
          StageID: 1,
          PlannedQuantity: aprobados,
          ItemNo: modeloSalida[modeloreq],
          ProductionOrderIssueType: "im_Manual",
          Warehouse: "Bodega02",
        },
        ...insumosSeleccionados.map((item) => ({
          StageID: 1,
          PlannedQuantity: cantidadesInsumos[item],
          ItemNo: item,
          ProductionOrderIssueType: "im_Manual",
          Warehouse: "Bodega02",
        })),
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
        message.success('Orden de producción enviada con éxito');

        if (onClose) {
          onClose(); // Cierra el modal
        }

      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        message.error('Error al enviar los datos');
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
        style={{ maxWidth: 600 }}
      >
        <Divider orientation="left" orientationMargin={50} style={{ borderColor: "#7cb305" }}>
          Impregnación
        </Divider>

        <Col xs={24} sm={24} md={14}>
          <Form.Item label="Modelo UF" name="modelo">
            <Space.Compact style={{ width: "100%" }}>
              <Select
                options={modelo}
                style={{ width: "70%" }}
                onChange={(value) => setSelectModelo(value)}
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
              onChange={(e) => setImpregnados(e.target.value)}
            />
          </Form.Item>
        </Row>

        <Divider orientation="left" orientationMargin={50} style={{ borderColor: "#7cb305" }}>
          Detalle Impregnación
        </Divider>

        <Row gutter={24}>
          <Col xs={12} sm={12} md={12}>
            <Form.Item
              label={etiquetas[modeloreq] || "Cantidad requerida"}
              name="impregnados"
              required
              tooltip="This is a required field"
              rules={[{ required: true, message: "Por favor ingrese una cantidad!" }]}
            >
              <Input
                type="number"
                placeholder="Ctd.requerida"
                size="small"
                onChange={(e) => setAprobados(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24}>
            {insumos.map((insumo) => (
              <div key={insumo.value} style={{ marginBottom: 8 }}>
                <Checkbox
                  checked={insumosSeleccionados.includes(insumo.value)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const value = insumo.value;

                    if (checked) {
                      setInsumosSeleccionados([...insumosSeleccionados, value]);
                      setCantidadesInsumos({ ...cantidadesInsumos, [value]: 1 });
                    } else {
                      setInsumosSeleccionados(insumosSeleccionados.filter((i) => i !== value));
                      const { [value]: _, ...rest } = cantidadesInsumos;
                      console.log('Prueba de const distinto',{ [value]: _, ...rest })
                      setCantidadesInsumos(rest);
                    }
                  }}
              
                >
                  {insumo.label}
                </Checkbox>

                {insumosSeleccionados.includes(insumo.value) && (
                  <Input
                    type="number"
                    min={1}
                    style={{ width: "100px", marginLeft: "10px" }}
                    value={cantidadesInsumos[insumo.value]}
                    onChange={(e) =>
                      setCantidadesInsumos({
                        ...cantidadesInsumos,
                        [insumo.value]: parseInt(e.target.value, 10),
                      })
                    }
                    required
                  />
                )}
              </div>
            ))}
          </Col>
        </Row>

        <Form.Item
          label="Comentario"
          name="comentario"
          required
          rules={[{ required: true, message: "El comentario es obligatorio!" }]}
        >
          <TextArea
            rows={1}
            placeholder="Comentario"
            onChange={(e) => setComentario(e.target.value)}
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