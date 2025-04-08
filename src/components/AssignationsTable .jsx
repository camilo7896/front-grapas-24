import { useEffect, useState } from 'react';
import 'daisyui/dist/full.css';
import { useGlobalContext } from '../context/UserContext';

const AssignationsTable = () => {
  const { rutaLocal, fetchAllAssignations, machinesData } = useGlobalContext();

  const [allAssignamentData, setAllAssignament] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAssignation, setCurrentAssignation] = useState(null);
  const [users, setUsers] = useState([]);
  const [machines, setMachines] = useState([]);

  const fetchAssignations = async () => {
    try {
      const response = await fetch(`${rutaLocal}/allassign`);
      const data = await response.json();
      setAllAssignament(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching assignations:', error);
    }
  };

  <p className="text-sm text-gray-600">
    Total de Máquinas Asignadas: {allAssignamentData.length}
  </p>




  const fetchUsersAndMachines = async () => {
    try {
      const usersResponse = await fetch(`${rutaLocal}/users`);
      const usersData = await usersResponse.json();
      setUsers(usersData);

      const machinesResponse = await fetch(`${rutaLocal}/machines`);
      const machinesData = await machinesResponse.json();
      setMachines(machinesData);
    } catch (error) {
      console.error('Error fetching users or machines:', error);
    }
  };

  useEffect(() => {
    fetchAllAssignations();
    fetchAssignations();
    fetchUsersAndMachines();
  }, []);

  const handleDeleteAssignation = async (id) => {
    try {
      const response = await fetch(`${rutaLocal}/allassign/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchAssignations();
      } else {
        console.error('Error deleting assignation');
      }
    } catch (error) {
      console.error('Error deleting assignation:', error);
    }
  };

  const handleEditAssignation = (assignation) => {
    setCurrentAssignation(assignation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentAssignation(null);
  };

  const handleUpdateAssignation = async () => {
    console.log('Updating assignation:', currentAssignation);
    try {
      const response = await fetch(`${rutaLocal}/allassign/${currentAssignation.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentAssignation),
      });
      if (response.ok) {
        fetchAssignations();
        handleCloseModal();
      } else {
        console.error('Error updating assignation');
      }
    } catch (error) {
      console.error('Error updating assignation:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`);
    setCurrentAssignation((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="overflow-x-auto mt-40">
        <button className="btn btn-outline btn-success" onClick={fetchAssignations}>
          Refrescar Datos
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {Object.entries(
            allAssignamentData.reduce((acc, item) => {
              const userId = item.id_usuarios;
              if (!acc[userId]) acc[userId] = [];
              acc[userId].push(item);
              return acc;
            }, {})
          ).map(([userId, assignations]) => (
            <div key={userId} className="card bg-base-100 shadow-xl border border-gray-300">
              <div className="card-body">
                <h2 className="card-title">Usuario: {userId}</h2>
                <p className="text-sm text-gray-600">
                  Total de Máquinas Asignadas: {assignations.length}
                </p>

                <ol className="list-inside">
                  {assignations.map((data) => {
                    const machine = machines.find(m => m.id_maquinas === data.id_maquinas);

                    return (
                      <li key={data.id} className="mt-2">
                        <hr />
                        <div className="flex flex-col">
                          <span><strong>Máquina:</strong> {data.maquina}</span>
                          <span><strong>Capacidad:</strong> {machine?.capacidad || 'N/A'}</span>
                          <span><strong>Estándar:</strong> {data.id_standar}</span>
                          <span><strong>Referencia:</strong> {data.nombre_referencia}</span>
                          <span><strong>Horas Asignadas:</strong> {data.horas_asignadas}</span>
                          <div className="mt-2 flex gap-2">
                            <button
                              className="btn btn-sm btn-error"
                              onClick={() => handleDeleteAssignation(data.id)}
                            >
                              Borrar
                            </button>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleEditAssignation(data)}
                            >
                              Editar
                            </button>
                          </div>
                        </div>
                      </li>

                    );
                  })}


                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Editar Asignación</h2>
            <div className="py-4">
              <label>Operario</label>
              <select
                name="nombre_usuario"
                value={currentAssignation.id_usuarios}
                onChange={handleInputChange}
                className="select select-bordered w-full mb-2"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id_usuarios}>
                    {user.id_usuarios}
                  </option>
                ))}
              </select>

              <label>Maquina</label>
              <select
                name="nombre_maquina"
                value={currentAssignation.nombre_maquina}
                onChange={handleInputChange}
                className="select select-bordered w-full mb-2"
              >
                {machines.map((machine) => (
                  <option key={machine.id} value={machine.maquina}>
                    {machine.maquina}
                  </option>
                ))}
              </select>

              <label>Standar</label>
              <input
                type="text"
                name="id_standar"
                value={currentAssignation.id_standar || ''}
                onChange={handleInputChange}
                className="input input-bordered w-full mb-2"
                placeholder="ID Estándar"
              />

              <label>Referencia</label>
              <input
                type="text"
                name="nombre_referencia"
                value={currentAssignation.nombre_referencia}
                onChange={handleInputChange}
                className="input input-bordered w-full mb-2"
                placeholder="Nombre de Referencia"
              />

              <label>Horas asignadas</label>
              <input
                type="number"
                name="horas_asignadas"
                value={currentAssignation.horas_asignadas}
                onChange={handleInputChange}
                className="input input-bordered w-full mb-2"
                placeholder="Horas Asignadas"
              />
            </div>

            <div className="modal-action">
              <button className="btn" onClick={handleUpdateAssignation}>
                Guardar
              </button>
              <button className="btn" onClick={handleCloseModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignationsTable;
