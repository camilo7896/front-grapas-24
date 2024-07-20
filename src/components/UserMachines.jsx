import { useState } from 'react';
import { useGlobalContext } from '../context/UserContext';
import moment from 'moment-timezone';

const UserMachines = () => {
    const { rutaLocal, allassignamentData } = useGlobalContext(); // Asegúrate de tener `userId` en el contexto global
    const [userId, setUserId] = useState('');
    const [filteredMachines, setFilteredMachines] = useState(allassignamentData);
    const [selectedAsignacion, setSelectedAsignacion] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [horometroData, setHorometroData] = useState({
        horometro_inicial: '',
        horometro_final: '',
        observaciones: '',
        id_usuarioRegistrador: '',
        registro_referencia: '',
        hora_asignadaRegistrador:'',
    });

    const handleSearch = () => {
        if (userId) {
            const filtered = allassignamentData.filter(machine => machine.id_usuarios === parseInt(userId));
            setFilteredMachines(filtered);
        } else {
            setFilteredMachines(allassignamentData);
        }
    };

    const handleAddHorometros = (machine) => {
        setSelectedAsignacion(machine);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedAsignacion(null);
        setHorometroData({
            horometro_inicial: '',
            horometro_final: '',
            observaciones: ''
        });
    };

    const handleModalSubmit = async () => {
        // Obtener la hora actual en la zona horaria de Colombia
        const currentTimeInColombia = moment().tz('America/Bogota').format();

        const dataToSend = {
            user_id: userId, // ID del usuario que realiza la búsqueda
            id_asignacion: selectedAsignacion.maquina, // Ajustado para enviar id_maquinaAsignada
            horometro_inicial: horometroData.horometro_inicial,
            horometro_final: horometroData.horometro_final,
            observaciones: horometroData.observaciones,
            registro_maquina: currentTimeInColombia,  // Fecha y hora actual en Colombia
            id_usuarioRegistrador: selectedAsignacion.id_usuarios, // ID del usuario que está registrando el dato
            registro_referencia: selectedAsignacion.nombre_referencia, // Referencia seleccionada
            hora_asignadaRegistrador: selectedAsignacion.horas_asignadas // Hora asignada del registrador
        };

        try {
            const response = await fetch(`${rutaLocal}user-machines`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                alert("Horómetro guardado exitosamente");
                handleModalClose();
            } else {
                console.error('Error saving horómetro');
            }
        } catch (error) {
            console.error('Error saving horómetro:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHorometroData({ ...horometroData, [name]: value });
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
                            <th>Codigo</th>
                            <th>Nombre Máquina</th>
                            <th>Referencia</th>
                            <th>Horas Asignadas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMachines.map((machine) => (
                            <tr key={machine.id}>
                                <td>{machine.id_usuarios}</td>
                                <td>{machine.maquina}</td>
                                <td>{machine.nombre_referencia}</td>
                                <td>{machine.horas_asignadas}</td>
                                <td>
                                    <button onClick={() => handleAddHorometros(machine)} className="btn btn-accent">
                                        Agregar Horómetros
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50" onClick={handleModalClose}></div>
                    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Agregar Horómetro</p>
                                <button className="modal-close cursor-pointer z-50" onClick={handleModalClose}>
                                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <path d="M14.53 3.53a.75.75 0 00-1.06 0L9 8.94 4.53 4.47a.75.75 0 10-1.06 1.06L7.94 10l-4.47 4.47a.75.75 0 101.06 1.06L9 11.06l4.47 4.47a.75.75 0 101.06-1.06L10.06 10l4.47-4.47a.75.75 0 000-1.06z"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="my-5">
                                <p className="text-lg">Máquina: {selectedAsignacion?.nombre_maquina}</p>
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">Horómetro Inicial</label>
                                <input
                                    type="number"
                                    name="horometro_inicial"
                                    value={horometroData.horometro_inicial}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">Horómetro Final</label>
                                <input
                                    type="number"
                                    name="horometro_final"
                                    value={horometroData.horometro_final}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">Observaciones</label>
                                <textarea
                                    name="observaciones"
                                    value={horometroData.observaciones}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered w-full"
                                />
                            </div>

                            <div className="flex justify-end pt-2">
                                <button onClick={handleModalClose} className="btn btn-secondary mr-3">Cancelar</button>
                                <button onClick={handleModalSubmit} className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMachines;
