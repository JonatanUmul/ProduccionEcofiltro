import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ConfigProvider, Select, DatePicker, Form, Input, Space, Modal, Button, message } from 'antd';
import dayjs from 'dayjs';
import es_ES from 'antd/lib/locale/es_ES';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL;
const { Option } = Select;

const App = () => {
  const [value, setValue] = useState(dayjs('2024-09-25'));
  const [open, setOpen] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [planificado, setPlanificado] = useState(0);
  const [events, setEvents] = useState([]);
  const [arrayDays, setArrayDays] = useState([]);
  const [manualUpdates, setManualUpdates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [proceso_id, setProceso]= useState(null);
  const [loading, setLoading] = useState(false);
  const [setCantidadsuma, setsetCantidadsuma]=useState(0)
  
  // Variables para almacenar el primer y último día del mes seleccionado
  const [primerDia, setPrimerDia] = useState(null);
  const [ultimoDia, setUltimoDia] = useState(null);
console.log("Dias", primerDia, ultimoDia)
  const showSkeleton = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const id_creador= localStorage.getItem('id_creador');

  const agregarFechas = (fecha) => {
    const fechaFormateada = fecha.isValid() ? fecha.format('YYYY-MM-DD') : null;
    if (fechaFormateada && !arrayDays.includes(fechaFormateada)) {
      setArrayDays(prevDays => [...prevDays, fechaFormateada]);
    }
  };

  const ProcesoSet = (value) => {
    setProceso(value);
  };

  useEffect(() => {
    const totalSuma = events.reduce((total, event) => total + event.amount, 0);
    setsetCantidadsuma(totalSuma);
  }, [events]);
  
  const onSubmit = async () => {
    try {
      if (!proceso_id || !id_creador) {
        message.error('Por favor selecciona un proceso y asegúrate de que el creador está definido.');
        return;
      }
  
      setLoading(true);
  
      // Recorremos el arreglo de eventos y enviamos fecha y cantidad por separado en paralelo
      const promises = events.map(evento => axios.post(`${URL}/PlanDay`,{
        fecha: evento.date,              // Fecha de la planificación
        cantidad_planificada: evento.amount, // Cantidad para esa fecha
        proceso_id,                     // Proceso seleccionado
        id_creador                      // ID del creador
      }));
     
      await Promise.all(promises); // Esperamos a que todas las peticiones finalicen
      
      // Hacer la petición a PlanMes después de enviar las de PlanDay
      const response = await axios.post(`${URL}/PlanMes`, {
        fecha_inicio: primerDia,  // Enviar el primer día del mes
        fecha_fin: ultimoDia,     // Enviar el último día del mes
        planificado,
        proceso_id,
        id_creador
      });
  
      setLoading(false);
  
      // Mostrar SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
  
      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/BoardPlanificacion";
      }, 1500);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setLoading(false);
    }
  };
  
  
  

  useEffect(() => {
    const fetchProcesos = async () => {
      try {
        const response = await axios.get(`${URL}/Procesos`);
        setResultado(response.data.rows);
        console.log('datos consulta', response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchProcesos();
  }, [URL]);

  const onSelect = (newValue) => {
    setSelectedDate(newValue);
    agregarFechas(newValue);
  };

  const abrirModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (planificado > 0 && arrayDays.length > 0) {
      const totalEdited = Object.values(manualUpdates).reduce((sum, value) => sum + value, 0);
      const remainingPlan = planificado - totalEdited;
  
      const editableDaysCount = arrayDays.length - Object.keys(manualUpdates).length;
      let newEvents = [];
  
      if (editableDaysCount > 0) {
        const autoDistributeAmount = Math.floor(remainingPlan / editableDaysCount);
        const remainder = remainingPlan % editableDaysCount;
  
        newEvents = arrayDays.map(day => {
          if (manualUpdates[day] !== undefined) {
            return { date: day, amount: manualUpdates[day] };
          } else {
            return { date: day, amount: autoDistributeAmount };
          }
        });
  
        const remainingDays = arrayDays.filter(day => manualUpdates[day] === undefined);
        if (remainder > 0 && remainingDays.length > 0) {
          remainingDays.slice(0, remainder).forEach(day => {
            const index = newEvents.findIndex(event => event.date === day);
            if (index !== -1) {
              newEvents[index].amount += 1;
            }
          });
        }
      } else {
        newEvents = arrayDays.map(day => {
          return { date: day, amount: manualUpdates[day] || 0 };
        });
      }
  
      setEvents(newEvents);
    }
  }, [planificado, arrayDays, manualUpdates]);

  const handleInputChange = (day, value) => {
    setManualUpdates(prevUpdates => ({
      ...prevUpdates,
      [day]: value === '' ? 0 : Number(value),
    }));
  };

  const dateCellRender = (date) => {
    const fechaFormateada = date.format('YYYY-MM-DD');
    const event = events.find(e => e.date === fechaFormateada);
    
    const isSelectedDay = arrayDays.includes(fechaFormateada);
    
    console.log("Eventos:", events);
console.log("Fecha Inicio:", primerDia);
console.log("Fecha Fin:", ultimoDia);
console.log("Cantidad planificada:", planificado);
console.log("ID del proceso:", proceso_id);
console.log("ID del creador:", id_creador);

    return (
      <div
        style={{
          background: isSelectedDay ? '#f0f0f0' : 'transparent',
          padding: '10px',
          borderRadius: '5px',
          minHeight: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: isSelectedDay ? '1px solid #ccc' : 'none',
        }}
        onDoubleClick={() => abrirModal()}
      >
        {isSelectedDay && event ? `Cantidad: ${event.amount}` : null}
      </div>
    );
  };

  const handleMonthChange = (date) => {
    if (date) {  // Verificar si date no es null
      setValue(date);
  
      // Obtener el primer y último día del mes usando dayjs
      const startOfMonth = date.startOf('month');
      const endOfMonth = date.endOf('month');
  
      // Guardar el primer y último día del mes en el estado
      setPrimerDia(startOfMonth.format('YYYY-MM-DD'));
      setUltimoDia(endOfMonth.format('YYYY-MM-DD'));
  
      // Verificar en consola
      console.log("Primer Día:", startOfMonth.format('YYYY-MM-DD'));
      console.log("Último Día:", endOfMonth.format('YYYY-MM-DD'));
    } else {
      // Si date es null, puedes manejarlo aquí, si es necesario
      console.warn('Fecha no válida seleccionada');
    }
  };
  useEffect(() => {
    console.log("Día inicial capturado:", primerDia);
    console.log("Día final capturado:", ultimoDia);
  }, [primerDia, ultimoDia]);

  return (
    <>
    
      <Form handleInputChange={onSubmit} name="time_related_controls">
        <Space>
          <Form.Item label="Mes">
            <DatePicker 
              picker="month" 
              onChange={handleMonthChange} // Cambiar la función de onChange
              value={value} 
            />
          </Form.Item>
          <Form.Item label="Planificado">
            <Input
              type="number"
              style={{ height: "30px" }}
              onChange={(e) => setPlanificado(Number(e.target.value))}
            />
          </Form.Item>
          <Form.Item label="Proceso">
            <Select style={{ width: '200px' }} placeholder="Selecciona un proceso" onChange={ProcesoSet}>
              {Array.isArray(resultado) && resultado.map((procesos) => (
                <Option key={procesos.id} value={procesos.id}>
                  {procesos.proceso}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button onClick={onSubmit} type="primary">
              Guardar
            </Button>
            <p>{setCantidadsuma}</p>
          </Form.Item>
        </Space>

        <ConfigProvider locale={es_ES}>
          <motion.div initial="hidden" animate="visible" key={value.format('YYYY-MM')}>
            <Calendar
              value={value}
              onSelect={onSelect}
              dateCellRender={dateCellRender}
            />
          </motion.div>
        </ConfigProvider>

        <Modal
          title="Planificación Diario"
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          {selectedDate && (
            <Input
              type="number"
              placeholder={`Cantidad para ${selectedDate.format('YYYY-MM-DD')}`}
              value={manualUpdates[selectedDate.format('YYYY-MM-DD')] !== undefined ? String(manualUpdates[selectedDate.format('YYYY-MM-DD')]) : ''}
              onChange={(e) => handleInputChange(selectedDate.format('YYYY-MM-DD'), e.target.value)}
            />
          )}
        </Modal>
      </Form>
    </>
  );
};

export default App;
