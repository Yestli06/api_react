
import { Fragment, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { hasChanged } from '@vue/shared';

function App() {
  const Url = 'https://localhost:7202/api/t_usuarios';
  const [Estado, setEstado] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAgregar, setModalAgregar]=useState(false);
  // const [gestorSeleccionado, setGestorSeleccionado]=useState({
  //   usu_nombre:'',
  //   usu_apellido:'',
  //   usu_tp_doc:'',
  //   usu_num_doc:'',
  //   usu_telefono:'',
  //   usu_correo:''
  // })


  const Mostrar = () => {
    axios.get(Url).then(Response => {
      console.log(Response.data);
    })
  }

  const editar = () => setModalEditar(!modalEditar);
  const agregar = () => setModalAgregar (!modalAgregar);

  const Cargardatos = async () => {
    await axios.get(Url).then(Response => {
      console.log(Response.data);
      setEstado(Response.data);
    })
  }

  useEffect(() => {
    Cargardatos();
  }, [])



  return (
    <Fragment>
      <h2>Datos de usuario</h2>

      <button onClick={agregar}> Agregar </button> 
      <table className="table table-bordered" >
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Tipo de documento</th>
            <th>Numero de documento</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {Estado.map(gestor => (
            <tr key={gestor.usu_id}>
              <td>{gestor.usu_id}</td>
              <td>{gestor.usu_nombre}</td>
              <td>{gestor.usu_apellido}</td>
              <td>{gestor.usu_tp_doc}</td>
              <td>{gestor.usu_num_doc}</td>
              <td>{gestor.usu_telefono}</td>
              <td>{gestor.usu_correo}</td>
              <td>
                <button className="btn btn-primary" onClick={editar}>Editar</button> {" "}
                <button className="btn btn-danger" onClick={() => seleccionarGestor(gestor, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nombre</label>
            <input type="text" className='form-control'  />
            <br />
            <label>Apellido</label>
            <input type="text" className='form-control'  />
            <br />
            <label>Tipo documento</label>
            <input type="text"  className='form-control' />
            <br />
            <label>Numero de documento</label>
            <select className='form-control' >
              <option value="">CC</option>
              <option value="">TI</option>
              <option value="">CE</option>
            </select>
            
            <br />
            <label>Telefono</label>
            <input type="number" className='form-control'  />
            <br />
            <label>Correo</label>
            <input type="text" className='form-control' />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={editar}>Editar</button> {" "}
          <button className="btn btn-danger" onClick={editar}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalAgregar}>
        <ModalHeader>Agregar</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <input type="text"  />
            <br />
            <input type="text" />
            <br />
            <input type="text"  />
            <br />
            <input type="number"  />
            <br />
            <input type="number"  />
            <br />
            <input type="text" />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={agregar}>Editar</button> {" "}
          <button className="btn btn-danger" onClick={agregar}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}




export default App
