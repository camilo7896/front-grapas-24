import FormMachine from "../components/FormMachine";
import FormUsers from "../components/FormUsers";
import MenuAdmin from "../components/MenuAdmin";
import Navbar from "../components/Navbar";
import TableMachine from "../components/TableMachine";
import TableUser from "../components/TableUser";
import { useGlobalContext } from "../context/UserContext";



export default function AdminPage() {
  const { isVisible, isVisibleMachine } = useGlobalContext();

  return (
    <>
      <Navbar />
      <h2 className="text-center m-5 font-bold">Administrar aplicacion</h2>
      <div className="flex justify-center m-5">
        <MenuAdmin />
      </div>
      <div className="flex justify-center">
        {isVisible && <FormUsers />}
      </div>
      <div className="flex justify-center">
        {isVisibleMachine && <FormMachine />}
      </div>

      <section className="flex justify-center h-96">
        <div className="w-full m-3">
          <h2 className="text-center font-semibold">Maquinas</h2>
          <TableMachine />
        </div>
        <div className="w-full m-3">
          <h2 className="text-center font-semibold">Usuarios</h2>
          <TableUser />
        </div>
      </section>

    </>
  )
}
