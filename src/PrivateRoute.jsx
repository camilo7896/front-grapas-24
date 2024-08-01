import { Navigate } from 'react-router-dom';
import { useGlobalContext } from './context/UserContext'; // Asegúrate de que el contexto esté correctamente configurado

const PrivateRoute = ({ element: Component, allowedRoles }) => {

  const { auth, role } = useGlobalContext(); // Obtén el estado de autenticación y rol del contexto

  // Si no está autenticado, redirige al login
  if (!auth) {
    return <Navigate to="/" />;
  }

  // Si se especifican roles permitidos y el rol del usuario no está en la lista, redirige
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Si está autenticado y el rol es permitido (o no se especifican roles), renderiza el componente
  return <>{Component}</>;
};

export default PrivateRoute;
