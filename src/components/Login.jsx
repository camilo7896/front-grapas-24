import { useState } from "react";

export default function Login() {

  const [password, setPasswords] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Enviar los datos
    const data = {
        username: username,
        password: password
    };

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert(`Error: ${errorText}`);
            return;
        }

        const result = await response.json();

        // Guarda el token y el rol en el almacenamiento local
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);

        // Redirecciona a la página principal o a una página específica
        window.location.href = '/';
        
    } catch (err) {
        console.error('Error:', err);
        alert('Error al iniciar sesión');
    }
};






  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Ingrese su nombre de usuario"
              onChange={(e) =>{setUsername(e.target.value)}}
              required
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              className="input input-bordered w-full"
              onChange={(e)=>{setPasswords(e.target.value)}}
              placeholder="Ingrese su contraseña"
              required
              autoComplete="off"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">Iniciar sesión</button>
        </form>
      </div>
    </>
  )
}