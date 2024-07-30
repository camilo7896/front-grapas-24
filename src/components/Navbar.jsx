import { Link, useNavigate } from "react-router-dom";
import { CogIcon, UserGroupIcon, Cog8ToothIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const navigate = useNavigate(); // Hook para redirección

  const handleLogout = () => {
    // Elimina el token y el rol del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Redirige al usuario a la página de login
    navigate('/login');
  };

  return (
    <div className="navbar bg-neutral text-white">
      <div className="navbar-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-neutral rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to={'/'}>Home</Link></li>
            <li>
              <Link to={'/picado'}>
                <Cog8ToothIcon className="h-6 w-6 text-blue-500" />
                Picado
              </Link>
            </li>
            {/* <li><Link to={'/empaque'}>Empaque</Link></li> */}
            <li>
              <Link to={'/admin'}>
                <CogIcon className="h-6 w-6 text-blue-500" />
                Administrar
              </Link>
            </li>
            <li>
              <Link to={'/asignation'}>
                <UserGroupIcon className="h-6 w-6 text-blue-500" />
                Asignaciones
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex w-full  justify-between">
        <div className="navbar-startr">
          <Link to={"/"} className="btn btn-ghost text-xl">G & P</Link>
        </div>
        <div className="navbar-end">
          <button
            onClick={handleLogout}
            className="btn btn-secondary w-64 m-3"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}
