import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import { formatFecha } from '../../utilidades/FormatearFecta';
import { Button, Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';
import Role from './Roles';
import '../EstiloModal.css'
const URL = process.env.REACT_APP_URL;

const TablaRoles = () => {
    const [Roles, setRoles] = useState([]);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const URLS = `${URL}/Rolrouter`;
        axios.get(URLS)
            .then(response => {
                setRoles(response.data.rows); // Actualiza los datos con los datos de la respuesta
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

   
    const toggleModal = () => setModal(!modal);
    return (
        <div >
            <Button className='btn btn-primary btn-xl btn-block w-25' onClick={toggleModal}>Crear Rol</Button>
            <Modal isOpen={modal} toggle={toggleModal} backdrop="static" collapse={true}>
                <ModalHeader toggle={toggleModal}>Crear Rol</ModalHeader>
                <ModalBody>
                    {/* Renderiza el componente de creación de usuario dentro del modal */}
                    <Role />
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
                    <th scope="col">Rol</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Fecha de Creacion</th>
                   
                    {/* Agrega más encabezados según tus datos */}
                </tr>
            </thead>
            <tbody>
                {Roles.map((usuario, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{usuario.rol}</td>
                        <td>{usuario.descripcion}</td>
                        <td>{formatFecha(usuario.fecha_creacion)}</td>
                      
                        
                        {/* Agrega más celdas según tus datos */}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );
};

export default TablaRoles;
