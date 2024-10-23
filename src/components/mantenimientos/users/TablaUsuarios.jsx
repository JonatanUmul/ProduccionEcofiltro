import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import User from './Usr'
import { Button, Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';
import '../EstiloModal.css'
const URL = process.env.REACT_APP_URL;

const TablaUsuarios = ({darkMode }) => {
    const [datos, setDatos] = useState([]);
    const [modal, setModal] = useState(false)
const [verFirma, setVerFirma]=useState(true)


    useEffect(() => {
        const URLS = `${URL}/UsuariosR`;
        axios.get(URLS)
            .then(response => {
                setDatos(response.data.rows); // Actualiza los datos con los datos de la respuesta
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // const abrirFormularioCUsiario=()=>{
    //     window.location.href = '/User';
    // }
    const toggleModal = () => setModal(!modal);

    const verFirm=()=>{
        setVerFirma(false)
    }
    return (
        <div className={`table-container ${darkMode ? 'dark-mode' : ''}`} >
    
    <Button className='btn btn-primary btn-xl btn-block w-25' onClick={toggleModal}>Crear Usuario</Button>
            <Modal isOpen={modal} toggle={toggleModal} backdrop="static" collapse={true}>
                <ModalHeader toggle={toggleModal}>Crear Usuario</ModalHeader>
                <ModalBody>
                    {/* Renderiza el componente de creación de usuario dentro del modal */}
                    <User />
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="secondary" onClick={toggleModal}>Cancelar</Button> */}
                    {/* Agrega cualquier otro botón de acción necesario */}
                </ModalFooter>
            </Modal>
    <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{textAlign:'center'}}>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Nombre de usuario</th>
                    <th scope="col">Correo electrónico</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Firma</th>
                    {/* Agrega más encabezados según tus datos */}
                </tr>
            </thead>
            <tbody>
                {datos.map((usuario, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{usuario.username}</td>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.correo}</td>
                        <td>{usuario.telefono}</td>
                        <td>{usuario.rol}</td>
                        
                        <td>
                       
                        {verFirma ?(<button onClick={verFirm} className='btn btn-primary'>Firma</button>): ( <a onClick={(verFirm)=>{setVerFirma(true)}}><img src={usuario.firmaUsr}></img></a>)}

                        </td>
                        {/* Agrega más celdas según tus datos */}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );
};

export default TablaUsuarios;
