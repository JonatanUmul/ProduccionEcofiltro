import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import { formatFecha } from '../../utilidades/FormatearFecta';
import { Button, Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';
import CreateTipProv from './TipProvedor'
const URL = process.env.REACT_APP_URL;

const TablaTipProv = () => {
    const [prov, setProv] = useState([]);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const URLS = `${URL}/TipoProv`;
        axios.get(URLS)
            .then(response => {
                setProv(response.data.rows); // Actualiza los datos con los datos de la respuesta
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    console.log(prov)

 
    const toggleModal = () => setModal(!modal);
    return (
        <div >
    <Button className='btn btn-primary w-25' onClick={toggleModal}>Crear Proveedor</Button>
            <Modal isOpen={modal} toggle={toggleModal} backdrop="static" collapse={true}>
                <ModalHeader toggle={toggleModal}>Crear Proveedor</ModalHeader>
                <ModalBody>
                    {/* Renderiza el componente de creación de usuario dentro del modal */}
                    <CreateTipProv />
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
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Creador</th>
                    <th scope="col">fecha de Creación</th>
                    
                    {/* Agrega más encabezados según tus datos */}
                </tr>
            </thead>
            <tbody>
                {prov.map((usuario, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.descripcion}</td>
                        <td>{usuario.creador_id}</td>
                        <td>{formatFecha(usuario.fechacreacion)}</td>
                       
                        {/* Agrega más celdas según tus datos */}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );
};

export default TablaTipProv;
