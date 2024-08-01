import { useState, useEffect } from 'react';
import { useGlobalContext } from "../context/UserContext";
import rankingImage from '../images/ranking.png'; // Ajusta la ruta según la ubicación

export default function Ranking() {
  const { allRegisterData, searchTermUser, searchTermMachine, startDate, endDate, setEfficiency } = useGlobalContext();
  const [topThree, setTopThree] = useState([]);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const filteredData = allRegisterData.filter(user => {
    if (!user) return false;
    const searchLowerUser = searchTermUser.toLowerCase();
    const searchLowerMachine = searchTermMachine.toLowerCase();
    const recordDate = formatDate(user.registro_maquina);

    const withinDateRange = (!startDate || parseDate(recordDate) >= parseDate(startDate)) &&
                            (!endDate || parseDate(recordDate) <= parseDate(endDate));

    return (
      withinDateRange &&
      (user.id_usuarioRegistrador?.toString() || '').toLowerCase().includes(searchLowerUser) &&
      (user.id_asignacion?.toString() || '').toLowerCase().includes(searchLowerMachine)
    );
  });

  useEffect(() => {
    let totalHours = 0;
    let totalStandard = 0;
    let totalEfficiency = 0;

    // Calculate efficiencies and rank
    const efficiencyData = filteredData.map(user => {
      const initialHours = user.horometro_inicial || 0;
      const finalHours = user.horometro_final || 0;
      const hoursWorked = finalHours - initialHours;
      const registroStand = user.registro_standard || 0;
      const horasAsignadas = user.hora_asignadaRegistrador || 0;
      const registroStandDecimal = registroStand / 100;
      const efficiencyValue = (hoursWorked - (registroStandDecimal * horasAsignadas)).toFixed(2);

      totalHours += hoursWorked;
      totalStandard += registroStand;
      totalEfficiency += parseFloat(efficiencyValue);

      return { ...user, efficiencyValue: parseFloat(efficiencyValue) };
    });

    // Debug: Check filtered data and efficiency calculation
    console.log('Filtered Data:', filteredData);
    console.log('Efficiency Data:', efficiencyData);

    // Sort data by efficiency (lowest to highest)
    const sortedData = efficiencyData.sort((a, b) => a.efficiencyValue - b.efficiencyValue);
    setTopThree(sortedData.slice(0, 3));

    const efficiencyValue = totalStandard > 0 ? (totalHours / (totalStandard / 100)) * 100 : 0;
    setEfficiency(efficiencyValue.toFixed(2));
  }, [filteredData]);

  // Debug: Check top three data before rendering
  console.log('Top Three:', topThree);

  return (
    <>
      <div className="m-8 w-full">
        <h3 className="font-semibold text-lg text-center m-5">Top 3 Operarios Picado</h3>
        <div className="flex justify-around flex-wrap mt-4">
          {topThree.map((item, index) => (
            <div key={item.id} className={`m-4 p-4 border rounded-lg ${index > 0 ? 'bg-yellow-200' : index === 1 ? 'bg-silver-200' : 'bg-bronze-200'} flex items-center space-x-4`}>
              <img
                src={rankingImage} // Asegúrate de que la ruta sea correcta
                alt={`Profile of ${item.id_usuarioRegistrador}`}
                className="w-16 h-16 rounded-full p-2"
              />
              <div>
                <p className="font-bold">{index - 3}° Puesto</p>
                <p>Codigo: {item.id_usuarioRegistrador}</p>
                <p className='font-semibold'>Eficiencia: {item.efficiencyValue.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}