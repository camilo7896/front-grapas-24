import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-neutral text-white">
    <div className="navbar-start">
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
          <li><Link to={'/picado'}>Picado</Link></li>
          <li><Link to={'/empaque'}>Empaque</Link></li>
          <li><Link to={'/admin'}>Administrar</Link></li>
          <li><Link to={'/asignation'}>Asignaciones</Link></li>
        </ul>
      </div>
    </div>
    <div className="navbar-center">
      <Link to={"/"} className="btn btn-ghost text-xl">G & P</Link>
    </div>
    <div className="navbar-end">
       </div>
  </div>
  );
}
