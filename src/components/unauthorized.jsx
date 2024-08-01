import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2); // Redirige a la página anterior
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-red-600">No estás autorizado para ingresar aquí</h1>
        <p className="mt-4 text-center text-gray-700">No tienes permisos para acceder a esta página.</p>
        <button 
          onClick={handleGoBack} 
          className="mt-6 btn btn-info"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
