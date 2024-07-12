import { useGlobalContext } from "../context/UserContext";

export default function FormUsers() {
  const { setUser } = useGlobalContext();

  const sendData = async (e) => {
    e.preventDefault();
    let target = e.target;
    let id_usuarios = target.id_usuarios.value;
    let nombres = target.nombres.value;
    let apellidos = target.apellidos.value;
    let usuario = target.usuario.value;

    let createUser = {
      id_usuarios: id_usuarios,
      nombres: nombres,
      apellidos: apellidos,
      usuario: usuario
    };

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createUser)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Success:', data);
        alert("Creado exitosamente");
        setUser(createUser);
        e.target.reset();
      } else {
        console.error('Error:', data);
        alert("Error al crear el usuario");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error de conexión");
    }
  };

  return (
    <div className="p-10 content-center">
      <h2 className="font-semibold text-center">Datos personales</h2>
      <form className="flex flex-col" onSubmit={sendData}>
        <input
          type="number"
          placeholder="Codigo"
          name="id_usuarios"
          required
          className="input input-bordered input-primary w-full max-w-xl m-2"
        />
        <input
          type="text"
          placeholder="Nombres"
          name="nombres"
          required
          className="input input-bordered input-primary w-full max-w-xl m-2"
        />
        <input
          type="text"
          placeholder="Apellidos"
          name="apellidos"
          required
          className="input input-bordered input-primary w-full max-w-xl m-2"
        />
        <input
          type="text"
          placeholder="Usuario"
          name="usuario"
          required
          className="input input-bordered input-primary w-full max-w-xl m-2"
        />
        <button className="btn btn-info w-full max-w-xl m-2">Enviar</button>
      </form>
    </div>
  );
}
