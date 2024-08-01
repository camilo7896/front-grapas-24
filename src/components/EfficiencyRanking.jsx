import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/UserContext';
import { Card } from '@tremor/react';

const EfficiencyRanking = () => {
  const { allRegisterData } = useGlobalContext();
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    // Función para calcular la eficiencia
    const calculateEfficiency = (user) => {
      const initialHours = user.horometro_inicial || 0;
      const finalHours = user.horometro_final || 0;
      const hoursWorked = finalHours - initialHours;
      const registroStand = user.registro_standard || 0;
      const horasAsignadas = user.hora_asignadaRegistrador || 0;

      const registroStandDecimal = registroStand / 100;
      return (hoursWorked - (registroStandDecimal * horasAsignadas)).toFixed(2);
    };

    // Verificar que hay datos disponibles
    if (Array.isArray(allRegisterData) && allRegisterData.length > 0) {
      // Calcular el ranking
      const sortedData = [...allRegisterData].map(user => ({
        ...user,
        efficiency: calculateEfficiency(user),
      })).sort((a, b) => parseFloat(b.efficiency) - parseFloat(a.efficiency))
        .slice(0, 3); // Obtener los 3 primeros

      setRanking(sortedData);
    } else {
      setRanking([]);
    }
  }, [allRegisterData]);

  return (
    <div className="mx-auto max-w-full mt-4">
      <Card>
        <Card.Header>Ranking de Eficiencia</Card.Header>
        <Card.Body>
          {ranking.length > 0 ? (
            <table className="table table-xs min-w-full">
              <thead>
                <tr>
                  <th>Posición</th>
                  <th>Codigo</th>
                  <th>Maquina</th>
                  <th>Eficiencia</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.id_usuarioRegistrador || 'N/A'}</td>
                    <td>{user.id_asignacion || 'N/A'}</td>
                    <td className={parseFloat(user.efficiency) < -0.1 ? 'text-red-500' : 'text-green-500'}>
                      {user.efficiency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay suficientes datos para el ranking.</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default EfficiencyRanking;
