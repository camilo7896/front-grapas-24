// routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/UserContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useGlobalContext();

  // Verifica si el usuario está autenticado
  if (!user) {
    return <Navigate to="/" />; // Redirige a la página de inicio de sesión si no está autenticado
  }

  // Verifica si el rol del usuario está en los roles permitidos para la ruta
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" />; // Redirige a la página de acceso denegado si el rol no está permitido
  }

  // Si el usuario está autenticado y tiene el rol adecuado, renderiza el componente
  return element;
};

export default ProtectedRoute;
