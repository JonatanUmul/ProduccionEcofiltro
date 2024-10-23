import React, { useRef, useState, useEffect } from 'react';

const TomarFoto = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' para la cámara frontal, 'environment' para la trasera

  // Función para alternar entre la cámara delantera y trasera
  const alternarCamara = () => {
    setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
  };

  // Función para iniciar la cámara
  const iniciarCamara = async () => {
    try {
      // Acceder a la cámara del dispositivo
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode // Usar la cámara delantera o trasera según facingMode
        }
      });
      // Mostrar la vista previa de la cámara
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  // Llamar a la función para iniciar la cámara cuando el componente se monte
  useEffect(() => {
    iniciarCamara();
  }, [facingMode]); // Volver a iniciar la cámara cuando cambie el modo de cámara

  // Función para capturar la imagen
  const capturarImagen = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Establecer el tamaño del canvas para que coincida con el tamaño del video
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    // Dibujar el video en el canvas
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      {/* Elemento de video para mostrar la vista previa de la cámara */}
      <video ref={videoRef} autoPlay></video>

      {/* Botón para alternar entre la cámara delantera y trasera */}
      <button onClick={alternarCamara}>Alternar cámara</button>

      {/* Botón para capturar la imagen */}
      <button onClick={capturarImagen}>Tomar foto</button>

      {/* Canvas para mostrar la imagen capturada */}
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default TomarFoto;
