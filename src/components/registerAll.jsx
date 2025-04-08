import { useEffect, useState } from 'react';

const HorometrosTable = ({ rutaLocal }) => {
  const [registros, setRegistros] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRegistro, setCurrentRegistro] = useState(null);

  const fetchRegistros = async () => {
    try {
      const res = await fetch(`${rutaLocal}/horometros`);
      const data = await res.json();
      setRegistros(data);
    } catch (error) {
      console.error('Error al obtener los registros:', error);
    }
  };

  const handleEdit = (registro) => {
    setCurrentRegistro(registro);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRegistro(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${rutaLocal}/horometros/${currentRegistro.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentRegistro),
      });
      if (res.ok) {
        fetchRegistros();
        setIsModalOpen(false);
      } else {
        console.error('Error al actualizar');
      }
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Registros de Horómetros</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Máquina</th>
              <th>H. Inicial</th>
              <th>H. Final</th>
              <th>Observación</th>
              <th>Fecha</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {registros.map(reg => (
              <tr key={reg.id}>
                <td>{reg.id}</td>
                <td>{reg.nombre_usuario}</td>
                <td>{reg.nombre_maquina}</td>
                <td>{reg.horometro_inicial}</td>
                <td>{reg.horometro_final}</td>
                <td>{reg.observacion}</td>
                <td>{new Date(reg.fecha_hora).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-primary" onClick={() => handleEdit(reg)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-2xl">
            <h3 className="font-bold text-lg">Editar Registro</h3>
            <div className="form-control">
              <label>Horómetro Inicial</label>
              <input
                type="number"
                name="horometro_inicial"
                value={currentRegistro.horometro_inicial}
                onChange={handleInputChange}
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-2">
              <label>Horómetro Final</label>
              <input
                type="number"
                name="horometro_final"
                value={currentRegistro.horometro_final}
                onChange={handleInputChange}
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-2">
              <label>Observación</label>
              <input
                type="text"
                name="observacion"
                value={currentRegistro.observacion}
                onChange={handleInputChange}
                className="input input-bordered"
              />
            </div>
            <div className="modal-action">
              <button className="btn btn-success" onClick={handleUpdate}>Guardar</button>
              <button className="btn" onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HorometrosTable;
