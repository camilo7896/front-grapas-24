import { useState } from 'react';
import { useGlobalContext } from "../context/UserContext";
import Navbar from '../components/Navbar';
import CapacityPanel from '../components/CapacityPanel';
import AssignationsTable from '../components/AssignationsTable ';

const AsignationPage = () => {
  const { data: machinesData, usersData, referencesData, setAssignament, capacity, setCapacity } = useGlobalContext();
  const [searchId, setSearchId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [machines, setMachines] = useState(Array(5).fill(''));
  const [references, setReferences] = useState(Array(5).fill('')); // Usar un array simple para referencias
  const [times, setTimes] = useState(Array(5).fill('')); // Usar un array simple para tiempos

  const handleSearch = () => {
    const user = usersData.find(user => user.id_usuarios === parseInt(searchId));
    setSelectedUser(user);
  };

  const handleMachineChange = (index, value) => {
    // Obtener la máquina seleccionada y su capacidad
    const selectedMachine = machinesData.find(machine => machine.id_maquinas === parseInt(value));
    const machineCapacity = selectedMachine ? selectedMachine.capacidad : 0;

    // Calcular la diferencia entre la capacidad anterior y la nueva
    const currentMachineId = machines[index];
    const previousMachine = machinesData.find(machine => machine.id_maquinas === parseInt(currentMachineId));
    const previousCapacity = previousMachine ? previousMachine.capacidad : 0;

    const capacityDifference = machineCapacity - previousCapacity;

    // Actualizar la capacidad total y el contexto
    setCapacity(prevCapacity => prevCapacity + capacityDifference);

    // Actualizar el estado de las máquinas seleccionadas
    const newMachines = [...machines];
    newMachines[index] = value;
    setMachines(newMachines);

    // Limpiar referencias al cambiar la máquina seleccionada
    const newReferences = [...references];
    newReferences[index] = ''; // Limpiar la referencia para esta máquina
    setReferences(newReferences);

    // Limpiar la hora al cambiar la máquina seleccionada
    const newTimes = [...times];
    newTimes[index] = ''; // Limpiar la hora para esta máquina
    setTimes(newTimes);
  };

  const handleReferenceChange = (machineIndex, value) => {
    const newReferences = [...references];
    newReferences[machineIndex] = value;
    setReferences(newReferences);
  };

  const handleTimeChange = (machineIndex, value) => {
    const newTimes = [...times];
    newTimes[machineIndex] = value;
    setTimes(newTimes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert('Por favor seleccione un usuario');
      return;
    }

    const asignaciones = machines.map((machine, machineIndex) => ({
      id_usuarioAsignado: selectedUser.id_usuarios,
      id_maquinaAsignada: machine,
      id_referenciaAsignada: references[machineIndex] || null, // Solo enviar referencia seleccionada o null si no hay selección
      horas_asignadas: times[machineIndex] || null // Solo enviar la hora seleccionada o null si no hay selección
    })).filter(asignacion => asignacion.id_maquinaAsignada); // Filtrar asignaciones sin máquina

    try {
      const response = await fetch('http://localhost:3000/api/assignations/multiple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(asignaciones)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Success:', data);
        alert("Asignaciones creadas exitosamente");
        setAssignament(data);
        setMachines(Array(5).fill(''));
        setReferences(Array(5).fill(''));
        setTimes(Array(5).fill('')); // Reiniciar las horas
        setCapacity(0); // Reiniciar la capacidad total
      } else {
        console.error('Error:', data);
        alert("Error al crear las asignaciones");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error de conexión");
    }
  };

  

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="p-8 flex-grow">
          <h1 className="text-2xl font-bold mb-4">Asignar Máquinas y Referencias</h1>
          <div className="mb-4 flex items-center">
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="Buscar por ID de Usuario"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button className="btn btn-primary ml-2" onClick={handleSearch}>Buscar</button>
          </div>

          {selectedUser && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mostrar usuario seleccionado */}
              <div className='flex justify-center items-center flex-col'>
                <h2 className="text-xl font-semibold">Usuario: {selectedUser.nombres} {selectedUser.apellidos}</h2>
                <CapacityPanel />
              </div>

              {/* Mostrar capacidad total */}
              <p className="font-semibold">Capacidad Total Seleccionada: {capacity}%</p>
              {machines.map((machine, machineIndex) => (
                <div key={machineIndex} className="space-y-2">
                  {/* Selección de máquina */}
                  <select
                    className={`select select-bordered w-full max-w-xs ${machine ? 'bg-green-200' : 'bg-white'} m-5`}
                    value={machine}
                    onChange={(e) => handleMachineChange(machineIndex, e.target.value)}
                  >
                    <option value="">Seleccionar Máquina</option>
                    {machinesData.map(machine => (
                      <option key={machine.id_maquinas} value={machine.id_maquinas}>
                        {machine.nombre_maquina} - Capacidad: {machine.capacidad}
                      </option>
                    ))}
                  </select>
                  {/* Selección de referencia */}
                  <select
                    className={`select select-bordered ${references[machineIndex] ? 'bg-green-200' : 'bg-white'} m-5`}
                    value={references[machineIndex]}
                    onChange={(e) => handleReferenceChange(machineIndex, e.target.value)}
                  >
                    <option value="">Seleccionar Referencia</option>
                    {referencesData.map(reference => (
                      <option key={reference.id_referencia} value={reference.id_referencia}>
                        {reference.nombre_referencia}
                      </option>
                    ))}
                  </select>
                  {/* Selección de hora */}
                  <input
                    type="number"
                    className="input input-bordered w-full max-w-xs m-5"
                    value={times[machineIndex]}
                    onChange={(e) => handleTimeChange(machineIndex, e.target.value)}
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-primary">Asignar</button>
            </form>
          )}
<AssignationsTable/>
        </div>
      </div>
    </>
  );
};

export default AsignationPage;
