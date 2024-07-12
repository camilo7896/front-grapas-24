import { useGlobalContext } from "../context/UserContext"

export default function TableMachine() {

  const {data}= useGlobalContext();

  return (
    <>  
        <div className="overflow-x-auto">
  <table className="table table-xs table-pin-rows table-pin-cols text-center border border-gray-200 p-4">
    <thead>
      <tr>
        <th>Codigo</th>
        <td>Maquina</td>
        <td>Capacidad</td>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {
      data.map(data => (
        <tr key={data.id_maquinas}>
          <th>{data.id_maquinas}</th>
          <td>{data.nombre_maquina}</td>
          <td>{data.capacidad}%</td>
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
