import { useState } from 'react';

const FormRegisterPicado = () => {
  const [userId, setUserId] = useState('');
  const [assignedMachines, setAssignedMachines] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSearch = async () => {
    setError(''); // Clear any previous error
    try {
      const response = await fetch(`http://localhost:3000/api/user-machines/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setAssignedMachines(data);
      } else {
        const errorMessage = await response.text();
        setError(`Error: ${errorMessage}`);
      }
    } catch (error) {
      setError(`Error fetching assigned machines: ${error.message}`);
    }
  };

  return (
    <div className="user-machines">
      <h3>Buscar Máquinas Asignadas por ID de Usuario</h3>
      <input
        type="text"
        placeholder="ID de Usuario"
        value={userId}
        onChange={handleChange}
        className="input input-bordered w-full max-w-xs"
      />
      <button onClick={handleSearch} className="btn btn-primary mt-2">Buscar</button>
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="assigned-machines mt-4">
        {assignedMachines.length > 0 ? (
          <table className="table table-xs table-pin-rows table-pin-cols text-center border border-gray-200 p-2">
            <thead>
              <tr>
                <th>Nombre Máquina</th>
                <th>Referencia</th>
                <th>Horas Asignadas</th>
              </tr>
            </thead>
            <tbody>
              {assignedMachines.map((machine) => (
                <tr key={machine.id}>
                  <td>{machine.nombre_maquina}</td>
                  <td>{machine.nombre_referencia}</td>
                  <td>{machine.horas_asignadas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay máquinas asignadas para este usuario.</p>
        )}
      </div>
    </div>
  );
};

export default FormRegisterPicado;
