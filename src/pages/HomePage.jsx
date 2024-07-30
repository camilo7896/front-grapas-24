import CardPicadoComponent from "../components/CardPicadoComponent"
import Navbar from "../components/Navbar"

const HomePage = () => {
  return (
   <>
    <Navbar/>
    <h1 className="text-center font-bold mt-5">Eficiencas</h1>

    <div className="container flex flex-wrap justify-around">
    <div className="p-4  border border-slate-500 m-3">
    <h2 className="text-center font-semibold font">Picado</h2>
      <CardPicadoComponent/>
    </div>
    <div className="p-4  border border-slate-500 m-3">
    <h2 className="text-center font-semibold font">Picado</h2>
      <CardPicadoComponent/>
    </div>
    <div className="p-4  border border-slate-500 m-3">
    <h2 className="text-center font-semibold font">Picado</h2>
      <CardPicadoComponent/>
    </div>
    <div className="p-4  border border-slate-500 m-3">
    <h2 className="text-center font-semibold font">Picado</h2>
      <CardPicadoComponent/>
    </div>
    </div>
   </>
  )
}

export default HomePage
