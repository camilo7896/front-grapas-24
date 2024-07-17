import { useGlobalContext } from "../context/UserContext";

export default function CapacityPanel() {
  const { capacity } = useGlobalContext();

    if (capacity > 100) {
        alert("Superaste el 100 %, la asignacion que tienes es de :  "+capacity+"%");
    }

  return (
    <>
      <div
        className="radial-progress bg-primary text-primary-content border-primary border-4"
        style={{ "--value": capacity }} // Utilizar capacity como el valor dinámico del progreso radial
        role="progressbar"
      >
        {capacity}% {/* Mostrar el porcentaje de capacidad */}
      </div>
    </>
  );
}
