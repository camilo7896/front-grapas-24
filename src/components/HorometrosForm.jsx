import { useState } from 'react';
import { useGlobalContext } from '../context/UserContext';

const UserMachines = () => {
    const { rutaLocal } = useGlobalContext();



  const [userId, setUserId] = useState('');
  const [machines, setMachines] = useState([]);
  const [selectedAsignacion, setSelectedAsignacion] = useState(null);

  console.log(machines)

  const fetchUserMachines = async () => {
    try {
      const response = await fetch(`${rutaLocal}allassign/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setMachines(data);
      } else {
        console.error('Error fetching user machines');
      }
    } catch (error) {
      console.error('Error fetching user machines:', error);
    }
  };

  const handleSearch = () => {
    fetchUserMachines();
  };

  const handleAddHorometros = (idAsignacion) => {
    setSelectedAsignacion(idAsignacion);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Buscar máquinas asignadas a un usuario</h1>
      <div className="form-control mb-4">
        <input
          type="text"
          placeholder="ID del usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary mt-2">Buscar</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID Máquina</th>
              <th>Nombre Máquina</th>
              <th>Referencia</th>
              <th>Horas Asignadas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((machine) => (
              <tr key={machine.id}>
                <td>{machine.id}</td>
                <td>{machine.nombre_maquina}</td>
                <td>{machine.nombre_referencia}</td>
                <td>{machine.horas_asignadas}</td>
                <td>
                  <button onClick={() => handleAddHorometros(machine.id_asignaciones)} className="btn btn-accent">
                    Agregar Horómetros
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedAsignacion && (
        <div className="mt-4">
       
        </div>
      )}
    </div>
  );
};

export default UserMachines;
