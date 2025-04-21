import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select,Splitter } from 'antd';
import axios from 'axios';

const { Option } = Select;

const App = ({ selectedValue }) => {
  const URL = process.env.REACT_APP_URL;
  const [areaSeleccionados, setAreaSeleccionados] = useState([]);
  const [planificado, setPlanificado] = useState([]);
  const [resultado, setResultado] = useState([]);
  const fechaPlanificacion = selectedValue;


  const onFinish = (values) => {
    const seleccionados = values.users.map(user => ({
      proceso: user.address?.proceso,
      planificado: user.address?.planificado,
    }));

    const provinciasSeleccionadas = seleccionados.map(s => s.proceso);
    setAreaSeleccionados(provinciasSeleccionadas);

    const callesPlanificadas = seleccionados.map(s => s.planificado);
    setPlanificado(callesPlanificadas);
  };

  useEffect(() => {
    const fetchProcesos = async () => {
      try {
        const response = await axios.get(`${URL}/Procesos`);
        setResultado(response.data.rows);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        // Podrías mostrar un mensaje al usuario en caso de error
      }
    };
    
    fetchProcesos();
  }, [URL]);


  return (

    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      autoComplete="on"
    >
        
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'address', 'proceso']}
                  rules={[{ required: true, message: 'Proceso requerido' }]}
                >
                  <Select  style={{ width: '200px' }} placeholder="Selecciona un proceso">
                    {Array.isArray(resultado) && resultado.map((procesos) => (
                      <Option key={procesos.id} value={procesos.id}>
                        {procesos.proceso}
                      </Option>
                      
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'address', 'planificado']}
                  rules={[{ required: true, message: 'Cantidad requerida' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Ingresa lo Planificado"
                  />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Agregar Proceso
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
