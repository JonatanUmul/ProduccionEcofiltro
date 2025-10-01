import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import BotonOT from "./botonOT/BotonOT";
import Detalle from "./botonOT/Detalle";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearOT from './botonOT/Crear_OT';
import { useAbility } from '../AbilityContext';
import { Divider, Button, Tabs, Row, Col } from 'antd';
import EstadoProc from './botonOT/EstadoProc';
import PaginasBarro from '../UI/PaginasBarro'

const TablaBarro = () => {
  const URL = process.env.REACT_APP_URL;
  const [datosApi, setdatosApi] = useState([]);
  const ability = useAbility();
  const [id_creador, setid_creador] = useState("");
  const materiaPrima='Barro'
 
  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador"));
  }, []);

  const DatosApi = async () => {
    try {
      const response = await axios.get(`${URL}/MateriaPriaBarro`,{params:{materiaPrima}});
      setdatosApi(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    DatosApi();
  }, []);


    const pagina="1"

  return (
    <div style={{ width: "100%", height: "100vh", padding: "1rem" }}>
    <Row style={{ height: "100%" }}>
      {/* Tabs laterales */}
      <Col span={3} style={{ borderRight: "1px solid #f0f0f0" }}>
      <Divider orientation="left" style={{ color: "blue" }}>
            Etapas del Barro
          </Divider>
        <PaginasBarro activeTabKey={pagina} materiaPrima={materiaPrima}/>
      </Col>
      <Col span={20} style={{ paddingLeft: "2rem" }}>
      <Divider orientation="left" style={{ color: "#f5222d" }}>
            Muestras de barro
          </Divider>
          <div className="mb-3">
        {(ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (
          <BotonOT materiaPrima={materiaPrima}/>
        ) : (
          <Button  type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
            Crear OT
          </Button>
        )}
      </div>


      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {datosApi.map((row, index) => (
          <Card
            key={row.id || index}
            style={{
              width: '16rem',
              margin: '0.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              borderRadius: '12px',
              flex: '0 0 auto',
            }}
          >
            <Card.Body>
              <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
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
              <Card.Text>
                <div style={{ display: 'flex' }}>
                  <CrearOT datosApi={row} type="button">Crear Registro</CrearOT>
                  <EstadoProc encacezado='TablaRecepcionBarro' datosApi={row} id_creador={id_creador} materiaPrima={materiaPrima}/>

                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      </Col>
      </Row>
    </div>
  );
};

export default TablaBarro;
