import { Link } from "react-router-dom";

export default function MenuPicado() {
  return (
    <>
      <div className="flex">
      
          <button className="btn join-item m-2">Registrar</button>
          <Link to={'/userlist'}>
        <button className="btn join-item m-2">Historial</button>
        </Link>
        <button className="btn join-item m-2">Eficiencia</button>
      </div>

    </>
  )
}
