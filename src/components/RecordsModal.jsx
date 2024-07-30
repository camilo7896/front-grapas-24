/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useGlobalContext } from '../context/UserContext';

const RecordsModal = ({ onClose }) => {
  const { allRegisterData } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar registros por ID de usuario
  const filteredRecords = allRegisterData.filter(record =>
    record.id_usuarioRegistrador.toString().includes(searchTerm)
  );

  // Manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>
      <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded shadow-lg z-50 overflow-hidden">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Historial de Registros</p>
            <button className="modal-close cursor-pointer z-50" onClick={onClose}>
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 3.53a.75.75 0 00-1.06 0L9 8.94 4.53 4.47a.75.75 0 10-1.06 1.06L7.94 10l-4.47 4.47a.75.75 0 101.06 1.06L9 11.06l4.47 4.47a.75.75 0 101.06-1.06L10.06 10l4.47-4.47a.75.75 0 000-1.06z" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por ID de Usuario"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="overflow-x-auto max-h-96">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Código</th>
                  <th>User</th>
                  <th>Machine</th>
                  <th>Horómetro Inicial</th>
                  <th>Horómetro Final</th>
                  <th>Hora asignada</th>
                  <th>Observaciones</th>

                </tr>
              </thead>
              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr key={record.id_registro}>
                      <td>{record.registro_maquina}</td>
                      <td>{record.id_usuarioRegistrador}</td>
                      <td>{record.id_asignacion}</td>
                      <td>{record.registro_referencia}</td>
                      <td>{record.horometro_inicial}</td>
                      <td>{record.horometro_final}</td>
                      <td>{record.hora_asignadaRegistrador}</td>
                      <td>{record.observaciones}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No se encontraron registros</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-2">
            <button onClick={onClose} className="btn btn-secondary">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordsModal;
