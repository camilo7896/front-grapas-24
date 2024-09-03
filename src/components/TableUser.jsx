import { useState } from 'react';
import { useGlobalContext } from "../context/UserContext";
import Navbar from "./Navbar";

export default function TableUser() {
  const { usersData, updateUser, deleteUser } = useGlobalContext();
  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditedUser({ ...user });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    if (editedUser && updateUser) {
      try {
        await updateUser(editedUser); // Usa la función updateUser
        alert('Usuario actualizado con éxito');
        setEditingUser(null);
      } catch (error) {
        alert('Error al actualizar usuario');
      }
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      alert('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      alert('Error al eliminar usuario');
    }
  };

  return (
    <>
      <Navbar />

      <div className="overflow-x-auto mt-40">
        <table className="table table-xs table-pin-rows table-pin-cols text-center border border-gray-200 p-4">
          <thead>
            <tr>
              <th>Código</th>
              <td>Nombres</td>
              <td>Apellidos</td>
              <td>Usuario</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(data => (
              <tr key={data.id_usuarios}>
                <th>{data.id_usuarios}</th>
                <td>{data.nombres}</td>
                <td>{data.apellidos}</td>
                <td>{data.usuario}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => handleDelete(data.id_usuarios)}
                  >
                    Borrar
                  </button>
                  <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={() => handleEditClick(data)}
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
              <td>Maquina</td>
              <td>Capacidad</td>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold">Editar Usuario</h2>
            <form>
              <div className="mb-2">
                <label className="block text-gray-700">Nombres:</label>
                <input
                  type="text"
                  name="nombres"
                  value={editedUser.nombres}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Apellidos:</label>
                <input
                  type="text"
                  name="apellidos"
                  value={editedUser.apellidos}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Usuario:</label>
                <input
                  type="text"
                  name="usuario"
                  value={editedUser.usuario}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Contraseña:</label>
                <input
                  type="password"
                  name="contraseña"
                  value={editedUser.contraseña || ''}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
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
