import { useState } from 'react';
import { useGlobalContext } from "../context/UserContext";

export default function TableMachine() {
  const { data, updateMachine, deleteMachine } = useGlobalContext();
  const [editingMachine, setEditingMachine] = useState(null);
  const [editedMachine, setEditedMachine] = useState(null);

  const handleEditClick = (machine) => {
    setEditingMachine(machine);
    setEditedMachine({ ...machine });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMachine(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    if (editedMachine) {
      try {
        await updateMachine(editedMachine);
        setEditingMachine(null);
      } catch (error) {
        console.error('Error al actualizar la máquina:', error);
      }
    }
  };

  const handleDelete = async (machineId) => {
    try {
      await deleteMachine(machineId);
      alert('Máquina eliminada con éxito');
    } catch (error) {
      console.error('Error eliminando máquina:', error);
      alert('Error al eliminar máquina');
    }
  };

  return (
    <>
      <div className="overflow-x-auto mt-4">
        <table className="table table-xs table-pin-rows table-pin-cols text-center border border-gray-200 p-4">
          <thead>
            <tr>
              <th>Código</th>
              <td>Máquina</td>
              <td>Capacidad</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(machine => (
              <tr key={machine.id_maquinas}>
                <th>{machine.id_maquinas}</th>
                <td>{machine.nombre_maquina}</td>
                <td>{machine.capacidad}%</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => handleDelete(machine.id_maquinas)}
                  >
                    Borrar
                  </button>
                  <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={() => handleEditClick(machine)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Código</th>
              <td>Máquina</td>
              <td>Capacidad</td>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      {editingMachine && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold">Editar Máquina</h2>
            <form>
              <div className="mb-2">
                <label className="block text-gray-700">Nombre de Máquina:</label>
                <input
                  type="text"
                  name="nombre_maquina"
                  value={editedMachine.nombre_maquina}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Capacidad (%):</label>
                <input
                  type="number"
                  name="capacidad"
                  value={editedMachine.capacidad}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingMachine(null)}
                  className="btn btn-secondary mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="btn btn-primary"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
