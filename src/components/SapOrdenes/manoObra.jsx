import React, { useEffect, useState } from "react";
import axios from "axios";
import AreaOperario from "./botonOT/AreaOperario";

const URL = process.env.REACT_APP_URL;
const OperariosTable = () => {
 
    const [operarios, setOperarios] = useState([]);
    console.log('Opertarios Api',operarios)

    useEffect(() => {
    axios.get(`${URL}/RegistroTrabajo`  )
            .then(response => {
                setOperarios(response.data.data);
            })
            .catch(error => {
                console.error("Error al obtener los operarios:", error);
            });
    }, [URL]);

    return (
        <div className="container">
            <h2 className="title">Control de Operarios</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Estado</th>
                        <th>Nombre</th>
                        <th>Área Actual</th>
                        <th>Actualizar Área</th>
                    </tr>
                </thead>
                <tbody>
                    {operarios.length > 0 ? (
                        Array.isArray(operarios)&&operarios.map(op => (
                            <tr key={op.id}>
                                <td>{op.estado}</td>
                                <td>{op.Nombre}</td>
                                <td>{op.Area}</td>
                                <td><AreaOperario area={op}/></td>
                            </tr>
                        )) 
                    ) : (
                        <tr>
                            <td colSpan="3">No hay datos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OperariosTable;
