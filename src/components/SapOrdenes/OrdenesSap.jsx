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
