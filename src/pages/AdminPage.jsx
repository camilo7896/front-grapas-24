import FormUsers from "../components/FormUsers";
import MenuAdmin from "../components/MenuAdmin";
import Navbar from "../components/Navbar";
import { useGlobalContext } from "../context/UserContext";



export default function AdminPage() {
  const {isVisible}=useGlobalContext();

  return (
    <>
      <Navbar />
      <h2 className="text-center m-5 font-bold">Administrar aplicacion</h2>
      <div className="flex justify-center m-5">
       <MenuAdmin/>
      </div>
      <div className="flex justify-center">
      {isVisible && <FormUsers/>}
      </div>

    
    </>
  )
}
