import { useState } from 'react';
import { useGlobalContext } from '../context/UserContext';
import moment from 'moment-timezone';

const UserMachines = () => {
    const { rutaLocal, allassignamentData } = useGlobalContext();
    const [userId, setUserId] = useState('');
    const [filteredMachines, setFilteredMachines] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [horometroData, setHorometroData] = useState({});

    console.log(filteredMachines)

    const handleSearch = () => {
        if (userId) {
            const filtered = allassignamentData.filter(machine => machine.id_usuarios === parseInt(userId));
            setFilteredMachines(filtered);
            setModalOpen(true);
            setHorometroData(filtered.reduce((acc, machine) => ({
                ...acc,
                [machine.id]: {
                    horometro_inicial: '',
                    horometro_final: '',
                    observaciones: ''
                }
            }), {}));
        } else {
            setFilteredMachines([]);
        }
    };

    const handleChange = (machineId, e) => {
        const { name, value } = e.target;
        setHorometroData({
            ...horometroData,
            [machineId]: {
                ...horometroData[machineId],
                [name]: value
            }
        });
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setHorometroData({});
    };

    const handleModalSubmit = async () => {
        const currentTimeInColombia = moment().tz('America/Bogota').format();
    
        const dataToSend = filteredMachines.map(machine => ({
            user_id: userId,
            id_asignacion: machine.maquina, // Asegúrate de que este valor sea el correcto
            horometro_inicial: horometroData[machine.id]?.horometro_inicial || 0,
            horometro_final: horometroData[machine.id]?.horometro_final || 0,
            observaciones: horometroData[machine.id]?.observaciones || '',
            registro_maquina: currentTimeInColombia,
            id_usuarioRegistrador: machine.id_usuarios,
            registro_referencia: machine.nombre_referencia,
            hora_asignadaRegistrador: machine.horas_asignadas,
            registro_standard:machine.id_standar
        }));

        if (!Array.isArray(dataToSend) || dataToSend.length === 0) {
            console.error('Data to send is not an array or is empty');
            return;
        }
    
        try {
            const response = await fetch(`${rutaLocal}user-machines`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });
    
            if (response.ok) {
                alert("Horómetros guardados exitosamente");
                handleModalClose();
            } else {
                console.error('Error saving horómetros');
            }
        } catch (error) {
            console.error('Error saving horómetros:', error);
        }
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

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50" onClick={handleModalClose}></div>
                    <div className="modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-hidden">
                        <div className="modal-content py-4 text-left px-6 max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Agregar Horómetros</p>
                                <button className="modal-close cursor-pointer z-50" onClick={handleModalClose}>
                                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <path d="M14.53 3.53a.75.75 0 00-1.06 0L9 8.94 4.53 4.47a.75.75 0 10-1.06 1.06L7.94 10l-4.47 4.47a.75.75 0 101.06 1.06L9 11.06l4.47 4.47a.75.75 0 101.06-1.06L10.06 10l4.47-4.47a.75.75 0 000-1.06z"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="my-5">
                                {filteredMachines.map((machine) => (
                                    <div key={machine.id} className="mb-4">
                                        <p className="text-lg font-semibold text-blue-700">Máquina: {machine.maquina}</p>
                                        <p className="text-lg text-blue-700">Referencia: {machine.nombre_referencia}</p>

                                        <div className="form-control mb-4">
                                            <label className="label">Horómetro Inicial</label>
                                            <input
                                                type="number"
                                                name="horometro_inicial"
                                                value={horometroData[machine.id]?.horometro_inicial || ''}
                                                onChange={(e) => handleChange(machine.id, e)}
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                        <div className="form-control mb-4">
                                            <label className="label">Horómetro Final</label>
                                            <input
                                                type="number"
                                                name="horometro_final"
                                                value={horometroData[machine.id]?.horometro_final || ''}
                                                onChange={(e) => handleChange(machine.id, e)}
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                        <div className="form-control mb-4">
                                            <label className="label">Observaciones</label>
                                            <textarea
                                                name="observaciones"
                                                value={horometroData[machine.id]?.observaciones || ''}
                                                onChange={(e) => handleChange(machine.id, e)}
                                                className="textarea textarea-bordered w-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-2">
                                <button onClick={handleModalClose} className="btn btn-secondary mr-3">Cancelar</button>
                                <button onClick={handleModalSubmit} className="btn btn-primary">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMachines;
