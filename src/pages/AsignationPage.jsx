import  { useState } from 'react';
import { useGlobalContext } from "../context/UserContext";
import Navbar from '../components/Navbar';

const AsignationPage = () => {
  const { data: machinesData, usersData, referencesData } = useGlobalContext();
  const [searchId, setSearchId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [machines, setMachines] = useState(Array(5).fill(''));
  const [references, setReferences] = useState(Array(5).fill(Array(5).fill('')));

  const handleSearch = () => {
    const user = usersData.find(user => user.id_usuarios === parseInt(searchId));
    setSelectedUser(user);
  };

  const handleMachineChange = (index, value) => {
    const newMachines = [...machines];
    newMachines[index] = value;
    setMachines(newMachines);
  };

  const handleReferenceChange = (machineIndex, referenceIndex, value) => {
    const newReferences = [...references];
    newReferences[machineIndex] = [...newReferences[machineIndex]];
    newReferences[machineIndex][referenceIndex] = value;
    setReferences(newReferences);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', selectedUser);
    console.log('Máquinas:', machines);
    console.log('Referencias:', references);
  };

  return (
    <>

    <Navbar/>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Asignar Máquinas y Referencias</h1>
      <div className="mb-4">
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
          <h2 className="text-xl font-semibold">Usuario: {selectedUser.nombres} {selectedUser.apellidos}</h2>
          {machines.map((machine, machineIndex) => (
            <div key={machineIndex} className="space-y-2">
              <select
                className={`select select-bordered w-full max-w-xs ${machine ? 'bg-green-200' : 'bg-white'}`}
                value={machine}
                onChange={(e) => handleMachineChange(machineIndex, e.target.value)}
              >
                <option value="">Seleccionar Máquina</option>
                {machinesData.map(machine => (
                  <option key={machine.id_maquinas} value={machine.id_maquinas}>
                    {machine.nombre_maquina}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-5 gap-2">
                {references[machineIndex].map((reference, referenceIndex) => (
                  <select
                    key={referenceIndex}
                    className={`select select-bordered ${reference ? 'bg-green-200' : 'bg-white'}`}
                    value={reference}
                    onChange={(e) => handleReferenceChange(machineIndex, referenceIndex, e.target.value)}
                  >
                    <option value="">Seleccionar Referencia</option>
                    {referencesData.map(reference => (
                      <option key={reference.id_referencia} value={reference.id_referencia}>
                        {reference.nombre_referencia}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn-primary">Asignar</button>
        </form>
      )}
    </div>
    </>
  );
};

export default AsignationPage;
