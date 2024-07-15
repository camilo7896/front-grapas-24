import FormMachine from "../components/FormMachine";
import FormReference from "../components/formReference";
import FormUsers from "../components/FormUsers";
import MenuAdmin from "../components/MenuAdmin";
import MenuSelect from "../components/MenuSelect";
import Navbar from "../components/Navbar";
import { useGlobalContext } from "../context/UserContext";



export default function AdminPage() {
  const { isVisible, isVisibleMachine,isVisibleReference } = useGlobalContext();

  return (
    <>
      <Navbar />
      
            <h2 className="text-center m-5 font-bold">Administrar aplicación</h2>
            <MenuSelect/>
      <div className="flex justify-center m-5">
        <MenuAdmin />
      </div>
      <div className="flex justify-center">
        {isVisible && <FormUsers />}
      </div>
      <div className="flex justify-center">
        {isVisibleMachine && <FormMachine />}
      </div>
      <div className="flex justify-center">
        {isVisibleReference && <FormReference/>}
      </div>
    </>
  )
}
