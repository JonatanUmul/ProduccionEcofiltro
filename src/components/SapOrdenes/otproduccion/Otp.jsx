import React, { useState,useEffect } from 'react';
import { Button, Form, Input, Row, Col, DatePicker, Divider, Select, Space, message, Checkbox  } from 'antd';

import axios from 'axios';
const options = [
  { value: 'MP100016', label: 'Aserrin la Union 2' },
  { value: 'MP100019', label: 'Aserrin la Union 1' },
  { value: 'MP100015', label: 'Aserrin Jordan 2' },
  { value: 'MP100014', label: 'Aserrin Jordan 1' },
];
const URL = process.env.REACT_APP_URL;

const { TextArea } = Input;
const Otp = ({}) => {
  const sesionID= localStorage.getItem('SesionSL')
  console.log('prueba de localstorage', sesionID)
  const [producción, setProduccion] = useState('') //valor solicitados al usuario
  const [fechaProduccion, setfechaProduccion] = useState('') //valor solicitados al usuario
  const [formulas, setFormulas] = useState(0) //valor solicitados al usuario
  const [librasA1, setLibrasA1] = useState(0) //valor solicitados al usuario
  const [librasA2, setLibrasA2] = useState(0) //valor solicitados al usuario
  const [librasBarro, setLibrasBarro] = useState(0) //valor solicitados al usuario
  const [sessionId, setSessionId] = useState('');
  const [connected, setConnected] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState('');
  const [comentario, setComentario]= useState('') //valor solicitados al usuario 
  const [SelectAserrin1, setSelectAserrin1] = useState() //Seleccion Tipo aserrin
  const [SelectAserrin2, setSelectAserrin2] = useState() //Seleccion Tipo aserrin
  const [bolsas, setBolsas] = useState(0)
  const [esponjas, setEsponjas] = useState(0)
  const [componentDisabled, setComponentDisabled] = useState(true)
  const [login, setLoginSL]=useState([])
  const BarroPlanificado = formulas*librasBarro 
  const AserrinPlinificado1 = formulas*librasA1
  const AserrinPlinificado2 = formulas*librasA2

console.log('Resultado del playload', resultado)
  
 
    const fetchData = async () => {
    const username = 'manager';
    const password = '2023**.';
    const payload = {
      "StartDate" : fechaProduccion,
      "ItemNo": "PP500000",
      "PlannedQuantity": producción,
      "Series": "83",
      "Remarks": comentario,
      "ProductionOrderLines": [
          {       
               "StageID": 1,
              "PlannedQuantity": BarroPlanificado,
              "ItemNo": "MP100004",
              "ProductionOrderIssueType": "im_Manual",
              "Warehouse": "Bodega01"
          },
          {
               "StageID": 1,
              "PlannedQuantity": AserrinPlinificado1,
              "ItemNo": SelectAserrin1,
              "ProductionOrderIssueType": "im_Manual",
              "Warehouse": "Bodega01"
          },
          {
              "StageID": 1,
             "PlannedQuantity": AserrinPlinificado2,
             "ItemNo": SelectAserrin2,
             "ProductionOrderIssueType": "im_Manual",
             "Warehouse": "Bodega01"
         },
          {
               "StageID": 1,
              "PlannedQuantity": bolsas,
              "ItemNo": "SU300000",
              "ProductionOrderIssueType": "im_Manual",
              "Warehouse": "Bodega02"
          },
          {
               "StageID": 1,
              "PlannedQuantity": esponjas,
              "ItemNo": "SU300001",
              "ProductionOrderIssueType": "im_Manual",
              "Warehouse": "Bodega02"
  
          },
          {
               "StageID": 2,
              "ItemNo": "MO000001",
              "ProductionOrderIssueType": "im_Backflush",
              "ItemName": "Mano de Obra",
              "Warehouse": "Bodega99",
              "U_CostoXHora": 17.153711,
              "U_Calcular": "S"
          },
          {
              "StageID": 2,
                      "ItemNo": "MO000007",
                      "ProductionOrderIssueType": "im_Backflush",
                      "Warehouse": "Bodega99",
                      "ItemName": "Mano de Obra Gerencia",
                      "U_CostoXHora": 68.728522,
                      "U_Calcular": "S"
                      },
                  {
                     "StageID": 2,
                      "ItemNo": "MO000004",
                      "ProductionOrderIssueType": "im_Backflush",
                      "Warehouse": "Bodega99",
                      "ItemName": "Mano de Obra Bonificación incentivo",
                      "U_CostoXHora": 1.288660,
                      "U_Calcular": "S"
                  },
                  {
                      "StageID": 3,
                      "ItemNo": "PR000001",
                      "ProductionOrderIssueType": "im_Backflush",
                      "Warehouse": "Bodega99",
                      "ItemName": "BONO14",
                      "U_CostoXHora": 0.0,
                      "U_Calcular": "S"
                  },
                  {
              "StageID": 3,
                      "ItemNo": "PR000002",
                      "ProductionOrderIssueType": "im_Backflush",
                      "Warehouse": "Bodega99",
                      "ItemName": "AGUINALDO",
                      "U_CostoXHora": 0.0,
                      "U_Calcular": "S"
                  },
                  {
                      "StageID": 3,
                      "ItemNo": "PR000003",
                      "ProductionOrderIssueType": "im_Backflush",
                      "Warehouse": "Bodega99",
                      "ItemName": "INDEMNIZACION",
                      "U_CostoXHora": 0.0,
                      "U_Calcular": "S"
                  },
                  {
                    "StageID": 3,
                      "ItemNo": "PR000004",
                      "Warehouse": "Bodega99",
                      "ItemName": "IGSS PATRONAL",
                      "U_CostoXHora": 0.0,
                      "U_Calcular": "S",
                      "U_Personal": null
                  },
                  {
                  "StageID": 4,
                      "ItemNo": "GF000001",
                      "ProductionOrderIssueType": "im_Backflush",
                      "Warehouse": "Bodega99",
                      "ItemName": "Depreciación Edificio Fabrica y Maquinaria",
                      "U_CostoXHora": 0.0,
                      "U_Calcular": "N"
                    
                  },
                  {
                     "StageID": 4,
                      "ItemNo": "GF000002",
                      "ProductionOrderIssueType": "im_Backflush",
                      "Warehouse": "Bodega99",
                      "ItemName": "Gastos Mantenimiento de Maquinaria",
                      "U_CostoXHora": 0.0,
                      "U_Calcular": "N"
                  },
                  {
                     "StageID": 4,
                      "ItemNo": "GF000003",
                      "ProductionOrderIssueType": "im_Backflush",
                      "Warehouse": "Bodega99",
                      "ItemName": "Herramientas y Enseres Menores Produccion",
                      "U_CostoXHora": 0.0,
                      "U_Calcular": "N"
                  }
      ],
   "ProductionOrdersSalesOrderLines": [],
       "ProductionOrdersStages": [
                  {
                      "DocEntry": 28764,
                      "StageID": 1,
                      "SequenceNumber": 1,
                      "StageEntry": 1,
                      "Name": "MATERIALES"
                      
                  },
                  {
                      "DocEntry": 28764,
                      "StageID": 2,
                      "SequenceNumber": 2,
                      "StageEntry": 2,
                      "Name": "MANO DE OBRA"
                  },
                  {
                      "DocEntry": 28764,
                      "StageID": 3,
                      "SequenceNumber": 3,
                      "StageEntry": 3,
                      "Name": "PRESTACIONES"
                  },
                  {
                      "DocEntry": 28764,
                      "StageID": 4,
                      "SequenceNumber": 4,
                      "StageEntry": 4,
                      "Name": "GASTOS DE FABRICACIÓN"
                  }
              ]
  }
  
    Promise.all([
      axios.post(`${URL}/OtpSAP`, { payload })
    ])
      .then(([ordenesRes]) => {
        setResultado(ordenesRes.data.value || []);
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
        setResultado([]);
      });
  }
  
  const handleSubmit = () => {
   
      fetchData();
    
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Formulario deshabilitado
      </Checkbox>

      <Form layout="vertical" onFinish={handleSubmit}  disabled={componentDisabled} style={{
          maxWidth: 600,
        }}>
        <Divider orientation="left" orientationMargin={50} style={{ borderColor: '#7cb305' }}>
          OTP
        </Divider>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Código de Producto" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input placeholder="Input Product Code" value='PP500100' size="small"  required/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Nombre de Producto" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input placeholder="Input Product Name" value='UF. Crudo 20 Lts.' size="small"  />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Almacen" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input placeholder="Input Warehouse" value='Bodega02' size="small" required />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Producto" required tooltip="This is a required field">
              <Input placeholder="Input Product" value='83' size="small" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
        
          <Form.Item label="Cantidad Planificada" required tooltip="This is a required field" name="cantidadPlanificada" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input placeholder="Cantidad Planificada" size="small"   onChange={(e)=>{setProduccion(e.target.value)}}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>

  <Form.Item
    label="Fecha de producción"
    name="datePicker"
    rules={[{ required: true, message: 'Por favor selecciona una fecha!' }]}
  >
    <DatePicker
      style={{ width: '100%' }}
      size="small"
      onChange={(date) => {
        setfechaProduccion(date ? date.format('YYYY-MM-DD') : '');
;
      }}
    />
  </Form.Item>
</Col>

  <Form.Item label="Comentario" name="comentario" required rules={[{ required: true, message: 'El comentario es obligatorio!' }]}>
  <TextArea rows={1} placeholder="Comentario" onChange={(e)=>{setComentario(e.target.value)}} />
  </Form.Item>
        </Row>
        <Divider orientation="left" orientationMargin={50} style={{ borderColor: '#7cb305' }}>
          DTP
        </Divider>
       
        <Row gutter={16}>
            
          <Col xs={12} sm={6} md={6}>
            <Form.Item label="Formulas" name="formulas" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]} >
              <Input type='number' placeholder="Formulas" size="small" onChange={(e)=>{setFormulas(e.target.value)}} />
            </Form.Item>
          </Col>    
         
          <Col xs={20} sm={6} md={6}>
            <Form.Item label="Aserrín 1" name="aserrin1lb" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]} >
              <Input type='number' placeholder="Lb. Aserrin 1" size="small" onChange={(e)=>{setLibrasA1(e.target.value)}} />
            </Form.Item>
          </Col>
         
          <Col xs={20} sm={6} md={6}>
            <Form.Item label="Aserrín 2" name="aserrin2lb" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]} >
              <Input type='number' placeholder="Lb. Aserrin 2" size="small" onChange={(e)=>{setLibrasA2(e.target.value)}} />
            </Form.Item>
          </Col>
     
          <Col xs={20} sm={6} md={6}>
            <Form.Item label="Barro" name="lbbarro" required tooltip="This is a required field" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input type='number' placeholder="Lb. Barro" size="small" onChange={(e)=>{setLibrasBarro(e.target.value)}} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={10}>
            <Form.Item label="Select Aserrín 1"  name="selectAserrin1" >
              <Space.Compact style={{ width: '100%' }}>
               
                <Select options={options} style={{ width: '70%' }} onChange={(value)=>{setSelectAserrin1(value)}}  rules={[{ required: true, message: 'Por favor seleccione Aserrín 1!' }]} />
                <Input placeholder="Additional Info" style={{ width: '30%' }} size="small" value={AserrinPlinificado1}  />
              </Space.Compact>
            </Form.Item>
          </Col>
       
          <Col xs={24} sm={12} md={10}>
            <Form.Item label="Select Aserrín 2" name="selectAserrin2" >
              <Space.Compact style={{ width: '100%' }}>
    
                <Select options={options} style={{ width: '70%' }} onChange={(value)=>{setSelectAserrin2(value)}} rules={[{ required: true, message: 'Por favor seleccione Aserrín 2!' }]}/>
                <Input placeholder="Additional Info" style={{ width: '30%' }} size="small" value={AserrinPlinificado2}  />
              </Space.Compact>
            </Form.Item>
          </Col>

          <Col xs={12} sm={6} md={6}>
  <Form.Item label="Barro"  rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
  <Input placeholder="Barro Planificado" size="small" value={BarroPlanificado} />
  </Form.Item>
</Col>

          
          <Col xs={12} sm={6} md={6}>
        
            <Form.Item label="Bolsas" name="bolsas" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input placeholder="Bolsas" size="small" onChange={(e)=>{setBolsas(e.target.value)}}  />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={6}>
         
            <Form.Item label="Esponjas" name="esponjas" rules={[{ required: true, message: 'Por favor ingrese una cantidad!' }]}>
              <Input placeholder="Esponjas" size="small" onChange={(e)=>{setEsponjas(e.target.value)}} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ()=><Otp/>;
