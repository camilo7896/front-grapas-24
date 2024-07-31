import { useGlobalContext } from "../context/UserContext"
import Navbar from "./Navbar";

export default function TableUser() {

  const {usersData}= useGlobalContext();

  return (
    <>  
    <Navbar/>
    
        <div className="overflow-x-auto mt-40">
  <table className="table table-xs table-pin-rows table-pin-cols text-center border border-gray-200 p-4">
    <thead>
      <tr>
        <th>Codigo</th>
        <td>Nombres</td>
        <td>Apellidos</td>
        <td>Usuario</td>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {
      usersData.map(data => (
        <tr key={data.id_usuarios}>
          <th>{data.id_usuarios}</th>
          <td>{data.nombres}</td>
          <td>{data.apellidos}</td>
          <td>{data.usuario}</td>
          <td>
            <button className="btn btn-danger btn-sm m-2">Borrar</button>
            <button className="btn btn-primary btn-sm m-2">Editar</button>
          </td>
        </tr>
      ))
    }    
    </tbody>
    <tfoot>
      <tr>
      <th>Codigo</th>
        <td>Maquina</td>
        <td>Capacidad</td>
        <th></th>
      </tr>
    </tfoot>
  </table>
</div>
    </>
  )
}
