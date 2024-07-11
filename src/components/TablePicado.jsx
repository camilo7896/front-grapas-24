import { useGlobalContext } from "../context/UserContext"

export default function TablePicado() {

  const {user}= useGlobalContext();

  return (
    <>  <input type="text" className="grow" placeholder="Search" />

        <div className="overflow-x-auto">
  <table className="table table-xs table-pin-rows table-pin-cols">
    <thead>
      <tr>
        <th>Codigo</th>
        <td>Nombres</td>
        <td>Apellidos</td>
        <td>Maquina</td>
        <td>Referencia</td>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>{user.codigo}</th>
        <td>{user.nombres}</td>
        <td>{user.apellidos}</td>
        <td>maquina 1</td>
        <td>referencia 1</td>
      </tr>
    
    </tbody>
    <tfoot>
      <tr>
      <th>Codigo</th>
        <td>Nombres</td>
        <td>Apellidos</td>
        <td>Maquina</td>
        <td>Referencia</td>
        <th></th>
      </tr>
    </tfoot>
  </table>
</div>
    </>
  )
}
