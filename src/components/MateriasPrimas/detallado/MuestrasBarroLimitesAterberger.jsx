import React, {useState} from "react";
import { Formik, Form } from "formik";
import NumberInput from "../../UI/NumberInput.jsx";
import Button from "../../UI/Button.jsx";
import PostRegistroIndicesAtterberg from "../../../services/PostRegistroIndicesAtterberg.js";
import SuccesAlert from "../../UI/alerts/succesAlert.jsx";
import ErrorAlert from "../../UI/alerts/ErrorAlert.jsx";
import Skeleton from "../detallado/Skeleton.jsx";
const MuestrasBarroLimitesAterberger = ({ datosApi, onClose }) => {
  const [loading, setLoading] = useState(false);
  
  const EnviarDatos = async ({ values }) => {
    try {
      const codigoLote = datosApi.codigo_lote;
      const response = await PostRegistroIndicesAtterberg({ values, codigoLote });
      const respuesta= response.data.respuesta
      console.log('Respuesta del servidor',respuesta)
      setLoading(true);
      SuccesAlert({respuesta});
      onClose();
    } catch (error) {
      ErrorAlert(error);
    }
  };
  return (
    <div
      style={{
        marginTop: "5px",
        background: "#ffffff",

        // borderRadius: '12px',
        // maxWidth: '500px',
        margin: "2rem auto",
        // boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
        fontFamily: "sans-serif",
      }}
    >
      <h3
        style={{
          color: "#1677ff",
          marginBottom: "1rem",
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      >
        Registro de Muestra
      </h3>

      <Formik
        initialValues={{
          LimiteLiquido: 0,
          LimitePlastico: 0,
          IndicePlastico: 0,
          arcilla: 0,
          arena: 0,
          limo: 0,
        }}
        onSubmit={(values) => EnviarDatos({ values })}
      >
        <Form>
          <p style={{ marginBottom: "1rem", fontSize: "0.95rem" }}>
            <strong>Lote:</strong> {datosApi.codigo_lote}
          </p>

          {/* Primera fila: Límites */}
          <div
            style={{ display: "flex", gap: "0.8rem", marginBottom: "0.6rem" }}
          >
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Límite Líquido</label>
              <NumberInput
                name="LimiteLiquido"
                placeholder="Límite Líquido"
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Límite Plástico</label>
              <NumberInput
                name="LimitePlastico"
                placeholder="Límite Plástico"
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
              />
            </div>
          </div>

          {/* Segunda fila: Índice y Arcilla */}
          <div
            style={{ display: "flex", gap: "0.8rem", marginBottom: "0.6rem" }}
          >
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Índice Plástico</label>
              <NumberInput
                name="IndicePlastico"
                placeholder="Índice Plástico"
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>% Arcilla</label>
              <NumberInput
                name="arcilla"
                placeholder="% Arcilla"
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
              />
            </div>
          </div>

          {/* Tercera fila: Arena y Limo */}
          <div
            style={{ display: "flex", gap: "0.8rem", marginBottom: "0.6rem" }}
          >
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>% Arena</label>
              <NumberInput
                name="arena"
                placeholder="% Arena"
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>% Limo</label>
              <NumberInput
                name="limo"
                placeholder="% Limo"
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
              />
            </div>
          </div>
          {loading ? (
            <Skeleton active={loading}></Skeleton>
          ) : (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <Button type="submit">Guardar</Button>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

const labelStyle = {
  display: "block",
  fontWeight: 500,
  marginBottom: "0.2rem",
  fontSize: "0.9rem",
};

export default MuestrasBarroLimitesAterberger;
