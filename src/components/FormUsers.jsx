import { useGlobalContext } from "../context/UserContext";

export default function FormUsers() {

  //guardar datos en el estado
const {setUser}=useGlobalContext()

  // Funcion enviar datos del formulario
  const sendData = (e) => {
    e.preventDefault();
    let target = e.target;
    let codigo = target.codigo.value;
    let nombres = target.nombres.value;
    let apellidos = target.apellidos.value;
    let usuario = target.usuario.value;
    //guardar informacion en un objeto
    let createUser ={
      codigo: codigo,
      nombres: nombres,
      apellidos: apellidos,
      usuario: usuario
    }
    // imprimir los datos en consola
    console.log(createUser);
    // vaciar los datos en el input
    setUser(createUser);
    // resetear el formulario
    e.target.reset();
    alert("Creado exitosamente");
    
  }
  return (
    <>
      <div className="p-10 content-center">
      <h2 className="font-semibold">Datos personales</h2>
        <form className="flex flex-col" onSubmit={sendData}>
          <input
            type="number"
            placeholder="Codigo"
            name="codigo"
            required
            className="input input-bordered input-primary w-full max-w-xl m-2" /> 
          <input
            type="text"
            placeholder="Nombres"
            name="nombres"
            required
            className="input input-bordered input-primary w-full max-w-xl m-2" />      
          <input
            type="text"
            placeholder="Apellidos"
            name="apellidos"
            required
            className="input input-bordered input-primary w-full max-w-xl m-2" />

          <input
            type="text"
            placeholder="Usuario"
            name="usuario"
            required
            className="input input-bordered input-primary w-full max-w-xl m-2" />
        <button className="btn btn-info w-full max-w-xl m-2">Enviar</button>
        </form>
      </div>
   
      
    </>
  )
}
