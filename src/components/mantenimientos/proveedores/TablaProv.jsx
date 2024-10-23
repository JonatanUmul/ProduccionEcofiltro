import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import { formatFecha } from '../../utilidades/FormatearFecta';
import { Button, Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';
import FormCrearProv from './Form.CreatProv' 

const URL = process.env.REACT_APP_URL;

const TablaProv = () => {
    const [proved, setProv] = useState([]);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const URLS = `${URL}/Provedores`;
        axios.get(URLS)
            .then(response => {
                setProv(response.data.rows); // Actualiza los datos con los datos de la respuesta
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    console.log(proved)

    const abrirFormularioCUsiario=()=>{
        window.location.href = '/Home/FormCrearProv';
    }
    
    const toggleModal = () => setModal(!modal);
    return (
        <div >
    
    <Button className='btn btn-primary btn-xl btn-block w-25' onClick={toggleModal}>Crear Proveedor</Button>
            <Modal isOpen={modal} toggle={toggleModal} backdrop="static" collapse={true}>
                <ModalHeader toggle={toggleModal}>Crear Proveedor</ModalHeader>
                <ModalBody>
                    {/* Renderiza el componente de creación de usuario dentro del modal */}
                    <FormCrearProv />
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="secondary" onClick={toggleModal}>Cancelar</Button> */}
                    {/* Agrega cualquier otro botón de acción necesario */}
                </ModalFooter>
            </Modal>
    <div style={{ overflowX: 'auto' }}>
        <table className="table" >
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tipo de Proveedor</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Télefono</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Sitio_web</th>
                    <th scope="col">Fecha de Creación</th>
                    
                    {/* Agrega más encabezados según tus datos */}
                </tr>
            </thead>
            <tbody>
                {proved.map((prov, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{prov.id_tip}</td>
                        <td>{prov.nombre}</td>
                        <td>{prov.telefono}</td>
                        <td>{prov.correo}</td>
                        <td>{prov.sitio_web}</td>
                        <td>{formatFecha(prov.fecha_creacion)}</td>
                       
                        {/* Agrega más celdas según tus datos */}
                    </tr>
                ))}
            </tbody>
        </table>
        
    </div>
</div>

    );
};

export default TablaProv;
