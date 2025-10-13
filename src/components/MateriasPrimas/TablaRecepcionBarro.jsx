import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import BotonOT from "./botonOT/BotonOT";
import Detalle from "./botonOT/Detalle";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearOT from './botonOT/Crear_OT';
import { useAbility } from '../AbilityContext';
import { Divider, Button, Row, Col } from 'antd';
import EstadoProc from './botonOT/EstadoProc';
import PaginasBarro from '../UI/PaginasBarro';

const TablaBarro = () => {
  const URL = process.env.REACT_APP_URL;
  const [datosApi, setdatosApi] = useState([]);
  const ability = useAbility();
  const [id_creador, setid_creador] = useState("");
  const materiaPrima = 'Barro';

  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador"));
  }, []);

  const DatosApi = async () => {
    try {
      const response = await axios.get(`${URL}/MateriaPriaBarro`, { params: { materiaPrima } });
      setdatosApi(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    DatosApi();
  }, []);

  const pagina = "1";

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "calc(100vh - 120px)",
        overflow: "hidden",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* Tabs laterales */}
      <div
        style={{
          minWidth: "230px",
          borderRight: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
          padding: "10px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Divider orientation="left" style={{ color: "blue", margin: "0 0 8px 16px" }}>
          Etapas del Barro
        </Divider>
        <div style={{ flexGrow: 1, overflowY: "auto" }}>
          <PaginasBarro activeTabKey={pagina} materiaPrima={materiaPrima} />
        </div>
      </div>

      {/* Contenido principal */}
      <div
        style={{
          flexGrow: 1,
          padding: "24px 32px",
          overflowY: "auto",
        }}
      >
        <Divider orientation="left" style={{ color: "#f5222d" }}>
          Muestras de barro
        </Divider>

        <div className="mb-3">
          {ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor')) ? (
            <BotonOT materiaPrima={materiaPrima} />
          ) : (
            <Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
              Crear OT
            </Button>
          )}
        </div>

        {/* Tarjetas de lotes */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {datosApi.map((row, index) => (
            <Card
              key={row.id || index}
              style={{
                width: '16rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                flex: '0 0 auto',
              }}
            >
              <Card.Body>
                <Card.Title style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  Lote: {row.codigo_lote} <Detalle datosApi={row} />
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Responsable: {row.Nombre}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Fecha: {formatFecha(row.fecha)}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Estado: {row.nombre}
                </Card.Subtitle>
                <div style={{ borderTop: '1px solid #eee', margin: '8px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <CrearOT datosApi={row} type="button">Crear Registro</CrearOT>
                  <EstadoProc
                    encacezado="TablaRecepcionBarro"
                    datosApi={row}
                    id_creador={id_creador}
                    materiaPrima={materiaPrima}
                  />
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablaBarro;
