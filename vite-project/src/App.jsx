
import { Fragment, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import  axios  from 'axios';

function App() {
  const Url = 'https://localhost:7202/api/t_usuarios';
  const [Estado, setEstado] = useState([]);
  const Mostrar = () => {
    axios.get(Url).then(Response => {
    console.log(Response.data);
  })
}

const Cargardatos = async() =>{
  await axios.get(Url).then(Response => {
    console.log(Response.data);
    setEstado(Response.data);
  })
}

useEffect(() => {
  Cargardatos();
},[])



  return (
    <Fragment>
      <h2>Datos de usuario</h2>
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
            {Estado.map(gestor=>(
               <tr key={gestor.usu_id}>
                  <td>{gestor.usu_id}</td>
                  <td>{gestor.usu_nombre}</td>
                  <td>{gestor.usu_apellido}</td>
                  <td>{gestor.usu_tp_doc}</td>
                  <td>{gestor.usu_num_doc}</td>
                  <td>{gestor.usu_telefono}</td>
                  <td>{gestor.usu_correo}</td>
                  <td>
                  <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor, "Editar")}>Editar</button> {" "}
                  <button className="btn btn-danger" onClick={()=>seleccionarGestor(gestor, "Eliminar")}>Eliminar</button>
                  </td>
               </tr>
            ))}
          </tbody>
        </table>
        <button onClick={Mostrar}> Mostrar </button>
    </Fragment>
  )
}

export default App
