import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../utilidades/FormatearFecta";
import { Button, Divider, Table } from 'antd';
import CrearOT from "./botonOT/Crear_OT";
import Detalle from "./botonOT/Detalle";
import ButtnEst from "./botonOT/EstadoProc";
import { useAbility } from '../AbilityContext';
import '../maquinaria/TablaEstilos.css';

const URL = process.env.REACT_APP_URL;

const TablaOT = () => {
  const ability = useAbility();
  const [estOT, setEstot] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get(`${URL}/TablaCLP`);
        setEstot(response.data);
      } catch (error) {
        setError("No hay órdenes de trabajo activas en este momento.");
        console.error("Error al obtener los datos:", error);
      }
    };
    obtenerDatos();
  }, []);

  // Definición de handleClickButton
  const handleClickButton = (id, encabezado) => {
    console.log("ID:", id);
    console.log("Encabezado:", encabezado);
  };

  const columns = [
    {
      title: 'Detalle',
      dataIndex: 'encabezado',
      key: 'encabezado',align: 'center',
      render: (text, record) => (
        <Detalle
          encabezado={record.encabezado}
          EncName={record.EncName}
          fecha_creacion={record.fecha_creacion}
          id={record.id}
        />
      ),
    },
    {
      title: 'Fecha de Producción',
      dataIndex: 'fecha_creacion',
      key: 'fecha_creacion',align: 'center',
      render: (text) => formatFecha(text),
    },
    {
      title: 'Orden',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (text, record) => (
         record.encabezado+'-'+record.id
      ),
    },
   
    {
      title: 'Limite Liquido',
      key: 'acciones',
      align: 'center',
      render: (_, record) => (
        <div style={{ display: 'flex' }}>
          {(ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (
            <CrearOT
              existenciaAserrin={record.datosAserrin}
              encabezado="CLiqido"
              EncName={record.EncName}
              fecha_creacion={record.fecha_creacion}
              id={record.id}
            />
          ) : (
            <Button type="default" disabled style={{ color: 'red', fontWeight: 'bold', align:'center' }}>OT</Button>
          )}

   
        </div>
      ),
    },
    {
      title: 'Limite Plastico',
      key: 'acciones',
      align: 'center',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          {(ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (
            <CrearOT
              existenciaBarro={record.datosBarro}
              encabezado="CPlastico"
              EncName={record.EncName}
              fecha_creacion={record.fecha_creacion}
              id={record.id}
            />
          ) : (
            <Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>OT</Button>
          )}
        </div>
      ),
    },
    {
      title: 'Estado',
      key: 'acciones',
      align: 'center',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

{(ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (
            <ButtnEst
              handleClickButton={handleClickButton} // Ahora está definido
              id={record.id}
              encabezado={record.encabezado}
            />
          ) : (
            <Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>Estado</Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Divider style={{ color: '#f5222d' }}>Órdenes de Límite Líquido/Plástico</Divider>
      {error && <p>{error}</p>}
      <Table
        columns={columns}
        dataSource={estOT}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        style={{ overflowX: "auto" }}
      />
    </div>
  );
};

export default TablaOT;
