import Navbar from "../components/Navbar"
import Ranking from "../components/Ranking"

const HomePage = () => {
  return (
   <>
    <Navbar/>
    <h1 className="text-center font-bold mt-5">Eficiencas</h1>
    <div className="container flex flex-wrap justify-around">
    <Ranking/>
    </div>
   </>
  )
}

export default HomePage
