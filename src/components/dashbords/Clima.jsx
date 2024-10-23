import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Clima = () => {
    const [clima, setClima] = useState(null);

    useEffect(() => {
        const obtenerClima = async () => {
            try {
                const response = await axios.get(`https://www.meteosource.com/api/v1/free/find_places?text=guatemala&language=en&key=6i0p1erpm2iddsnah7416s6qi5gmweoj2rr6ono6`);
                setClima(response.data);
            } catch (error) {
                console.error('Error al obtener el clima:', error);
            }
        };

        obtenerClima();
    }, []);

    return (
        <div>
            {clima ? (
                <div>
                    <h5>El clima en Guatemala es:</h5>
                    {clima.main && <p>Temperatura: {clima.main.temp}°C</p>}
                    {clima.weather && clima.weather.length > 0 && <p>Descripción: {clima.weather[0].description}</p>}
                    {/* Otros datos disponibles en la respuesta */}
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default Clima;
