import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");

  const videoConstraints = {
    facingMode: { exact: facingMode },
  };

  const handleStartCamera = () => {
    setImgSrc(null);
    setShowCamera(true);
  };

  const handleCameraChange = (e) => {
    setFacingMode(e.target.value);
  };

  const captureAndUpload = () => {
    const base64 = webcamRef.current.getScreenshot();
    setImgSrc(base64); // Mostrar la imagen en pantalla

    // Convertir base64 a Blob
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    const formData = new FormData();
    formData.append("image", blob, "foto.jpg");

    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log("Imagen guardada:", data))
      .catch((err) => console.error("Error al subir:", err));

    setShowCamera(false); // Oculta la cámara
  };

  const deleteImage = () => {
    setImgSrc(null);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!showCamera && !imgSrc && (
        <>
          <button onClick={handleStartCamera} style={buttonStyle}>
            Activar Cámara
          </button>
        </>
      )}

      {showCamera && (
        <div>
          <label>
            Seleccionar cámara:{" "}
            <select value={facingMode} onChange={handleCameraChange}>
              <option value="user">Frontal</option>
              <option value="environment">Trasera</option>
            </select>
          </label>
          <br />
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            width={350}
            height={250}
            style={{ borderRadius: "10px", marginBottom: "10px", marginTop: "10px" }}
          />
          <br />
          <button onClick={captureAndUpload} style={buttonStyle}>
            Capturar y Subir
          </button>
        </div>
      )}

      {imgSrc && (
        <div>
          <h3>Foto tomada:</h3>
          <img
            src={imgSrc}
            alt="captura"
            style={{ width: "350px", borderRadius: "10px", marginBottom: "10px" }}
          />
          <br />
          <button onClick={deleteImage} style={buttonStyleRed}>
            Eliminar Foto
          </button>
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
};

const buttonStyleRed = {
  ...buttonStyle,
  backgroundColor: "#dc3545",
};

export default WebcamCapture;
