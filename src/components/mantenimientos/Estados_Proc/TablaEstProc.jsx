import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import { formatFecha } from '../../utilidades/FormatearFecta';
import { Button, Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';
import CrearEstadoProc from './CrearEstadoProc'
const URL = process.env.REACT_APP_URL;

const TablaEstProc = () => {
    const [estadosProc, setEstadosProc] = useState([]);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const URLS = `${URL}/EstadosProc`;
        axios.get(URLS)
            .then(response => {
                setEstadosProc(response.data.rows); // Actualiza los datos con los datos de la respuesta
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const toggleModal = () => setModal(!modal);
    return (
        <div >
    
    <Button className='btn btn-primary btn-xl btn-block w-25' onClick={toggleModal}>Crear Estado</Button>
            <Modal isOpen={modal} toggle={toggleModal} backdrop="static" collapse={true}>
                <ModalHeader toggle={toggleModal}>Crear estado de maquinaria</ModalHeader>
                <ModalBody>
                    {/* Renderiza el componente de creación de usuario dentro del modal */}
                    <CrearEstadoProc />
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
                    <th scope="col">Estado</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Creador</th>
                    <th scope="col">Fecha de Creacion</th>
                   

                    {/* Agrega más encabezados según tus datos */}
                </tr>
            </thead>
            <tbody>
                {estadosProc.map((estadoProc, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{estadoProc.estado}</td>
                        <td>{estadoProc.descripcion}</td>
                        <td>{estadoProc.id_creador}</td>
                        <td>{formatFecha(estadoProc.fecha_creacion)}</td>
                        
                      
                        {/* Agrega más celdas según tus datos */}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );
};

export default TablaEstProc;
