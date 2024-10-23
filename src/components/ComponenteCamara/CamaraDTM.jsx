import React, { useEffect, useRef, useState } from 'react';
import { FcCamera } from "react-icons/fc";

const CamaraDTM = () => {
    const videoRef = useRef(null);
    const fotoRef = useRef(null);
    const [foto, setFoto] = useState(null);

    const verCamara = () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error("El navegador no soporta getUserMedia API");
            return;
        }

        navigator.mediaDevices.getUserMedia({
            video: true // Solicitando video sin especificar resolución
        }).then(stream => {
            let miVideo = videoRef.current;
            if (miVideo) {
                miVideo.srcObject = stream;
                miVideo.onloadedmetadata = () => {
                    miVideo.play();
                    console.log("Cámara iniciada correctamente.");
                };
            } else {
                console.error("Referencia de video no encontrada");
            }
        }).catch(err => {
            console.error("Error al acceder a la cámara: ", err);
            switch (err.name) {
                case 'NotFoundError':
                    console.error("No se encontró ningún dispositivo de cámara.");
                    break;
                case 'NotAllowedError':
                    console.error("El usuario negó el acceso a la cámara.");
                    break;
                case 'NotReadableError':
                    console.error("El dispositivo de cámara está siendo usado por otra aplicación.");
                    break;
                case 'OverconstrainedError':
                    console.error("Las restricciones especificadas no se pueden cumplir por el dispositivo de cámara.");
                    break;
                default:
                    console.error("Error desconocido al acceder a la cámara.");
                    break;
            }
        });
    };

    const tomarFoto = () => {
        const video = videoRef.current;
        const fotoCanvas = fotoRef.current;
        if (video && fotoCanvas) {
            const context = fotoCanvas.getContext('2d');
            fotoCanvas.width = video.videoWidth;
            fotoCanvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, fotoCanvas.width, fotoCanvas.height);
            const imageDataUrl = fotoCanvas.toDataURL('image/png');
            setFoto(imageDataUrl);
            console.log("Foto tomada:", imageDataUrl);
        } else {
            console.error("Referencia de video o canvas no encontrada");
        }
    };

    useEffect(() => {
        verCamara();
    }, []);

    return (
        <div>
            <div>
                <video ref={videoRef} style={{ width: '100%', maxHeight: '500px' }} autoPlay></video>
                <button onClick={tomarFoto}>
                    <FcCamera className='Button' type='button' />
                </button>
            </div>
            {foto && (
                <div>
                    <h2>Foto tomada:</h2>
                    <img src={foto} alt="Foto tomada" style={{ width: '100%', maxHeight: '500px' }} />
                </div>
            )}
            <canvas ref={fotoRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default CamaraDTM;
