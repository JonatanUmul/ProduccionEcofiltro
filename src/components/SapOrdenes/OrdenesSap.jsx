import React from 'react';
import { Button, Result } from 'antd';
const App = () => (
  <Result
    status="403"
    title="403"
    subTitle="Lo sentimos, no estás autorizado a acceder a esta página."
    // extra={<Button type="primary">Back Home</Button>}
  />
);
export default App;
// import React from 'react';
// import { Canvas, useLoader } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { MeshStandardMaterial } from 'three';

// const Model = ({ url, exteriorColor, interiorColor }) => {
//   const gltf = useLoader(GLTFLoader, url);

//   gltf.scene.traverse((child) => {
//     if (child.isMesh) {
//       // Identificar componentes internos y externos según sus nombres o propiedades
//       if (child.name.includes("exterior")) {
//         // Aplicar material transparente para los componentes externos
//         child.material = new MeshStandardMaterial({
//           color: exteriorColor,
//           transparent: true,
//           opacity: 0.3, // Ajustar la opacidad para hacer el exterior semitransparente
//         });
//       } else if (child.name.includes("interior")) {
//         // Aplicar un color resaltado o luminoso para los componentes internos
//         child.material = new MeshStandardMaterial({
//           color: interiorColor,
//           emissive: interiorColor, // Color que parece brillar
//           emissiveIntensity: 0.5,
//         });
//       }
//     }
//   });

//   return (
//     <primitive object={gltf.scene} scale={0.5} position={[0, -1, 0]} />
//   );
// };

// const My3DModelViewer = () => {
//   return (
//     <Canvas style={{ height: '100vh', width: '100vw' }} camera={{ position: [0, 1, 5], fov: 50 }}>
//       <ambientLight intensity={0.3} />
//       <directionalLight position={[5, 10, 5]} intensity={0.7} />
//       <Model url="/Hornos.gltf" exteriorColor="blue" interiorColor="red" /> {/* Colores dinámicos */}
//       <OrbitControls minDistance={3} maxDistance={10} />
//     </Canvas>
//   );
// };

// export default My3DModelViewer;
// import React, { useEffect, useRef, useState } from 'react';
// import * as echarts from 'echarts/core';
// import { Bar3DChart } from 'echarts-gl/charts';
// import { Grid3DComponent } from 'echarts-gl/components';
// import { VisualMapComponent } from 'echarts/components';
// import { CanvasRenderer } from 'echarts/renderers';
// import axios from 'axios';
// import { formatFecha } from '../../components/utilidades/FormatearFecta';

// const URL = process.env.REACT_APP_URL;

// echarts.use([Bar3DChart, Grid3DComponent, VisualMapComponent, CanvasRenderer]);

// const Bar3DChartComponent = () => {
//   const chartRef = useRef(null);
//   const [datos, setDatos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
//   const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
//   const [turno, setTurno] = useState([]);
//   const [turn, setTurn] = useState('');
//   const [horno, setHorno] = useState('');
//   const [hornos, setTHornos] = useState([]);
//   const maquinaria = "Horno"; 

//   // Fetch turnos and hornos on initial mount
//   useEffect(() => {
//     axios.all([
//       axios.get(`${URL}/Turnos`),
//       axios.get(`${URL}/maquinaria/${maquinaria}`)
//     ])
//     .then(axios.spread((TurnosResponse, HornosResponse) => {
//       setTurno(TurnosResponse.data);
//       setTHornos(HornosResponse.data);
//     }))
//     .catch((error) => {
//       console.error('Error al obtener los datos:', error);
//     });
//   }, []);

//   // Fetch data based on selected filters (dates, turno, horno)
//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const url = `${URL}/DTH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${'null'}/${turn || 'null'}/${horno || 'null'}`;
//       const response = await axios.get(url);
      
//       const datosOrdenados = response.data.data.sort((a, b) => new Date(a.fecha_real) - new Date(b.fecha_real));
//       setDatos(datosOrdenados);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error al obtener los datos:', error);
//       setError('No se pudo obtener los datos. Por favor, verifica la conexión o los parámetros.');
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     const intervalId = setInterval(fetchData, 5 * 60 * 1000); // Update every 5 minutes
//     return () => clearInterval(intervalId); // Clean up interval on unmount
//   }, [fecha_creacion_inicio, fecha_creacion_fin, turn, horno]); // Add dependencies properly

//   useEffect(() => {
//     if (!datos.length) return;

//     const chart = echarts.init(chartRef.current);

//     const hours = datos.map(item => item.hora_creacion);
//     // const etiquetas = Object.keys(datos[0]).filter(key => key.startsWith('t'));
//     const etiquetas = ['t1','t2','t3','t4','t5','t6','t7','t8','t9','t10','t11','t12'];

//     const chartData = datos.flatMap((dato, idx) => 
//       etiquetas.map((etiqueta, etIdx) => {
//         const valor = dato[etiqueta];
//         return valor != null && !isNaN(valor) ? [idx, etIdx, valor] : null;
//       }).filter(Boolean)
//     );

//     const maxValue = Math.max(...chartData.map(item => item[2]));

//     const option = {
//       tooltip: {
//         trigger: 'item',
//         formatter: params => `Etiqueta: ${etiquetas[params.data.value[1]]}<br>Hora: ${hours[params.data.value[0]]}<br>Valor: ${params.data.value[2]}`
//       },
//       visualMap: {
//         max: maxValue,
//         inRange: {
//           color: [
//             '#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8',
//             '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'
//           ]
//         }
//       },
//       xAxis3D: {
//         type: 'category',
//         data: hours,
//         name: 'Horas',
//       },
//       yAxis3D: {
//         type: 'category',
//         data: etiquetas,
//         name: 'Etiquetas',
//       },
//       zAxis3D: {
//         type: 'value',
//         name: 'Valor',
//       },
//       grid3D: {
//         boxWidth: 100,
//         boxDepth: 80,
//         viewControl: {
//           autoRotate: true,
//           autoRotateSpeed: 10,
//         },
//         light: {
//           main: { intensity: 1.2 },
//           ambient: { intensity: 0.3 },
//         },
//       },
//       series: [{
//         type: 'bar3D',
//         data: chartData.map(item => ({ value: item })),
//         shading: 'color',
//         label: { show: false },
//         itemStyle: { opacity: 0.8 },
//       }],
//     };

//     chart.setOption(option);

//     return () => chart.dispose();
//   }, [datos]);

//   if (isLoading) return <div>Cargando datos...</div>;
//   if (error) return <div style={{ color: 'red' }}>{error}</div>;

//   return (
//     <>
//       <div className="row mb-3">
//         <div className="col-md-3">
//           <label htmlFor="fecha" className="form-label">Fecha 1</label>
//           <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
//         </div>
//         <div className="col-md-3">
//           <label htmlFor="fecha" className="form-label">Fecha 2</label>
//           <input className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha2(e.target.value)} />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="aserradero" className="form-label">Horno</label>
//           <select className="form-select" value={horno} onChange={(e) => setHorno(e.target.value)}>
//             <option value="" disabled>Seleccione...</option>
//             {hornos.rows?.map(h => (
//               <option key={h.id_maq} value={h.id_maq}>{h.nombre_maq}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="aserradero" className="form-label">Turno de Producción</label>
//           <select className="form-select" value={turn} onChange={(e) => setTurn(e.target.value)}>
//             <option value="">--</option>
//             {turno.rows?.map(t => (
//               <option key={t.id} value={t.id}>{t.turno}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div ref={chartRef} style={{ width: '100%', height: '600px' }} />
//     </>
//   );
// };

// export default Bar3DChartComponent;
