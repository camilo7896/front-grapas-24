import MenuPicado from "../components/MenuPicado"
import Navbar from "../components/Navbar"

const PicadoPage = () => {
  return (
    <>
      <div>
        <Navbar />
        <h2 className="text-center m-5 font-bold">Proceso Picado</h2>

        <div className="flex justify-center m-5">
          <MenuPicado />
        </div>
       
      </div>
    </>
  )
}

export default PicadoPage
