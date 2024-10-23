import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import {formatFecha} from '../../utilidades/FormatearFecta.js'
import { Button, Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';
import CrearMatPrima from './Form.CrearMatPrima.jsx'
const URL = process.env.REACT_APP_URL;

const TablaMatPrima = () => {
    const [matPrima, setMatPrima] = useState([]);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const URLS = `${URL}/MateriaPrima`;
        axios.get(URLS)
            .then(response => {
                setMatPrima(response.data.rows); // Actualiza los datos con los datos de la respuesta
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

  
    const toggleModal = () => setModal(!modal);
    
    return (
        <div >
    <Button className='btn btn-primary btn-xl btn-block w-25' onClick={toggleModal}>Crear materia prima</Button>
            <Modal isOpen={modal} toggle={toggleModal} backdrop="static" collapse={true}>
                <ModalHeader toggle={toggleModal}>Crear materia prima</ModalHeader>
                <ModalBody>
                    {/* Renderiza el componente de creación de usuario dentro del modal */}
                    <CrearMatPrima />
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="secondary" onClick={toggleModal}>Cancelar</Button> */}
                    {/* Agrega cualquier otro botón de acción necesario */}
                </ModalFooter>
            </Modal>
    <div style={{ overflowX: 'auto' }}>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Materia Prima</th>
                    <th scope="col">Proveedor</th>
                    <th scope="col">fecha_creacion</th>
                    
                   
                    {/* Agrega más encabezados según tus datos */}
                </tr>
            </thead>
            <tbody>
                {matPrima.map((matPrim, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{matPrim.nom_matPrima}</td>
                        <td>{matPrim.id_prov}</td>
                        <td>{formatFecha(matPrim.fecha_creacion)}</td>
                      
                        
                        {/* Agrega más celdas según tus datos */}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );
};

export default TablaMatPrima;
