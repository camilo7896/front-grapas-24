import FormPicado from "../components/FormUsers"
import MenuPicado from "../components/MenuPicado"
import Navbar from "../components/Navbar"
import TablePicado from "../components/TablePicado"

const PicadoPage = () => {
  return (
    <>
    <div>
      <Navbar/>
      <h2 className="text-center m-5 font-bold">Proceso Picado</h2>

      <div className="flex justify-center m-5">
      <MenuPicado/>
      </div>
      <div className="flex justify-center text-center">
      <FormPicado/>
      </div>
      <div>
        <TablePicado/>
      </div>
    </div>
    </>
  )
}

export default PicadoPage
